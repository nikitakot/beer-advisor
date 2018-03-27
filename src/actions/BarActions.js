import { Location } from 'expo';
import { BAR_UPDATE, BEER_SELECTED, BEER_UNSELECTED, FETCH_GEOCODE_SUCCESS } from './types';
import { getGeoCode, getGeoCodeReverse } from '../utlis/requests';

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

export const fetchAddress = address => {
    return (dispatch) => {
        getGeoCode(address)
            .then(res => {
                dispatchGeocodeSuccess(res, dispatch);
            })
            .catch(e => {
                console.log(e);
            });
    };
};

export const fetchCurrentAddress = () => {
    return (dispatch) => {
        Location.getCurrentPositionAsync().then(({ coords }) => {
            const { latitude: lat, longitude: lng } = coords;
            getGeoCodeReverse(lat, lng)
                .then(res => {
                    dispatchGeocodeSuccess(res, dispatch);
                })
                .catch(e => {
                    console.log(e);
                });
        });
    };
};

const dispatchGeocodeSuccess = (res, dispatch) => {
    const data = res.results;
    dispatch({
        type: FETCH_GEOCODE_SUCCESS,
        payload: {
            address: data[0].formatted_address,
            lat: data[0].geometry.location.lat,
            lng: data[0].geometry.location.lng
        }
    });
};
