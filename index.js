const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server listening on port: ' + port);
 });

 app.get('/', (req,res) => {
     res.send("Hello World");
 })

 app.use('/home', (req, res, next) => {
     console.log('new visit ' + req.ip);
     res.send("WADDUP");
     next();
 });

 app.get('/user/:id', (req, res) => {
     res.send("Your id " + req.params.id);
 })
