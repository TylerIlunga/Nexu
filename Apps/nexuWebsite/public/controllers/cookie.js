var app = angular.module("products", []);

app.controller("jordanCookie", ['$scope', function($scope){

	$scope.cookies = [
		
		function setCookie(cname, cvalue, exdays) {
			var d = new Date();
			d.setTime(d.getTime() + (exdays*24*60*60*1000));
			//Expires

			//Set Cookie
			document.cookie = cname + "=" + cvalue + ";";

			
		};

		function getCookie(cname){
			var name = cname + '=';
			var ca = document.cookie.split(';');
			for(var i=0; i<ca.length; i++) {
				var c = ca[i];
				while(c.charAt(0)=='') c = c.cubstring(1);
				if (c.indexOf(name) == 0) {
					return c.substring(name.length, c.length);
				}
			}

			return "";

		};

		function checkCookie() {
			var product = getCookie("productName");
			if (product != "") {
				return product;
			} else {
				console.log("Product not defined.");
				if (product != && product != null) {
					setCookie("productName", product, 30);
				}
			}

		};

	];



}]);