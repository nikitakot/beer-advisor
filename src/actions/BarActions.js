/* eslint-disable arrow-body-style */
import { Location } from 'expo';
import {
    ADD_A_BAR_FAIL, ADD_A_BAR_SUCCESS, ADDING_A_BAR, BAR_UPDATE, BEER_SELECTED, BEER_UNSELECTED, FETCH_BAR_LIST,
    FETCH_GEOCODE_FAIL, FETCH_GEOCODE_SUCCESS, FETCHING_BAR_LIST, FETCHING_BAR_LIST_FAIL, FETCHING_GEOCODE,
    VALIDATION_ERROR
} from './types';
import { getBarList, getGeoCode, getGeoCodeReverse, postABar, updateABar } from '../utlis/requests';
import { PHONE_REGEX, TIME_REGEX } from '../utlis/constants';
import { Alert } from 'react-native';
import NavigationService from '../utlis/NavigationService';

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
        dispatch({ type: FETCHING_GEOCODE });
        getGeoCode(address)
            .then(res => {
                dispatchGeocodeSuccess(res, dispatch);
            })
            .catch(e => {
                console.log(e);
                dispatch({ type: FETCH_GEOCODE_FAIL });
            });
    };
};

export const fetchCurrentAddress = () => {
    return (dispatch) => {
        dispatch({ type: FETCHING_GEOCODE });
        Location.getCurrentPositionAsync().then(({ coords }) => {
            const { latitude: lat, longitude: lng } = coords;
            getGeoCodeReverse(lat, lng)
                .then(res => {
                    dispatchGeocodeSuccess(res, dispatch);
                })
                .catch(e => {
                    console.log(e);
                    dispatch({ type: FETCH_GEOCODE_FAIL });
                });
        });
    };
};

export const createABar = (props) => {
    const validationResult = validateBarForm(props);
    if (validationResult) {
        return validationResult;
    }
    return (dispatch) => {
        dispatch({ type: ADDING_A_BAR });
        postABar(props)
            .then(() => {
                Alert.alert(
                    'Success',
                    `Bar ${props.name} was added`,
                    [
                        { text: 'OK' },
                    ],
                    { cancelable: false }
                );
                NavigationService.goBack();
                dispatch({ type: ADD_A_BAR_SUCCESS });
            })
            .catch(e => {
                console.error(e);
                dispatch({ type: ADD_A_BAR_FAIL });
            });
    };
};

export const editABar = (props) => {
    const validationResult = validateBarForm(props);
    if (validationResult) {
        return validationResult;
    }
    return (dispatch) => {
        dispatch({ type: ADDING_A_BAR });
        updateABar(props)
            .then(() => {
                Alert.alert(
                    'Success',
                    'Bar edition submitted and will be received by the administrator soon',
                    [
                        { text: 'OK' },
                    ],
                    { cancelable: false }
                );
                NavigationService.goBack();
                dispatch({ type: ADD_A_BAR_SUCCESS });
            })
            .catch(e => {
                console.error(e);
                dispatch({ type: ADD_A_BAR_FAIL });
            });
    };
};

export const fetchBarsList = () => {
    return (dispatch) => {
        dispatch({ type: FETCHING_BAR_LIST });
        getBarList()
            .then(({ barList }) => {
                dispatch({
                    type: FETCH_BAR_LIST,
                    payload: barList
                });
            })
            .catch(e => {
                console.error(e);
                dispatch({ type: FETCHING_BAR_LIST_FAIL });
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

const validateBarForm = ({ name, address, lat, lng, phone, openTimeH, openTimeM, closeTimeH, closeTimeM }) => {
    if (!name) {
        return {
            type: VALIDATION_ERROR,
            payload: 'Bar name is required.'
        };
    }

    if (!address || !lat || !lng) {
        return {
            type: VALIDATION_ERROR,
            payload: 'Address is badly formatted.'
        };
    }

    if (phone && !PHONE_REGEX.test(phone)) {
        return {
            type: VALIDATION_ERROR,
            payload: 'Phone is badly formatted.'
        };
    }

    if (openTimeH || openTimeM || closeTimeH || closeTimeM) {
        if (!TIME_REGEX.test(`${openTimeH}:${openTimeM}`)
            || !TIME_REGEX.test(`${closeTimeH}:${closeTimeM}`)) {
            return {
                type: VALIDATION_ERROR,
                payload: 'Open hours must be in 24 hours format.'
            };
        }
    }
};
