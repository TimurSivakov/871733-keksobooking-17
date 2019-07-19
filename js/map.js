'use strict';
(function () {
  var deps = {
    data: window.data
  };
  /**
   * Функция создает новый dom элемент с разметкой из шаблона
   * @param {{
   *   location: string,
   *   author: string
   * }} ad
   * @param {number} pinWidth Ширина блока метки на карте
   * @param {number} pinHeight Высота блока метки на карте
   * @return {Node}
   */
  var renderMapPin = function (ad, pinWidth, pinHeight) {
    var pin = deps.data.similarPinTemplate.cloneNode(true);
    pin.style.left = (ad.location.x - pinWidth / 2) + 'px';
    pin.style.top = (ad.location.y - pinHeight) + 'px';
    pin.children[0].src = ad.author.avatar;
    pin.children[0].alt = 'Заголовок объявления';
    return pin;
  };
  /**
   * Функция заполняет блок дом элементами
   * @return {void} возвращает блок с добавленными метками предложений
   */
  window.renderAdsOnMap = function () {
    var fragment = document.createDocumentFragment();
    var ads = window.generateAds(deps.data.USERS_AVATARS, deps.data.TYPES_OF_HOUSING, deps.data.MAP_X_RANGE, deps.data.MAP_Y_RANGE);
    for (var i = 0; i < window.maxAdsNumber; i++) {
      fragment.appendChild(renderMapPin(ads[i], deps.data.PIN_WIDTH, window.PIN_HEIGHT));
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
