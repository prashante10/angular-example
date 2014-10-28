(function () {
    'use strict';

    var app = angular.module('app');

    // Collect the routes
    app.constant('routes', getRoutes());
    
    // Configure the routes and route resolvers
    app.config(['$routeProvider', 'routes', routeConfigurator]);
    function routeConfigurator($routeProvider, routes) {

        routes.forEach(function (r) {
            $routeProvider.when(r.url, r.config);
        });
        $routeProvider.otherwise({ redirectTo: '/' });
    }

    // Define the routes 
    function getRoutes() {
        return [
            {
                url: '/',
                config: {
                    title: 'prospects',
                    templateUrl: 'app/prospect/prospects.html',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-user"></i> Prospects'
                    }
                }
            },
            {
                url: '/prospect/new',
                config: {
                    title: 'prospectdetail',
                    templateUrl: 'app/prospect/prospectdetail.html',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-plus-sign"></i> Create'
                    }
                }
            }
        ];
    }
})();