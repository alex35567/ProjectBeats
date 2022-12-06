let myMap;
const init = () => {
 myMap = new ymaps.Map("map", {
   center: [59.764616, 60.192764],
   zoom: 15,
   controls: [],
 });
 
 let coords = [
    [59.767344, 60.195382],
    [59.762993, 60.184953],
    [59.757515, 60.165770],
    [59.765287, 60.217612],
    ],
   myCollection = new ymaps.GeoObjectCollection({}, {
     draggable: false,
     iconLayout: 'default#image',
     iconImageHref: './img/svg/marker.svg',
     iconImageSize: [43, 53],
     iconImageOffset: [-20, -53]
   });
 
 for (let i = 0; i < coords.length; i++) {
   myCollection.add(new ymaps.Placemark(coords[i]));
 }
 
 myMap.geoObjects.add(myCollection);
 
 myMap.behaviors.disable('scrollZoom');

};
 
ymaps.ready(init);


