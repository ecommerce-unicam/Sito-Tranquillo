// Definizione del modulo 'informativa'
angular.module('storiaAcquisti', [
    'ui.router'
]);

angular.module('storiaAcquisti').component('storiaAcquisti', {
    templateUrl: 'layout/frontend/storiaAcquisti/storiaAcquisti.template.html',
    controller: function($http, $stateParams, $scope, $window, $location){
        var storiaAcquisti = this;
        
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

        storiaAcquisti.getStoriaAcquisti = function(){
            console.log('Arrivanooooooo!');
            $http({
                method: 'POST',
                url: '/api/v1.0/utenti/getStoriaAcquisti',
                data: { 'token': $window.localStorage.getItem('jwtToken') }
            }).then(function successCallback(response) { 
                storiaAcquisti.storiaAcquisti = response.data.storiaAcquisti;
                console.log(storiaAcquisti.storiaAcquisti);
                if(storiaAcquisti.storiaAcquisti.length == 0){
                    storiaAcquisti.vuota = true;
                } else {
                    storiaAcquisti.vuota = false;
                }
            }, function errorCallback(response) {
                alert('errore durante la ricezione della storia acquisti');
                console.log('errore storia acquisti');
            });

        }


        // RICEVO LA STORIA
        storiaAcquisti.getStoriaAcquisti();
        
        
        

        
    }
});