'use strict';
module.exports = function(app, db) {
    var apiBootstrap = require('../API/apiBootstrap.js');
    apiBootstrap.setDb(db);

    app.route('/api/v1.0/bootstrap')
        .get(apiBootstrap.checkPrimoAvvio)
        .post(apiBootstrap.creaPrimoAdmin)
};