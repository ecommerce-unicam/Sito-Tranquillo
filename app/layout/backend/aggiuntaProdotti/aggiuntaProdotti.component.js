// Definizione del modulo 'aggiuntaProdotti'
angular.module('aggiuntaProdotti', [
    'ui.router',
    'ngFileUpload'
]);

// Registra il componente 'aggiuntaProdotti' sul modulo 'aggiuntaProdotti'
angular.module('aggiuntaProdotti').component('aggiuntaProdotti', {
    templateUrl: 'layout/backend/aggiuntaProdotti/aggiuntaProdotti.template.html',
    controller: function(Upload, $http, $state, $window) {
        var aggiuntaProdotto = this;
        aggiuntaProdotto.aggiungiProdotto = function() {
            // validazione immagine da fare (come?)
            // intanto controllo se c'è
            if (aggiuntaProdotto.immagine) {
                Upload.upload({
                    url: '/api/v1.0/immagini',
                    data: { file: aggiuntaProdotto.immagine }
                }).then(function(resp) {
                    if (!resp.data.errore) {
                        // valida
                        aggiuntaProdotto.prodotto.urlImmagine = resp.data.nomeFile;
                        aggiuntaProdotto.prodotto.token = $window.localStorage.getItem("jwtToken");
                        $http.post('api/v1.0/admin/prodotti', aggiuntaProdotto.prodotto).then(
                            function(res) {
                                console.log(res);
                                $state.go('admin');
                            }
                        )
                    } else {
                        // errore
                        console.log('errore nell\'invio dell\'immagine');
                        console.log(resp);
                    }
                }, function(resp) {
                    console.log('Error status: ' + resp.status);
                });
            }
        };
    }
});