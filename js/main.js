'use strict';

var deps = {
  load: window.load,
  filter: window.filter,
  map: window.map,
  form: window.form
};
deps.load.getDataFromServer(deps.filter.filterAds, deps.load.onError);
deps.map.activateMap();
deps.form.disableFilter();
deps.form.setMainPinAddressInput();
deps.form.changeFormValue();
