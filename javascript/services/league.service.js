(function () {
    'use strict';

    angular
        .module('app')
        .factory('LeagueService', LeagueService);

    LeagueService.$inject = ['$http','FlashService'];
	
    function LeagueService($http,FlashService) {
        var service = {};
        service.GetAll = GetAll;
		service.Create = Create;
		service.GetBowlers= GetBowlers;
        return service;



        //get all league
        function GetAll(){
		   console.log("get all leagues begin!");
           return $http({
             method: 'GET',
             url: 'http://bowling-api.nextcapital.com/api/leagues',
             headers: {
                'Content-Type': 'application/json'
               }});
		}
		
		//create a league
		function Create(leaguename){
		   console.log("leaguename:");
		   console.log(String(leaguename));
		   console.log("create league begin!!!!!");
           return $http({
             method: 'POST',
             url: 'http://bowling-api.nextcapital.com/api/leagues',
			 data:{"name":leaguename},
             headers: {
                'Content-Type': 'application/json'
               }}).then(function(response) {
                        console.log("create league sucess!!!");
						console.log(response);
                         });
		}
		//get all bowlers
		function GetBowlers(leagueId){
			 console.log("$$$$$$$$GetBowlers called!!!!!",leagueId);
			 var urlGetBowlers=null;
			 urlGetBowlers='http://bowling-api.nextcapital.com/api/leagues/'+String(leagueId)+'/bowlers';
			 return $http({
             method: 'GET',
             url: urlGetBowlers,
             headers: {
                'Content-Type': 'application/json'
               }});
			 	
		}
		//Get one bowler
		function GetOne(bowlerId){
			 var urlGetBowlers=null;
			 urlGetBowlers='http://bowling-api.nextcapital.com/api/bowlers/'+bowlerId;
			 return $http({
             method: 'GET',
             url: urlGetBowlers,
             headers: {
                'Content-Type': 'application/json'
               }});
			 	
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