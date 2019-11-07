const express = require('express');
const mongojs = require('mongojs');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

let config;
if(!process.env.HEROKU) {
    config = require('./config');
}

const app = express();
const port = process.env.PORT || 3000;
const db = mongojs(process.env.MONGODB_URL || config.MONGODB_URL);
    
app.use('/company',express.static('public'));
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

app.listen(port, () => console.log("Listening on port " + port));