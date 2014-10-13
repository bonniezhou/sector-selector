var sectorApp = angular.module('sectorSelector', []);

sectorApp.controller('appController', function($scope) {

	$scope.sectors = [
		{name: "Materials", selected:false},
		{name: "Energy", selected:false},
		{name: "Financials", selected:false},
		{name: "Healthcare", selected:false},
		{name: "Industrials", selected:false},
		{name: "Technology", selected:false},
		{name: "Utilities", selected:false},
		{name: "Random", selected:false}
	];

	$scope.page1 = true;
	$scope.page2 = false;
	$scope.emptySelection = false;
	$scope.emptyEmail = false;

	//Add sector to selection when clicked
	$scope.selection = [];
	$scope.$watch('sectors|filter:{selected:true}', function (nv) {
        $scope.selection = nv.map(function (s) {
          return s.name;
        });
        //Hide empty selection error message upon user input
        $scope.emptySelection = false;
     }, true);

	//Toggle sector.selected when clicked
	$scope.toggle = function(sect) {
		if ($scope.selection.length < 4 || sect.selected) {
			sect.selected = !sect.selected;
		}
	};

	//Applies style class to sector div
	$scope.chooseClass = function(sect) {
		if (sect.selected) {
			return "checked";
		} else if ($scope.selection.length >= 4 && !sect.selected) {
			return "disabled";
		} else {
			return "regular";
		}
	};

	//Submit Page 1 sector selection form
	$scope.submitChoices = function() {
		if ($scope.selection.length !== 0) {
			$scope.page2 = true;
			$scope.page1 = false;
		} else {
			$scope.emptySelection = true;
		}
	};

	//Submit Page 2 e-mail form
	$scope.enterEmail = function() {
		if ($scope.emailInput !== undefined && $scope.emailInput !== "") {
			console.log($scope.emailInput, $scope.selection);
		} else {
			$scope.emptyEmail = true;
		}
	};

	$scope.$watch('emailInput', function(nv) {
		$scope.emptyEmail = false;
	});

	$scope.changeOptions = function() {
		$scope.page1 = true;
		$scope.page2 = false;
		$scope.emptyEmail = false;
	};

	$scope.newForm = function() {
		$scope.page1 = true;
		$scope.page2 = false;
		$scope.emptyEmail = false;
		angular.forEach($scope.sectors, function (item) {
            item.selected = false;
        });
        $scope.emailInput = "";
	};
});