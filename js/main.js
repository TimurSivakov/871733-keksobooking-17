'use strict';

var deps = {
  load: window.load,
  filter: window.filter,
  map: window.map,
  form: window.form
};
deps.load.getDataFromServer();
deps.map.activateMap();
deps.form.disableFilter();
deps.form.setMainPinAddressInput();
