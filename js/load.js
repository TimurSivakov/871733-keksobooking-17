'use strict';
(function () {
  window.load = {
    onError: function () {
      var fragment = document.createDocumentFragment();
      var errorMessage = window.data.similarErrorMessage.cloneNode(true);
      fragment.appendChild(errorMessage);
      window.data.main.appendChild(fragment);
      errorMessage.addEventListener('click', function () {
        window.data.main.removeChild(errorMessage);
      });
    },
    getDataFromServer: function () {
      var URL = 'https://js.dump.academy/keksobooking/data';
      window.xhr = new XMLHttpRequest();
      window.xhr.responseType = 'json';
      window.xhr.addEventListener('load', function () {
        if (window.xhr.status === 200) {
          window.ads = window.xhr.response;
        } else {
          window.load.onError();
        }
      });
      window.xhr.open('GET', URL);
      window.xhr.send();
    }
  };
})();

