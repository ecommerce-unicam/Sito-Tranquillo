# Sito Tranquillo
E-commerce specializzato nella vendita di estrattori di succo di tutti i tipi, approvato dall'Associazione Mamme italiane.

Un bel giorno la mamma di Corrado gli manda un messaggio vocale su Whatsapp, chiedendogli di cercare un sito tranquillo che venda estrattori economici. Eccolo.

## Live demo
[Link all'app deployata su Heroku](https://sito-tranquillo-develop.herokuapp.com)

## Presentazione video
[Link al video su Youtube](https://www.youtube.com/watch?v=0JMlL2yl6KE)

## User story implementate
### Basilari
* Come admin voglio poter accedere ad un’area privata tramite username e password
* Come admin voglio gestire le rimanenze e i re-ordini dei prodotti
* Il server deve inviare una email all’admin quando sta per terminare un prodotto
* Come admin voglio poter creare e inserire un nuovo prodotto (con proprietà come nome, descrizione, peso, ecc.)
* Come user voglio essere avvertito quando un prodotto terminato, risulta nuovamente disponibile.
### Aggiuntive
* Come user voglio avere la garanzia di avere le password cifrate
* Come user voglio poter recuperare la mia password attraverso la mia email di registrazione
* Come user voglio poter modificare i miei dati personali e poter cancellare il mio account
* Come user voglio poter ordinare i prodotti per nome, prezzo ascendente o prezzo discendente
* Come user voglio poter visualizzare la mia storia degli acquisti
* Come admin voglio poter gestire gli account utenti esistenti
* Al primo avvio dell'app voglio che venga registrato obbligatoriamente il primo admin

## Per cominciare
Per far partire il server, clonare questo repo ed eseguire il comando
```
npm start
```
che si occuperà di installare tutte le dipendenze dell'applicazione e di eseguire il file che creerà un server.

## Requisiti per il deploy su Heroku
### Accounts e utility
* Creare un account su heroku.com
* Scaricare heroku-cli
* Creare un account su mlab.com
* Clonare questo repo in una cartella locale
### Fase mLab
* Creare un db su mLab, anche di quelli gratuiti
* Creare username e password per accedere al db
* Modificare il campo ```urlRemoto``` in ```config/db.js``` con quello di mLab
###  Fase Heroku
* Spostarsi nella cartella locale del progetto in una finestra console
* Eseguire ```heroku login```
* Eseguire ```heroku create```
* Eseguire ```git push heroku master```
* Seguire il collegamento che viene stampato a video una volta finita l'esecuzione dell'ultimo comando

## Autori
* **Riccardo Cannella**
* **Corrado Petrelli**
* **Michele Biondi**
* **Andrea Salvatori**

## Licenza
Questo progetto è sotto la licenza GPL V3.0 - guardare [LICENSE](LICENSE) per dettagli

## Albero delle cartelle e dei file

```
.
├── [4.0K]  app                                                 Cartella principale dell'app
│   ├── [7.1K]  app.config.js                                   Contiene gli stati del sito (equivalenti delle route in ui-router)
│   ├── [ 476]  app.module.js                                   Contiene i richiami ai moduli usati nell'app
│   ├── [4.0K]  css                                             Cartella che contiene i fogli di stile del w3c e quelli personalizzati
│   │   ├── [4.0K]  font
│   │   │   └── [4.0K]  font-awesome
│   │   │       ├── [4.0K]  css
│   │   │       │   ├── [ 37K]  font-awesome.css
│   │   │       │   └── [ 30K]  font-awesome.min.css
│   │   │       ├── [4.0K]  fonts
│   │   │       │   ├── [132K]  FontAwesome.otf
│   │   │       │   ├── [162K]  fontawesome-webfont.eot
│   │   │       │   ├── [434K]  fontawesome-webfont.svg
│   │   │       │   ├── [162K]  fontawesome-webfont.ttf
│   │   │       │   ├── [ 96K]  fontawesome-webfont.woff
│   │   │       │   └── [ 75K]  fontawesome-webfont.woff2
│   │   ├── [ 11K]  main.css                                    Foglio di stile principale
│   │   ├── [ 843]  md-icons.css                                Foglio di stile per le icone in Material Design
│   │   ├── [1.1K]  reset.css                                   Foglio di stile per resettare i parametri su ogni browser
│   │   ├── [1.3K]  select.css                                  Foglio di stile per gli input select
│   │   └── [ 26K]  w3c.css                                     Foglio di stile del w3c customizzato
│   ├── [4.0K]  icons                                           Cartella che contiene le favicons
│   │   ├── [ 271]  sito-tranq-favicon-16x16.png                
│   │   ├── [ 491]  sito-tranq-favicon-32x32.png
│   │   └── [2.1K]  sito-tranq-favicon.png
│   ├── [4.0K]  images                                          Cartella che contiene le immagini usate nell'app
│   │   ├── [4.0K]  admin
│   │   │   ├── [304K]  andrea.jpg
│   │   │   ├── [ 27K]  Murdock.jpg
│   │   │   ├── [ 44K]  rik.jpg
│   │   │   └── [190K]  stallman.png
│   │   ├── [5.1M]  background_404.gif
│   │   ├── [4.0K]  carte-di-credito
│   │   │   ├── [6.6K]  american-express.png
│   │   │   ├── [6.3K]  master-card.png
│   │   │   ├── [5.3K]  paypal.png
│   │   │   └── [4.9K]  visa.png
│   │   ├── [6.8K]  sito-tranq.png
│   │   ├── [590K]  store1.jpg
│   │   ├── [778K]  store.jpg
│   │   ├── [4.0K]  uploads                                     Cartella che conterrà le immagini caricate per i prodotti
│   │   └── [3.8M]  Zeb89_volevi.gif
│   ├── [3.6K]  index.html                                      File che viene chiamato a ogni richiesta client. Contiene solo script e un tag ui-view
│   ├── [4.0K]  layout                                          Cartella che contiene tutti i component usati nell'app
│   │   ├── [4.0K]  backend                                     Cartella che contiene i component del backend amministrativo
│   │   │   ├── [1.5K]  adminPanel.component.js                 File del component principale del backend amministrativo
│   │   │   ├── [ 210]  adminPanel.html                         Template html dello scheletro del backend amministrativo
│   │   │   ├── [4.0K]  aggiuntaProdotti                        
│   │   │   │   ├── [1.7K]  aggiuntaProdotti.component.js       File del component che si occupa dell'aggiunta prodotti
│   │   │   │   └── [5.9K]  aggiuntaProdotti.template.html      Template html della pagina di aggiunta prodotti
│   │   │   ├── [4.0K]  dettaglioUtente
│   │   │   │   ├── [2.7K]  dettaglioUtente.component.js        File del component che visualizza i dettagli di un utente nel backend amministrativo
│   │   │   │   └── [1.8K]  dettaglioUtente.template.html       Template html della dettaglio utente
│   │   │   ├── [4.0K]  header
│   │   │   │   └── [2.7K]  header.template.html                Template dell'header grafico usato nel backend amministrativo
│   │   │   ├── [4.0K]  listaProdotti
│   │   │   │   ├── [ 587]  listaProdotti.component.js          File del component che visualizza la lista dei prodotti nel backend amministrativo
│   │   │   │   └── [3.4K]  listaProdotti.template.html         Template html della lista prodotti
│   │   │   ├── [4.0K]  listaUtenti
│   │   │   │   ├── [ 622]  listaUtenti.component.js            File del component che visualizza la lista degli utenti nel backend amministrativo
│   │   │   │   └── [1.2K]  listaUtenti.template.html           Template html della lista utenti
│   │   │   ├── [4.0K]  modificaProdotti
│   │   │   │   ├── [2.6K]  modificaProdotti.component.js       File del component che permette la modifica di un prodotto nel backend amministrativo
│   │   │   │   └── [6.2K]  modificaProdotti.template.html      Template html della modifica prodotti
│   │   │   └── [4.0K]  settaggi
│   │   │       ├── [3.2K]  settaggi.component.js               File del component che permette la modifica di alcuni settaggi nel backend amministrativo
│   │   │       └── [4.4K]  settaggi.template.html              Template html della pagina dei settaggi
│   │   ├── [4.0K]  bootstrap
│   │   │   ├── [4.6K]  bootstrap.component.js                  File del component che permette di creare il primo admin del sito
│   │   │   ├── [8.6K]  bootstrap.template.html                 Template html della pagina di creazione primo admin
│   │   │   └── [  60]  container.template.html                 Template html dello scheletro per la pagina bootstrap
│   │   ├── [4.0K]  frontend                                    Cartella che contiene i component della parte utente dell'app
│   │   │   ├── [4.0K]  about   
│   │   │   │   ├── [ 243]  about.component.js                  File del component della pagina about
│   │   │   │   └── [3.1K]  about.template.html                 Template html della pagina about
│   │   │   ├── [4.0K]  autenticazione
│   │   │   │   ├── [ 389]  autenticazione.component.js         File del component che permette l'autenticazione e la registrazione nell'app
│   │   │   │   ├── [4.6K]  autenticazione.controller.js        Controller che permette l'autenticazione e la registrazione nell'app
│   │   │   │   └── [ 12K]  autenticazione.template.html        Template html della pagina di autenticazione/registrazione
│   │   │   ├── [4.0K]  carrello
│   │   │   │   ├── [8.0K]  carrello.component.js               File del component che gestisce il carrello
│   │   │   │   └── [4.0K]  carrello.template.html              Template html del carrello
│   │   │   ├── [4.0K]  condizioni
│   │   │   │   ├── [ 281]  condizioni.component.js             File del component della pagina delle condizioni di vendita
│   │   │   │   └── [3.7K]  condizioni.template.html            Template html della pagina delle condizioni di vendita
│   │   │   ├── [4.0K]  dettaglio
│   │   │   │   ├── [3.9K]  dettaglio.component.js              File del component che visualizza il dettaglio di un prodotto
│   │   │   │   └── [5.5K]  dettaglio.template.html             Template html del dettaglio di un prodotto
│   │   │   ├── [4.0K]  footer
│   │   │   │   └── [2.9K]  footer.template.html                Template html del footer usato nel frontend utente
│   │   │   ├── [4.0K]  header
│   │   │   │   ├── [2.1K]  header.template.html                Template html dell'header usato nel frontend utente
│   │   │   │   ├── [1.7K]  navbar.controller.js                Controller che effettua un controllo del login utente
│   │   │   │   ├── [1.1K]  navbar.noautenticazione.template.html Template html dell'header quando l'utente non è loggato
│   │   │   │   └── [1.2K]  navbar.siautenticazione.template.html Template html dell'header quando l'utente è loggato
│   │   │   ├── [4.0K]  home
│   │   │   │   ├── [4.6K]  home.component.js                   File del component della home del sito, che contiene la lista dei prodotti
│   │   │   │   └── [3.5K]  home.template.html                  Template html della home
│   │   │   ├── [4.0K]  informativa
│   │   │   │   ├── [ 226]  informativa.component.js            File del component della pagina che contiene l'informativa sulla privacy
│   │   │   │   └── [9.4K]  informativa.template.html           Template html dell'informativa
│   │   │   ├── [ 247]  main.template.html                      Template html dello scheletro del frontend utente
│   │   │   ├── [4.0K]  recupero
│   │   │   │   ├── [1.1K]  recupero.component.js               File del component che permette di chiedere il recupero della password
│   │   │   │   └── [1.4K]  recupero.template.html              Template html della pagina di recupero password
│   │   │   ├── [4.0K]  reset
│   │   │   │   ├── [1.7K]  reset.component.js                  File del component che effettua il reset della password
│   │   │   │   └── [4.1K]  reset.template.html                 Template html della pagina di reset password
│   │   │   ├── [4.0K]  storiaAcquisti
│   │   │   │   ├── [2.4K]  storiaAcquisti.component.js         File del component che recupera la storia degli acquisti di un utente
│   │   │   │   └── [1.9K]  storiaAcquisti.template.html        Template html della storia acquisti utente
│   │   │   └── [4.0K]  utente
│   │   │       ├── [3.5K]  utente.component.js                 File del component che permette la modifica dei dati dell'utente loggato
│   │   │       └── [8.5K]  utente.template.html                Template html della pagina di modifica utente
│   │   └── [4.0K]  stati                                       Cartella che contiene le pagine 401, 403 e 404
│   │       ├── [ 545]  forbidden.template.html                 Pagina 403
│   │       ├── [ 786]  invalid.template.html                   Pagina 404
│   │       └── [ 547]  unauthorized.template.html              Pagina 401
│   └── [4.0K]  scripts                                         Script aggiuntivi lato client
│       └── [4.0K]  ng-file-upload-12.2.13                      Script per angularjs per gestire gli upload (usato per le immagini dei prodotti)
├── [1.0K]  package.json                                        Json per NPM, contiene la lista delle dipendenze dell'app
├── [2.0K]  README.md                                           Questo file
├── [4.0K]  server                                              Cartella che contiene gli script eseguiti lato server
│   ├── [4.0K]  API                                             Cartella che contiene le funzioni chiamabili dal client per comunicare col server
│   │   ├── [3.1K]  apiBootstrap.js                             Api per creare il primo admin
│   │   ├── [1.3K]  apiEmail.js                                 Api per modificare i settaggi dell'account email usato per inviare messaggi email
│   │   ├── [ 558]  apiGeografia.js                             Api per restituirre le liste di Stati e Province (solo italiane)
│   │   ├── [4.8K]  apiImmagini.js                              Api per permettere il caricamento di immagini nel server
│   │   ├── [4.2K]  apiProdotti.js                              Api per la gestione dei prodotti (CRUD)
│   │   └── [ 62K]  apiUtenti.js                                Api per la gestione degli utenti (CRUD)
│   ├── [4.0K]  config                                          File di configurazione per il server
│   │   ├── [ 162]  db.js                                       Contiene la stringa di connessione al db
│   │   ├── [ 154]  encryption.js                               Contiene il numero di saltrounds usati nella generazione degli hash
│   │   └── [ 106]  mailSettings.json                           Contiene i settaggi dell'account email usato dal server (non è nel git)
│   ├── [4.0K]  models                                          Contiene i modelli di mongoose
│   │   ├── [1.6K]  prodotto.js                                 Modello dei prodotti
│   │   └── [2.3K]  utente.js                                   Modello degli utenti
│   ├── [ 100]  primoAvvio.txt                                  File per permette al sito di creare il primo admin, viene cancellato immediatamente dopo
│   ├── [4.0K]  routes                                          Cartella che contiene le route per le chiamate API dell'app
│   │   ├── [2.1K]  routeAdmin.js                               Contiene le route amministrative
│   │   ├── [ 263]  routeBootstrap.js                           Contiene le route per il primo avvio
│   │   ├── [ 258]  routeGeografia.js                           Contiene le route per restituire Stati e Province (italiane)
│   │   ├── [ 542]  routeImmagini.js                            Contiene le route per la gestione delle immagini
│   │   ├── [ 304]  routeProdotti.js                            Contiene le route per la gestione dei prodotti
│   │   └── [1.7K]  routeUtenti.js                              Contiene le route per la gestione dell'interazione degli utenti con l'app
│   └── [4.0K]  utilities
│       ├── [4.0K]  mailer.js                                   File che esporta il meccanismo di invio email e di modifica dei settaggi email
│       ├── [1.8K]  province.js                                 File che esporta la lista delle province italiane
│       ├── [4.3K]  stati.js                                    File che esporta la lista degli stati
│       └── [1.8K]  utilities.js                                File che esporta alcune funzioni usate da tutte le API
└── [2.2K]  server.js                                           Il file che permette la creazione del server nodejs
```
