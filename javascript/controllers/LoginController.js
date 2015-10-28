(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService'];
    function LoginController($location, AuthenticationService, FlashService) {//don't mess the order!!!!
        var vm = this;
	

        vm.login = login;
        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();
		
        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.email, vm.password)
			.then(function(response) {
				        
				        AuthenticationService.SetCredentials(vm.email, vm.password);
                        FlashService.Success('Login successful', true);
                        $location.path('/home');
						console.log("why22");
                         })
                  .catch(function(response) {
						console.log(response);
                        FlashService.Error("Incorrect Password or Email");
                        vm.dataLoading = false;
                        })
                  .finally(function() {
                   console.log("finally finished gists");
                    });
        };
    }

})();