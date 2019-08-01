'use strict';
(function () {
  var deps = {
    data: window.data,
    utils: window.utils,
    map: window.map
  };
  window.form = {
    /**
     * Функция устанавливает атрибут disabled на выбранный селектор
     * @param {RadioNodeList|HTMLElement|Element} selectors
     * @param {boolean} isDisabled булево значение отключен или нет
     */
    setDisableAttribute: function (selectors, isDisabled) {
      for (var i = 0; i < selectors.length; i++) {
        selectors[i].disabled = isDisabled;
      }
    },
    /**
     * Функция удаляет классы у элементов и удаляет событие
     */
    setActiveCondition: function () {
      if (deps.data.mapIsEnabled === 'false') {
        window.form.setDisableAttribute(deps.data.adFormFieldsets, false);
        window.form.setDisableAttribute(deps.data.mapFilterSelects, false);
        window.form.setDisableAttribute(deps.data.mapFilterInputs, false);
        deps.utils.setupFunction(deps.data.map, deps.data.MAP_FADED_CLASS);
        deps.utils.setupFunction(deps.data.adForm, deps.data.ADFORM_DISABLED_CLASS);
        deps.map.renderAdsOnMap();
        deps.data.mainPin.removeEventListener('mouseup', window.form.setActiveCondition);
        deps.data.mapIsEnabled = 'true';
      }
    },
    /**
     * Функция меняет минимальное значение цены за ночь в зависимости от типа жилья
     */
    setMinPrice: function () {
      var typeSelectedIndex = deps.data.adFormTypeSelect.selectedIndex;
      var adFormPriceInputAttribute = Object.values(deps.data.MIN_PRICE_FOR_NIGHT)[typeSelectedIndex];
      deps.data.adFormPriceInput.min = adFormPriceInputAttribute;
      deps.data.adFormPriceInput.placeholder = adFormPriceInputAttribute;
    },
    /**
     * Функция отключает фильтры
     */
    disableFilter: function () {
      window.form.setDisableAttribute(deps.data.adFormFieldsets, true);
      window.form.setDisableAttribute(deps.data.mapFilterSelects, true);
      window.form.setDisableAttribute(deps.data.mapFilterInputs, true);
    },
    /**
     * Функция устанвалиавет координты главной метки в форму
     */
    setMainPinAddressInput: function () {
      deps.data.addressInput.setAttribute('value', deps.data.mainPinXCenter + ', ' + deps.data.mainPinYCenter);
      deps.data.mainPin.addEventListener('mouseup', function () {
        deps.data.addressInput.setAttribute('value', deps.data.mainPinXCenter + ', ' + deps.data.MAIN_PIN_ACTIVE_Y);
      });
    },
    /**
     * Функция меняет значения полей в форме
     */
    changeFormValue: function () {
      deps.data.adFormTypeSelect.addEventListener('input', window.form.setMinPrice);
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
    }
  };
})();
