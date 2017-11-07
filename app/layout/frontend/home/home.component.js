// Definizione del modulo 'home'
angular.module('home', [
    'ui.router'
]);

// Registra il componente 'home' sul modulo 'home
angular.module('home').component('home', {
    templateUrl: 'layout/frontend/home/home.template.html',
    controller: function($scope, $http, $location, $window, $state) {
        $http.get('api/v1.0/bootstrap').then(function(res) {
            if (res.data.primoAvvio === true) $state.go('bootstrap');
        });
        var listaProva = this;

        listaProva.ordinamento = 'nome';

        $http.get('api/v1.0/prodotti').then(function(response) {
            listaProva.prodotti = response.data;
        });

        listaProva.aggiungiAPreferiti = function(idprodotto) {
            if ($window.localStorage.getItem('jwtToken') == "" || $window.localStorage.getItem('jwtToken') == null) {
                alert('Effettua il login per ricevere la notifica del ritorno di questo prodotto.');
                return;
            } // Altrimenti continuo
            $http.put('api/v1.0/utenti/aggiorna', { token: $window.localStorage.getItem('jwtToken'), preferito: idprodotto })
                .then(function(res) {
                    $scope.preferitiUtente.push(idprodotto);
                    alert('Se il prodotto è terminato, verrai notificato tramite email quando tornerà disponibile!');
                })
        };
        listaProva.togliDaiPreferiti = function(idprodotto) {

            // Sicuramente se sono qui l'utente è loggato
            $http.put('api/v1.0/utenti/aggiorna', { token: $window.localStorage.getItem('jwtToken'), preferito: idprodotto, togli: true })
                .then(function(res) {
                    var indiceProdotto = $scope.preferitiUtente.indexOf(idprodotto);
                    $scope.preferitiUtente.splice(indiceProdotto, 1);
                    alert('Hai tolto il prodotto dai preferiti.');
                })
        };

        //Funzione per chiudere e riaprire la sidebar nella home page
        $scope.IsVisible = true;
        $scope.ShowHide = function() {
            //Se la sidebar è visibile allora verrà chiusa e viceversa
            if ($scope.IsVisible == true) {
                $scope.IsVisible = false;
            } else {
                $scope.IsVisible = true;
            }
        }

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
        if ($window.localStorage.getItem('jwtToken') == "" || $window.localStorage.getItem('jwtToken') == null) {
            // Non fai nulla
        } else { // Controlla token
            $http({
                method: 'POST',
                url: '/api/v1.0/utenti/get',
                data: { 'token': $window.localStorage.getItem('jwtToken') }
            }).then(function successCallback(response) { // Login con successo
                $scope.preferitiUtente = response.data.prodotti_preferiti;
                // Continua
            }, function errorCallback(response) { // Login non avvenuto
                console.log('logged out');
                $scope.logout();
            });
        };

        listaProva.mettiNelCarrello = function(idprodotto, quantitaDisponibile) {
            if ($window.localStorage.getItem('jwtToken') == "" || $window.localStorage.getItem('jwtToken') == null) {
                alert('Solo gli utenti registrati possono fare acquisti sul nostro sito.');
                return;
            } // Altrimenti continuo

            if (quantitaDisponibile == 0) {
                alert('Prodotto esaurito. Ci scusiamo per il disagio.');
                return;
            }
            // Altrimenti procedo all'acquisto
            $http({
                method: 'POST',
                url: '/api/v1.0/utenti/aggiungialcarrello',
                data: { 'token': $window.localStorage.getItem("jwtToken"), 'prodotto': idprodotto, 'quantita': 1 }
            }).then(function successCallback(response) {
                if (response.data.successo == true) {
                    $location.path('/carrello');
                } else {
                    alert('Impossibile aggiungere al carrello guaglione.');

                }

            }).catch(function errorCallback(response) {
                alert('Impossibile aggiungere altre unità di prodotto al carrello.');
                return;
            });
        };
    }
});