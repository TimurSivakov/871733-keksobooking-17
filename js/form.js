'use strict';
(function () {
  var deps = {
    data: window.data,
    utils: window.utils,
    map: window.map
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
  window.setActiveCondition = function () {
    if (deps.data.mapIsEnabled === 'false') {
      setDisableAttribute(deps.data.adFormFieldsets, false);
      setDisableAttribute(deps.data.mapFilterSelects, false);
      setDisableAttribute(deps.data.mapFilterInputs, false);
      deps.utils.setupFunction(deps.data.map, deps.data.MAP_FADED_CLASS);
      deps.utils.setupFunction(deps.data.adForm, deps.data.ADFORM_DISABLED_CLASS);
      deps.map.renderAdsOnMap();
      deps.data.mainPin.removeEventListener('mouseup', window.setActiveCondition);
      deps.data.mapIsEnabled = 'true';
    }
  };
  /**
   * Функция меняет минимальное значение цены за ночь в зависимости от типа жилья
   */
  var setMinPrice = function () {
    var typeSelectedIndex = deps.data.adFormTypeSelect.selectedIndex;
    var adFormPriceInputAttribute = Object.values(deps.data.MIN_PRICE_FOR_NIGHT)[typeSelectedIndex];
    deps.data.adFormPriceInput.min = adFormPriceInputAttribute;
    deps.data.adFormPriceInput.placeholder = adFormPriceInputAttribute;
  };
  setDisableAttribute(deps.data.adFormFieldsets, true);
  setDisableAttribute(deps.data.mapFilterSelects, true);
  setDisableAttribute(deps.data.mapFilterInputs, true);

  deps.data.addressInput.setAttribute('value', deps.data.mainPinXCenter + ', ' + deps.data.mainPinYCenter);
  deps.data.mainPin.addEventListener('mouseup', function () {
    deps.data.addressInput.setAttribute('value', deps.data.mainPinXCenter + ', ' + deps.data.MAIN_PIN_ACTIVE_Y);
  });

  deps.data.adFormTypeSelect.addEventListener('input', setMinPrice);

  deps.data.adFormTimeInSelect.addEventListener('change', function () {
    var SelectedIndex = deps.data.adFormTimeInSelect.selectedIndex;
    if (deps.data.adFormTimeInSelect.value === deps.data.adFormTimeInOption[SelectedIndex].value) {
      deps.data.adFormTimeOutSelect.value = deps.data.adFormTimeOutOption[SelectedIndex].value;
    }
  });

  deps.data.adFormTimeOutSelect.addEventListener('change', function () {
    var SelectedIndex = deps.data.adFormTimeOutSelect.selectedIndex;
    if (deps.data.adFormTimeOutSelect.value === deps.data.adFormTimeOutOption[SelectedIndex].value) {
      deps.data.adFormTimeInSelect.value = deps.data.adFormTimeInOption[SelectedIndex].value;
    }
  });
})();
