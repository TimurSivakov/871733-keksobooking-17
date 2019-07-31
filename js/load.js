'use strict';
(function () {
  var onError = function () {
    var fragment = document.createDocumentFragment();
    var errorMessage = window.data.similarErrorMessage.cloneNode(true);
    fragment.appendChild(errorMessage);
    window.data.main.appendChild(fragment);
    errorMessage.addEventListener('click', function () {
      window.data.main.removeChild(fragment);
    });
  };
  var URL = 'https://js.dump.academy/keksobooking/data';
  window.xhr = new XMLHttpRequest();
  window.xhr.responseType = 'json';
  window.xhr.addEventListener('load', function () {
    if (window.xhr.status === 200) {
      window.ads = window.xhr.response;
      // window.ads = window.ads.filter(function (ad) {
      //   return ad.offer.type === 'house';
      // });
    } else {
      onError();
    }
  });
  window.xhr.open('GET', URL);
  window.xhr.send();
})();

