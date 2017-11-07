'use strict';
module.exports = function(app, db) {
    var apiProdotti = require('../API/apiProdotti.js');
    apiProdotti.setDb(db);
    
    app.route('/api/v1.0/prodotti')
        .get(apiProdotti.listaProdotti);


    app.route('/api/v1.0/prodotti/:id')
        .get(apiProdotti.dettagliProdotto);
};