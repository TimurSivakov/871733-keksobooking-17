'use strict';
(function () {
  window.filter = {
    /**
     *
     * @param {* []} ads
     * @return {[]}
     */
    filterAds: function (ads) {
      window.filteredAds = ads.slice();
      return window.filteredAds;
    }
  };
})();
