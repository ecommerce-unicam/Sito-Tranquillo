'use strict';
// Definizione del modulo 'carello'
angular.module('carrello', [
    'ui.router'
]);

// Registra il componente 'carrello' sul modulo 'carrello'
angular.module('carrello').component('carrello', {
    templateUrl: 'layout/frontend/carrello/carrello.template.html',
    controller: function($http, $stateParams, $window, $scope, $location) {
        var carrelloCtrl = this;

        carrelloCtrl.occupied = false; // Sblocco il tasto compra

        //Logout function
        $scope.logout = function() {
            $window.localStorage.setItem("jwtToken", "");
            $window.localStorage.setItem("username", "");

            if (window.location.pathname == "/") {
                $window.location.reload();
            } else {
                $location.path("/");
            }
        };

        // CONTROLLO TOKEN
        if($window.localStorage.getItem('jwtToken') == "" || $window.localStorage.getItem('jwtToken') == null ){
            // Continua
            console.log('ok continua 1');
        } else { // Controlla token
            $http({
                method: 'POST',
                url: '/api/v1.0/utenti/controllaToken',
                data: { 'token': $window.localStorage.getItem('jwtToken') }
            }).then(function successCallback(response) { // Login con successo
                // Continua
                console.log('ok continua 2');
            }, function errorCallback(response) { // Login non avvenuto
                console.log('logged out');
                $scope.logout();
            });
        };

        carrelloCtrl.getCarrello = function(){
            console.log('Lisciami le mele');
            carrelloCtrl.occupied = true; // Non posso comprare finchè non si aggiorna il carrello
            $http({
                method: 'POST',
                url: '/api/v1.0/utenti/getCarrello',
                data: { 'token': $window.localStorage.getItem("jwtToken") }
            }).then(function successCallback(response) {
                carrelloCtrl.carrello = response.data.carrello;
                carrelloCtrl.totaleImporto = 0;
                
                // Calcolo del totale 
                carrelloCtrl.carrello.forEach(function(elemento) {
                    carrelloCtrl.totaleImporto += elemento.totale;
                }, this);
    
                carrelloCtrl.tasse = Number((carrelloCtrl.totaleImporto * 0.22).toFixed(2));
                carrelloCtrl.spedizione = 15;
                carrelloCtrl.totaleFinale = (carrelloCtrl.totaleImporto + carrelloCtrl.spedizione + carrelloCtrl.tasse).toFixed(2);
                //Risblocco il tasto compra se non ci sono errori
                carrelloCtrl.occupied = false;
                console.log(JSON.stringify(carrelloCtrl.carrello));
            }).catch(function errorCallback(response){
                console.log('Errore: ' + response);
            });
        };
        
        carrelloCtrl.impostaNelCarrello = function(idprodotto,quantita,blurredOut){
            if(quantita == null && blurredOut == false){
                return; // Aspetto che il valore venga cambiato, altrimenti con angular, dopo il blur do
            }
            $http({
                method: 'POST',
                url: '/api/v1.0/utenti/impostaNelCarrello',
                data: { 'token': $window.localStorage.getItem("jwtToken"), 'prodotto':idprodotto,'quantita':quantita }
            }).then(function successCallback(response){
                if(response.data.successo == true){
                    carrelloCtrl.getCarrello();
                    
                } else {
                    
                    alert('Hai richiesto una quantità errata');
                    // Reimposto il carrello con le giuste quantità
                    carrelloCtrl.getCarrello();
                }
                
            }).catch(function errorCallback(response){
                alert('Valore invalido impostato nel campo, reset automatico');
                carrelloCtrl.getCarrello();
            });
            
        };
    
        carrelloCtrl.aggiungiAlCarrello = function(idprodotto,quantita){
            $http({
                method: 'POST',
                url: '/api/v1.0/utenti/aggiungialcarrello',
                data: { 'token': $window.localStorage.getItem("jwtToken"), 'prodotto':idprodotto,'quantita':quantita }
            }).then(function successCallback(response){
                if(response.data.successo == true){
                    carrelloCtrl.getCarrello();
                    // Non faccio niente
                } else {
                    
                    alert('impossibile aggiungere un altro prodotto');
                    // Reimposto il carrello con le giuste quantità
                    carrelloCtrl.getCarrello();
                }
                
            }).catch(function errorCallback(response){
                alert('impossibile aggiungere un altro prodotto')
                carrelloCtrl.getCarrello();
            });
        };

        carrelloCtrl.rimuoviDalCarrello = function(idprodotto,quantitaPresente){
            
            $http({
                method: 'POST',
                url: '/api/v1.0/utenti/rimuovidalcarrello',
                data: { 'token': $window.localStorage.getItem("jwtToken"), 'prodotto':idprodotto,'quantita':1 }
            }).then(function successCallback(response){
                if(response.data.successo == true){

                    carrelloCtrl.getCarrello();
                    return
                } else {
                    alert("non è stato possibile rimuovere il prodotto, ci scusiamo per il disagio");
                    carrelloCtrl.getCarrello();
                    return;
                }
            }).catch(function errorCallback(response){
                console.log('Error');
                carrelloCtrl.getCarrello();
            });
        };

        carrelloCtrl.rimuoviProdotto = function(idprodotto,quantitaPresente){
            console.log(quantitaPresente);
            
            $http({
                method: 'POST',
                url: '/api/v1.0/utenti/rimuovidalcarrello',
                data: { 'token': $window.localStorage.getItem("jwtToken"), 'prodotto':idprodotto,'quantita':quantitaPresente }
            }).then(function successCallback(response){
                if(response.data.successo == true){
                    // Aggiorno il carrello
                    carrelloCtrl.getCarrello();
                } else {
                    alert("non è stato possibile rimuovere i prodotti, ci scusiamo per il disagio");
                    // Aggiorno il carrello
                    carrelloCtrl.getCarrello();
                }
            }).catch(function errorCallback(response){
                console.log('Error!');
                carrelloCtrl.getCarrello();
            });
        }

        carrelloCtrl.acquistaTutto = function(){
            
            $http({
                method: 'POST',
                url: '/api/v1.0/utenti/acquistaProdottiNelCarrello',
                data: { 'token': $window.localStorage.getItem("jwtToken")}
            }).then(function successCallback(response){
                if(response.data.successo == true){
                    if(response.data.carrello_aggiornato == false){
                        alert('Grazie per aver acquistato da noi.');
                        carrelloCtrl.getCarrello();
                    } else {
                        alert('Carrello sincronizzato col database, perfavore riesegui acquisto');
                        carrelloCtrl.getCarrello();
                    }
                } else {
                    alert('Impossibile acquistare il numero di prodotti inserito, i valori sono stati aggiornati');
                    carrelloCtrl.getCarrello();
                }
            }).catch(function errorCallback(response){
                alert('Impossibile acquistare il numero di prodotti inserito, i valori sono stati aggiornati');
                carrelloCtrl.getCarrello();
            });
        };

        // Eseguo al caricamento della pagina
        carrelloCtrl.getCarrello();

    }
});