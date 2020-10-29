'use strict';

import { mapService } from './mapService.js'


var gMap;
// var gMyLocations = mapService.getLocationIdxById()s()


window.addEventListener('load', onInit)
const elAddressSearchBtn = document.querySelector('form')
elAddressSearchBtn.addEventListener('submit', onSearchLocation)

function onInit() {
    initMap()
        .then(() => {
            var MyLocations = mapService.getLocations();
            addNewPlace(gMap, MyLocations)
            addMarker({ lat: 32.0749831, lng: 34.9120554 });
            renderLocations(MyLocations)
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




function initMap(lat = 32.0749831, lng = 34.9120554) {
    return _connectGoogleApi()
        .then((res) => {
            console.log(res);
            console.log('google available');
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


function panTo(lat, lng, locationId = null) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
    addMarker({ lat: +lat, lng: +lng })
}


function onSearchLocation(ev) {
    if (ev) ev.preventDefault();
    const MyLocations = mapService.getLocations()
    console.log('hikk');
    // ev.preventdefault()
    const elAddressSearch = document.querySelector('input[name=location]')
    console.log('geo');
    mapService.getLocationFromGeo(elAddressSearch.value)
        .then(res => {
            console.log(res);
            console.log(elAddressSearch.value);
            panTo(res.lat, res.lng)
            const locationId = mapService.createSearchLocation(+res.lat, +res.lng, elAddressSearch.value)
            renderLocations(MyLocations)
            putLocationInfo(MyLocations, locationId)
        })
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

function addNewPlace(map, MyLocations) {
    var infoWindow = new google.maps.InfoWindow({ content: 'Click the map to get Lat/Lng!', position: map.position });
    infoWindow.open(map);
    map.addListener('click', function(mapsMouseEvent) {
        infoWindow.close();
        infoWindow = new google.maps.InfoWindow({ position: mapsMouseEvent.latLng });
        const locationId = mapService.createLocation(mapsMouseEvent.latLng.toString())
        renderLocations(mapService.getLocations())
        putLocationInfo(mapService.getLocations(), locationId)
    });
}

function onRemoveLocation(locationId) {
    mapService.removeLocation(locationId);
    onInit();
}



function renderLocations(MyLocations) {
    const elMyLocations = document.querySelector('.my-locations ul')
    var strHTMLs = ''
    MyLocations.forEach(location => {
        strHTMLs += `<ul data-id="${location.id}">
                  <li class="go">${location.name}</li>
                  <li class="remove"> <button>x</button></li>
                </ul>`
    })
    elMyLocations.innerHTML = strHTMLs;
    addEventListenerFunc(MyLocations)
}

function addEventListenerFunc(MyLocations) {
    MyLocations.forEach(location => {
        const elGoLi = document.querySelector(`.my-locations ul[data-id="${location.id}"] .go`)
        const elRemoveBtn = document.querySelector(`.my-locations ul[data-id="${location.id}"] .remove button`)
        elGoLi.addEventListener('click', () => clickMap(location.lat, location.lng, location.id))
        elRemoveBtn.addEventListener('click', () => onRemoveLocation(location.id))
        addMarker({ lat: +location.lat, lng: +location.lng })
    })
}

function clickMap(lat, lng, id) {
    panTo(lat, lng)
    putLocationInfo(mapService.getLocations(), id)
}


function putLocationInfo(MyLocations, id) {
    const locationIdx = mapService.getLocationIdxById(id);
    console.log(locationIdx);
    document.querySelector('.curr-location span').innerText = MyLocations[locationIdx].name;
}