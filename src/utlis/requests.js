/* eslint-disable no-undef,prefer-template */
import { GEOCODE_API_KEY } from './constants';

export function getGeoCode(address) {
    return fetch('https://maps.googleapis.com/maps/api/geocode/json' +
        '?address=' + encodeURIComponent(address) +
        '&key=' + GEOCODE_API_KEY)
        .then(response => response.json());
}

export function getGeoCodeReverse(lat, lng) {
    return fetch('https://maps.googleapis.com/maps/api/geocode/json' +
        '?latlng=' + lat + ',' + lng +
        '&key=' + GEOCODE_API_KEY)
        .then(response => response.json());
}

