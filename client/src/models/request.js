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
