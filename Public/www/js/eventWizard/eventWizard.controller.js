(function() {
  'use strict';
  angular
    .module("eventWizard")
    .controller("EventWizardController", function(
      $scope,
      $http,
      $state,
      $stateParams,
      $cordovaContacts,
      $ionicPlatform,
      EventWizardService
    ){
        var vm = this;


        ////GET WIZARD DATA////
        EventWizardService.getWizard().then(function(data){
          $scope.wizardItems = data;
          $scope.get = function(nameId) {
            var id = parseInt(nameId.nameId);
            for (var i = 0; i < data.data.length; i++) {
              if (i === id) {
                return data.data[i-1];
              }
            }
          return null;
        };
        $scope.partySubType = $scope.get($stateParams);
      });



      /////POST NEW PARTY/////
      $scope.newWizPartyPost = function(subType, partyType){
        var item = {subType: subType, partyType: partyType};
        EventWizardService.newWizPartyPost(item).success(function(data){
          console.log('newly created party: ', data);
          localStorage.setItem('partyID', data.partyID);
          $state.go('whenwhere');
        });
      };


      ///PATCH DATE, TIME AND NAME/////
    $scope.dateAndTimePost = function(partyDate, partyName){
      var partyID = +localStorage.getItem('partyID');
      console.log('partyId in localstorage', partyID);
      var data = {
        partyName: partyName,
        partyID: partyID,
        partyDate: partyDate
      };
      data.partyDate = JSON.stringify(data.partyDate);
      data.partyDate = JSON.parse(data.partyDate);
      console.log('updated party data: ', data);
      EventWizardService.updateWizData(data).success(function(updatedWizData){
        console.log('promise return of updated wizdata', updatedWizData);
        $state.go('favors');
      });
    };



     ////STRETCHGOAL PATCH and SCOPES////

     $scope.stretchGoalData = function (stretchStatus, stretchGoal, stretchName){
       var partyID = +localStorage.getItem('partyID');
       console.log(partyID);
       var data = {
         stretchStatus: stretchStatus,
         stretchGoal: stretchGoal,
         stretchName: stretchName,
         partyID: partyID
       };
       console.log('updated stretchgoal:', data);
       EventWizardService.updateWizData(data).success(function(updatedWizData){
         console.log('new-stretchgoal updated data', updatedWizData);
         $state.go('invites');
       });
     };


     /////FAVORS PATCH/////
     vm.favorArray = [];

     $scope.isChecked = false;
     $scope.pushToFavorArray = function(data){
      //  var $element.find('true');
      var myElements = document.getElementsByClassName('true');
       _.each(myElements, function(el,idx,array){
         var parsed = JSON.parse(el.id);
         vm.favorArray.push(parsed);
       });
       var partyID = +localStorage.getItem('partyID');
       var data = {
         partyID: partyID,
         favorDump: vm.favorArray
       };
       EventWizardService.updateWizData(data).success(function(data){
         console.log('favordata', data);
       });
     };

     /////ADD FAVOR TO DATA/////
     $scope.addFavorToData = function(favor){
       var partyID = +localStorage.getItem('partyID');
       var favorData = {
         favorName: favor,
         partyID: partyID
       };
       EventWizardService.addFavorToData(favorData).success(function(data){
         console.log('added favor to data', data);
       });
     };


       /////GET STATIC FAVORS///////
       EventWizardService.getFavors().success(function(data){
         $scope.favors = data;
       });


      //CORDOVA CONTACTS AND INVITATIONS //
        vm.contactData = [];
      $scope.getContactList = function() {
                $cordovaContacts
                .find({})
                .then(function(result) {
                  var stringData = JSON.stringify(result);
                  var parseData = JSON.parse(stringData);
                  $scope.contactName = parseData;
                  vm.contactData = parseData;
               }, function(error){
                 console.log('error', error);
               });
           };
        var mappedContactData = _.map(contactData, function(idx, val, arr){
          return {inviteName: el.name.formatted, invitePhone: el.phoneNumbers[0].value, inviteEmail: el.emails[0].value}
        });
       $scope.contactInfoForSMS = function(name, phone, email){
         var partyID = +localStorage.getItem('partyID');
         var data = {
           inviteName: name,
           invitePhone: phone,
           inviteEmail: email,
           partyID: partyID
         };
         EventWizardService.postInviteData(data).success(function(postedInviteData){
           console.log('new-stretchgoal updated data', postedInviteData);
           $state.go('');
       });
     };

    });
}());
