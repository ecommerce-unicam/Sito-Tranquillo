// Definizione del modulo 'utente'
angular.module('utente', [
    'ui.router',
    'ngMessages'
]);

// Registra il componente 'utente' sul modulo 'utente'
angular.module('utente').component('utente', {
    templateUrl: 'layout/frontend/utente/utente.template.html',
    controller: function($scope, $http, $window, $location) {
        var ctrl = this;
        var utenteOrig;

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

        $scope.richiestaEliminazione = 0;
        $scope.utenteEliminato = 0;
        if ($window.localStorage.getItem("jwtToken") == undefined || $window.localStorage.getItem("jwtToken") == '')
            $location.path('/autenticazione');
        else {
            $http.get('api/v1.0/stati').then(function(stati) {
                $http.get('api/v1.0/province').then(function(province) {
                    $http.post('api/v1.0/utenti/get', { token: $window.localStorage.getItem("jwtToken") }).then(function(response) {
                        $scope.province = province.data;
                        $scope.stati = stati.data;
                        ctrl.utente = response.data;
                        delete ctrl.utente._id;
                        utenteOrig = angular.copy(ctrl.utente);
                    });
                });
            });

        }
        ctrl.reset = function() {
            ctrl.utente = angular.copy(utenteOrig);
        };
        ctrl.aggiornaUtente = function() {
            ctrl.utente.token = $window.localStorage.getItem("jwtToken");
            $http.put('api/v1.0/utenti/aggiorna', ctrl.utente).then(
                function(res) {
                    $window.location.reload();
                },
                function(err) {
                    console.log('errore!\n', err.data);
                }
            )
        };
        ctrl.chiediConferma = function() {
            $scope.richiestaEliminazione = 1;
        };
        ctrl.tornaIndietro = function() {
            $scope.richiestaEliminazione = 0;
        };
        ctrl.eliminaUtente = function() {
            $http.post('api/v1.0/utenti/elimina', { token: $window.localStorage.getItem("jwtToken") })
                .then(function(res) {
                    $window.localStorage.setItem("jwtToken", "");
                    $window.localStorage.setItem("username", "");
                    alert('Il tuo account utente è stato eliminato. Clicca su Ok per tornare alla home.')
                    $location.path('/');
                })
        }
    }
});