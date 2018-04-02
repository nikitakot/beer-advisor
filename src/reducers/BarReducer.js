const INITIAL_STATE = {
    beerList: [],
    error: '',
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_BAR_MENU:
            return { ...state, ...INITIAL_STATE, beerList: action.payload };
        case FETCHING_BAR_MENU:
            return { ...state, loading: true, error: '' };
        case FETCHING_BAR_MENU_FAIL:
            return { ...state, loading: false, error: 'Failed loading beer list.' };
        default:
            return state;
    }
};
