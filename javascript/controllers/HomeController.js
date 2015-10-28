(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);
    HomeController.$inject = ['LeagueService', '$location', '$rootScope', 'FlashService','$scope','LeagueauthService','$cookieStore'];
    function HomeController(LeagueService,	$location, $rootScope, FlashService,$scope,LeagueauthService,$cookieStore) {
        var vm = this;
		vm.addleague = addleague;
		vm.listBowlers = listBowlers;
		vm.allLeagues = {};
		

        initController();

        function initController() {
            loadCurrentUser();
			loadAllLeagues();
        }

        function loadCurrentUser() {
           vm.user = $rootScope.globals.currentUser;
		   console.log(vm.user);
        }
		
		function loadAllLeagues(){
			    console.log("loadAll begins");
				LeagueService.GetAll().then(function(leagues){
				     console.log(leagues);
				     vm.allLeagues=leagues.data;
				     console.log("what vm.allleagues look like?");
				     console.log( vm.allLeagues);
							 
			});	
		}
		
		function addleague() {
			console.log("addleague begin!");
			console.log(vm.leaguename);
            LeagueService.Create(vm.leaguename)
			      .then(function(response) {
					     vm.leaguename=null;
						 
					    console.log("create league success!!");
						loadAllLeagues();
			
                         console.log(response);
						 })
                  .catch(function(response) {
					
						console.log(response);
						
                        })
                  .finally(function() {
                   console.log("finally finished gists");
                    });
			
        }			
		
		
		 function listBowlers(id) {
			 console.log(" $location.path('/bowler') work??");
			 console.log(" id: ",id);
			 LeagueauthService.setLeague(id);
             $location.path('/bowler');
        }
			

     
    }

})();