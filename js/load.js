'use strict';
(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  window.xhr = new XMLHttpRequest();
  window.xhr.responseType = 'json';
  window.ads = window.xhr.response;
  window.xhr.addEventListener('load', function () {
    window.ads = window.xhr.response;
  });
  window.xhr.open('GET', URL);
  window.xhr.send();
})();

