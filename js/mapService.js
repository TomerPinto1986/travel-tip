'use strict'

import { storageService } from './storage-service.js'

const LOCATIONS_KEY = 'locations'


function saveLocations(tripLocations) {
    saveToStorage(LOCATIONS_KEY, tripLocations);
}

function loadLocations() {
    return loadFromStorge(LOCATIONS_KEY);
}



// var locs = [{ lat: 11.22, lng: 22.11 }]

// function getLocs() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(locs);
//         }, 2000)
//     });
// }


export const mapService = {
    getLocs: getLocs,
    loadLocations,
    saveLocations
}