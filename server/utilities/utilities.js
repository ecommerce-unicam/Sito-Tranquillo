var mailer = require("./mailer");

var mongoose = require('mongoose'),
    Utente = mongoose.model('Utente');

exports.handleError = function(res, ragione, messaggio, codice) {
    console.log("ERRORE: " + ragione);
    res.status(codice || 500).json({ "errore": messaggio, 'successo': false });
}
exports.notificaAdminProdottoEsaurito = function(nomeprodotto, idprodotto) {
    var oggetto = "!!!Prodotto: " + nomeprodotto + " in esaurimento !!!";
    var messaggio = "<p> Il prodotto : " + nomeprodotto + " con id: " + idprodotto.toString() + " </p><p>è in esaurimento, riordinatelo al più presto </p>";

    Utente.find({ admin: true }, function(err, admins) { // Tiene conto che possano esserci più admin e quindi lo invia ad ognuno di essi.
        if (err) {
            console.log("errore nella notifica dei prodotti esauriti");
        } else {
            for (var i = 0; i < admins.length; i++) {
                mailer.inviaEmail('dummy', 'dummy', admins[i].email, oggetto, messaggio);
            }

        }
    });
};
exports.notificaUserProdottoTornato = function(nomeprodotto, idprodotto) {
    Utente.find({ "prodotti_preferiti": { "$eq": idprodotto } }, function(err, users) { // Tiene conto che possano esserci più admin e quindi lo invia ad ognuno di essi.
        if (err) {
            console.log("errore nella notifica dei prodotti ritornati");
        } else {
            for (var i = 0; i < users.length; i++) {
                var oggetto = users[i].nome + ", il prodotto " + nomeprodotto + " è di nuovo disponibile!";
                var messaggio = "<p>Ciao " + users[i].nome + ", il prodotto " + nomeprodotto +
                    ' è di nuovo disponibile, corri a comprarlo!</p>';
                mailer.inviaEmail('dummy', 'dummy', users[i].email, oggetto, messaggio);
            }

        }
    });
}