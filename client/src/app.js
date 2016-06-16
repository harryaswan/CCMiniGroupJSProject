var Request = require('./models/request.js');
var Page = require('./views/page.js');

var main = function() {
    var map = null;
    var request = new Request();
    var page = new Page(request, map);
    page.mainCallback = main;
    var user = localStorage.getItem('user');
    var log = document.getElementById('login');
    request.grabCountryData();
    page.decide(user, log);
};

window.onload = main;
