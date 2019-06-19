'use strict';
var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var similarPinElement = document.querySelector('.map__pins');
var USERS_AVATARS = ['01', '02', '03', '04', '05', '06', '07', '08'];
var TYPES_OF_HOUSING = ['palace', 'flat', 'house', 'bungalo'];
var NUMBER_OF_ADS = 8;
var MAP_CLASS = '.map';
var MAP_X_RANGE = {
  min: 0,
  max: similarPinElement.clientWidth
};
var MAP_Y_RANGE = {
  min: 130,
  max: 630
};
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

/**
 * Функция удаляет у элемента класс .map
 * @param {string} className
 * @return {void} возвращает элемент без класса .map
 */
var setupFunction = function (className) {
  return document.querySelector(className).classList.remove('map--faded');
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
/**
 * Функция возвращает рандомный элемент из массива характеристик объявления
 * @param {string[]} adsParameters
 * @return {string} возвращает элемент массива характеристик объявления
 */
var getRandomAdsParameter = function (adsParameters) {
  return adsParameters[Math.floor(Math.random() * adsParameters.length)];
};

/**
 * Функция создает массив объявлений неподалеку
 * @param {string[]} avatars фотографии пользователей
 * @param {string[]} types тип жилья
 * @param {{
 *   min: number,
 *   max: number
 *   }} mapX координата x метки на карте
 * @param {{
 *   min: number,
 *   max: number
 * }} mapY координата y метки на карте
 * @return {{
 *   location: string,
 *   author: string,
 *   offer: string
 * }[]} массив объявлений
 */
var generateAds = function (avatars, types, mapX, mapY) {
  var ads = [];
  for (var i = 0; i < NUMBER_OF_ADS; i++) {
    if (i < avatars.length) {
      var ad = {
        author: {
          avatar: 'img/avatars/user' + avatars[i] + '.png'
        },
        offer: {
          type: getRandomAdsParameter(types)
        },
        location: {
          x: generateRandomInteger(mapX.min, mapX.max),
          y: generateRandomInteger(mapY.min, mapY.max)
        }
      };
      ads.push(ad);
    } else {
      throw new Error('Не хватает предложений');
    }
  }
  return ads;
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
  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(renderMapPin(ads[i], PIN_WIDTH, PIN_HEIGHT));
  }
  similarPinElement.appendChild(fragment);
};
setupFunction(MAP_CLASS);
renderAdsOnMap();
