'use strict';
(function () {
  window.filter = {
    /**
     * Функция копирует данные с сервера
     * @param {* []} ads
     * @return {[]}
     */
    copyAds: function () {
      window.filteredAds = window.ads.filter(function (ad) {
        return ad.offer.type === window.data.filterTypeSelect.value;
      });
      return window.filteredAds;
    }
  };
})();
