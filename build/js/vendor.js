'use strict';

setTimeout(function () {

  var elem = document.createElement('script');
  elem.type = 'text/javascript';
  elem.src = 'https://api-maps.yandex.ru/2.1/?apikey=30be2f5a-56b4-47d1-b991-8d63a124f9ff&lang=ru_RU&onload=getYaMap';
  document.getElementsByTagName('body')[0].appendChild(elem);
}, 500);

var ymaps;

function getYaMap() { // eslint-disable-line no-unused-vars
  var myMap = new ymaps.Map('map', {center: [59.968268840756444, 30.316735568786598], zoom: 17});
  ymaps.geocode('Санкт-Петербург, набережная реки Карповки, дом 5').then(function (res) {
    var coord = res.geoObjects.get(0).geometry.getCoordinates();
    var myPlacemark = new ymaps.Placemark(coord);
    myMap.geoObjects.add(myPlacemark);
    myMap.setCenter(coord);
  });
}
