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
    saveLocations()
}



// var locs = [{ lat: 11.22, lng: 22.11 }]

// function getLocs() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(locs);
//         }, 2000)
//     });
// }

function removeLocation(locationId) {
    const idx = getLocationIdxById(locationId)
    gMyLocations.splice(idx, 1)
    saveLocations()
}

function getLocationIdxById(locationId) {
    return gMyLocations.findIndex(location => {
        console.log(locationId);
        console.log(location.id);
        locationId === location.id
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
}