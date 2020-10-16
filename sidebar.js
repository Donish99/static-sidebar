L.Sidebar = L.Class.extend({
  options: {
    position: "topright",
  },
  initialize: function (placeholder, options) {
    L.Util.setOptions(this, options);

    var content = (this._content = L.DomUtil.get(placeholder));
    content.parentNode.removeChild(content);
    var container = (this._container = L.DomUtil.create(
      "div",
      "sidebar-container"
    ));
    var close = (this._close = L.DomUtil.create("div", "arrow-right"));
    close.innerHTML = "→";
    container.appendChild(close);
    container.appendChild(content);
    var mp = (this._mp = L.DomUtil.get("map"));
    mp.insertBefore(container, mp.firstChild);
  },

  addTo: function (map) {
    this._isVisible = true;
    this._topright = map._controlCorners["topright"];
    this._bottomright = map._controlCorners["bottomright"];
    L.DomUtil.addClass(this._topright, "move");
    L.DomUtil.addClass(this._bottomright, "move");
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
    L.DomEvent.on(this._close, "click", this.handleAnimation, this);
  },

  handleAnimation: function () {
    if (this._isVisible) {
      this.hide();
    } else {
      this.show();
    }
  },

  hide: function () {
    this._isVisible = false;
    this._close.innerHTML = "←";
    L.DomUtil.removeClass(this._container, "open");
    L.DomUtil.removeClass(this._topright, "open");
    L.DomUtil.removeClass(this._bottomright, "open");
    L.DomUtil.addClass(this._container, "close");
    L.DomUtil.addClass(this._topright, "close");
    L.DomUtil.addClass(this._bottomright, "close");
  },
  show: function () {
    this._isVisible = true;
    this._close.innerHTML = "→";
    L.DomUtil.removeClass(this._container, "close");
    L.DomUtil.removeClass(this._topright, "close");
    L.DomUtil.removeClass(this._bottomright, "close");
    L.DomUtil.addClass(this._container, "open");
    L.DomUtil.addClass(this._topright, "open");
    L.DomUtil.addClass(this._bottomright, "open");
  },
});

L.sidebar = function (placeholder, options) {
  return new L.Sidebar(placeholder, options);
};
