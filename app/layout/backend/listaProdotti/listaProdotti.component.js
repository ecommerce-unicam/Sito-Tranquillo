// Definizione del modulo 'listaProdotti'
angular.module('listaProdotti', [
    'ui.router'
]);

// Registra il componente 'listaProdotti' sul modulo 'listaProdotti'
angular.module('listaProdotti').component('listaProdotti', {
    templateUrl: 'layout/backend/listaProdotti/listaProdotti.template.html',
    controller: function($scope, $http, $location, $window) {
        var listaProdotti = this;
        //listaProdotti.ordinamento = 'nome';

        $http.get('api/v1.0/prodotti').then(function(response) {
            listaProdotti.prodotti = response.data;
        });


    }
});