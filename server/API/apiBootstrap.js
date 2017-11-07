'use strict';
/**
 * Collezione dei prodotti
 */
var UTENTI = 'utenti';


var mongoose = require('mongoose');
var fs = require('fs');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var encryption = require('../config/encryption');

/**
 * Modello mongoose del prodotto
 */
var Utente = mongoose.model('Utente');

// Importo funzioni utili in generale
var utilities = require('../utilities/utilities');

/**
 * Fa riferimento al Database
 */
var db;
exports.setDb = function(extdb) {
    db = extdb;
};


exports.checkPrimoAvvio = function(req, res) {
    if (fs.existsSync('./server/primoAvvio.txt')) {
        res.status(200).json({ primoAvvio: true });
    } else res.status(200).json({ primoAvvio: false });
}
exports.creaPrimoAdmin = function(req, res) {
    if (!fs.existsSync('./server/primoAvvio.txt')) {
        return utilities.handleError(res, 'ERR_NO_PRIMO_AVVIO', 'Questo non è il primo avvio', 403);
    }
    var password_hash;
    var risposta_segreta_hash;

    bcrypt.hash(req.body.password, encryption.saltrounds)
        .then(function(pass_hash) { // Creo l'hash della password
            password_hash = pass_hash;
            bcrypt.hash(req.body.risposta_segreta, encryption.saltrounds)
                .then(function(risp_hash) { // Creo l'hash della risposta
                    risposta_segreta_hash = risp_hash;

                    // creo un utente in base al modello
                    var nuovoUtente = new Utente({
                        nome: req.body.nome,
                        cognome: req.body.cognome,
                        username: req.body.username,
                        stato: req.body.stato,
                        provincia: req.body.provincia,
                        comune: req.body.comune,
                        indirizzo: req.body.indirizzo,
                        telefono: req.body.telefono,
                        email: req.body.email,
                        password_hash: password_hash,
                        domanda_segreta: req.body.domanda_segreta,
                        risposta_segreta_hash: risposta_segreta_hash,
                        //unica modifica fatta forzosamente
                        admin: true
                    });

                    // salvo l'utente nel database
                    nuovoUtente.save(function(err) {
                        if (err)
                            return utilities.handleError(res, err, "I valori non hanno superato la validazione del server");
                        else {
                            // elimino il file che permette il primo avvio
                            fs.unlinkSync('./server/primoAvvio.txt');
                            res.status(201).json({ 'utenteID': nuovoUtente._id, 'successo': true });
                        }
                    });
                })
                .catch(function(err) {
                    return utilities.handleError(res, err, "Errore riscontrato durante l'hashing della risposta segreta");
                });
        }).catch(function(err) {
            return utilities.handleError(res, err, "Errore riscontrato durante l'hashing della password dell'utente");
        });

}