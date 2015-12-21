(function() {
  'use strict';
  angular
  .module('viewParties')
  .factory('ViewPartyService', function($http, $state){
    var vm = this;
    var ip = 'http://localhost';
    var viewHostedPartiesURL = ip + ':8080/party/host';
    var viewInvitedPartiesURL = ip +':8080/parties/user';

    var getHostedParties = function(userID){
      console.log('dog');
      return $http.post(viewHostedPartiesURL, userID)
        .success(function(data){
          console.log('succes view', data);
        });
    };

    var updatedHostedParties = function (data){
      return $http.patch(updatedHostedPartiesURL, data)
        .success(function(data){
          console.log('success updateParty', data);
        });
    };

    var getUserParties = function (){
      $http.get (viewInvitedPartiesURL);
    };



    return {
      getHostedParties: getHostedParties,
      updatedHostedParties: updatedHostedParties,
      getUserParties: getUserParties
    };
  });


}());
