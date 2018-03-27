const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors')({ origin: true });
const cookieParser = require('cookie-parser')();
const app = express();

admin.initializeApp(functions.config().firebase);

app.use(cors);
app.use(cookieParser);
app.get('/add-bar', (req, res) => {
    console.log(req.query);
    res.json({ test: `testing data: ${req.query.test}` });
});


exports.app = functions.https.onRequest(app);

