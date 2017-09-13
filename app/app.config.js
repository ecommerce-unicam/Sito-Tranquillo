// Principalmente questo file conterrà le route
angular.module('sitotranquillo')
    .config(['$locationProvider', '$routeProvider',
        function config($locationProvider, $routeProvider) {
            // imposto il carattere che mi farà capire che sono in una route
            //$locationProvider.hashPrefix('!');
            // aggiungo le route
            $routeProvider
                .when('/', {
                    template: '<home></home>'
                })
                .when('/invalidPage', {
                    template: '<invalid></invalid>'
                })
                .when('/prodotti/:id', {
                    template: '<dettaglio></dettaglio>'
                })
                .when('/condizioni', {
                    template: '<condizioni></condizioni>'
                })
                .when('/about', {
                    template: '<about></about>'
                })
                .when('/autenticazione', {
                    template: '<autenticazione></autenticazione>'
                })
                .otherwise('/invalidPage');
            // tolgo l'hashbang
            $locationProvider.html5Mode(true);
        }
    ]);