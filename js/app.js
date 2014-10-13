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
		{name: "Random", selected:false},
	];

	$scope.exceeded = function() {
		return $scope.selection.length >= 4;
	};

	$scope.selection = [];

	$scope.$watch('sectors|filter:{selected:true}', function (nv) {
        $scope.selection = nv.map(function (s) {
          return s.name;
        });
        document.getElementById('emptySelection').style.display = 'none';
     }, true);

	$scope.show = function(shown, hidden) {
		document.getElementById(shown).style.display = 'block';
		document.getElementById(hidden).style.display = 'none';
	}

	$scope.chooseSectors = function() {
		if ($scope.selection.length !== 0) {
			$scope.show('page2', 'page1');
		} else {
			document.getElementById('emptySelection').style.display = 'block';
		}
	};

	$scope.$watch('emailInput', function(nv) {
		document.getElementById('emptyEmail').style.display = 'none';
	});

	$scope.enterEmail = function() {
		if ($scope.emailInput !== undefined && $scope.emailInput !== "") {
			console.log($scope.emailInput, $scope.selection);
		} else {
			document.getElementById('emptyEmail').style.display = 'block';
		}
	};

	$scope.changeOptions = function() {
		$scope.show('page1', 'page2');
	}

	$scope.newForm = function() {
		$scope.show('page1', 'page2');
		document.getElementById('emptyEmail').style.display = 'none';
		angular.forEach($scope.sectors, function (item) {
            item.selected = false;
        });
        $scope.emailInput = "";
	}
});