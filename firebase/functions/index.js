const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors')({ origin: true });
const cookieParser = require('cookie-parser')();
const bodyParser = require('body-parser');
const arrayToObject = require('./utils/arrayToObject');
const validateToken = require('./utils/validateFirebaseIdToken');

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

app.post('/edit-bar', (req, res) => {
    const barChange = req.body;
    barChange.beerList = arrayToObject(barChange.beerList);
    firestore.runTransaction(t => t.get(firestore.collection('bars').doc(barChange.id))
        .then(bar => {
            const changes = bar.data().changes || {};
            changes[Object.keys(changes).length] = barChange;
            return t.update(firestore.collection('bars').doc(barChange.id), { changes });
        }))
        .then(() => {
            res.sendStatus(200);
        })
        .catch(e => {
            res.sendStatus(500);
            console.log('Error editing bar', e);
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
        firestore.runTransaction(t => t.get(firestore.collection('bars').doc(id))
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
            }))
            .then(beerList => {
                res.status(200).json({ beerList });
            })
            .catch(e => {
                res.sendStatus(500);
                console.log('Error getting documents', e);
            });
    }
);

app.post('/leave-beer-rating', (req, res) => {
    const { id, rating } = req.body;
    firestore.runTransaction(t => t.get(firestore.collection('beers').doc(id))
        .then(beer => {
            const ratings = beer.data().ratings || [];
            ratings.push(rating);
            const avgRating = ratings.reduce((a, b) => a + b, 0) / ratings.length;
            return t.update(firestore.collection('beers').doc(id), { ratings, avgRating });
        }))
        .then(() => {
            res.sendStatus(200);
        })
        .catch(e => {
            res.sendStatus(500);
            console.log('Error getting documents', e);
        });
});

app.post('/leave-bar-rating', (req, res) => {
    const { id, rating } = req.body;
    firestore.runTransaction(t => t.get(firestore.collection('bars').doc(id))
        .then(bar => {
            const ratings = bar.data().ratings || [];
            ratings.push(rating);
            const avgRating = ratings.reduce((a, b) => a + b, 0) / ratings.length;
            return t.update(firestore.collection('bars').doc(id), { ratings, avgRating });
        })).then(() => {
        res.sendStatus(200);
    }).catch(e => {
        res.sendStatus(500);
        console.log('Error getting documents', e);
    });
});

app.post('/add-beer', (req, res) => {
    const beer = req.body;
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

app.get('/get-beers', (req, res) => {
    firestore.collection('beers').get()
        .then(snapshot => {
            const beerList = [];
            snapshot.forEach(doc => {
                const beer = doc.data();
                beer.id = doc.id;
                beerList.push(beer);
            });
            res.status(200).json({ beerList });
        })
        .catch(e => {
            res.sendStatus(500);
            console.log('Error getting beer documents', e);
        });
});

app.post('/delete-beer', (req, res) => {
    const { beerId } = req.body;
    firestore.runTransaction(t =>
        t.get(firestore.collection('bars').where(`beerList.${beerId}`, '==', true))
            .then(snapshot => {
                const promises = [];
                snapshot.forEach(doc => {
                    const bar = doc.data();
                    delete bar.beerList[beerId];
                    promises.push(
                        t.update(
                            firestore.collection('bars').doc(doc.id), { beerList: bar.beerList })
                    );
                });
                return Promise.all(promises)
                    .then(() => t.delete(firestore.collection('beers').doc(beerId)));
            }))
        .then(() => {
            console.log(`Beer with id ${beerId} was deleted`);
            res.sendStatus(200);
        })
        .catch(e => {
            console.log('Error: ', e);
            res.sendStatus(500);
        });
});

app.get('/get-beer-comments', (req, res) => {
    const id = req.query.id;
    firestore.collection('beers').doc(id).get()
        .then(beer => {
            const commentsObj = beer.data().comments;
            let commentsArr = [];
            if (commentsObj) {
                commentsArr = Object.keys(commentsObj).map(commentId => {
                    const comment = commentsObj[commentId];
                    comment.id = commentId;
                    return comment;
                });
                commentsArr.sort((x, y) => y.time - x.time);
            }
            res.status(200).json({ comments: commentsArr });
        })
        .catch(e => {
            console.log('Error: ', e);
            res.sendStatus(500);
        });
});

app.post('/leave-beer-comment', (req, res, next) => validateToken(req, res, next, admin), (req, res) => {
        const { id, comment } = req.body;
        firestore.runTransaction(t =>
            t.get(firestore.collection('beers').doc(id))
                .then(beer => {
                    const comments = beer.data().comments || {};
                    const newCommentId = firestore.collection('beers').doc().id;
                    comments[newCommentId] = {
                        uid: req.user.uid,
                        email: req.user.email,
                        comment,
                        time: admin.firestore.FieldValue.serverTimestamp()
                    };
                    return t.update(firestore.collection('beers').doc(id), { comments });
                }))
            .then(() => {
                console.log(`Comment to bar ${id} was created`);
                res.sendStatus(200);
            })
            .catch(e => {
                console.log('Error: ', e);
                res.sendStatus(500);
            });
    }
);


exports.app = functions.https.onRequest(app);
