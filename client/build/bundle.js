/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Request = __webpack_require__(2);
	var Page = __webpack_require__(3);
	
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


/***/ },
/* 1 */
/***/ function(module, exports) {

	var Map = function (container){
	    this.map = new google.maps.Map(container, {center: {lat: 4, lng: 4}, zoom: 1});
	    this.markers = [];
	};
	Map.prototype ={
	    addMarker: function(latlng, name){
	        this.markers.push(new google.maps.Marker({
	            position: latlng,
	            map: this.map,
	            animation: google.maps.Animation.DROP,
	            title: name
	        }));
	    },
	    clearMarkers: function() {
	        for (var i = 0; i < this.markers.length; i++) {
	            this.markers[i].setMap(null);
	        }
	        this.markers = [];
	    }
	};
	module.exports = Map;


/***/ },
/* 2 */
/***/ function(module, exports) {

	var Request = function() {};
	Request.prototype = {
	    do: function(type, url, callback, dataToSend, context) {
	        var request = new XMLHttpRequest();
	        request.onload = function() {
	            if (request.status === 200) {
	                callback(this.responseText, context);
	            }
	        };
	        request.open(type, url);
	        if (type != "GET") {
	            request.setRequestHeader('Content-Type', 'application/json');
	        }
	        dataToSend = dataToSend ? JSON.stringify(dataToSend) : null;
	        // if (dataToSend) {
	        //     dataToSend = JSON.stringify(dataToSend);
	        // } else {
	        //     dataToSend = null;
	        // }
	        request.send(dataToSend);
	    },
	    grabCountryData: function() {
	        if (!localStorage.getItem('countryData')) {
	            this.do("GET", "http://restcountries.eu/rest/v1/all", function(rawData) {
	                localStorage.setItem('countryData', JSON.stringify(JSON.parse(rawData)));
	            });
	        }
	    }
	};
	module.exports = Request;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Map = __webpack_require__(1);
	var MainPage = __webpack_require__(4);
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


/***/ },
/* 4 */
/***/ function(module, exports) {

	var MainPage = function(page) {
	    this.page = page;
	};
	
	MainPage.prototype = {
	    setup: function(data, context) {
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
	        }.bind(context));
	        context.page.updateDisplay(null, context.page);
	    },
	    createListOption: function(countryName) {
	        var p = document.createElement('p');
	        p.innerText = countryName;
	        p.addEventListener('click', this.pClickHandler.bind(this));
	        return p;
	    },
	    pClickHandler: function(e) {
	        var me = e.target;
	        var countryData = {
	            user: localStorage.getItem('user'),
	            country: {country: me.innerText, latlng: this.findLatLng(me.innerText)}
	        };
	        this.page.request.do("POST", "country", this.page.updateDisplay, countryData, this.page);
	        document.getElementById('country-options').innerHTML = null;
	    },
	    findLatLng: function(countryName) {
	        var countryData = JSON.parse(localStorage.getItem('countryData'));
	        for (var i = 0; i < countryData.length; i++) {
	            if (countryData[i].name === countryName) {
	                return countryData[i].latlng;
	            }
	        }
	    }
	};
	
	module.exports = MainPage;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map