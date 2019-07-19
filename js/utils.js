'use strict';
(function () {
  window.utils = {
    /**
     * Функция возвращает проивольное целое число из диапазона
     * @param {number} min
     * @param {number} max
     * @return {number} возвращает целое число
     */
    generateRandomInteger: function (min, max) {
      var rand = min - 0.5 + Math.random() * (max - min + 1);
      rand = Math.round(rand);
      return rand;
    },
    /**
     * Функция удаляет у элемента класс
     * @param {Element} className
     * @param {string} classForRemove
     * @return {void} возвращает элемент без класса
     */
    setupFunction: function (className, classForRemove) {
      return className.classList.remove(classForRemove);
    }
  };
})();
