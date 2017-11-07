// Definizione del modulo 'dettaglioUtente'
angular.module('dettaglioUtente', [
    'ui.router'
]);

// Registra il componente 'listaUtenti' sul modulo 'listaUtenti'
angular.module('dettaglioUtente').component('dettaglioUtente', {
    templateUrl: 'layout/backend/dettaglioUtente/dettaglioUtente.template.html',
    controller: function($scope, $http, $location, $window, $stateParams) {
        var dettaglioUtente = this;

        $http.post('api/v1.0/admin/dettaglioUtente/' + $stateParams.id, { token: $window.localStorage.getItem("jwtToken") }).then(function(response) {
            dettaglioUtente.utente = response.data;
            delete dettaglioUtente.utente._id;
            utenteOrig = angular.copy(dettaglioUtente.utente);
        });
        dettaglioUtente.mandaResetPW = function() {
            $http.post('api/v1.0/utenti/richiestarecuperopw', {
                username: dettaglioUtente.utente.username,
                indirizzo: $location.protocol() + "://" + $location.host() + ":" + $location.port() + '/resetPassword/'
            }).then(function(res) {
                $scope.richiestaResetPWInviata = 1;
            });
        };
        dettaglioUtente.rendiAdmin = function() {
            dettaglioUtente.utente.admin = true;
            dettaglioUtente.utente.modificaDaAdmin = true;
            dettaglioUtente.utente.token = $window.localStorage.getItem("jwtToken");
            $http.put('api/v1.0/utenti/aggiorna', dettaglioUtente.utente).then(function(res) {
                $scope.utenteResoAdmin = 1;
                $scope.utenteResoNonAdmin = 0;
            });
        };
        dettaglioUtente.rendiNonAdmin = function() {
            dettaglioUtente.utente.admin = false;
            dettaglioUtente.utente.modificaDaAdmin = true;
            dettaglioUtente.utente.token = $window.localStorage.getItem("jwtToken");
            $http.put('api/v1.0/utenti/aggiorna', dettaglioUtente.utente).then(function(res) {
                $scope.utenteResoNonAdmin = 1;
                $scope.utenteResoAdmin = 0;
            });
        };
        dettaglioUtente.aggiornaEmail = function() {
            if (dettaglioUtente.utente.email === utenteOrig.email) $scope.emailNonCambiata = 1;
            else {
                dettaglioUtente.utente.token = $window.localStorage.getItem("jwtToken");
                dettaglioUtente.utente.modificaDaAdmin = true;
                $http.put('api/v1.0/utenti/aggiorna', dettaglioUtente.utente).then(function(res) {
                    $scope.emailUtenteCambiata = 1;
                    $scope.emailNonCambiata = 0;
                    utenteOrig = angular.copy(dettaglioUtente.utente);
                });
            }
        }

    }
});