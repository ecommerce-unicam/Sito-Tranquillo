'use strict';

// Importo funzioni utili in generale
var utilities = require('../utilities/utilities');
var mailer = require('../utilities/mailer');

exports.leggiSettaggi = function(req, res) {
    console.log('GET Settaggi email')
    var obj = mailer.leggiSettaggi();
    if (obj === null || obj === undefined) return utilities.handleError(res, 'ERR_LETTURASETTAGGI_EMAIL', 'Errore sconosciuto nella lettura dei settaggi');
    return res.status(200).json({ successo: true, host: obj.host, port: obj.port, secure: obj.secure, user: obj.user });


}
exports.scriviSettaggi = function(req, res) {
    console.log('POST Settaggi email')
    var obj = req.body;
    if (req.body.host === '' || req.body.host === undefined ||
        req.body.port === '' || req.body.port === undefined ||
        req.body.secure === '' || req.body.secure === undefined ||
        req.body.user === '' || req.body.user === undefined ||
        req.body.pass === '' || req.body.pass === undefined) return utilities.handleError(res, 'ERR_SETTAGGI_EMAIL', 'Mancano alcuni parametri.');

    mailer.scriviSettaggi({
        host: req.body.host,
        port: req.body.port,
        secure: req.body.secure,
        user: req.body.user,
        pass: req.body.pass
    });
    return res.status(200).json({ successo: true });

}