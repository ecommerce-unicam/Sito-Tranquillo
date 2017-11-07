// Definizione del modulo 'bootstrap'
angular.module('bootstrap', [
    'ui.router',
    'ngMessages'
]);

// Registra il componente 'dettaglio' sul modulo 'dettaglio'
angular.module('bootstrap').component('bootstrap', {
    templateUrl: 'layout/bootstrap/bootstrap.template.html',
    controller: function($http, $state, $scope, $window) {
        var bootstrap = this;
        $http.get('api/v1.0/bootstrap').then(function(response) {
            // se non puoi fare il primo avvio ti mando brutalmente alla home, ciao tanto
            if (response.data.primoAvvio === false) $state.go('root');
            else $http.get('api/v1.0/stati').then(function(stati) {
                $http.get('api/v1.0/province').then(function(province) {
                    bootstrap.listaStati = stati.data;
                    bootstrap.listaProvince = province.data;
                })
            });
        });
        $window.localStorage.setItem("jwtToken", '');
        $window.localStorage.setItem("username", '');
        $window.localStorage.setItem("admin", '');
        bootstrap.creaPrimoAdmin = function() {
                // Se non c'è qualche campo necessario non esegue la registrazione
                if ($scope.inputNome == "" || $scope.inputNome == undefined ||
                    $scope.inputCognome == "" || $scope.inputCognome == undefined ||
                    $scope.inputUsername == "" || $scope.inputUsername == undefined ||
                    $scope.inputEmail == "" || $scope.inputEmail == undefined ||
                    $scope.country == "" || $scope.country == undefined ||
                    $scope.inputIndirizzo == "" || $scope.inputIndirizzo == undefined ||
                    $scope.inputTelefono == "" || $scope.inputTelefono == undefined ||
                    $scope.inputPassword == "" || $scope.inputPassword == undefined ||
                    $scope.inputConfermaPassword == "" || $scope.inputConfermaPassword == undefined ||
                    $scope.inputDomandaSegreta == "" || $scope.inputDomandaSegreta == undefined ||
                    $scope.inputRispostaSegreta == "" || $scope.inputRispostaSegreta == undefined
                ) {
                    return; // Non fa niente se quei campi sono vuoti.
                }

                $http({
                    method: 'POST',
                    url: '/api/v1.0/bootstrap',
                    data: {
                        'nome': $scope.inputNome,
                        'cognome': $scope.inputCognome,
                        'username': $scope.inputUsername,
                        'email': $scope.inputEmail,
                        'stato': $scope.country,
                        'provincia': $scope.province,
                        'comune': $scope.comune,
                        'indirizzo': $scope.inputIndirizzo,
                        'telefono': $scope.inputTelefono,
                        'password': $scope.inputPassword,
                        'domanda_segreta': $scope.inputDomandaSegreta,
                        'risposta_segreta': $scope.inputRispostaSegreta
                    }
                }).then(function successCallback(response) {
                    // faccio forzosamente il login dell'admin appena creato
                    $http.post('/api/v1.0/utenti/login', { 'username': $scope.inputUsername, 'password': $scope.inputPassword })
                        .then(function(response) {
                            console.log(response.data);
                            $window.localStorage.setItem("jwtToken", response.data.token);
                            $window.localStorage.setItem("username", response.data.username);
                            $window.localStorage.setItem("admin", response.data.admin);
                            // lo mando all'area admin
                            $state.go('settaggi');
                        })
                        .catch(function(err) {
                            console.log(err);
                        })

                }, function errorCallback(response) { // Login non avvenuto

                    alert("Errore nella registrazione");
                });
            }
            //Variabili per la registrazione
        $scope.inputNome = "";
        $scope.inputCognome = "";
        $scope.inputUsername = "";
        $scope.inputEmail = "";
        $scope.country = "Italy"; // Default a Italia
        $scope.province;
        $scope.comune;
        $scope.inputIndirizzo = "";
        $scope.inputTelefono = "";
        $scope.inputPassword = "";
        $scope.inputConfermaPassword = "";
        $scope.inputDomandaSegreta = "";
        $scope.inputRispostaSegreta = "";
    }
});