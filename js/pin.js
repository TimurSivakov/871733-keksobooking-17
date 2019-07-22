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
  window.renderMapPin = function (ad, pinWidth, pinHeight) {
    var pin = deps.data.similarPinTemplate.cloneNode(true);
    pin.style.left = (ad.location.x - pinWidth / 2) + 'px';
    pin.style.top = (ad.location.y - pinHeight) + 'px';
    pin.children[0].src = ad.author.avatar;
    pin.children[0].alt = 'Заголовок объявления';
    return pin;
  };
})();
