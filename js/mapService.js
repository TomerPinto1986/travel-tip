'use strict'

import { storageService } from './storage-service.js'
import { utils } from './utils.js'

const LOCATIONS_KEY = 'locations'
var gMyLocations = [];

function saveLocations() {
    storageService.saveToStorage(LOCATIONS_KEY, gMyLocations);
}

function loadLocations() {
    return storageService.loadFromStorage(LOCATIONS_KEY);
}

function getLocations() {
    gMyLocations = loadLocations() ? loadLocations() : gMyLocations;
    return gMyLocations;
}

function getPos(latLng) {
    const regex = /\(|,|\)/gi;
    var latLngNew = latLng.replaceAll(regex, '')
    latLngNew = latLngNew.split(' ')
    const lat = latLngNew[0]
    const lng = latLngNew[1]
    return { lat, lng }
}

function createLocation(posStr) {
    const pos = getPos(posStr)
    const nameLocation = prompt('Enter a location name')
    if (gMyLocations.findIndex(place => place.name === nameLocation) !== -1) return alert('your place name is used, please change name')
    gMyLocations.push({
        id: utils.makeId(),
        lat: pos.lat,
        lng: pos.lng,
        name: nameLocation,
        createdAt: Date.now(),
        // updatedAt
    })
    saveLocations();
    return gMyLocations[gMyLocations.length - 1].id;
}

function createSearchLocation(lat, lng, name) {
    // if (gMyLocations.findIndex(place => place.name === nameLocation) !== -1) return alert('your place name is used, please change name')
    gMyLocations.push({
        id: utils.makeId(),
        lat,
        lng,
        name,
        createdAt: Date.now(),
        // updatedAt
    })
    console.log(gMyLocations);
    saveLocations()
    return gMyLocations[gMyLocations.length - 1].id

}


function getLocationFromGeo(address) {
    console.log(address);
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBSGjk4rruNgL9EAB1ad7NGqsP9DWd9ZjY`)
        .then(res => res.data.results[0].geometry.location)
}





function removeLocation(locationId) {
    const idx = getLocationIdxById(locationId)
    document.querySelector('.curr-location span').innerText = '';
    gMyLocations.splice(idx, 1)
    saveLocations()
}

function getLocationIdxById(locationId) {
    console.log(locationId);
    return gMyLocations.findIndex(location => {
        return locationId === location.id
    })

}



export const mapService = {
    loadLocations,
    saveLocations,
    getPos,
    createLocation,
    getLocations,
    getLocationIdxById,
    removeLocation,
    getLocationFromGeo,
    createSearchLocation
}