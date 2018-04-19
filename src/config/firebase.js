import firebase from 'firebase';
import 'firebase/firestore';
import { Facebook } from 'expo';

const config = {
    apiKey: 'AIzaSyCQjAHCdWFL3E07UvvE5Ve4CNAZkVGJYNY',
    authDomain: 'beer-advisor-81981.firebaseapp.com',
    databaseURL: 'https://beer-advisor-81981.firebaseio.com',
    projectId: 'beer-advisor-81981',
    storageBucket: 'beer-advisor-81981.appspot.com',
    messagingSenderId: '716209682893'
};
firebase.initializeApp(config);

export const database = firebase.database();
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const logOut = () => auth.signOut();
export const initializeUser = () => new Promise((resolve, reject) => {
    auth.onAuthStateChanged(user => {
        if (user) {
            resolve(user);
        } else {
            resolve(null);
        }
    }, err => reject(err));
});
export const loginFaceBook = () => {
    return Facebook.logInWithReadPermissionsAsync('139880516857537',
        { permissions: ['public_profile', 'email'] })
        .then(({ type, token }) => {
            if (type === 'success') {
                const credential = firebase.auth.FacebookAuthProvider.credential(token);
                return firebase.auth().signInWithCredential(credential);
            }
            return Promise.reject(`Error facebook login type ${type}`);
        });
};

