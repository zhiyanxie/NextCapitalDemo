(function () {
    'use strict';

    angular
        .module('app')
        .controller('BowlerController', BowlerController);
    BowlerController.$inject = ['BowlerService', '$location', '$rootScope', 'FlashService','$scope','LeagueauthService','$cookieStore','LotteryService', '$modal', '$log'];
     function BowlerController(BowlerService,$location, $rootScope, FlashService,$scope,LeagueauthService,$cookieStore,LotteryService, $modal, $log) {
        var vm = this;
		$rootScope.foo=1;
		vm.allBowlers= {};
		vm.allLotteries=[];
		vm.allTickets=null;
		vm.currentLottery=[];
		vm.addBowler=addBowler;
		//vm.BuyTicket=BuyTicket;
		vm.DrawTicket=DrawTicket;
		vm.Pay=Pay;
	
		$scope.open=open;
        initController();
		 //that $rootScope with $watch is magic, don't touch
		 $rootScope.$watch('foo', function() {
                  initController();
          });

        function initController() {
		    loadCurrentLeague();
            loadCurrentUser();
			loadCurrentLottery();
			console.log("$rootScope.currentLeague",vm.currentLeague);
			loadAllBowlers(vm.currentLeague);
			
		}

        function loadCurrentUser() {
           vm.user = $rootScope.globals.currentUser;
		   console.log(vm.user);
        }
		
		 function loadCurrentLeague() {
           vm.currentLeague =  $cookieStore.get('currentLeague');
        }
		
		function loadCurrentLottery(){
			
			LotteryService.GetAllLotteries(vm.currentLeague)
			    .then(function(response){ 
			     console.log("GetAllLotteries response",response.data);
				 var length=response.data.length;
				 console.log(" response.data",response.data);
				 console.log(" length",length);
				 vm.currentLottery = response.data[length-1];
				 //after loading the currentLottery then load the tickets
				 console.log("@@vm.currentLottery",vm.currentLottery);
				 loadCurrentTickets(vm.currentLottery.league_id,vm.currentLottery.id);
				 });
			
		}
		
		function loadCurrentTickets(leagueId,lotteryId){
			console.log("vm.currentLeague,vm.currentLottery.id",leagueId,lotteryId);
			LotteryService.ListTickets(leagueId,lotteryId)
			       .then(function(response){
					   console.log("loadCurrentTickets",response);
					   vm.allTickets=response.data.length;
					   console.log("vm.alltickets length",vm.alltickets);
				   })
		}
			
		
		
		
		function addBowler() {
			console.log("addBowler begin!");
			console.log("vm.currentLeague",vm.currentLeague);
            BowlerService.Create(vm.bowlerName)
			     .then(function(response) {
					     console.log("create bowler success!!");
						 loadAllBowlers();
                         console.log("addbowler ,data:   ",response.data.id);
						 console.log("vm.bowlerId=response.data.id",vm.bowlerId);
						 console.log("response.data.id");
						 console.log("vm.currentLeague",vm.currentLeague);
						 BowlerService.AddLeague(response.data.id,vm.currentLeague).then(function(response){
							 console.log("add bowler to league",response)});
							 loadAllBowlers();
							 loadAllBowlers();
						 })
				  .catch(function(response) {
						console.log(response);				
                        });
			
			
        }
		
		function loadAllBowlers(){
			    console.log("loadAllBowlers begins");
				BowlerService.GetAll(vm.currentLeague).then(function(loadAllBowlers){
				     console.log("loadAllBowlers: ",loadAllBowlers);
				     vm.allBowlers=loadAllBowlers.data;
				     console.log("what vm.allBowlers look like?");
				     console.log( vm.allBowlers);
							 
			});	
		}
		
		/*eariler!!!function BuyTicket(bowlerId){
			console.log("buyTicket hit!!! and BolwerId:",bowlerId);
			console.log(vm.currentLeague, " ",vm.currentLottery.id," ",bowlerId);
		    LotteryService.Buy(vm.currentLeague,vm.currentLottery.id,bowlerId)
			.then(function(response){
				console.log(response);
				alert("Thank you!$10 has been added to prize pool");
				loadCurrentLottery();
			});
		}*/
		
		function DrawTicket(){
			if(vm.allTickets==null || vm.allTickets<5){
				alert("Buy more tickets, Total tickets must be larger than 5! We only have "+vm.allTickets+" tickets!!!");}
		    else{
		     LotteryService.Draw(vm.currentLeague,vm.currentLottery.id)
			      .then(function(response){
					  console.log(vm.currentLeague, " ",response.data.lottery_id," ",response.data.bowler_id);
					  var pin=Math.floor(Math.random() * (7 - 0 + 1)) + 0;
					  LotteryService.Record(vm.currentLeague,response.data.lottery_id,pin)
					       .then(function(response){
							   console.log("@@@@@@Record response",response);
							   LotteryService.GetOne(response.data.bowler_id).then(function(response){
		                alert("Congratulation to  "+response.data.name+"!!!");
								   loadCurrentLottery();
							   })
							   
						   });  
				  });
			   }
		
		}
		
		//create view history button function
		function open(){
		       vm.modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: 'lg',
                  resolve: {
                      }
                                            });

		 }
		 
		 //Payment 
		function Pay(currentLeague,currentLotteryId,bowlerId) {
                $modal.open({
                templateUrl: 'Pay.html',
                controller: ['$rootScope','$http','$modalInstance','currentLeague','currentLotteryId','bowlerId', PayModalCtrl],
                controllerAs: 'vm',
                resolve: {
				     currentLeague: function () { return currentLeague },
					 currentLotteryId: function () { return currentLotteryId },
                     bowlerId: function() { return bowlerId; }
					 
                 }
             });
		}
		 
		
	 
	 
	 
	 
	 
	 
	 
    }
	////////outside main controller
	function PayModalCtrl($rootScope,$http,$modalInstance, currentLeague,currentLotteryId,bowlerId) {
               var vm= this;
	             vm.Buy=Buy;
				 vm.Cancel=Cancel;
				 vm.currentLeague=currentLeague;
				 vm.currentLotteryId=currentLotteryId;
				 vm.bowlerId=bowlerId;
	                  
	            console.log("((((((((((((((((", currentLeague,currentLotteryId,bowlerId);
	            function Buy() {
	             var urlBuy='http://bowling-api.nextcapital.com/api/leagues/'+vm.currentLeague+'/lotteries/'+vm.currentLotteryId+'/tickets';
			     $http({
                        method: 'POST',
                        url: urlBuy,
			            data:{"bowler_id":  vm.bowlerId},
                        headers: {
                             'Content-Type': 'application/json'
                                }})
								.then(function(response){
									
									console.log("&&&&&&&&&&&&",response);
									console.log($rootScope.foo);
									$rootScope.foo--;
									console.log($rootScope.foo);
									$modalInstance.close();})
                }
				function Cancel() {
	                 $modalInstance.dismiss('Cancel');
                }
	}
