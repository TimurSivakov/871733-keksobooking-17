'use strict';
(function () {
  /**
   * Функция удаляет у элемента класс
   * @param {Element} className
   * @param {string} classForRemove
   * @return {void} возвращает элемент без класса
   */
  var setupFunction = function (className, classForRemove) {
    return className.classList.remove(classForRemove);
  };
  /**
   * Функция возвращает проивольное целое число из диапазона
   * @param {number} min
   * @param {number} max
   * @return {number} возвращает целое число
   */
  var generateRandomInteger = function (min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
  };
})();
