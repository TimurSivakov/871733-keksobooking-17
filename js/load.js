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
    /**
     * Функция Получает данные с сервера
     * @param {Function} onSuccess
     * @param {Function} onError
     */
    getDataFromServer: function (onSuccess, onError) {
      var URL = 'https://js.dump.academy/keksobooking/data';
      window.xhr = new XMLHttpRequest();
      window.xhr.responseType = 'json';
      window.xhr.addEventListener('load', function () {
        if (window.xhr.status === 200) {
          window.ads = window.xhr.response;
          window.filtered = onSuccess(window.ads);
          console.log(window.ads);
          console.log(window.filtered);
        } else {
          onError();
        }
      });
      window.xhr.open('GET', URL);
      window.xhr.send();
    }
  };
})();
