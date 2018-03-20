import firebase from 'firebase';
import 'firebase/firestore';
import { FETCH_BEER_LIST, FETCHING_BEER_LIST, FETCHING_BEER_LIST_FAIL } from './types';


export const fetchBeerList = () => {
    return (dispatch) => {
        dispatch({ type: FETCHING_BEER_LIST });

        const beerColRef = firebase.firestore().collection('beers');

        beerColRef.get().then(querySnapshot => {
            const beerList = [];
            querySnapshot.forEach(doc => {
                console.log(doc.data(), doc.id);
                beerList.push(doc.data());
            });
            dispatch({
                type: FETCH_BEER_LIST,
                payload: beerList
            });
        }).catch(e => {
            console.log(e);
            dispatch({ type: FETCHING_BEER_LIST_FAIL });
        });
    };
};
