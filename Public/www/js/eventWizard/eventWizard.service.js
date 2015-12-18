(function() {
  'use strict';

  angular
    .module('eventWizard')
    .factory('EventWizardService', function($http, $state){
      var ip = 'http://localhost';
      var wizCreateUrl = ip + ":8080/party/create";
      var wizUpdateUrl = ip + ":8080/party/update";
      var favorUpdateUrl = ip + ":8080/party/favor";
      var favorGetUrl = ip + ":8080/favor";
      var addFavorToDataUrl = ip + ":8080/party/favor/add";
      var getWizardUrl = ip + ":8080/wizard";
      var invitePostUrl = ip + ":8080/party/invite";
      var testJSONUrl = "./jsonthingythatwearelookingat.json";


      var getWizard = function() {
        return $http.get(getWizardUrl);
      };
      var newWizPartyPost = function(item){
        return $http.post(wizCreateUrl, item);
      };
      var getOneWizParty = function (wizID){
        return $http.get(getWizardUrl);
      };
      var updateWizData = function(updatedWizData){
        return $http.patch(wizUpdateUrl, updatedWizData);
      };
      var addFavorToData = function(favor) {
        return $http.post(addFavorToDataUrl, favor);
      };
      var updateFavorData = function(updatedFavorData){
        console.log('services', updatedFavorData);
        return $http.patch(wizUpdateUrl, updatedFavorData);
      };
      var updatePartyFavorList = function (data){
        $state.go('invites');
        return $http.post(favorUpdateUrl, data);
      };
      var getFavors = function () {
        return $http.get(favorGetUrl);
      };
      var postInviteData = function(inviteData){
        return $http.post(invitePostUrl, inviteData);
      };
      var getFakeData = function(fakeData){
        return $http.get(testJSONUrl);
      };

      return {
        getWizard: getWizard,
        newWizPartyPost: newWizPartyPost,
        updateWizData: updateWizData,
        getOneWizParty: getOneWizParty,
        getFavors: getFavors,
        updateFavorData: updateFavorData,
        addFavorToData: addFavorToData,
        postInviteData: postInviteData,
        updatePartyFavorList: updatePartyFavorList,
        getFakeData: getFakeData
      };

    });





}());
