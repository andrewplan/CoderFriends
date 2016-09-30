angular.module( 'coderFriendsApp' )
    .controller( 'friendCtrl', function( $scope, $stateParams, eventData ) {
        console.log( eventData );
        $scope.username = $stateParams.github_username;
        $scope.events = eventData.data;
    } )
