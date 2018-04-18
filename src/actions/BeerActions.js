import { FETCH_BEER_LIST, FETCHING_BEER_LIST, FETCHING_BEER_LIST_FAIL } from './types';
import { getBeerList } from '../utlis/requests';


export const fetchBeerList = () => {
    return (dispatch) => {
        dispatch({ type: FETCHING_BEER_LIST });
        getBeerList()
            .then(({ beerList }) =>
                dispatch({ type: FETCH_BEER_LIST, payload: beerList })
            )
            .catch(e => {
                console.log(e);
                dispatch({ type: FETCHING_BEER_LIST_FAIL });
            });
    };
};
