'use strict';
(function () {
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
    var pin = similarPinTemplate.cloneNode(true);
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
    var ads = generateAds(USERS_AVATARS, TYPES_OF_HOUSING, MAP_X_RANGE, MAP_Y_RANGE);
    for (var i = 0; i < maxAdsNumber; i++) {
      fragment.appendChild(renderMapPin(ads[i], PIN_WIDTH, PIN_HEIGHT));
    }
    similarPinElement.appendChild(fragment);
  };
})();
