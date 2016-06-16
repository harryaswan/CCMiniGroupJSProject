var Map = require("../models/map.js");
var MainPage = require("./main.js");
var Page = function(request, map) {
    this.request = request;
    this.map = map;
    this.mainCallback = null;
    this.main = new MainPage(this);
};
Page.prototype = {
    display: function(pageUrl, callback, context) {
        this.request.do('GET', pageUrl, callback, null, context);
    },
    decide: function(user, log) {
        if (user) {
            this.display('main.html', this.main.setup, this.main);
            log.innerText = "Hey " + localStorage.getItem('user') + " - Logout?";
            log.addEventListener('click', function(e) {
                e.preventDefault();
                localStorage.removeItem('user');
                this.map = null;
                this.mainCallback();
            }.bind(this));
        } else {
            this.display('login.html', this.setupLogin, this);
            log.innerText = null;
        }
    },
    setupLogin: function(data, context) {
        document.getElementById('content').innerHTML = data;
        document.getElementById('user-form').addEventListener('submit', function(e) {
            e.preventDefault();
            var username = document.getElementById('user-input').value;
            localStorage.setItem('user', username.toLowerCase());
            context.mainCallback();
        }.bind(Page));
    },
    updateDisplay: function(nada,context) {
        if (context.map) {
            context.map.clearMarkers();
        } else {
            context.map = new Map(document.getElementById("map"));
        }
        var curCountries = document.getElementById('current-countries');
        curCountries.innerHTML = "";
        document.getElementById('country-search').value = null;
        context.request.do("POST", "", function(rawData) {
            var data = JSON.parse(rawData);
            data = data[0];
            if (data) {
                for (var i = 0; i < data.countries.length; i++) {
                    var latlng = {lat:data.countries[i].latlng[0], lng:data.countries[i].latlng[1]};
                    context.map.addMarker(latlng, data.countries[i].country);
                    var li = document.createElement('li');
                    li.innerText = data.countries[i].country;
                    var del = document.createElement('b');
                    del.innerText = "X";
                    del.addEventListener('click', context.deleteCountry.bind(context));
                    li.appendChild(del);
                    curCountries.appendChild(li);
                }
            }
        }.bind(context), {user: localStorage.getItem("user")});
    },
    deleteCountry: function(e) {
        var country = e.target.parentNode.childNodes[0].nodeValue;
        this.request.do("DELETE", "country", this.updateDisplay, {user: localStorage.getItem("user"), country: country}, this);
    }
};
module.exports = Page;
