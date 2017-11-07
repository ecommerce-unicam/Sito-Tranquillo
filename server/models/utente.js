'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
    Schema per gli utenti con:
        -nome
        -email
        -password criptata con bcryptjs
        -domanda segreta
        -risposta cryptata con bcryptjs
*/
var UtenteSchema = new Schema({
    nome: {
        type: String,
        required: [true, 'Inserisci un nome']
    },
    cognome: {
        type: String,
        required: [true, 'Inserisci un cognome']
    },
    username: {
        type: String,
        required: [true, 'Inserisci un nome utente']
    },
    stato: {
        type: String,
        required: [true, 'Inserisci uno Stato']
    },
    provincia: {
        type: String
    },
    comune: {
        type: String
    },
    indirizzo: {
        type: String,
        required: [true, 'Inserisci un indirizzo']
    },
    telefono: {
        type: String,
        required: [true, 'Inserisci un numero']
    },
    email: {
        type: String,
        validate: {
            validator: function(v) {
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
            },
            message: 'Email non valida'
        },
        required: [true, 'Inserisci una email valida']
    },
    password_hash: {
        type: String,
        required: [true, 'Inserisci una password']
    },
    domanda_segreta: {
        type: String,
        required: [true, 'Inserisci una domanda segreta']
    },
    risposta_segreta_hash: {
        type: String,
        required: [true, 'Inserisci una risposta segreta']
    },
    carrello: {
        prodotti: [{ // Array
            quantita: Number
        }]
    },
    storia_acquisti: {
        acquisti: [{ // Array
            data_acquisto: Date,
            prodotti: [{
                nome: String,
                prezzo: Number,
                quantita: Number,
                urlImmagine: String
            }]
        }]
    },
    scadenzaRecupero: {
        type: Date
    },
    tokenRecupero: {
        type: String
    },
    admin: {
        type: Boolean,
        default: false
    },
    prodotti_preferiti: [Schema.Types.ObjectId]

});
module.exports = mongoose.model('Utente', UtenteSchema, 'utenti');