///////////////////////////////
})();








//View instance outside the whole function
angular.module('app').controller('ModalInstanceCtrl',['LotteryService','$scope','$modalInstance','$cookieStore', function (LotteryService,$scope, $modalInstance, $cookieStore) {
	var vm= this;
	$scope.lotteries=[];
	load();
	
	function load() {
           vm.currentLeague =  $cookieStore.get('currentLeague');
		   LotteryService.GetAllLotteries(vm.currentLeague)
			    .then(function(response){ 
			     console.log("load()response.data ",response.data);
				 $scope.lotteries = response.data;
				 console.log("$scope.lotteries=[]",$scope.lotteriesa);
                 });
	}
	
	
      $scope.cancel = function () {
                     $modalInstance.dismiss('cancel');
       };
}]);

//payment

/*angular.module('app').controller('PayModalCtrl',['LotteryService','$scope','$modalInstance','$cookieStore', function ($modalInstance,currentLeague,currentLotteryId,bowlerId) {
	var vm= this;
	vm.Buy=Buy;
	vm.pcurrentLeague = currentLeague;
    vm.currentLotteryId = currentLotteryId;
	vm.bowlerId = bowlerId;
	
	function Buy(currentLeague,currentLotteryId,bowlerId) {
    console.log("***************",currentLeague,currentLotteryId,bowlerId);
  }

 
}]);*/

