import { BAR_UPDATE, BEER_SELECTED, BEER_UNSELECTED } from './types';

export const beerSelected = id => {
    return {
        type: BEER_SELECTED,
        payload: id
    };
};

export const beerUnselected = id => {
    return {
        type: BEER_UNSELECTED,
        payload: id
    };
};

export const barUpdate = ({ prop, value }) => {
    return {
        type: BAR_UPDATE,
        payload: { prop, value }
    };
};
