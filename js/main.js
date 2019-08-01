'use strict';

var deps = {
  load: window.load,
  filter: window.filter,
  map: window.map
};
deps.load.getDataFromServer();
deps.map.activateMap();

