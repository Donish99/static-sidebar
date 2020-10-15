var s = L.Class.extend({
  options: {
    position: "topright",
  },
  initialize: function (placeholder, options) {
    L.Util.setOptions(this, options);

    // getting content with id of placeholder
    var content = (this._content = L.DomUtil.get(placeholder));
    content.parentNode.removeChild(content);
    L.DomUtil.toFront(content);
    L.DomUtil.setClass(content, "sidebar-container");
    var mp = L.DomUtil.get("map");
    mp.insertBefore(content, mp.firstChild);
  },

  addTo: function (map) {
    this._map = map;
    var topright = map._controlCorners["topright"];
    var bottomright = map._controlCorners["bottomright"];
    L.DomUtil.addClass(topright, "move");
    L.DomUtil.addClass(bottomright, "move");
    var stop = L.DomEvent.stopPropagation;
    var fakestop = L.DomEvent._fakestop || stop;
    L.DomEvent.on(this._content, "contextmenu", stop)
      .on(this._content, "click", stop)
      .on(this._content, "mousedown", fakestop)
      .on(this._content, "touchstart", stop)
      .on(this._content, "dbclick", fakestop)
      .on(this._content, "mousewheel", stop)
      .on(this._content, "wheel", stop)
      .on(this._content, "scroll", stop)
      .on(this._content, "MozMousePixelScroll", stop);
  },
});

var map = L.map("map", {
  zoom: 5,
  center: [43, 63],
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

var o = new s("sidebar");
o.addTo(map);

L.control.scale({ position: "topright" }).addTo(map);
