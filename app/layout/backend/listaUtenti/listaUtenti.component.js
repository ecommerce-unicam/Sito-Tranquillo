// Definizione del modulo 'listaUtenti'
angular.module('listaUtenti', [
    'ui.router'
]);

// Registra il componente 'listaUtenti' sul modulo 'listaUtenti'
angular.module('listaUtenti').component('listaUtenti', {
    templateUrl: 'layout/backend/listaUtenti/listaUtenti.template.html',
    controller: function($scope, $http, $location, $window) {
        var listaUtenti = this;
        listaUtenti.ordinamento = 'username';

        $http.post('api/v1.0/admin/utenti', { token: $window.localStorage.getItem("jwtToken") }).then(function(response) {
            listaUtenti.utenti = response.data;
        });

    }
});