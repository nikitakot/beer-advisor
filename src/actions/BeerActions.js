import { FETCH_BEER_LIST, FETCHING_BEER_LIST, FETCHING_BEER_LIST_FAIL } from './types';
import { firestore } from '../config/firebase';


export const fetchBeerList = () => {
    return (dispatch) => {
        dispatch({ type: FETCHING_BEER_LIST });

        const beerColRef = firestore.collection('beers');

        beerColRef.get().then(querySnapshot => {
            const beerList = [];
            querySnapshot.forEach(doc => {
                const beer = doc.data();
                beer.id = doc.id;
                beerList.push(beer);
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
