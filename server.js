const express = require( 'express' );
const session = require( 'express-session' );
const passport = require( 'passport' );
const cors = require( 'cors' );
const GitHubStrategy = require( 'passport-github2' ).Strategy;
// const githubRoutes = require( './features/github/githubRoutes' );
const GitHubApi = require( 'github' );
const config = require( './config' );
const port = 3000;

const app = express();

app.use( cors() );
app.use( session( { secret: config.mySecrets.secret } ) );
app.use( passport.initialize() );
app.use( passport.session() );
app.use( express.static( `${ __dirname }/public/` ) );

passport.use( new GitHubStrategy( {
    clientID: config.github.clientID
    , clientSecret: config.github.secret
    , callbackURL: config.github.cbUrl
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate( { githubId: profile.id }, ( err, user ) => {
      // console.log( profile );
      return done( null, profile );
    // });
  }
));

app.get( '/auth/github', passport.authenticate( 'github', { scope: [ 'user:email' ] } ) );
app.get( '/auth/github/callback',
  passport.authenticate( 'github', { failureRedirect: '/login' } ),
  // Successful authentication, redirect home
  ( req, res ) => {
      res.redirect( '/#/home' )
    }
);

passport.serializeUser( ( user, done ) => done( null, user ) );
passport.deserializeUser( ( obj, done ) => done( null, obj ) );

app.get( '/user', ( req, res ) => {
    // console.log( req.user );
    res.send( req.user );
} );

const github = new GitHubApi();

var requireAuth = function( req, res, next ) {
    if ( !req.isAuthenticated() ) {
      return res.status( 403 ).end();
    }
    next();
};

app.get( '/api/github/following', requireAuth, ( req, res ) => {
  github.users.getFollowingForUser(
    { user: req.user.username } , ( err, following ) => {
      console.log( following );
      res.send( following );
    }
  );
} );

app.get( '/api/github/:username/activity', requireAuth, ( req, res ) => {
  github.activity.getEventsForUser(
    { user: req.params.username }, ( err, events ) => {
        console.log( events );
        res.send( events );
    }
  );
} );

app.listen( port, () => { console.log( `Listening on port ${ port }` ) } );
