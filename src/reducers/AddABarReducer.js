import {
    ADDING_A_BAR, BAR_UPDATE, BEER_SELECTED, BEER_UNSELECTED, FETCH_GEOCODE_FAIL, FETCH_GEOCODE_SUCCESS,
    FETCHING_GEOCODE, VALIDATION_ERROR
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
        case ADDING_A_BAR:
            return { ...state, putLoading: true, error: '' };
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
        case VALIDATION_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};
