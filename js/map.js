'use strict';
(function () {
  var deps = {
    data: window.data
  };
  /**
   * Функция заполняет блок дом элементами
   * {void}
   */
  window.renderAdsOnMap = function () {
    var fragment = document.createDocumentFragment();
    var ads = window.generateAds(deps.data.USERS_AVATARS, deps.data.TYPES_OF_HOUSING, deps.data.MAP_X_RANGE, deps.data.MAP_Y_RANGE);
    for (var i = 0; i < deps.data.maxAdsNumber; i++) {
      fragment.appendChild(window.renderMapPin(ads[i], deps.data.PIN_WIDTH, deps.data.PIN_HEIGHT));
    }
    deps.data.similarPinElement.appendChild(fragment);
  };
  deps.data.mainPin.addEventListener('mousedown', function (evt) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    /**
     * Функция изменяет координты у метки при передвижении
     * @param {MouseEvent} moveEvt
     */
    var onMouseMove = function (moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      if (deps.data.mainPin.offsetTop - shift.y > deps.data.MAP_Y_RANGE.min - deps.data.PIN_HEIGHT && deps.data.mainPin.offsetTop - shift.y < deps.data.MAP_Y_RANGE.max) {
        deps.data.mainPin.style.top = (deps.data.mainPin.offsetTop - shift.y) + 'px';
      }
      if (deps.data.mainPin.offsetLeft - shift.x > deps.data.MAP_X_RANGE.min - deps.data.MAIN_PIN_WIDTH / 2 && deps.data.mainPin.offsetLeft - shift.x < deps.data.MAP_X_RANGE.max - deps.data.MAIN_PIN_WIDTH / 2) {
        deps.data.mainPin.style.left = (deps.data.mainPin.offsetLeft - shift.x) + 'px';
      }
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.setActiveCondition();
      deps.data.addressInput.setAttribute('value', deps.data.mainPin.style.left + ', ' + deps.data.mainPin.style.top);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
