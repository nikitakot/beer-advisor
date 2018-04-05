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

export function postABar({
                             name, address, lat, lng, phone, beerList, uid, openTimeM,
                             openTimeH, closeTimeM, closeTimeH
                         }) {
    const data = {
        name,
        address,
        lat,
        lng,
        phone,
        beerList,
        uid,
        openTimeM,
        openTimeH,
        closeTimeM,
        closeTimeH
    };
    return fetch(APP_URL + '/add-bar', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'content-type': 'application/json'
        }
    });
}

export function getBarList() {
    return fetch(APP_URL + '/get-bars')
        .then(res => res.json());
}

export function getBarsBeers(id) {
    return fetch(APP_URL + '/get-bars-beers'
        + '?id=' + id)
        .then(res => res.json());
}

export function updateBarsBeers(id, beerList) {
    return fetch(APP_URL + '/update-beer-list', {
        method: 'POST',
        body: JSON.stringify({ id, beerList }),
        headers: {
            'content-type': 'application/json'
        }
    });
}

