'use strict';

// import { travelTipService } from './travel-tip-service.js'


window.addEventListener('load', initMap);

function initMap(lat = 29.557146, lng = 34.952136) {
    console.log('hello');
    const position = { lat, lng };
    var map = new google.maps.Map(
        document.querySelector('.main-container .map'), { zoom: 10, center: position });
    const marker = new google.maps.Marker({ position, map: map, })
    map.setCenter(marker.getPosition());
}



//     var places = loadPlacesfromStorge();
//     if (places && places.length !== 0) {
//         gNextId = places[places.length - 1].id + 1;
//         renderPlacesList(places);
//     }
//     if (gIsFirstLoad && places) {
//         gPlaces = places;
//         gIsFirstLoad = false;
//         gMap.setCenter(marker.getPosition());
//     }
//     if (gIsCurrPos) renderPlacesList(gPlaces);
//     gMap.addListener('click', (ev) => {
//         var placeName = prompt('enter the new place name please');
//         var position = { lat: ev.latLng.lat(), lng: ev.latLng.lng() };
//         addPlace(position, placeName);
//         gIsCurrPos = false;
//     })