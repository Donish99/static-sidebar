L.Sidebar = L.Class.extend({
  options: {
    position: "topright",
  },
  initialize: function (placeholder, options) {
    L.Util.setOptions(this, options);

    // getting content with id of placeholder
    var content = (this._content = L.DomUtil.get(placeholder));
    content.parentNode.removeChild(content);
    var container = (this._container = L.DomUtil.create(
      "div",
      "sidebar-container"
    ));
    container.appendChild(content);
    var mp = L.DomUtil.get("map");
    mp.insertBefore(container, mp.firstChild);
  },

  addTo: function (map) {
    this._map = map;
    var topright = map._controlCorners["topright"];
    var bottomright = map._controlCorners["bottomright"];
    L.DomUtil.addClass(topright, "move");
    L.DomUtil.addClass(bottomright, "move");
    var stop = L.DomEvent.stopPropagation;
    var fakestop = L.DomEvent._fakestop || stop;
    L.DomEvent.on(this._container, "contextmenu", stop)
      .on(this._container, "click", stop)
      .on(this._container, "mousedown", fakestop)
      .on(this._container, "touchstart", stop)
      .on(this._container, "dbclick", fakestop)
      .on(this._container, "mousewheel", stop)
      .on(this._container, "wheel", stop)
      .on(this._container, "scroll", stop)
      .on(this._container, "MozMousePixelScroll", stop);
  },
});

L.sidebar = function (placeholder, options) {
  return new L.Sidebar(placeholder, options);
};
