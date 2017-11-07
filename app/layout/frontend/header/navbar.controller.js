// Definizione del modulo 'navbar'
var navbar = angular.module('navbar', [
    'ui.router'
]);

navbar.controller('navbarCtrl', ['$scope', '$location', '$window', function($scope, $location, $window) {
    $scope.nome_utente = "";
    // Questo blocco l'ho ripetuto qui così ogni volta che l'oggetto "navbarCtrl" viene creato
    // farà il check, che poi verrà fatto anche ogni volta che si cambia la location
    if ($window.localStorage.getItem("jwtToken") == "" || $window.localStorage.getItem("jwtToken") == undefined) {
        $scope.navbarTemplate = 'layout/frontend/header/navbar.noautenticazione.template.html';
    } else {
        $scope.navbarTemplate = 'layout/frontend/header/navbar.siautenticazione.template.html';
        $scope.nome_utente = $window.localStorage.getItem("username");
        $scope.isAdmin = $window.localStorage.getItem("admin");
    }
    $scope.$on('$locationChangeSuccess', function() { // INVECE DI LOCATIONCHANGE?
        if ($window.localStorage.getItem("jwtToken") == "" || $window.localStorage.getItem("jwtToken") == undefined) {
            $scope.navbarTemplate = 'layout/frontend/header/navbar.noautenticazione.template.html';
        } else {
            $scope.navbarTemplate = 'layout/frontend/header/navbar.siautenticazione.template.html';
            $scope.nome_utente = $window.localStorage.getItem("username");
            $scope.isAdmin = $window.localStorage.getItem("admin");
        }
    });

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

}]);