import { FETCH_BAR_LIST, FETCHING_BAR_LIST, FETCHING_BAR_LIST_FAIL } from '../actions/types';

const INITIAL_STATE = {
    barList: [],
    error: '',
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_BAR_LIST:
            return { ...state, ...INITIAL_STATE, barList: action.payload };
        case FETCHING_BAR_LIST:
            return { ...state, loading: true, error: '' };
        case FETCHING_BAR_LIST_FAIL:
            return { ...state, loading: false, error: 'Failed loading bar list.' };
        default:
            return state;
    }
};
