
var main = function() {
    var user = localStorage.getItem('user');
    if (user) {
        displayPage('main.html', setupMain);
    } else {
        displayPage('login.html', setupLogin);
    }
    //check if logged in
        //if true - display main page
            //on display of main page - setup on type search
        //if false - display login page
            //on submit of login page set username in localstorage
            //display main page
};


var displayPage = function(pageUrl, callback) {
    console.log("here");
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
    var container = document.getElementById('content');
    container.innerHTML = data;

    var form = document.getElementById('user-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        var username = document.getElementById('user-input');
        localStorage.setItem('user', username);
        main();
    });

};


var setupMain = function(data) {
    var container = document.getElementById('content');
    container.innerHTML = data;

    var countryData = JSON.parse(localStorage.getItem('countryData'));

    console.log(countryData[0]);
    console.log(countryData[0].name);

    var searchBox = document.getElementById('country-search');
    searchBox.addEventListener('keyup', function(e) {
        var span = document.getElementById('country-options');
        span.innerHTML = null;
        for (var i = 0; i < countryData.length; i++) {
            console.log("s", searchBox.value);
            console.log("d", countryData[i].name);
            console.log(countryData[i].name.toLowerCase().indexOf(searchBox.value.toLowerCase()));
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

};

var createListOption = function(countryName) {
    var p = document.createElement('p');
    p.innerText = countryName;
    p.addEventListener('click', function(e) {

    });
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
