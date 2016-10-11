/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'finndis',
    environment: environment,
    baseURL: '/',
    // locationType: 'auto',
    defaultLocationType: 'auto',
    // host: 'https://blooming-caverns-80676.herokuapp.com/',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    cordova: {
      rebuildOnChange: false,
      emulate: false
    }
  };

  ENV['contentSecurityPolicy'] = {
    'font-src': "'self' data: https://cdn.auth0.com",
    'style-src': "'self' 'unsafe-inline'",
    'script-src': "'self' 'unsafe-eval' 'unsafe-inline' https://cdn.auth0.com",
    'connect-src': "'self' http://localhost:* jsan.eu.auth0.com"
  };

  ENV['ember-simple-auth'] = {
    authenticationRoute: '/',
    routeAfterAuthentication: '/home',
    routeIfAlreadyAuthenticated: '/home'
  };

  ENV['auth0-ember-simple-auth'] = {
    clientID: "FMZufJhjZQHbC0uGPoF58PP5RUFqF22Q",
    domain: "jsan.eu.auth0.com"
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.APP.API_HOST = 'https://blooming-caverns-80676.herokuapp.com/';
  }

  return ENV;
};
