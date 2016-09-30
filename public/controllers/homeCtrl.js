angular.module( 'coderFriendsApp' )
    .controller( 'homeCtrl', function( $http, $scope, githubService, friends, user ) {

        console.log( 'friends is ', friends );
        $scope.friends = friends.data;
        console.log( 'user is ', user );
        $scope.user = user.data;

    } );
