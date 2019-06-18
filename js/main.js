'use strict';
var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var similarPinElement = document.querySelector('.map__pins');
var USERS_AVATARS = ['01', '02', '03', '04', '05', '06', '07', '08'];
var TYPES_OF_HOUSING = ['palace', 'flat', 'house', 'bungalo'];
var NUMBER_OF_ADS = 8;
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

document.querySelector('.map').classList.remove('map--faded');

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
 * @return {string} возвращает элемент массива
 */
var getRandomArrayElement = function (adsParameters) {
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
 * @param {number} pinWidth Ширина блока метки на карте
 * @param {number} pinHeight Высота блока метки на карте
 * @return {{
 *   location: string,
 *   author: string,
 *   offer: string
 * }[]} массив объявлений
 */
var generateAds = function (avatars, types, mapX, mapY, pinWidth, pinHeight) {
  var ads = [];
  for (var i = 0; i < NUMBER_OF_ADS; i++) {
    if (i < avatars.length) {
      var ad = {
        author: {
          avatar: 'img/avatars/user' + avatars[i] + '.png'
        },
        offer: {
          type: getRandomArrayElement(types)
        },
        location: {
          x: generateRandomInteger(mapX.min, mapX.max) + pinWidth / 2,
          y: generateRandomInteger(mapY.min, mapY.max) + pinHeight
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
 * @return {Node}
 */
var renderMapPin = function (ad) {
  var pin = similarPinTemplate.cloneNode(true);
  pin.style.left = ad.location.x + 'px';
  pin.style.top = ad.location.y + 'px';
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
  var ads = generateAds(USERS_AVATARS, TYPES_OF_HOUSING, MAP_X_RANGE, MAP_Y_RANGE, PIN_WIDTH, PIN_HEIGHT);
  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(renderMapPin(ads[i]));
  }
  return similarPinElement.append(fragment);
};

renderAdsOnMap();
