var autenticazione = angular.module('autenticazione');

autenticazione.controller('autenticazioneCtrl', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {

    var autenticazioneCtrl = this;
    // Variabili per il login
    $scope.username = "";
    $scope.password = "";
    $http.get('api/v1.0/stati').then(function(stati) {
        $http.get('api/v1.0/province').then(function(province) {
            autenticazioneCtrl.listaStati = stati.data;
            autenticazioneCtrl.listaProvince = province.data;
        })
    });

    // Funzione per il login
    $scope.login = function() {
        if ($scope.username == undefined || $scope.password == undefined ||
            $scope.username == "" || $scope.password == ""
        ) {
            return; // Non fa niente se username e password sono vuoti.
        }

        $http({
            method: 'POST',
            url: '/api/v1.0/utenti/login',
            data: { 'username': $scope.username, 'password': $scope.password }
        }).then(function successCallback(response) { // Login con successo
            console.log(JSON.stringify(response.data));
            $window.localStorage.setItem("jwtToken", response.data.token);
            $window.localStorage.setItem("username", response.data.username);
            $window.localStorage.setItem("admin", response.data.admin);
            $location.path('/');
        }, function errorCallback(response) { // Login non avvenuto

            alert("Username o password errati");

            // Svuoto il campo password per facilitare i reinserimenti dovuti a typos nella password
            $scope.password = "";
        });

    };


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
    $scope.inputAccettoTermini = false;


    // Funzione per la registrazione
    $scope.logon = function() {
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


        // Se i termini non sono accettati non esegue la registrazione
        if ($scope.inputAccettoTermini == false || $scope.inputAccettoTermini == undefined) {
            alert("Eh volevi??? Accetta i termini");
            return; // Azione nulla
        }

        $http({
            method: 'POST',
            url: '/api/v1.0/utenti/registrazione',
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
        }).then(function successCallback(response) { // Login con successo
            alert("Registrazione avvenuta con successo " + $scope.inputNome + " " + $scope.inputCognome + " \n Esegui il login!");
            $scope.username = $scope.inputUsername;

        }, function errorCallback(response) { // Login non avvenuto

            alert("Errore nella registrazione");
        });

    }
}]);