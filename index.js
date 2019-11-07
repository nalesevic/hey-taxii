const express = require('express');
const mongojs = require('mongojs');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

// if app is not running on Heroku
let config;
if((process.env._ && process.env._.indexOf("heroku"))) {
    config = require('./config.js');
}

const app = express();
const port = process.env.PORT || 3000;
const db = mongojs(process.env.MONGODB_URL || config.MONGODB_URL);

app.use('/', express.static('public'));
app.use('/company',express.static('company'));
app.use('/passenger',express.static('passenger'));
app.use(bodyParser.json());

// Global Middlewear
app.use((req, res, next) => {
    console.log('Server time ' + Date.now());
    next();
});

// Express Routers
let admin_router = express.Router();
require('./routes/admin.js')(admin_router, db, mongojs, config, jwt);
app.use('/admin', admin_router);

let company_router = express.Router();
require('./routes/company.js')(company_router, db, mongojs, config, jwt);
app.use('/company', company_router);

let passenger_router = express.Router();
require('./routes/passenger.js')(passenger_router, db, mongojs, config, jwt);
app.use('/passenger', passenger_router);

let public_router = express.Router();
require('./routes/public.js')(public_router, db, mongojs, config, jwt);
app.use('/', public_router);

// Google Authentication
const { google } = require('googleapis');
const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID || config.CLIENT_ID,
    process.env.CLIENT_SECRET || config.CLIENT_SECRET,
    process.env.REDIRECT_URL || config.REDIRECT_URL
);

app.get('/login', (req, res) => {
    let code = req.query.code;
    /* If redirected from Google API */
    if (code) {
      oauth2Client.getToken(code).then((result) => {
          oauth2Client.setCredentials({access_token: result.tokens.access_token});
          let oauth2 = google.oauth2({
              auth: oauth2Client,
              version: 'v2'
          });
          
          oauth2.userinfo.get((err, response) => {
              if (err) {
                  throw err;
              }
              let data = response.data;

              db.user.findAndModify({ 
                  query: { email: data.email },
                  update: { $setOnInsert: { email: data.email, name: data.name, signup_time: new Date(), type: 'passenger' } },
                  new: true,
                  upsert: true  
              }, (error, doc) => {
                  if (error) {
                      console.log(error);
                  }
                  let jwtToken = jwt.sign({
                      ...data,
                      exp: (Math.floor(Date.now() / 1000) + 3600), // token which lasts for an hour
                      id: doc._id,
                      type: doc.type
                  }, process.env.JWT_SECRET || config.JWT_SECRET);
                  /* Output the JWT */
                  res.json({ 'jwt' : jwtToken });
              });
          });
      });
    /* If coming to the login URL for the first time */
    } else {
      const scopes = [
          'https://www.googleapis.com/auth/userinfo.profile',
          'https://www.googleapis.com/auth/userinfo.email'
      ];
      
      const url = oauth2Client.generateAuthUrl({
          access_type: 'online',
          scope: scopes
      });
      res.redirect(url);
    }
});

app.listen(port, () => console.log("Listening on port " + port));