(function() {
  'use strict';

  angular
    .module('eventWizard')
    .factory('EventWizardService', function($http){
      var getWizard = function() {
        return $http.get('http://localhost:8080/wizard')
      }

      return {
        getWizard: getWizard,

      }
    });




}());
