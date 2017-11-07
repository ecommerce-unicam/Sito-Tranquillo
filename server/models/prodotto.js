'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
    Schema del prodotto avente
        -nome
        -prezzo
        -giacenza
        -impegno in Carrelli
        -impegno in Pagamento
        -descrizione breve
        -descrizione lunga
*/
var ProdottoSchema = new Schema({
    nome: {
        type: String,
        required: [true, 'Inserisci un nome per il prodotto']
    },
    prezzo: {
        type: Number,
        required: [true, 'Inserisci un prezzo per il prodotto']
    },
    giacenza: {
        type: Number,
        default: 0,
        min: 0
    },
    descrizioneBreve: {
        type: String,
        required: [true, 'Inserisci una descrizione breve per il prodotto']
    },
    descrizioneLunga: {
        type: String,
        required: [true, 'Inserisci una descrizione lunga']
    },
    urlImmagine: {
        type: String,
        required: [true, 'Va necessariamente inserita un\'immagine']
    },
    specifiche: {
        peso: {
            type: Number,
            default: 0,
            min: 0
        },
        dimensioni: {
            lunghezza: {
                type: Number,
                default: 0,
                min: 0
            },
            larghezza: {
                type: Number,
                default: 0,
                min: 0
            },
            altezza: {
                type: Number,
                default: 0,
                min: 0
            }
        },
        colore: {
            type: String
        }
    }
});

module.exports = mongoose.model('Prodotto', ProdottoSchema, 'prodotti');