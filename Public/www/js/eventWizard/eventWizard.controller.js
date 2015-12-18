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
      EventWizardService,
      $ionicPopup,
      $timeout
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

      //////showSubtype()//////
      $scope.showSubtype = function(partyType){
        if(partyType.subType[0] === 'null'){
          return console.log('null');
        } else {
          return partyType;

        }
      };



      /////POST NEW PARTY/////
      $scope.newWizPartyPost = function(subType, partyType){
        var rawUserID = +localStorage.getItem('userID');
        var item = {
          party: {
            subType: subType,
            partyType: partyType
          },
          userID: rawUserID
        };
        EventWizardService.newWizPartyPost(item).success(function(data){
          console.log('You made a party', data.partyID);
          localStorage.setItem('partyID', data.partyID);
          $state.go('whenwhere');
        });
      };


      ///PATCH DATE, TIME AND NAME/////
    $scope.dateAndTimePost = function(partyDate, location){
      var partyID = +localStorage.getItem('partyID');
      var data = {
        party: {
          // location: partyLocation,
          location: location,
          partyID: partyID,
          partyDate: partyDate
        }
      };
      data.party.partyDate = JSON.stringify(data.party.partyDate);
      data.party.partyDate = JSON.parse(data.party.partyDate);
      EventWizardService.updateWizData(data).success(function(updatedWizData){
        console.log('date and time post', updatedWizData);
        $state.go('favors');
      });
    };



     ////STRETCHGOAL PATCH and SCOPES////

     $scope.stretchGoalData = function (stretchStatus, stretchGoal, stretchName){
       var partyID = +localStorage.getItem('partyID');
       var data = {
         party: {
           stretchStatus: stretchStatus,
           stretchGoal: stretchGoal,
           stretchName: stretchName,
           partyID: partyID
         }
       };
       EventWizardService.updateWizData(data).success(function(updatedWizData){
         console.log('success', updatedWizData);
         $state.go('invites');
       });
     };
     ////GET FAVORS////
      EventWizardService.getFavors().then(function(data){
        $scope.favors = data.data;
      });

     /////FAVORS PATCH/////
     vm.favorArray = [];
     $scope.isChecked = false;
     $scope.pushToFavorArray = function(data){
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
       EventWizardService.updatePartyFavorList(data);
     };
     //
    //  /////ADD FAVOR TO DATA/////
    //  $scope.addFavorToData = function(favor){
    //    var partyID = +localStorage.getItem('partyID');
    //    var favorData = {
    //      favorName: favor,
    //      partyID: partyID
    //    };
    //    EventWizardService.addFavorToData(favorData)
    //  };



       //CORDOVA CONTACTS AND INVITATIONS //
       $scope.getContactList = function() {
                 $cordovaContacts
                 .find({})
                 .then(function(result) {
                   var stringData = JSON.stringify(result);
                   var parseData = JSON.parse(stringData);
                   $scope.contactName = parseData;
                }, function(error){
                  console.log('error', error);
                });
            };
        $scope.isChecked = false;
        vm.contactArray = [];
        $scope.pushToContactArray = function(){
           var myElements = document.getElementsByClassName('true');
            _.each(myElements, function(el,idx,array){
              var parsed = JSON.parse(el.id);
              vm.contactArray.push(parsed);
            });
        };



          ///CONTACT DOM STUFF
          $scope.showConfirm = function() {
            var confirmPopup = $ionicPopup.confirm({
              title: 'Send Invitations',
              template: 'Are you ready to send out Invites and Create your Party?'
            });
            confirmPopup.then(function(res){
              if(res){
                var partyID = +localStorage.getItem('partyID');
                var contactData;
                var data;
                vm.contactDataArray=[];
                _.each(vm.contactArray, function(el,idx,array){
                  console.log('doggy dog', el.name.formatted);
                 contactData = {
                   name: el.name.formatted,
                   phone: el.phoneNumbers[0].value,
                   email: el.emails[0].value
                }
                vm.contactDataArray.push(contactData);
                data = {
                  inviteDump: vm.contactDataArray,
                  party: {
                    partyID: partyID
                  }
                }
              });
                EventWizardService.updateWizData(data).success(function(data){
                  console.log('contacts have been sent', data);
                });
              }
              else {
                alert("There was an error");
              }
            });
          };
    })


    // .controller('FavorsController', function(
    //   $scope,
    //   $http,
    //   $state,
    //   $stateParams,
    //   EventWizardService
    // ){
    //   var vm = this;
    //   ////GET FAVORS////
    //    EventWizardService.getFavors().then(function(data){
    //      $scope.favors = data.data;
    //    });
    //
    //   /////FAVORS PATCH/////
    //   vm.favorArray = [];
    //   $scope.isChecked = false;
    //   $scope.pushToFavorArray = function(data){
    //    var myElements = document.getElementsByClassName('true');
    //     _.each(myElements, function(el,idx,array){
    //       var parsed = JSON.parse(el.id);
    //       vm.favorArray.push(parsed);
    //     });
    //     var partyID = +localStorage.getItem('partyID');
    //     var data = {
    //       partyID: partyID,
    //       favorDump: vm.favorArray
    //     };
    //     EventWizardService.updatePartyFavorList(data).success(function(data){
    //       console.log('the favor list has been updated', data);
    //       $state.go('invites');
    //     });
    //   };
    //
    //   /////ADD FAVOR TO DATA/////
    //   $scope.addFavorToData = function(favor){
    //     var partyID = +localStorage.getItem('partyID');
    //     var favorData = {
    //       favorName: favor,
    //       partyID: partyID
    //     };
    //     EventWizardService.addFavorToData(favorData)
    //   };
    // })



}());
