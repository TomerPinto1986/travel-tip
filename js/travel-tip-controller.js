'use strict';

import { mapService } from './mapService.js'

var gMap;

window.addEventListener('load', onInit)

function onInit() {
    initMap()
        .then(() => {
            addNewPlace(gMap)
            addMarker({ lat: 32.0749831, lng: 34.9120554 });
        })
        .catch(console.log('INIT MAP ERROR'));

    getPosition()
        .then(pos => {

            console.log('User position is:', pos.coords);
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}
document.querySelector('.my-loc-btn').addEventListener('click', (ev) => {
    getPosition()
        .then(pos => {
            const lat = pos.coords.latitude
            const lng = pos.coords.longitude
            panTo(lat, lng)
            addMarker({ lat, lng })
        })
})


document.querySelector('.btn').addEventListener('click', (ev) => {
    console.log('Aha!', ev.target);
    panTo(35.6895, 139.6917);
})

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            console.log(document.querySelector('#map'));
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                    center: { lat, lng },
                    zoom: 15
                })
            console.log('Map!', gMap);
        })
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    });
    return marker;
}

function getPosition() {
    console.log('Getting Pos');

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}


function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
}



function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyBnwIL3kqk03C9Pg72vvkzIv0hX4_HEjAg';
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

// document.querySelector('.my-map').addEventListener('click', addNewPlace)

function addNewPlace(map) {
    var infoWindow = new google.maps.InfoWindow({ content: 'Click the map to get Lat/Lng!', position: map.position });
    console.log(infoWindow);
    infoWindow.open(map);
    map.addListener('click', function(mapsMouseEvent) {
        infoWindow.close();
        infoWindow = new google.maps.InfoWindow({ position: mapsMouseEvent.latLng });
        console.log(mapsMouseEvent.latLng.toString());
        addToListPlaces(mapsMouseEvent.latLng.toString())
    });
}

function addToListPlaces(latLng) {
    const regex = /\(|,|\)/gi;
    var latLngNew = latLng.replaceAll(regex, '')
    latLngNew = latLngNew.split(' ')
    const lat = latLngNew[0]
    const lng = latLngNew[1]
    console.log('lat', lat);
    console.log('lng', lng);
    // createPlace(lat, lng)
    // renderPlaces()
}