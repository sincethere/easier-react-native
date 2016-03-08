'use strict';

module.exports = {
    /**
     * options {url:'http://www.baidu.com', type:'POST', headers:{}, data:{}, dataType:'json', success: function(data, headers){}, error: function(status, data, headers){}, networkError: function() {}}
     */
    request(options) => {
        var fetchOptions = {
            method: options.method,
            headers: options.headers,
        };
        if(options.method != 'GET'){
            fetchOptions.body = options.body;
        }
        fetch(options.url, fetchOptions)
            .then((response) => {
                if (response.status == 200) {
                    response.json().then((data) => {
                        options.success(data, response.headers);
                    });
                } else {
                    options.error(response.status);
                }
            })
            .catch((err) => {
                options.networkError(err);
            })
            .done();
    }
};
