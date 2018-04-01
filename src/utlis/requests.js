/* eslint-disable prefer-template */

import { APP_URL, GEOCODE_API_KEY } from './constants';

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

export function postABar({ name, address, lat, lng, phone, beerList, uid }) {
    const data = { name, address, lat, lng, phone, beerList, uid };
    return fetch(APP_URL + '/add-bar', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'content-type': 'application/json'
        }
    });
}

export function fetchBarList() {
    return fetch(APP_URL + '/get-bars')
        .then(res => res.json());
}

