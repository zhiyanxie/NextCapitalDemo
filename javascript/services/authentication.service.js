(function () {
    'use strict';

    angular
        .module('app')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '$cookieStore', '$rootScope', '$timeout', 'UserService'];
    function AuthenticationService($http, $cookieStore, $rootScope, $timeout, UserService) {
        var service = {};

        service.Login = Login;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;

        return service;
		

        function Login(email, password, callback)  {
			 var auth = "Basic "+btoa(email+":"+password);
			 console.log("login still works");
             return $http({
			            method:"POST",
			            url:'http://bowling-api.nextcapital.com/api/login',
						headers:{
						'Content-Type': 'application/json',
						'Authorization': auth
						         }
			            })
                       .success(function(response) {
				       console.log(response);
                          
                                                  })
			           .error(function(response) {
                        console.log(response);
                                                 });
	  }
         
	    function SetCredentials(email, password) {
            var auth = "Basic "+btoa(email+":"+password);

            $rootScope.globals = {
                currentUser: {
                    username: email,
                    authdata: auth
                }
            };

            $http.defaults.headers.common['Authorization'] = auth; // jshint ignore:line
            $cookieStore.put('globals', $rootScope.globals);
        }

       function ClearCredentials() {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic ';
        }
     
	
     
	}

})();