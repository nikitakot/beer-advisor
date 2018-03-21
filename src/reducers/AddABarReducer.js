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
        default:
            return state;
    }
};
