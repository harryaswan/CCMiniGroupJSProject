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

	var Map = __webpack_require__(1);
	var Request = __webpack_require__(2);
	
	var map = null;
	
	var main = function() {
	    var user = localStorage.getItem('user');
	    var log = document.getElementById('login');
	    if (user) {
	        displayPage('main.html', setupMain);
	        log.innerText = "Logout";
	        log.addEventListener('click', function(e) {
	            e.preventDefault();
	            localStorage.removeItem('user');
	            map = null;
	            main();
	        });
	    } else {
	        displayPage('login.html', setupLogin);
	        log.innerText = null;
	    }
	};
	
	var updateDisplay = function() {
	    if (map) {
	        map.clearMarkers();
	    } else {
	        map = new Map(document.getElementById("map"));
	    }
	    var curCountries = document.getElementById('current-countries');
	    curCountries.innerHTML = "";
	    document.getElementById('country-search').value = null;
	    var request = new XMLHttpRequest();
	    request.open('POST', "");
	    request.setRequestHeader('Content-Type', 'application/json');
	    request.onload = function() {
	        if (request.status === 200) {
	            var d = JSON.parse(request.responseText);
	            var data = d[0];
	            if (data) {
	                for (var i = 0; i < data.countries.length; i++) {
	                    var latlng = {lat:data.countries[i].latlng[0], lng:data.countries[i].latlng[1]};
	                    map.addMarker(latlng, data.countries[i].country);
	
	                    var li = document.createElement('li');
	                    li.innerText = data.countries[i].country;
	
	                    var del = document.createElement('b');
	                    del.innerText = "X";
	                    del.addEventListener('click', deleteCountry);
	
	                    li.appendChild(del);
	                    curCountries.appendChild(li);
	
	                }
	            }
	        }
	    };
	    request.send(JSON.stringify({user: localStorage.getItem("user")}));
	};
	
	var deleteCountry = function(e) {
	    var country = e.target.parentNode.childNodes[0].nodeValue;
	
	    var request = new XMLHttpRequest();
	    request.open('DELETE', 'country');
	    request.setRequestHeader('Content-Type', 'application/json');
	    request.onload = function() {
	        if (request.status === 200) {
	            updateDisplay();
	        }
	    };
	    request.send(JSON.stringify({user: localStorage.getItem("user"), country: country}));
	
	
	};
	
	
	var displayPage = function(pageUrl, callback) {
	    var request = new XMLHttpRequest();
	    request.open('GET', pageUrl);
	    request.onload = function() {
	        if (request.status === 200) {
	            callback(request.responseText);
	        }
	    };
	    request.send(null);
	};
	
	
	var setupLogin = function(data) {
	    document.getElementById('content').innerHTML = data;
	
	    var form = document.getElementById('user-form');
	    form.addEventListener('submit', function(e) {
	        e.preventDefault();
	        var username = document.getElementById('user-input').value;
	        localStorage.setItem('user', username.toLowerCase());
	        main();
	    });
	
	};
	
	var clearElement = function(elementName) {
	    document.getElementById(elementName).innerHTML = null;
	};
	
	var setupMain = function(data) {
	    document.getElementById('content').innerHTML = data;
	
	    var countryData = JSON.parse(localStorage.getItem('countryData'));
	    var searchBox = document.getElementById('country-search');
	
	    searchBox.addEventListener('keyup', function(e) {
	        var span = document.getElementById('country-options');
	        span.innerHTML = null;
	        for (var i = 0; i < countryData.length; i++) {
	            if (countryData[i].name.toLowerCase().indexOf(searchBox.value.toLowerCase()) > -1) {
	                span.appendChild(createListOption(countryData[i].name));
	            }
	        }
	        if (span.childNodes.length === 0) {
	            var p = document.createElement('p');
	            p.innerText = "Sorry no results...";
	            span.appendChild(p);
	        }
	    });
	
	    updateDisplay();
	
	};
	
	var createListOption = function(countryName) {
	    var p = document.createElement('p');
	    p.innerText = countryName;
	    p.addEventListener('click', pClickHandler);
	    return p;
	};
	
	var pClickHandler = function(e) {
	    var me = e.target;
	    var request = new XMLHttpRequest();
	    request.open('POST', "country");
	    request.setRequestHeader('Content-Type', 'application/json');
	    request.onload = function() {
	        if (request.status === 200) {
	            updateDisplay();
	        }
	    };
	    var test = {
	        user: localStorage.getItem('user'),
	        country: {country: me.innerText, latlng: findLatLng(me.innerText)}
	    };
	    request.send(JSON.stringify(test));
	
	    clearElement('country-options');
	
	};
	
	var findLatLng = function(countryName) {
	    var countryData = JSON.parse(localStorage.getItem('countryData'));
	    for (var i = 0; i < countryData.length; i++) {
	        if (countryData[i].name === countryName) {
	            return countryData[i].latlng;
	        }
	    }
	};
	
	var grabCountryData = function() {
	    if (!localStorage.getItem('countryData')) {
	        var request = new XMLHttpRequest();
	        request.open('GET', "http://restcountries.eu/rest/v1/all");
	        request.onload = function() {
	            if (request.status === 200) {
	                localStorage.setItem('countryData', JSON.stringify(JSON.parse(request.responseText)));
	            }
	        };
	        request.send(null);
	    }
	};
	
	
	
	window.onload = function() {
	    grabCountryData();
	    main();
	};


/***/ },
/* 1 */
/***/ function(module, exports) {

	var Map = function (container){
	    this.map = new google.maps.Map(container, {center: {lat: 4, lng: 4}, zoom: 1});
	    this.markers = [];
	    this.infowindows = [];
	
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
	            console.log('m', this.markers[i]);
	            this.markers[i].setMap(null);
	        }
	        this.markers = [];
	    }
	
	
	
	};
	
	module.exports = Map;


/***/ },
/* 2 */
/***/ function(module, exports) {

	var Request = function() {
	    // body...
	};
	
	Request.prototype = {
	    do: function(type, url, callback) {
	        var request = new XMLHttpRequest();
	        request.open(type, url);
	        request.onload = function() {
	            if (request.status === 200) {
	                callback(request.responseText);
	            }
	        };
	        request.send(null);
	    }
	};
	
	
	module.exports = Request;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map