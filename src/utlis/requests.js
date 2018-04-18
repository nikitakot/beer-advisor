/* eslint-disable prefer-template */

import { APP_URL, GEOCODE_API_KEY } from './constants';
import { auth } from '../config/firebase';

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

export function updateABar({
                               name, address, lat, lng, phone, beerList, uid, openTimeM,
                               openTimeH, closeTimeM, closeTimeH, id
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
        closeTimeH,
        id
    };

    return fetch(APP_URL + '/edit-bar', {
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

export function getBeerList() {
    return fetch(APP_URL + '/get-beers')
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

export function leaveABarRating(id, rating) {
    return fetch(APP_URL + '/leave-bar-rating', {
        method: 'POST',
        body: JSON.stringify({ id, rating }),
        headers: {
            'content-type': 'application/json'
        }
    });
}

export function leaveABeerRating(id, rating) {
    return fetch(APP_URL + '/leave-beer-rating', {
        method: 'POST',
        body: JSON.stringify({ id, rating }),
        headers: {
            'content-type': 'application/json'
        }
    });
}

export function getBeerComments(id) {
    return fetch(APP_URL + '/get-beer-comments'
        + '?id=' + id)
        .then(res => res.json());
}

export function leaveABeerComment(id, comment) {
    return auth.currentUser.getIdToken(true)
        .then(token =>
            fetch(APP_URL + '/leave-beer-comment',
                {
                    method: 'POST',
                    body: JSON.stringify({ id, comment }),
                    headers: {
                        'content-type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
            )
        );
}

export function deleteABeerComment(beerId, commentId) {
    return auth.currentUser.getIdToken(true)
        .then(token =>
            fetch(APP_URL + '/delete-beer-comment',
                {
                    method: 'POST',
                    body: JSON.stringify({ beerId, commentId }),
                    headers: {
                        'content-type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
            )
        );
}

export function getBarComments(id) {
    return fetch(APP_URL + '/get-bar-comments'
        + '?id=' + id)
        .then(res => res.json());
}

export function leaveABarComment(id, comment) {
    return auth.currentUser.getIdToken(true)
        .then(token =>
            fetch(APP_URL + '/leave-bar-comment',
                {
                    method: 'POST',
                    body: JSON.stringify({ id, comment }),
                    headers: {
                        'content-type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
            )
        );
}

export function deleteABarComment(barId, commentId) {
    return auth.currentUser.getIdToken(true)
        .then(token =>
            fetch(APP_URL + '/delete-bar-comment',
                {
                    method: 'POST',
                    body: JSON.stringify({ barId, commentId }),
                    headers: {
                        'content-type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
            )
        );
}

export function getBeersBars(id) {
    return fetch(APP_URL + '/get-beers-bars'
        + '?id=' + id)
        .then(res => res.json());
}
