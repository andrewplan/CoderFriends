angular.module( 'coderFriendsApp', [ 'ui.router' ] )
    .config( function ( $httpProvider, $stateProvider, $urlRouterProvider ) {
        $urlRouterProvider.otherwise( '/' );

        $httpProvider.defaults.headers.common[ 'X-Requested-With' ] = 'XMLHttpRequest';
        $httpProvider.interceptors.push( 'myHttpInterceptor' );

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
                , controller: 'friendCtrl'
                , resolve: {
                      eventData( $stateParams, githubService ) {
                          return githubService.getFriendActivity( $stateParams.github_username );
                      }
                  }
            } )
    } )
    .factory( 'myHttpInterceptor', function( $q ) {
        return {
            responseError( rejection ) {
                if ( rejection.status == 403 ) {
                    document.location = '/';
                    return;
                }
                return $q.reject( rejection );
            }
        };
    } )
