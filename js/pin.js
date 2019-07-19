'use strict';
(function () {
  var deps = {
    data: window.data,
    utils: window.utils
  };
  /**
   * Функция создает массив объявлений неподалеку
   * @param {string[]} avatars фотографии пользователей
   * @param {string[]} types тип жилья
   * @param {{
   *   min: number,
   *   max: number
   *   }} mapX координата x метки на карте
   * @param {{
   *   min: number,
   *   max: number
   * }} mapY координата y метки на карте
   * @return {{
   *   location: string,
   *   author: string,
   *   offer: string
   * }[]} массив объявлений
   */
  var generateAds = function (avatars, types, mapX, mapY) {
    var ads = [];
    for (var i = 0; i < deps.data.NUMBER_OF_ADS; i++) {
      if (i < avatars.length) {
        var ad = {
          author: {
            avatar: 'img/avatars/user' + window.getRandomAdsParameter(avatars) + '.png'
          },
          offer: {
            type: window.getRandomAdsParameter(types)
          },
          location: {
            x: deps.utils.generateRandomInteger(mapX.min, mapX.max),
            y: deps.utils.generateRandomInteger(mapY.min, mapY.max)
          }
        };
        ads.push(ad);
      } else {
        throw new Error('Не хватает предложений');
      }
    }
    return ads;
  };
  // window.generateAds = generateAds;
})();
