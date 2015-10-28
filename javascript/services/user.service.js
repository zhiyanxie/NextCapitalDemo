(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$http','FlashService'];
	
    function UserService($http,FlashService) {
        var service = {};
        service.Create = Create;
        return service;



        /*function Create(user) {
            return $http.post('/api/users', user).then(handleSuccess, handleError('Error creating user'));
        }*/
		
        function Create(user){
		   var email = String(user.email);
		   var userData={
                  "email": email,
                  "password": user.password
                       }
           return $http({
             method: 'POST',
             url: 'http://bowling-api.nextcapital.com/api/users',
             data: userData,
             headers: {
                'Content-Type': 'application/json'
               }}).then(function(response) {
                        console.log("sucess!!!");
						console.log(response);
                         })
						 /*
                  .catch(function(response) {
					    console.log(response);
                        FlashService.Error(response.message);
                        })
                  .finally(function() {
                  
                    })*/;
		}

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();
