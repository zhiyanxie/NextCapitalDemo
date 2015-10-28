(function () {
    'use strict';

    angular
        .module('app')
        .factory('BowlerService', BowlerService);

    BowlerService.$inject = ['$http','FlashService'];
	
    function BowlerService($http,FlashService) {
        var service = {};
        service.GetAll = GetAll;
		service.Create = Create;
		service.GetBowlers= GetBowlers;
		service.AddLeague= AddLeague;
        return service;



        //get all Bowler
        function GetAll(currentLeague){
		   console.log("get all Bowlers begin!");
		   var urlBowlers='http://bowling-api.nextcapital.com/api/leagues/'+currentLeague+'/bowlers';
           return $http({
             method: 'GET',
             url: urlBowlers,
             headers: {
                'Content-Type': 'application/json'
               }});
		}
		
		//create a Bowler
		function Create(name){
		   var urlBowler='http://bowling-api.nextcapital.com/api/bowlers';
           return $http({
             method: 'POST',
             url: urlBowler,
			 data:{"name": name},
             headers: {
                'Content-Type': 'application/json'
               }})
		}
		
		function AddLeague(bowlerId,currentLeague){
			console.log("AddLeague!!!!!!");
			console.log("bowlerId",bowlerId);
			var urlAdd='http://bowling-api.nextcapital.com/api/leagues/'+currentLeague+'/bowlers';
            return $http({
             method: 'PUT',
             url: urlAdd,
			 data:{ "bowler_id": bowlerId},
             headers: {
                'Content-Type': 'application/json'
               }})
		}
			
			
		
		//get all bowlers
		function GetBowlers(leagueId){
			 var urlGetBowlers='http://bowling-api.nextcapital.com/api/leagues/'+String(leagueId)+'/bowlers';
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