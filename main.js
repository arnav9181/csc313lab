import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';



const people = [
  { name: 'Person 1', coords: [-120.65707, 35.30256] }, // San Luis Obispo
  { name: 'Person 2', coords: [-120.65707, 35.30256] }, // San Luis Obispo
  { name: 'Person 3', coords: [-119.69819, 34.42083] }, // Santa Barbara
  { name: 'Person 4', coords: [-117.16108, 32.71574] }, // San Diego
  { name: 'Person 5', coords: [-117.16108, 32.71574] }, // San Diego
  { name: 'Person 6', coords: [-117.16108, 32.71574] }, // San Diego
];

const map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM(),
    }),
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([-120.65707, 35.30256]), // Cal Poly
    zoom: 6,
  }),
});

const iconStyles = [
  new ol.style.Style({
    image: new ol.style.Circle({
      radius: 5,
      fill: new ol.style.Fill({ color: 'yellow' }),
      stroke: new ol.style.Stroke({ color: 'black', width: 1 }),
    }),
  }),
  new ol.style.Style({
    image: new ol.style.Circle({
      radius: 7,
      fill: new ol.style.Fill({ color: 'orange' }),
      stroke: new ol.style.Stroke({ color: 'black', width: 1 }),
    }),
  }),
  new ol.style.Style({
    image: new ol.style.Circle({
      radius: 10,
      fill: new ol.style.Fill({ color: 'purple' }),
      stroke: new ol.style.Stroke({ color: 'black', width: 1 }),
    }),
  }),
];

const countPeople = (coords) => {
  return people.filter(
    (person) => person.coords[0] === coords[0] && person.coords[1] === coords[1]
  ).length;
};

people.forEach((person) => {
  const point = new ol.geom.Point(ol.proj.fromLonLat(person.coords));
  const count = countPeople(person.coords);
  let styleIndex;

  if (count === 1) {
    styleIndex = 0;
  } else if (count === 2) {
    styleIndex = 1;
  } else {
    styleIndex = 2;
  }

  const feature = new ol.Feature({
    geometry: point,
  });

  feature.setStyle(iconStyles[styleIndex]);

  const layer = new ol.layer.Vector({
    source: new ol.source.Vector({
      features: [feature],
    }),
  });

  map.addLayer(layer);
});
