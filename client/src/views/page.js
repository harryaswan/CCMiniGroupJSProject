var Map = require("../models/map.js");

var Page = function(request, map) {
    this.request = request;
    this.map = map;
    this.mainCallback = null;
    this.test = "bunny";
};

Page.prototype = {

    display: function(pageUrl, callback) {
        this.request.do('GET', pageUrl, callback);
    },
    decide: function(user, log) {
        console.log(this);
        if (user) {
            this.display('main.html', this.setupMain);
            log.innerText = "Logout";
            log.addEventListener('click', function(e) {
                e.preventDefault();
                localStorage.removeItem('user');
                this.map = null;
                console.log('ct', this);
                this.mainCallback();
            }.bind(this));
        } else {
            this.display('login.html', this.setupLogin);
            log.innerText = null;
        }
    },
    setupLogin: function(data) {
        document.getElementById('content').innerHTML = data;

        var form = document.getElementById('user-form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            var username = document.getElementById('user-input').value;
            localStorage.setItem('user', username.toLowerCase());
            console.log("no redirect - refresh page");
            // console.log(this);
            // console.log(this.mainCallback);
        }.bind(Page));
    },
    setupMain: function(data) {
        console.log('a',this.test);
        document.getElementById('content').innerHTML = data;

        var countryData = JSON.parse(localStorage.getItem('countryData'));
        var searchBox = document.getElementById('country-search');

        searchBox.addEventListener('keyup', function(e) {
            var span = document.getElementById('country-options');
            span.innerHTML = null;
            for (var i = 0; i < countryData.length; i++) {
                if (countryData[i].name.toLowerCase().indexOf(searchBox.value.toLowerCase()) > -1) {
                    span.appendChild(this.createListOption(countryData[i].name));
                }
            }
            if (span.childNodes.length === 0) {
                var p = document.createElement('p');
                p.innerText = "Sorry no results...";
                span.appendChild(p);
            }
        }.bind(this));
        console.log('me', this);
        this.updateDisplay();
    },
    createListOption: function(countryName) {
        var p = document.createElement('p');
        p.innerText = countryName;
        p.addEventListener('click', pClickHandler);
        return p;
    },
    pClickHandler: function(e) {
        var me = e.target;

        var countryData = {
            user: localStorage.getItem('user'),
            country: {country: me.innerText, latlng: findLatLng(me.innerText)}
        };

        this.request.do("POST", "country", this.updateDisplay, countryData);
        document.getElementById('country-options').innerHTML = null;
    },
    findLatLng: function(countryName) {
        var countryData = JSON.parse(localStorage.getItem('countryData'));
        for (var i = 0; i < countryData.length; i++) {
            if (countryData[i].name === countryName) {
                return countryData[i].latlng;
            }
        }
    },
    updateDisplay: function() {
        if (this.map) {
            this.map.clearMarkers();
        } else {
            this.map = new Map(document.getElementById("map"));
        }

        var curCountries = document.getElementById('current-countries');
        curCountries.innerHTML = "";
        document.getElementById('country-search').value = null;

        this.request.do("POST", "", function(rawData) {
            var data = JSON.parse(rawData);
            data = data[0];
            if (data) {
                for (var i = 0; i < data.countries.length; i++) {
                    var latlng = {lat:data.countries[i].latlng[0], lng:data.countries[i].latlng[1]};
                    this.map.addMarker(latlng, data.countries[i].country);

                    var li = document.createElement('li');
                    li.innerText = data.countries[i].country;

                    var del = document.createElement('b');
                    del.innerText = "X";
                    del.addEventListener('click', this.deleteCountry);

                    li.appendChild(del);
                    curCountries.appendChild(li);

                }
            }
        }.bind(this), {user: localStorage.getItem("user")});
    },
    deleteCountry: function(e) {
        var country = e.target.parentNode.childNodes[0].nodeValue;
        this.request.do("DELETE", "country", this.updateDisplay, {user: localStorage.getItem("user"), country: country});
    }


};

module.exports = Page;
