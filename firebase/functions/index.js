const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors')({ origin: true });
const cookieParser = require('cookie-parser')();
const bodyParser = require('body-parser');
const arrayToObject = require('./utils/arrayToObject');

const app = express();

admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore();

app.use(cors);
app.use(cookieParser);
app.use(bodyParser.json());

app.post('/add-bar', (req, res) => {
    const bar = req.body;
    bar.beerList = arrayToObject(bar.beerList);
    firestore.collection('bars').add(bar)
        .then(ref => {
            const promises = bar.beerList.map(beerId => {
                const beerRef = firestore.collection('beers').doc(beerId);
                return firestore.runTransaction(t => {
                    return t.get(beerRef)
                        .then(beer => {
                            const bars = beer.data().bars || {};
                            bars[ref.id] = true;
                            return t.update(beerRef, { bars });
                        });
                });
            });
            Promise.all(promises).then(() => {
                console.log(`Bar with id ${ref.id} was created.`);
                res.sendStatus(200);
            });
        })
        .catch(e => {
            console.log('Error: ', e);
            res.sendStatus(500);
        });
});

app.post('/update-beer-list', (req, res) => {
    const { id, beerList } = req.body;
    firestore.collection('bars').doc(id).update({ beerList: arrayToObject(beerList) })
        .then(() => {
            console.log(`Bar with id ${id} was updated.`);
            res.sendStatus(200);
        })
        .catch(e => {
            console.log('Error: ', e);
            res.sendStatus(500);
        });
});

app.get('/get-bars', (req, res) => {
    firestore.collection('bars').get()
        .then(snapshot => {
            const barList = [];
            snapshot.forEach(doc => {
                const bar = doc.data();
                bar.id = doc.id;
                barList.push(bar);
            });
            res.status(200).json({ barList });
        })
        .catch(e => {
            res.sendStatus(500);
            console.log('Error getting documents', e);
        });
});

app.get('/get-bars-beers', (req, res) => {
        const id = req.query.id;
        firestore.runTransaction(t => {
            return t.get(firestore.collection('bars').doc(id))
                .then(bar => {
                    const promises = bar.data().beerList.map(beerId =>
                        t.get(firestore.collection('beers').doc(beerId)).then(beer => beer.data())
                    );
                    return Promise.all(promises);
                });
        }).then(beerList => {
            res.status(200).json({ beerList });
        }).catch(e => {
            res.sendStatus(500);
            console.log('Error getting documents', e);
        });
    }
);

exports.app = functions.https.onRequest(app);
