'use strict';
var map = document.querySelector('.map');
var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var similarPinElement = map.querySelector('.map__pins');
var mainPin = map.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var adFormFieldsets = adForm.querySelectorAll('.ad-form__element');
var adFormTypeSelect = adForm.querySelector('#type');
var adFormPriceInput = adForm.querySelector('#price');
var adFormTimeInSelect = adForm.querySelector('#timein');
var adFormTimeInOption = adFormTimeInSelect.querySelectorAll('option');
var adFormTimeOutSelect = adForm.querySelector('#timeout');
var adFormTimeOutOption = adFormTimeOutSelect.querySelectorAll('option');
var mapFilterSelects = map.querySelectorAll('.map__filter');
var mapFilterInputs = map.querySelectorAll('.map__checkbox');
var addressInput = adForm.querySelector('#address');
var USERS_AVATARS = ['01', '02', '03', '04', '05', '06', '07', '08'];
var TYPES_OF_HOUSING = ['bungalo', 'flat', 'house', 'palace'];
var NUMBER_OF_ADS = 8;
var MAP_FADED_CLASS = 'map--faded';
var ADFORM_DISABLED_CLASS = 'ad-form--disabled';
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
var MAIN_PIN_X = 570;
var MAIN_PIN_Y = 375;
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_INACTIVE_HEIGHT = 65;
var MAIN_PIN_ACTIVE_HEIGHT = MAIN_PIN_INACTIVE_HEIGHT + 22;
var mainPinXCenter = MAIN_PIN_X + MAIN_PIN_WIDTH / 2;
var mainPinYCenter = MAIN_PIN_Y + MAIN_PIN_INACTIVE_HEIGHT / 2;
var MAIN_PIN_ACTIVE_Y = MAIN_PIN_Y + MAIN_PIN_ACTIVE_HEIGHT;
var MIN_PRICE_FOR_NIGHT = {
  bungalo: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};
var mapIsEnabled = 'false';
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

/**
 * Функция устанавливает атрибут disabled на выбранный селектор
 * @param {RadioNodeList|HTMLElement|Element} selectors
 * @param {boolean} isDisabled булево значение отключен или нет
 */
var setDisableAttribute = function (selectors, isDisabled) {
  for (var i = 0; i < selectors.length; i++) {
    selectors[i].disabled = isDisabled;
  }
};
/**
 * Функция удаляет классы у элементов и удаляет событие
 */
var setActiveCondition = function () {
  if (mapIsEnabled === 'false') {
    setDisableAttribute(adFormFieldsets, false);
    setDisableAttribute(mapFilterSelects, false);
    setDisableAttribute(mapFilterInputs, false);
    setupFunction(map, MAP_FADED_CLASS);
    setupFunction(adForm, ADFORM_DISABLED_CLASS);
    renderAdsOnMap();
    mainPin.removeEventListener('mouseup', setActiveCondition);
    mapIsEnabled = 'true';
  }
};

/**
 * Функция меняет минимальное значение цены за ночь в зависимости от типа жилья
 */
var setMinPrice = function () {
  var typeSelectedIndex = adFormTypeSelect.selectedIndex;
  var adFormPriceInputAttribute = Object.values(MIN_PRICE_FOR_NIGHT)[typeSelectedIndex];
  adFormPriceInput.min = adFormPriceInputAttribute;
  adFormPriceInput.placeholder = adFormPriceInputAttribute;
};

setDisableAttribute(adFormFieldsets, true);
setDisableAttribute(mapFilterSelects, true);
setDisableAttribute(mapFilterInputs, true);

addressInput.setAttribute('value', mainPinXCenter + ', ' + mainPinYCenter);


mainPin.addEventListener('mouseup', function () {
  addressInput.setAttribute('value', mainPinXCenter + ', ' + MAIN_PIN_ACTIVE_Y);
});

adFormTypeSelect.addEventListener('input', setMinPrice);

adFormTimeInSelect.addEventListener('change', function () {
  var SelectedIndex = adFormTimeInSelect.selectedIndex;
  if (adFormTimeInSelect.value === adFormTimeInOption[SelectedIndex].value) {
    adFormTimeOutSelect.value = adFormTimeOutOption[SelectedIndex].value;
  }
});

adFormTimeOutSelect.addEventListener('change', function () {
  var SelectedIndex = adFormTimeOutSelect.selectedIndex;
  if (adFormTimeOutSelect.value === adFormTimeOutOption[SelectedIndex].value) {
    adFormTimeInSelect.value = adFormTimeInOption[SelectedIndex].value;
  }
});

mainPin.addEventListener('mousedown', function (evt) {
  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };
  var onMouseMove = function (moveEvt) {
    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };
    mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
    mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
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

