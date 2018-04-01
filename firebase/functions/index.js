const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors')({ origin: true });
const cookieParser = require('cookie-parser')();
var bodyParser = require('body-parser');

const app = express();

admin.initializeApp(functions.config().firebase);

app.use(cors);
app.use(cookieParser);
app.use(bodyParser.json());

app.post('/add-bar', (req, res) => {
    console.log(req.body);
    res.json(req.body);
});


exports.app = functions.https.onRequest(app);

