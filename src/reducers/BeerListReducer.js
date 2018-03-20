import { FETCH_BEER_LIST, FETCHING_BEER_LIST, FETCHING_BEER_LIST_FAIL } from '../actions/types';

const INITIAL_STATE = {
    beerList: [],
    error: '',
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_BEER_LIST:
            return { ...state, beerList: action.payload };
        case FETCHING_BEER_LIST:
            return { ...state, loading: true, error: '' };
        case FETCHING_BEER_LIST_FAIL:
            return { ...state, loading: false, error: 'Failed loading beer list.' };
        default:
            return state;
    }
};
