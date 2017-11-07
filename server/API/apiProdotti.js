'use strict';
/**
 * Collezione dei prodotti
 */
var PRODOTTI = 'prodotti';


var mongoose = require('mongoose');

/**
 * Modello mongoose del prodotto
 */
var Prodotto = mongoose.model('Prodotto');

// Importo funzioni utili in generale
var utilities = require('../utilities/utilities');

/**
 * Fa riferimento al Database
 */
var db;
exports.setDb = function(extdb) {
    db = extdb;
};


/*
    Restituisce tutta la lista dei prodotti dal database
    se c'è un errore richiama la funzione utilities.handleError(...)
    altrimenti invia il risultato tramite JSON
*/
exports.listaProdotti = function(req, res) {
    console.log("GET prodotti");
    db.collection(PRODOTTI).find({}).toArray(function(err, docs) {
        if (err) {
            utilities.handleError(res, err.message, "Operazione di recupero dei prodotti fallita.");
        } else {
            res.status(200).json(docs);
        }
    });
};

/*
    Crea un nuovo prodotto prendendo le informazioni dal Body
    e salvalo nel DB
*/
exports.creaProdotto = function(req, res) {
    console.log("POST prodotti");
    console.log(req.body);
    //var nuovoProdotto = req.body;
    var nuovoProdotto = new Prodotto({
        nome: req.body.nome,
        prezzo: req.body.prezzo,
        giacenza: req.body.giacenza,
        impegnoInCarrelli: req.body.impegnoInCarrelli,
        impegnoInPagamento: req.body.impegnoInPagamento,
        descrizioneBreve: req.body.descrizioneBreve,
        descrizioneLunga: req.body.descrizioneLunga,
        urlImmagine: req.body.urlImmagine,
        specifiche: req.body.specifiche
    });

    nuovoProdotto.save(function(err) {
        if (err) return utilities.handleError(res, err, 'Errore durante il salvataggio del nuovo prodotto');
        // saved!
        else {
            res.status(201).json(nuovoProdotto);
        }
    });
};

/*
    Informazioni del prodotto
    Restituisci un determinato prodotto avente un determinato "id"
*/
exports.dettagliProdotto = function(req, res) {
    console.log("GET prodotto con id", req.params.id);
    Prodotto.findById(req.params.id, function(err, prodottoTrovato) {
        if (err) {
            utilities.handleError(res, err.message, "Operazione di recupero del prodotto fallita, id prodotto " + req.params.id);
        } else {
            res.status(200).json(prodottoTrovato);
        }
    });
};

/*
    Aggiorna il prodotto (trovato attraverso il suo ID) con
    nuove informazioni
*/
exports.aggiornaProdotto = function(req, res) {
    console.log("PUT prodotto con id", req.params.id);
    var updateDoc = req.body;
    delete updateDoc._id;

    Prodotto.findById(req.params.id, function(err, prodottoTrovato) {
        if (err) {
            utilities.handleError(res, err.message, "Operazione di recupero del prodotto fallita, id prodotto " + req.params.id);
        } else {
            if (prodottoTrovato.giacenza === 0 && updateDoc.giacenza > 0) utilities.notificaUserProdottoTornato(updateDoc.nome, req.params.id);
            // so che il prodotto che mi arriva è completo di tutti i campi richiesti
            prodottoTrovato.nome = updateDoc.nome;
            prodottoTrovato.prezzo = updateDoc.prezzo;
            prodottoTrovato.giacenza = updateDoc.giacenza;
            prodottoTrovato.descrizioneBreve = updateDoc.descrizioneBreve;
            prodottoTrovato.descrizioneLunga = updateDoc.descrizioneLunga;
            prodottoTrovato.urlImmagine = updateDoc.urlImmagine;
            prodottoTrovato.specifiche = updateDoc.specifiche;
            prodottoTrovato.save(function(error) {
                if (error) utilities.handleError(res, error, 'Errore nell\'aggiornamento del prodotto');
                else res.status(200).json(prodottoTrovato);
            })
        }
    });
};

/*
    Elimina un prodotto trovato attraverso il suo ID
*/
exports.eliminaProdotto = function(req, res) {
    console.log("DELETE prodotto con id", req.params.id);
    db.collection(PRODOTTI).deleteOne({ _id: mongoose.Types.ObjectId(req.params.id) }, function(err, result) {
        if (err) {
            utilities.handleError(res, err.message, "Operazione di rimozione del prodotto fallita, id prodotto " + req.params.id);
        } else {
            res.status(200).json(req.params.id);
        }
    });
};