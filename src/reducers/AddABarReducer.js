import { BEER_SELECTED, BEER_UNSELECTED } from '../actions/types';

const INITIAL_STATE = {
    name: '',
    lat: null,
    long: null,
    beerList: [],
    error: '',
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case BEER_SELECTED:
            return { ...state, beerList: [...state.beerList, action.payload] };
        case BEER_UNSELECTED:
            return { ...state, beerList: state.beerList.filter(id => id !== action.payload) };
        default:
            return state;
    }
};
