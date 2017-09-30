// Principalmente questo file conterrà le route
angular.module('sitotranquillo')
    .config(['$locationProvider', '$routeProvider',
        function config($locationProvider, $routeProvider) {
            // imposto il carattere che mi farà capire che sono in una route
            //$locationProvider.hashPrefix('!');
            // aggiungo le route
            $routeProvider
                .when('/', {
                    template: '<home></home>',
                    title: 'Home'
                })
                .when('/invalidPage', {
                    template: '<invalid></invalid>',
                    title: 'Pagina non trovata'
                })
                .when('/prodotti/:id', {
                    template: '<dettaglio></dettaglio>',
                    title: 'Account'
                })
                .when('/condizioni', {
                    template: '<condizioni></condizioni>',
                    title: 'Condizioni'
                })
                .when('/about', {
                    template: '<about></about>',
                    title: 'Chi siamo'
                })
                .when('/autenticazione', {
                    template: '<autenticazione></autenticazione>',
                    title: 'Login'
                })
                .when('/informativa', {
                    template: '<informativa></informativa>',
                    title: 'Informativa'
                })
                .when('/carrello', {
                    template: '<carrello></carrello>',
                    title: 'Carrello'
                })
                // route amministrative (?)
                .when('/admin/aggiuntaProdotti', {
                    template: '<aggiunta-prodotti></aggiunta-prodotti>',
                    title: 'Aggiungi Prodotti'
                })
                .when('/admin/modificaProdotti/:id', {
                    template: '<modifica-prodotti></modifica-prodotti>',
                    title: 'Modifica Prodotti'
                })
                .otherwise('/invalidPage');
            // tolgo l'hashbang
            $locationProvider.html5Mode(true);
        }
    ]);


/*
 * Quando cambi route cambia anche il title attuale con il title della route corrispondente
 */
angular.module('sitotranquillo').run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
        if (current.hasOwnProperty('$$route'))
            $rootScope.title = current.$$route.title;
    });
}]);