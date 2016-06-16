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
