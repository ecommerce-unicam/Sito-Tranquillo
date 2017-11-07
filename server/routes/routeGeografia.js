'use strict';
module.exports = function(app) {
    var apiGeografia = require('../API/apiGeografia.js');

    app.route('/api/v1.0/province')
        .get(apiGeografia.listaProvince);
    app.route('/api/v1.0/stati')
        .get(apiGeografia.listaStati);
};