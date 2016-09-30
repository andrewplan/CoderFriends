angular.module( 'coderFriendsApp' )
    .service( 'githubService', function( $http ) {

        var currentUser;

        this.getUser = function() {
            return $http.get( '/user' );
        }

        this.getCurrentUser = function() {
            return currentUser;
        };

        this.getFollowing = function() {
            this.getUser().then( user => {
              currentUser = user;
              return user;
            } );
            return $http.get( '/api/github/following', currentUser )
              .then( following => {
                // console.log( following );
                return following;
            } );
        };

        this.getFriendActivity = function( username ) {
            return $http.get( '/api/github/' + username + '/activity' );
        }; 

    } );
