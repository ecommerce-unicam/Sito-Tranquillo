// Definizione del modulo 'about'
angular.module('about', [
    'ui.router'
]);

// Registra il componente 'about' sul modulo 'about'
angular.module('about').component('about', {
    templateUrl: 'layout/frontend/about/about.template.html'
});