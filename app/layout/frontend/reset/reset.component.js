// Definizione del modulo 'reset'
angular.module('reset', [
    'ui.router',
    'ngMessages'
]);

angular.module('reset').component('reset', {
    templateUrl: 'layout/frontend/reset/reset.template.html',
    controller: function($http, $stateParams, $scope) {
        var resetCtrl = this;
        resetCtrl.validaRisposta = function() {
            $http.post('/api/v1.0/utenti/validaRisposta', { username: resetCtrl.utente.username, risposta_segreta: resetCtrl.risposta })
                .then(function(response) {
                    if (response.data.successo === true)
                        $scope.rispostaGiusta = 1;
                }, function(err) {
                    resetCtrl.risposta = '';
                    $scope.rispostaGiusta = 0;
                });
        };
        resetCtrl.resetPwd = function() {
            $http.post('/api/v1.0/utenti/resetPw', { username: resetCtrl.utente.username, nuova_password: resetCtrl.password })
                .then(function(resp2) {
                    if (resp2.data.successo === true)
                        $scope.pwResettata = 1;
                }, function(err) {
                    console.log(err);
                })
        };
        $http.post('/api/v1.0/utenti/validaToken', { token: $stateParams.token }).then(function(res) {
            if (res.data.successo === true) {
                console.log(res.data);
                resetCtrl.utente = res.data.user;
                $scope.tokenValido = true;

            } else $scope.tokenValido = false;
        }).catch(function(err) {
            console.log(err);
            $scope.tokenValido = false;
        });
        $scope.rispostaGiusta = -1;
        $scope.pwResettata = -1
    }
});