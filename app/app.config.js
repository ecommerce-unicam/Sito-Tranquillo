angular.module('sitotranquillo').config(function($locationProvider, $stateProvider, $urlRouterProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.when('', '/');
        $urlRouterProvider.when('/admin/', '/admin');
        //s$urlRouterProvider.when('/', '/home');
        $stateProvider
            .state('root', {
                url: '/',
                data: { titolo: 'Home' },
                views: {
                    '': { templateUrl: 'layout/frontend/main.template.html' },

                    'navbar@root': {
                        templateUrl: 'layout/frontend/header/header.template.html'
                    },
                    'main@root': {
                        component: 'home'
                    },
                    'footer@root': {
                        templateUrl: 'layout/frontend/footer/footer.template.html'
                    }
                }
            })
            .state('dettaglio', {
                parent: 'root',
                url: 'prodotti/:id',
                data: { titolo: 'Dettaglio Prodotto' },
                views: {
                    main: {
                        component: 'dettaglio'
                    }
                }
            })
            .state('condizioni', {
                parent: 'root',
                url: 'condizioni',
                data: { titolo: 'Condizioni d\'uso' },
                views: {
                    main: {
                        component: 'condizioni'
                    }
                }
            })
            .state('about', {
                parent: 'root',
                url: 'about',
                data: { titolo: 'About' },
                views: {
                    main: {
                        component: 'about'
                    }
                }
            })
            .state('autenticazione', {
                parent: 'root',
                url: 'autenticazione',
                data: { titolo: 'Autenticazione' },
                views: {
                    main: {
                        component: 'autenticazione'
                    }
                }
            })
            .state('informativa', {
                parent: 'root',
                url: 'informativa',
                data: { titolo: 'Informativa' },
                views: {
                    main: {
                        component: 'informativa'
                    }
                }
            })
            .state('recupero', {
                parent: 'root',
                url: 'recupero',
                data: { titolo: 'Recupero Password' },
                views: {
                    main: {
                        component: 'recupero'
                    }
                }
            })
            .state('reset', {
                parent: 'root',
                url: 'resetPassword/:token',
                data: { titolo: 'Reset Password' },
                views: {
                    main: {
                        component: 'reset'
                    }
                }
            })
            .state('utente', {
                parent: 'root',
                url: 'utente',
                data: { titolo: 'Utente' },
                views: {
                    main: { component: 'utente' }
                }
            })
            .state('carrello', {
                parent: 'root',
                url: 'carrello',
                data: { titolo: 'Carrello' },
                views: {
                    main: { component: 'carrello' }
                }
            })
            .state('storiaAcquisti', {
                parent: 'root',
                url: 'storiaAcquisti',
                data: { titolo: 'StoriaAcquisti' },
                views: {
                    main: { component: 'storiaAcquisti' }
                }
            })

        // ADMIN
        .state('admin', {
                url: '/admin',
                data: { titolo: 'Lista prodotti nel Database' },
                views: {
                    '': { component: 'adminPanel' },
                    'navbar@admin': {
                        templateUrl: 'layout/backend/header/header.template.html',
                    },
                    'main@admin': {
                        component: 'listaProdotti'
                    }
                }
            })
            .state('listaUtenti', {
                parent: 'admin',
                url: '/listaUtenti',
                data: { titolo: 'Lista Utenti' },
                views: {
                    main: {
                        component: 'listaUtenti'
                    }
                }
            })
            .state('dettaglioUtente', {
                parent: 'admin',
                url: '/dettaglioUtente/:id',
                data: { titolo: 'Dettaglio Utente' },
                views: {
                    main: {
                        component: 'dettaglioUtente'
                    }
                }
            })
            .state('aggiuntaProdotti', {
                parent: 'admin',
                url: '/aggiuntaProdotti',
                data: { titolo: 'Aggiunta prodotti' },
                views: {
                    main: {
                        component: 'aggiuntaProdotti'
                    }
                }
            })
            .state('modificaProdotti', {
                parent: 'admin',
                url: '/modificaProdotti/:id',
                data: { titolo: 'Modifica prodotti' },
                views: {
                    main: {
                        component: 'modificaProdotti'
                    }
                }
            })
            .state('settaggi', {
                parent: 'admin',
                url: '/settaggi',
                data: { titolo: 'Settaggi' },
                views: {
                    main: {
                        component: 'settaggi'
                    }
                }
            })
            // PRIMO AVVIO?
            .state('bootstrap', {
                url: '/bootstrap',
                data: { titolo: 'Primo Avvio' },
                views: {
                    '': { templateUrl: 'layout/bootstrap/container.template.html' },
                    'main@bootstrap': { component: 'bootstrap' }
                }
            })
            // NOT FOUND
            .state('invalid', {
                templateUrl: 'layout/stati/invalid.template.html',
                data: { titolo: '404 Pagina non trovata' },
            })
            // UNAUTHORIZED
            .state('unauthorized', {
                templateUrl: 'layout/stati/unauthorized.template.html',
                data: { titolo: '401 Utente non loggato' },
            })
            // FORBIDDEN
            .state('forbidden', {
                templateUrl: 'layout/stati/forbidden.template.html',
                data: { titolo: '403 Non autorizzato' },
            });


        $urlRouterProvider.otherwise(function($injector, $location) {
            $injector.invoke(['$state', function($state) { $state.go('invalid'); }]);
            return true;
        });
    })
    .run(['$rootScope', '$state',
        function($rootScope, $state) {
            $rootScope.$state = $state;
        }
    ]);;