import {
    BAR_UPDATE, BEER_SELECTED, BEER_UNSELECTED, FETCH_GEOCODE_FAIL, FETCH_GEOCODE_SUCCESS,
    FETCHING_GEOCODE
} from '../actions/types';

const INITIAL_STATE = {
    name: '',
    phone: '',
    address: '',
    lat: null,
    lng: null,
    beerList: [],
    error: '',
    addressLoading: false,
    putLoading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_GEOCODE_SUCCESS:
            return { ...state, ...action.payload, addressLoading: false };
        case FETCH_GEOCODE_FAIL:
            return { ...state, addressLoading: false, error: 'Address fetching failed' };
        case FETCHING_GEOCODE:
            return { ...state, addressLoading: true, error: '' };
        case BAR_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case BEER_SELECTED:
            return { ...state, beerList: [...state.beerList, action.payload] };
        case BEER_UNSELECTED:
            return { ...state, beerList: state.beerList.filter(id => id !== action.payload) };
        default:
            return state;
    }
};
