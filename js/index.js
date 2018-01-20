/**
 * 首页
 * @author Philip 
 */
import '../less/index.less';
import weatherCodes from './const/weatherCodes.js';

const date = new Date();
const isNight = date.getHours() >= 18 || date.getHours() <= 6;
const field = isNight ? 'night_weather_code' : 'day_weather_code';

$.ajax({
  url: '/api/getWeather',
  type: 'get',
  contentType: 'application/json',
  data: {
    ip: returnCitySN["cip"] || '47.89.194.30'
  },
  success (data) {
    let weather = data.showapi_res_body.f1;
    let code = weather[field];

    $('.weather').addClass('weather-' + weatherCodes[code]);
  }
});

$('#goto-talk').click(() => {
  window.location.href = '/talk'
})