angular.module( 'coderFriendsApp', [ 'ui.router' ] )
    .config( function ( $httpProvider, $stateProvider, $urlRouterProvider ) {
        $urlRouterProvider.otherwise( '/' );

        $stateProvider
            .state( 'base', {
                url: '/'
                , templateUrl: './index.html'
            } )
            .state( 'home', {
                url: '/home'
                , templateUrl: './templates/home.html'
                , controller: 'homeCtrl'
                , resolve: {
                      friends( githubService ) {
                        return githubService.getFollowing();
                      }
                      , user( githubService ) {
                        return githubService.getUser();
                      }
                }
            } )
            .state( 'friend', {
                url: '/friend/:github_username'
                , templateUrl: './templates/friend.html'
            } )
    } )
