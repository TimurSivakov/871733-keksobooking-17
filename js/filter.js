'use strict';
(function () {
  window.filter = {
    /**
     * Функция копирует данные с сервера
     * @param {* []} ads
     * @return {[]}
     */
    copyAds: function (ads) {
      window.filteredAds = ads.slice();
      return window.filteredAds;
    }
  };
})();
