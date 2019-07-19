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
  var renderAdsOnMap = function () {
    var fragment = document.createDocumentFragment();
    var ads = window.generateAds(deps.data.USERS_AVATARS, deps.data.TYPES_OF_HOUSING, deps.data.MAP_X_RANGE, deps.data.MAP_Y_RANGE);
    for (var i = 0; i < window.maxAdsNumber; i++) {
      fragment.appendChild(renderMapPin(ads[i], deps.data.PIN_WIDTH, window.PIN_HEIGHT));
    }
    deps.data.similarPinElement.appendChild(fragment);
  };
  mainPin.addEventListener('mousedown', function (evt) {
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
      if (mainPin.offsetTop - shift.y > MAP_Y_RANGE.min - PIN_HEIGHT && mainPin.offsetTop - shift.y < MAP_Y_RANGE.max) {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      }
      if (mainPin.offsetLeft - shift.x > MAP_X_RANGE.min - MAIN_PIN_WIDTH / 2 && mainPin.offsetLeft - shift.x < MAP_X_RANGE.max - MAIN_PIN_WIDTH / 2) {
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      }
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      setActiveCondition();
      addressInput.setAttribute('value', mainPin.style.left + ', ' + mainPin.style.top);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
