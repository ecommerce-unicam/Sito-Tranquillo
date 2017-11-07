// Definizione del modulo 'modificaProdotti'
angular.module('modificaProdotti', [
    'ui.router',
    'ngFileUpload'
]);

// Registra il componente 'modificaProdotti' sul modulo 'modificaProdotti'
angular.module('modificaProdotti').component('modificaProdotti', {
    templateUrl: 'layout/backend/modificaProdotti/modificaProdotti.template.html',
    controller: function(Upload, $http, $state, $stateParams, $window) {
        var modificaProdotti = this;
        var id = $stateParams.id;
        var prodottoOrig;
        $http.get('api/v1.0/prodotti/' + id).then(function(response) {
            modificaProdotti.prodotto = response.data;
            delete modificaProdotti.prodotto._id;
            prodottoOrig = angular.copy(modificaProdotti.prodotto);
        });
        modificaProdotti.reset = function() {
            modificaProdotti.prodotto = angular.copy(prodottoOrig);
        };
        modificaProdotti.eseguiPut = function() {
            modificaProdotti.prodotto.token = $window.localStorage.getItem("jwtToken");
            $http.put('api/v1.0/admin/prodotti/' + id, modificaProdotti.prodotto).then(
                function(res) {
                    $state.go('admin');
                },
                function(err) {
                    console.log('errore!\n', err.data);
                }
            )
        };
        modificaProdotti.aggiornaProdotto = function() {
            if (modificaProdotti.immagine) {
                var vecchioURLImmagine = modificaProdotti.prodotto.urlImmagine;
                // dato che si sta cambiando l'immagine elimino la vecchia
                $http.delete('api/v1.0/immagini/' + vecchioURLImmagine).then(function(resp1) {
                    // sia se non esisteva il vecchio file, sia se esisteva, carico la nuova immagine
                    var nuovoURLImmagine;
                    Upload.upload({
                        url: '/api/v1.0/immagini',
                        data: { file: modificaProdotti.immagine }
                    }).then(function(resp2) {
                        if (!resp2.data.errore) {
                            // immagine caricata
                            nuovoURLImmagine = resp2.data.nomeFile;
                            // sia se non esisteva il file, sia se esisteva,
                            // cambio l'url contenuto nel prodotto
                            modificaProdotti.prodotto.urlImmagine = nuovoURLImmagine;
                            modificaProdotti.eseguiPut();
                        }
                    });
                });
            } else
                modificaProdotti.eseguiPut();
        }
    }
});