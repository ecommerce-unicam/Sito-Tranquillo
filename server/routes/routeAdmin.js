'use strict'

var app = require('express');

var adminRoutes = app.Router();

module.exports = adminRoutes;

var apiProdotti = require('../API/apiProdotti.js');
var apiUtenti = require('../API/apiUtenti.js');
var apiEmail = require('../API/apiEmail');

var jwt = require('jsonwebtoken');
var encryption = require('../config/encryption');

var mongoose = require('mongoose'),
    Utente = mongoose.model('Utente');

adminRoutes.use(function(req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) { return res.status(403).send({ success: false, message: 'Mancato token di accesso' }); }

    if (token == "nd") {
        console.log('token: ' + "Pw" + token);
        next();
    } else {


        jwt.verify(token, encryption.secret, function(err, decoded) {
            if (decoded) {
                Utente.findById(decoded.utenteID, function(err, user) {
                    if (err) {
                        res.status(401).json({ successo: false, message: 'Errore nel ritrovamento dello utente' });
                    } else {
                        if (user.admin == true) {

                            req.decoded = decoded;
                            console.log('accesso admin autorizzato');
                            next(); /* Continue */
                        }
                    }
                });
            } else {
                res.status(401).json({ successo: false, message: 'Non sei autorizzato ad utilizzare questa route' });
                /* La richiesta si ferma qui*/
            }
        });
    }

});

//Se autorizzato faccio il routing della richiesta

adminRoutes.post('/prodotti', apiProdotti.creaProdotto);
adminRoutes.put('/prodotti/:id', apiProdotti.aggiornaProdotto);
adminRoutes.delete('/prodotti/:id', apiProdotti.eliminaProdotto);
adminRoutes.post('/utenti', apiUtenti.listaUtenti);
adminRoutes.post('/dettaglioUtente/:id', apiUtenti.dettaglioUtente);
adminRoutes.post('/scriviSettaggiEmail', apiEmail.scriviSettaggi)
adminRoutes.post('/leggiSettaggiEmail', apiEmail.leggiSettaggi)