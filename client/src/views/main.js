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
