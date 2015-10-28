(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['UserService', '$location', '$rootScope', 'FlashService'];
    function RegisterController(UserService, $location, $rootScope, FlashService) {
        var vm = this;

        vm.register = register;

        function register() {
            vm.dataLoading = true;
            UserService.Create(vm.user)
			      .then(function(response) {
                        FlashService.Success('Registration successful', true);
                        $location.path('/login');
                         })
                  .catch(function(response) {
						console.log(response);
						console.log(response.data.email[0]);
                        FlashService.Error(response.data.email[0]);
                        vm.dataLoading = false;
                        })
                  .finally(function() {
               
                    });
			    /*
                .then(function (response) {
                    if (response.success) {
                        FlashService.Success('Registration successful', true);
                        $location.path('/login');
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });*/
        }
    }

})();