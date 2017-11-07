/*
UTILIZZO DEL MODULO:
var mailer = require('percorso/per/questoFile.js');
mailer.inviaEmail(nome, cognome, emailDestinatario, oggetto, corpoInHtml);

OPPURE

mailer.inviaEmail(opzioniEmail);

dove opzioniEmail è un oggetto JSON formato così:
{
    from: '"Nome Visualizzato" <mail@example.com>', // mail del mittente
    to: 'info@contoso.com', // email destinatario, eventualmente può essere una lista con elementi separati da virgole
    subject: 'Oggetto', // l'oggetto dell'email
    text: 'Ciao', // email solo testo
    html: '<h3>Ciao</h3>' // email HTML
    }

L'indirizzo email usato per l'invio nel primo caso è quello del gruppo dei developer (creato ad hoc per il progetto) , ovvero
mail.sitotranquillo@gmail.com
Eventualmente basta cambiare i settaggi nel transporter

Un futuro lavoro potrebbe essere quello di fare in modo che anche il
transporter sia settabile a piacimento dall'applicazione stessa

*/
'use strict';
const nodemailer = require('nodemailer');
var jsonfile = require('jsonfile')
var file = './server/config/mailSettings.json';
var fs = require('fs');
var transporter;

//var passwords = require('../config/passwords');
var scriviFileDummy = function() {
    var settaggi = {
        host: 'smtp.example.org',
        port: 465,
        secure: 'true',
        user: 'user@example.org',
        pass: 'passwordExample'
    };
    // scrivo il file dummy
    jsonfile.writeFileSync(file, settaggi);
    return settaggi;

};
var impostaTransporter = function() {
    var settaggi = leggiPrivate();
    // svuoto il vecchio transporter e lo ricreo
    transporter = null;
    transporter = nodemailer.createTransport({
        host: settaggi.host,
        port: settaggi.port,
        secure: settaggi.secure,
        auth: {
            user: settaggi.user,
            pass: settaggi.pass
        }
    });
    console.log('transporter impostato');
}
var leggiPrivate = function() {
    if (fs.existsSync(file)) {
        console.log('File exists');
        return jsonfile.readFileSync(file)
    } else {
        // file does not exist
        return scriviFileDummy();
    }
}

exports.leggiSettaggi = function() {
    console.log('chiamata dalla api al mailer')
    if (fs.existsSync(file)) {
        console.log('File exists');
        return jsonfile.readFileSync(file)
    } else {
        // file does not exist
        return scriviFileDummy();
    }
}
exports.scriviSettaggi = function(obj) {
    // se non ci sono settaggi li creo dummy
    if (obj === null)
        scriviFileDummy()
    else jsonfile.writeFile(file, obj, function(err) {
        if (err) return console.log('ERRORE NELLA SCRITTURA DEI SETTAGGI EMAIL');
        impostaTransporter();
    });

}
exports.inviaEmail = function(opzioniEmail) {
    if (transporter === null || transporter === undefined) {
        // lo popolo al volo
        impostaTransporter();
    }
    transporter.sendMail(opzioniEmail, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    })
}
exports.inviaEmail = function(nome, cognome, emailDestinatario, oggetto, corpoInHtml) {
    /*
    FORMA JSON DELLE OPZIONI:
    {
    from: '"Fred Foo 👻" <foo@blurdybloop.com>', // indirizzo mittente
    to: 'bar@blurdybloop.com, baz@blurdybloop.com', // lista riceventi
    subject: 'Hello ✔', // Intestazione
    text: 'Hello world ?', // email con testo normale
    html: '<b>Hello world ?</b>' // email con testo in html
    }
    */
    if (transporter === null || transporter === undefined) {
        // lo popolo al volo
        impostaTransporter();
    }
    var opzioniEmail = {
        from: '"Sito Tranquillo" <mail.sitotranquillo@gmail.com>',
        to: emailDestinatario,
        subject: oggetto,
        html: corpoInHtml
    }
    transporter.sendMail(opzioniEmail, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    })
}