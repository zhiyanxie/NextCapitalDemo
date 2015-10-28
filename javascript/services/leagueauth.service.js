(function () {
    'use strict';

    angular
        .module('app')
        .factory('LeagueauthService', LeagueauthService);

    LeagueauthService.$inject = ['$http', '$cookieStore', '$rootScope', 'UserService'];
    function LeagueauthService($http, $cookieStore, $rootScope, UserService) {
        var service = {};

        service.setLeague = setLeague;
        service.clearLeague = clearLeague;

        return service;
		
         
	    function setLeague(leagueId) {

            $rootScope.currentLeague=leagueId;
            $cookieStore.put('currentLeague',  $rootScope.currentLeague);
			console.log("setLeague!!!","$cookieStore.currentLeague: ",	 $rootScope.currentLeague);
			console.log("$rootScope.currentLeagu" ,$rootScope.currentLeague);
        }

       function clearLeague() {
            $rootScope.currentLeague = {};
            $cookieStore.remove('currentLeague');
        }
     
	
     
	}

})();