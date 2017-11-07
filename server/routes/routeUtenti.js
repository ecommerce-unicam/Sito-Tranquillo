'use strict';
module.exports = function(app, db) {
    var apiUtenti = require('../API/apiUtenti.js');
    apiUtenti.setDb(db);

    // Api degli utenti
    app.route('/api/v1.0/utenti/registrazione')
        .post(apiUtenti.registraUtente);

    app.route('/api/v1.0/utenti/login')
        .post(apiUtenti.loginUtente);

    app.route('/api/v1.0/utenti/resetpw/')
        .post(apiUtenti.resetPassword);

    app.route('/api/v1.0/utenti/richiestarecuperopw')
        .post(apiUtenti.richiestaRecuperoPassword);

    app.route('/api/v1.0/utenti/aggiungialcarrello')
        .post(apiUtenti.aggiungiAlCarrello);

    app.route('/api/v1.0/utenti/rimuovidalcarrello')
        .post(apiUtenti.rimuoviDalCarrello);

    app.route('/api/v1.0/utenti/impostaNelCarrello')
        .post(apiUtenti.impostaNelCarrello);

    app.route('/api/v1.0/utenti/validaToken')
        .post(apiUtenti.validaToken);

    app.route('/api/v1.0/utenti/validaRisposta')
        .post(apiUtenti.validaRispostaSegreta);

    app.route('/api/v1.0/utenti/get')
        .post(apiUtenti.getUtente);

    app.route('/api/v1.0/utenti/aggiorna')
        .put(apiUtenti.aggiornaUtente);

    app.route('/api/v1.0/utenti/elimina')
        .post(apiUtenti.eliminaUtente);

    app.route('/api/v1.0/utenti/acquistaProdottiNelCarrello')
        .post(apiUtenti.acquistaProdottiNelCarrello);
        
    app.route('/api/v1.0/utenti/getCarrello')
        .post(apiUtenti.getCarrello);

    app.route('/api/v1.0/utenti/isAdmin')
        .post(apiUtenti.isAdmin);

    app.route('/api/v1.0/utenti/controllaToken')
        .post(apiUtenti.controllaToken);

    app.route('/api/v1.0/utenti/getStoriaAcquisti')
        .post(apiUtenti.getStoriaAcquisti);
};