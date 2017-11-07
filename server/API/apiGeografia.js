'use strict';

// Importo funzioni utili in generale
var utilities = require('../utilities/utilities');

var province = require('../utilities/province');
var stati = require('../utilities/stati');

/*
    Restituisce tutta la lista delle province dal json
*/
exports.listaProvince = function(req, res) {
    console.log("GET province");

    res.status(200).json(province.lista);

};

/*
    Restituisce tutta la lista degli stati dal json
*/
exports.listaStati = function(req, res) {
    console.log("GET stati");

    res.status(200).json(stati.lista);

};