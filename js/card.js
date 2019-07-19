'use strict';
(function () {
  /**
   * Функция возвращает рандомный элемент из массива характеристик объявления
   * @param {string[]} adsParameters
   * @return {string} возвращает элемент массива характеристик объявления
   */
  window.getRandomAdsParameter = function (adsParameters) {
    return adsParameters[Math.floor(Math.random() * adsParameters.length)];
  };
})();
