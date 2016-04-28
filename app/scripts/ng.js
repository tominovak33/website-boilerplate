/**
 * Created by tomi on 25/04/16.
 */
// This file must be the first in the list to be concatenated
angular.module('nodeChatApp', ['ngRoute'])

angular.module('nodeChatApp', ['ngRoute'])
    .config(["$routeProvider", function ($routeProvider) {
        $routeProvider
            .when('/' , {
                controller: 'MainCtrl as nodeChat',
                templateUrl: 'templates/home.html'
            })
    }]);