(function () {
    'use strict';

    angular
        .module('app')
        .factory('LotteryService', LotteryService);

    LotteryService.$inject = ['$http','FlashService'];
	
    function LotteryService($http,FlashService) {
        var service = {};
        service.GetAllLotteries = GetAllLotteries;
		service.Buy=Buy;
		service.Draw=Draw;
		service.Record=Record;
		service.ListTickets= ListTickets;
		service.GetOne=GetOne;
        return service;
		
		
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



        //get all Lottery
        function GetAllLotteries(currentLeague){
		   console.log("get all Lotterys begin!");
		   var urlAllLotteries='http://bowling-api.nextcapital.com/api/leagues/'+currentLeague+'/lotteries';
           return $http({
             method: 'GET',
             url: urlAllLotteries,
             headers: {
                'Content-Type': 'application/json'
               }});
		}
		
		//Get one lottery for a league
		function GetLottery(leagueId,lotteryId){
		   var urlLottery='http://bowling-api.nextcapital.com/api/leagues/'+leagueId+'/lotteries/'+'lotteryId';
           return $http({
             method: 'GET',
             url: urlLottery,
             headers: {
                'Content-Type': 'application/json'
               }});
		}
		
		//Buy a ticket for a bowler
		function Buy(leagueId,lotteryId,bowlerId){

			 var urlBuy='http://bowling-api.nextcapital.com/api/leagues/'+leagueId+'/lotteries/'+lotteryId+'/tickets';
			 return $http({
             method: 'POST',
             url: urlBuy,
			 data:{"bowler_id": bowlerId},
             headers: {
                'Content-Type': 'application/json'
               }});
			 	
		}
		
		//draw a winning ticket
        function Draw(leagueId,lotteryId){

	        var urlDraw='http://bowling-api.nextcapital.com/api/leagues/'+leagueId+'/lotteries/'+lotteryId+'/roll';
			return $http({
            method: 'GET',
            url: urlDraw,
            headers: {
                'Content-Type': 'application/json'
               }});
			 	
		}
		//list all ticket
		
		function ListTickets(leagueId,lotteryId){

	        var url='http://bowling-api.nextcapital.com/api/leagues/'+leagueId+'/lotteries/'+lotteryId+'/tickets';
			return $http({
            method: 'GET',
            url: url,
            headers: {
                'Content-Type': 'application/json'
               }});
			 	
		}
		
		//Record
		
		 function Record(leagueId,lotteryId,pin){

	      var urlRecord='http://bowling-api.nextcapital.com/api/leagues/'+leagueId+'/lotteries/'+lotteryId+'/roll';
			return $http({
            method: 'PUT',
            url: urlRecord,
			data:{"pin_count": pin},
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