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

app.post('/add-bar', (req, res, next) => validateToken(req, res, next, admin), (req, res) => {
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

app.post('/edit-bar', (req, res, next) => validateToken(req, res, next, admin), (req, res) => {
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

app.post('/update-beer-list', (req, res, next) => validateToken(req, res, next, admin), (req, res) => {
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

app.post('/leave-beer-rating', (req, res, next) => validateToken(req, res, next, admin), (req, res) => {
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

app.post('/leave-bar-rating', (req, res, next) => validateToken(req, res, next, admin), (req, res) => {
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

app.post('/add-beer', (req, res, next) => validateToken(req, res, next, admin), (req, res) => {
    const userId = req.user.uid;
    const beer = req.body;
    firestore.runTransaction(t =>
        t.get(firestore.collection('roles').doc('admins'))
            .then(snapshot => {
                const admins = snapshot.data();
                const isAdmin = admins[userId];
                if (isAdmin) {
                    const newBeerRef = firestore.collection('beers').doc();
                    return t.set(newBeerRef, beer);
                }
                return Promise.reject({ responseStatus: 403 });
            }))
        .then(() => {
            res.sendStatus(200);
        })
        .catch(e => {
            console.log('Failed to get admin', e);
            res.sendStatus(e.responseStatus || 500);
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
                        email: req.user.name || req.user.email,
                        comment,
                        time: admin.firestore.FieldValue.serverTimestamp()
                    };
                    return t.update(firestore.collection('beers').doc(id), { comments });
                }))
            .then(() => {
                console.log(`Comment to beer ${id} was created`);
                res.sendStatus(200);
            })
            .catch(e => {
                console.log('Error: ', e);
                res.sendStatus(500);
            });
    }
);

app.post('/delete-beer-comment', (req, res, next) => validateToken(req, res, next, admin), (req, res) => {
        const { beerId, commentId } = req.body;
        firestore.runTransaction(t =>
            t.get(firestore.collection('beers').doc(beerId))
                .then(beer => {
                    const comments = beer.data().comments || {};
                    const commentToDelete = comments[commentId];
                    if (commentToDelete.uid !== req.user.uid) {
                        return Promise.reject('Can\'t delete this comment, uid is not corresponds');
                    }
                    delete comments[commentId];
                    return t.update(firestore.collection('beers').doc(beerId), { comments });
                }))
            .then(() => {
                console.log(`Comment ${commentId} was deleted`);
                res.sendStatus(200);
            })
            .catch(e => {
                console.log('Error: ', e);
                res.sendStatus(500);
            });
    }
);

app.get('/get-bar-comments', (req, res) => {
    const id = req.query.id;
    firestore.collection('bars').doc(id).get()
        .then(bar => {
            const commentsObj = bar.data().comments;
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

app.post('/leave-bar-comment', (req, res, next) => validateToken(req, res, next, admin), (req, res) => {
        const { id, comment } = req.body;
        firestore.runTransaction(t =>
            t.get(firestore.collection('bars').doc(id))
                .then(bar => {
                    const comments = bar.data().comments || {};
                    const newCommentId = firestore.collection('bars').doc().id;
                    comments[newCommentId] = {
                        uid: req.user.uid,
                        email: req.user.name || req.user.email,
                        comment,
                        time: admin.firestore.FieldValue.serverTimestamp()
                    };
                    return t.update(firestore.collection('bars').doc(id), { comments });
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

app.post('/delete-bar-comment', (req, res, next) => validateToken(req, res, next, admin), (req, res) => {
        const { barId, commentId } = req.body;
        firestore.runTransaction(t =>
            t.get(firestore.collection('bars').doc(barId))
                .then(bar => {
                    const comments = bar.data().comments || {};
                    const commentToDelete = comments[commentId];
                    if (commentToDelete.uid !== req.user.uid) {
                        return Promise.reject('Can\'t delete this comment, uid is not corresponds');
                    }
                    delete comments[commentId];
                    return t.update(firestore.collection('bars').doc(barId), { comments });
                }))
            .then(() => {
                console.log(`Comment ${commentId} was deleted`);
                res.sendStatus(200);
            })
            .catch(e => {
                console.log('Error: ', e);
                res.sendStatus(500);
            });
    }
);

app.get('/get-beers-bars', (req, res) => {
    const id = req.query.id;
    firestore.collection('bars').where(`beerList.${id}`, '==', true).get()
        .then(snapshot => {
            const barList = snapshot.docs.map(doc => {
                const bar = doc.data();
                bar.id = doc.id;
                bar.beerList = Object.keys(bar.beerList);
                return bar;
            });
            res.status(200).json({ barList });
        })
        .catch(e => {
            console.log('Error: ', e);
            res.sendStatus(500);
        });
});

app.post('/apply-bar-changes', (req, res) => {
    const barIdToChange = req.body.barId;
    const changesIdToApply = req.body.changesId;
    firestore.runTransaction(t => t.get(firestore.collection('bars').doc(barIdToChange))
        .then(bar => {
            const {
                address,
                beerList, closeTimeH, closeTimeM,
                lat, lng, name, openTimeH, openTimeM, phone
            } = bar.data().changes[changesIdToApply];
            const changes = {};
            return t.update(firestore.collection('bars').doc(barIdToChange), {
                address,
                beerList,
                closeTimeH,
                closeTimeM,
                lat,
                lng,
                name,
                openTimeH,
                openTimeM,
                phone,
                changes
            });
        }))
        .then(() => {
            console.log(`Successfully changed the bar ${barIdToChange}`);
            res.sendStatus(200);
        })
        .catch(e => {
            console.log('Error applying bar changes', e);
            res.sendStatus(500);
        });
});

app.post('/delete-bar', (req, res) => {
    const barId = req.body.barId;
    firestore.collection('bars').doc(barId).delete()
        .then(ref => {
            console.log(`Bar with id ${ref.id} was deleted.`);
            res.sendStatus(200);
        })
        .catch(e => {
            console.log('Error: ', e);
            res.sendStatus(500);
        });
});

app.post('/get-admin', (req, res, next) => validateToken(req, res, next, admin), (req, res) => {
    const userId = req.user.uid;
    firestore.collection('roles').doc('admins').get()
        .then(snapshot => {
            const admins = snapshot.data();
            const isAdmin = admins[userId];
            res.status(200).json({ isAdmin });
        })
        .catch(e => {
            console.log('Failed to get admin', e);
            res.sendStatus(500);
        });
});

exports.app = functions.https.onRequest(app);
