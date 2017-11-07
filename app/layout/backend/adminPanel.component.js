// Definizione del modulo 'adminPanel'
angular.module('adminPanel', [
    'ui.router'
]);

// Registra il componente 'adminPanel' sul modulo 'adminPanel'
angular.module('adminPanel').component('adminPanel', {
    templateUrl: 'layout/backend/adminPanel.html',
    controller: function($http, $state, $window) {

        var panel = this;
        if ($window.localStorage.getItem("jwtToken") == "" || $window.localStorage.getItem("jwtToken") == undefined) {
            // l'utente non è loggato, lo mando a una 401
            panel.stato = 401;
            $state.go('unauthorized');
        } else {
            $http.post('api/v1.0/utenti/isAdmin', { token: $window.localStorage.getItem("jwtToken") })
                .then(function(res) {
                        // controllo giusto per scrupolo, non dovrebbe succedere niente qui
                        if (res.data.successo === false || !res.data.isAdmin) {
                            panel.stato = 403;
                            $state.go('forbidden');
                        } else panel.stato = 200
                    },
                    function(err) {
                        // qui sicuramente l'utente esiste ma non è un admin, lo spedisco a una 403
                        panel.stato = 403;
                        $state.go('forbidden');
                    });
        }
        // se sono arrivato fino a qui l'utente è un admin e può continuare a caricare il contenuto della pagina
        // non c'è bisogno di settare nulla qui
    }
});