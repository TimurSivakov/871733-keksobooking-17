'use strict';
var map = document.querySelector('.map');
var MAP_FADED_CLASS = 'map--faded';
/**
 * Функция удаляет у элемента класс
 * @param {Element} className
 * @param {string} classForRemove
 * @return {void} возвращает элемент без класса
 */
var setupFunction = function (className, classForRemove) {
  return className.classList.remove(classForRemove);
};
