'use strict';

var multer = require('multer');
var fs = require('fs');
// Importo funzioni utili in generale
var utilities = require('../utilities/utilities');
/**
 * Parametro che indica il percorso in cui 
 * verranno caricate le immagini
 */
var PERCORSO_UPLOADS = './app/images/uploads/';
var PERCORSO_COPERTINA = './app/images/';

// Impostazioni per multer (immagini prodotti)
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, PERCORSO_UPLOADS)
    },
    filename: function(req, file, cb) {
        var datetimestamp = Date.now();
        // qui sotto il codice per salvare correttamente il file
        // ci attacco un timestamp così non ci sono duplicati
        // lo split serve perché normalmente multer salverebbe senza estenzione
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
});
// istanza di multer con le opzioni appena specificate
var upload = multer({
    storage: storage
}).single('file');

// Impostazioni per multer (immagini prodotti)
var storageCopertina = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, PERCORSO_COPERTINA)
    },
    filename: function(req, file, cb) {
        cb(null, 'store1.jpg')
    }
});
// istanza di multer con le opzioni appena specificate per l'immagine di copertina
var uploadCopertina = multer({
    storage: storageCopertina
}).single('file');

/*
    Carica un'immagine nella cartella specificata dal parametro presente in questo file
*/
exports.caricaImmagine = function(req, res) {
    console.log("UPLOAD TRAMITE POST immagine");
    // API per l'upload
    upload(req, res, function(err) {
        if (err) {
            // ERRORE
            utilities.handleError(res, err.code, err.Error, '500');
            //res.json({ error_code: 1, err_desc: err });
        } else
            res.json({ error_code: 0, err_desc: null, nomeFile: req.file.filename });
    });
};

/*
    Carica un'immagine nella cartella specificata dal parametro presente in questo file
*/
exports.caricaImmagineCopertina = function(req, res) {
    console.log("UPLOAD TRAMITE POST immagine di copertina");
    // API per l'upload
    uploadCopertina(req, res, function(err) {
        if (err) {
            // ERRORE
            utilities.handleError(res, err.code, err.Error, '500');
            //res.json({ error_code: 1, err_desc: err });
        } else
            res.json({ error_code: 0, err_desc: null });
    });
};

/*
    Restituisce l'immagine di cui viene passato il nome
*/
exports.getImmagine = function(req, res) {
    console.log('GET immagine');
    fs.stat(PERCORSO_UPLOADS + req.params.nome, function(err, stat) {
        if (err == null) {
            console.log('File exists');
            res.json({ nomeFile: req.params.nome });
        } else {
            // ERRORE
            utilities.handleError(res, err.code, err.Error, '500');
            //res.json({ error: 1, error_message: 'Errore sconosciuto', nomeFile: req.params.nome });
        }
    });
};
/*
    Restituisce l'immagine di cui viene passato il nome
*/
exports.getImmagineCopertina = function(req, res) {
    console.log('GET immagine');
    fs.stat(PERCORSO_COPERTINA + req.params.nome, function(err, stat) {
        if (err == null) {
            console.log('File exists');
            res.json({ nomeFile: req.params.nome });
        } else {
            // ERRORE
            utilities.handleError(res, err.code, err.Error, '500');
            //res.json({ error: 1, error_message: 'Errore sconosciuto', nomeFile: req.params.nome });
        }
    });
};

/*
    Elimina l'immagine di cui viene passato il nome
*/
exports.eliminaImmagine = function(req, res) {
    console.log('ELIMINA IMMAGINE');
    // dò per scontato che esiste
    fs.unlink(PERCORSO_UPLOADS + req.params.nome, function(err) {
        if (err == null)
        // il file esiste, l'ho già eliminato, ritorno un json per confermare
            res.json({ nomeFile: req.params.nome });
        else {
            // ERRORE
            utilities.handleError(res, err.code, err.Error, '500');
            // res.json({ error: 1, error_message: 'Errore sconosciuto', nomeFile: req.params.nome });
        }

    });
};

/*
    Elimina l'immagine di copertina
*/
exports.eliminaImmagineCopertina = function(req, res) {
    console.log('ELIMINA IMMAGINE COPERTINA');
    // dò per scontato che esiste
    fs.unlink(PERCORSO_COPERTINA + 'store1.jpg', function(err) {
        if (err == null)
        // il file esiste, l'ho già eliminato, ritorno un json per confermare
            res.json({ nomeFile: req.params.nome });
        else {
            // ERRORE
            utilities.handleError(res, err.code, err.Error, '500');
            // res.json({ error: 1, error_message: 'Errore sconosciuto', nomeFile: req.params.nome });
        }

    });
};