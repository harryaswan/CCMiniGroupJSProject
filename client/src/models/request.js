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
