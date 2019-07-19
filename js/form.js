'use strict';
(function () {
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
})();
