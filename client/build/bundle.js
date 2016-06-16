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
	    console.log('mc', page.mainCallback);
	    var user = localStorage.getItem('user');
	    var log = document.getElementById('login');
	
	    request.grabCountryData();
	    page.decide(user, log);
	};
	//
	// var updateDisplay = function() {
	//     if (map) {
	//         map.clearMarkers();
	//     } else {
	//         map = new Map(document.getElementById("map"));
	//     }
	//     var curCountries = document.getElementById('current-countries');
	//     curCountries.innerHTML = "";
	//     document.getElementById('country-search').value = null;
	//     var request = new XMLHttpRequest();
	//     request.open('POST', "");
	//     request.setRequestHeader('Content-Type', 'application/json');
	//     request.onload = function() {
	//         if (request.status === 200) {
	//             var d = JSON.parse(request.responseText);
	//             var data = d[0];
	//             if (data) {
	//                 for (var i = 0; i < data.countries.length; i++) {
	//                     var latlng = {lat:data.countries[i].latlng[0], lng:data.countries[i].latlng[1]};
	//                     map.addMarker(latlng, data.countries[i].country);
	//
	//                     var li = document.createElement('li');
	//                     li.innerText = data.countries[i].country;
	//
	//                     var del = document.createElement('b');
	//                     del.innerText = "X";
	//                     del.addEventListener('click', deleteCountry);
	//
	//                     li.appendChild(del);
	//                     curCountries.appendChild(li);
	//
	//                 }
	//             }
	//         }
	//     };
	//     request.send(JSON.stringify({user: localStorage.getItem("user")}));
	// };
	//
	// var deleteCountry = function(e) {
	//     var country = e.target.parentNode.childNodes[0].nodeValue;
	//
	//     var request = new XMLHttpRequest();
	//     request.open('DELETE', 'country');
	//     request.setRequestHeader('Content-Type', 'application/json');
	//     request.onload = function() {
	//         if (request.status === 200) {
	//             updateDisplay();
	//         }
	//     };
	//     request.send(JSON.stringify({user: localStorage.getItem("user"), country: country}));
	//
	//
	// };
	//
	//
	// var displayPage = function(pageUrl, callback) {
	//     var request = new XMLHttpRequest();
	//     request.open('GET', pageUrl);
	//     request.onload = function() {
	//         if (request.status === 200) {
	//             callback(request.responseText);
	//         }
	//     };
	//     request.send(null);
	// };
	//
	//
	// var setupLogin = function(data) {
	//     document.getElementById('content').innerHTML = data;
	//
	//     var form = document.getElementById('user-form');
	//     form.addEventListener('submit', function(e) {
	//         e.preventDefault();
	//         var username = document.getElementById('user-input').value;
	//         localStorage.setItem('user', username.toLowerCase());
	//         main();
	//     });
	//
	// };
	//
	// var clearElement = function(elementName) {
	//     document.getElementById(elementName).innerHTML = null;
	// };
	//
	// var setupMain = function(data) {
	//     document.getElementById('content').innerHTML = data;
	//
	//     var countryData = JSON.parse(localStorage.getItem('countryData'));
	//     var searchBox = document.getElementById('country-search');
	//
	//     searchBox.addEventListener('keyup', function(e) {
	//         var span = document.getElementById('country-options');
	//         span.innerHTML = null;
	//         for (var i = 0; i < countryData.length; i++) {
	//             if (countryData[i].name.toLowerCase().indexOf(searchBox.value.toLowerCase()) > -1) {
	//                 span.appendChild(createListOption(countryData[i].name));
	//             }
	//         }
	//         if (span.childNodes.length === 0) {
	//             var p = document.createElement('p');
	//             p.innerText = "Sorry no results...";
	//             span.appendChild(p);
	//         }
	//     });
	//
	//     updateDisplay();
	//
	// };
	//
	// var createListOption = function(countryName) {
	//     var p = document.createElement('p');
	//     p.innerText = countryName;
	//     p.addEventListener('click', pClickHandler);
	//     return p;
	// };
	//
	// var pClickHandler = function(e) {
	//     var me = e.target;
	//     var request = new XMLHttpRequest();
	//     request.open('POST', "country");
	//     request.setRequestHeader('Content-Type', 'application/json');
	//     request.onload = function() {
	//         if (request.status === 200) {
	//             updateDisplay();
	//         }
	//     };
	//     var test = {
	//         user: localStorage.getItem('user'),
	//         country: {country: me.innerText, latlng: findLatLng(me.innerText)}
	//     };
	//     request.send(JSON.stringify(test));
	//
	//     clearElement('country-options');
	//
	// };
	//
	// var findLatLng = function(countryName) {
	//     var countryData = JSON.parse(localStorage.getItem('countryData'));
	//     for (var i = 0; i < countryData.length; i++) {
	//         if (countryData[i].name === countryName) {
	//             return countryData[i].latlng;
	//         }
	//     }
	// };
	//
	// var grabCountryData = function() {
	//     if (!localStorage.getItem('countryData')) {
	//         var request = new XMLHttpRequest();
	//         request.open('GET', "http://restcountries.eu/rest/v1/all");
	//         request.onload = function() {
	//             if (request.status === 200) {
	//                 localStorage.setItem('countryData', JSON.stringify(JSON.parse(request.responseText)));
	//             }
	//         };
	//         request.send(null);
	//     }
	// };
	
	
	
	window.onload = main;


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
	    this.test = "hello";
	};
	
	Request.prototype = {
	    do: function(type, url, callback, dataToSend) {
	        console.log(this.test);
	        var request = new XMLHttpRequest();
	        request.open(type, url);
	        if (type != "GET") {
	            request.setRequestHeader('Content-Type', 'application/json');
	        }
	        request.onload = function() {
	            if (request.status === 200) {
	                console.log('r',this);
	                callback(request.responseText);
	            }
	        };
	        if (dataToSend) {
	            dataToSend = JSON.stringify(dataToSend);
	        } else {
	            dataToSend = null;
	        }
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map