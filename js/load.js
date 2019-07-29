'use strict';
(function () {
  var onError = function (message) {
    console.error(message);
  };

  var onSuccess = function (data) {
    var animals = data;

    console.log(animals);
  };

  var URL = 'https://js.dump.academy/keksobooking/data';
  window.xhr = new XMLHttpRequest();
  window.xhr.responseType = 'json';
  window.xhr.addEventListener('load', function () {
    window.ads = window.xhr.response;
    var error;
    switch (window.xhr.status) {
      case 200:
        onSuccess(window.xhr.response);
        break;
      case 400:
        error = 'Неверный запрос';
        break;
      case 401:
        error = 'Пользователь не авторизован';
        break;
      case 404:
        error = 'Ничего не найдено';
        break;
      default:
        error = 'Cтатус ответа: : ' + window.xhr.status + ' ' + window.xhr.statusText;
    }
    if (error) {
      onError(error);
    }
  });
  window.xhr.open('GET', URL);
  window.xhr.send();
})();

