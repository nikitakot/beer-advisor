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
            console.log(`Bar with id ${ref.id} was added.`);
            res.sendStatus(200);
        })
        .catch(e => {
            console.log('Error: ', e);
            res.sendStatus(500);
        });
});

app.post('/update-beer-list', (req, res) => {
    const { id, beerList } = req.body;
    const newBeerList = arrayToObject(beerList);
    firestore.collection('bars').doc(id).update({ beerList: newBeerList })
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
                bar.beerList = Object.keys(bar.beerList);
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
                    const promises = Object.keys(bar.data().beerList).map(beerId =>
                        t.get(firestore.collection('beers').doc(beerId)).then(beer => {
                                const beerFE = beer.data();
                                beerFE.id = beerId;
                                return beerFE;
                            }
                        )
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

app.post('/add-beer', (req, res) => {
    const beer = req.body;
    console.log(beer);
    firestore.collection('beers').add(beer)
        .then(ref => {
            console.log(`Beer with id ${ref.id} was added.`);
            res.sendStatus(200);
        })
        .catch(e => {
            console.log('Error: ', e);
            res.sendStatus(500);
        });
});

exports.app = functions.https.onRequest(app);
