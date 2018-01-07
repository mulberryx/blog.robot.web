/**
 * 首页
 * @author Philip 
 */
import weathers from './const/weathers.js';

let date = new Date();
let isNight = date.getHours() >= 18 || date.getHours() <= 6;

let field = isNight ? 'night_weather_code' : 'day_weather_code';

$.ajax({
    url: '/api/weather',
    type: 'get',
    contentType: 'application/json',
    data: {
        ip: returnCitySN["cip"] || '47.89.194.30'
    },
    success: function (data) {
        console.log(data);
        let weather = data.showapi_res_body.f1;
        let code = weather[field];

        $('.weather').addClass('weather-' + weathers[code]);
    },
    error: function (data) {
        console.log(JSON.parse(data), typeof data);
    }
});

let currState = 'frontage';
let recording = false;
let input = '';

let toggleCoin = function () {
    if (currState === 'frontage') {
        $('.self-introduction').hide();
        $('.self-introduction.opposite').show();

        currState = 'opposite';
    } else {
        $('.self-introduction').show();
        $('.self-introduction.opposite').hide();

        currState = 'frontage';
    }
};

$('body').keydown(function (e) {
    if (e.keyCode === 13) {
        if (recording) {
            if (input === 'toggle coin') {
                toggleCoin();
            }

            recording = false;
            input = '';
        } else {
            recording = true;
        }
    } else {
        if (recording) {
            input += e.key;
        }
    }
});

$('#goto-talk').click(function () {
    window.location.href += 'talker';
});