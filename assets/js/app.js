'use strict';
/*====================================*/
/*===Developed by: Carlos Salazar ====*/
/*===Test: City of Vence ===========*/
/*===To: ysura.recruiterbox ========*/

angular
	.module('appGarage',[])
	.controller('GarageCtrl',['$scope','$http',function($scope,$http){
		var levels, slots;
		//setting number of levels and slots
		$scope.settingParking = function(){
			$scope.levelNum = [];
			$scope.levels = $scope.addNewValue.levels;
			$scope.slots = $scope.addNewValue.slots;
			
			if($scope.slots<10 || $scope.levels<4){
					return $scope.alertMsg = "For simulation purpose, Slots must be equal or more than 10 and Level equal or more than 4";
					$scope.buildParking = false;
				}else{
						$scope.buildParkingToggle = function() {
			    		$scope.buildParking = !$scope.buildParking;
			  		};
			  		if($scope.levels>4){
			  			for(var i=4; i<$scope.levels; i++)
			  				{
								$scope.levelNum.push(
									{num : i+1,}
								);
							}
				  		}else{
				  			return null;
				  		}
					return $scope.alertMsg = " ";
				}
		};
		
	$scope.myGarageFilter = function(value){
	  $scope.garageFilter = {level:value};
	}
	$scope.showAll = function(){
		$scope.all = vehicles.length;
	}
	
  	//Release vehicle and place when he leaves
  	$scope.deleteVehicle = function (vehicle) {
        var index = $scope.vehicles.indexOf(vehicle);
        if (index != -1) {
          $scope.vehicles.splice(index, 1);
        }
    }

		//dataBase already done
		$http.get('assets/vehicles.json').success(function(data){		
		$scope.vehicles = data;//json array : vehicle already parked;

		//pagination
		$scope.currentPage = 0;
    	$scope.pageSize = 6;
    	$scope.numberOfPages=function(){
        return Math.ceil($scope.vehicles.length/$scope.pageSize);                
   		}

   		//new vehicles
			$scope.addNewVehicle = function(){
				//giving a place
				$scope.randomLevel = Math.floor(Math.random()* $scope.levels)+1;
				$scope.randomSlot = Math.floor(Math.random()* $scope.slots)+1;		
				//vehicle id
				var plate = $scope.newVehicle.plateNumber,
					typeVehicle = $scope.newVehicle.typeVehicle,
				 	goVehicle;

				if(plate)
				{
					angular.forEach($scope.vehicles, function(eachVehicle)
					{
						//validating License Number Plate is not already registered
						if(plate.split(' ').join('').toLowerCase() == eachVehicle.plate.split(' ').join('').toLowerCase())
						{
							// console.log('This plate number is already registered');
							goVehicle = true;
							return $scope.dupePlate = "This plate number is already registered";

						}else if($scope.randomLevel == eachVehicle.level && $scope.randomSlot == eachVehicle.slot){
							//validating place is not already taken
							// console.log('Place is not available');
							$scope.randomLevel = Math.floor(Math.random()* $scope.levels)+1;
							$scope.randomSlot  = Math.floor(Math.random()* $scope.slots)+1;	
						  goVehicle = false;
						}else{
							return $scope.dupePlate = " ";
							goVehicle = false;
						}
					});

					//validating places available
					if($scope.vehicles.length == $scope.slots){
							goVehicle = true;
							return $scope.noPlaces = "No more places";
						}

					//everything is ok, push the vehicle
					if(!goVehicle){
						// var id = 10;
						$scope.vehicles.push(
							{
								id : id+1,
								plate: $scope.newVehicle.plateNumber,
								type: $scope.newVehicle.typeVehicle,
								level: $scope.randomLevel,
								slot: $scope.randomSlot 
							}
						)	
					}
					console.log($scope.vehicles);
				};//end plate
			}//addNewVehicle
		})//$http
	}])//controller

	//paging
	.filter('startFrom', function() {
	    return function(input, start) {
	    	if (!input || !input.length) { return; }
	        start = +start; //parse to int
	        return input.slice(start);
	    }
	});

