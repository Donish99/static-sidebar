var map = L.map("map", {
  zoom: 5,
  center: [43, 63],
  zoomControl: false,
});

var layer = L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 18,
  attribution: "Map data &copy; OpenStreetMap contributors",
}).addTo(map);

var point1 = L.marker([43, 63]),
  point2 = L.marker([33, 53]);

var markers = L.layerGroup([point1, point2]).addTo(map);

var overLays = {
  markers: markers,
};

L.control.layers(overLays).addTo(map);

var o = L.sidebar("sidebar");

o.addTo(map);
