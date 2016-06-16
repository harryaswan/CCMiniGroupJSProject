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
