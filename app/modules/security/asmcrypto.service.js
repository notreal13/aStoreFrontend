'use strict';

// add "asmCrypto" library as a service
angular.module('aStoreFrontend')
	.factory('asmCrypto', function() {
		return window.asmCrypto;
	});