'use strict';
(function () {
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
    for (var i = 0; i < NUMBER_OF_ADS; i++) {
      if (i < avatars.length) {
        var ad = {
          author: {
            avatar: 'img/avatars/user' + getRandomAdsParameter(avatars) + '.png'
          },
          offer: {
            type: getRandomAdsParameter(types)
          },
          location: {
            x: generateRandomInteger(mapX.min, mapX.max),
            y: generateRandomInteger(mapY.min, mapY.max)
          }
        };
        ads.push(ad);
      } else {
        throw new Error('Не хватает предложений');
      }
    }
    return ads;
  };
  window.generateAds = generateAds;
})();
