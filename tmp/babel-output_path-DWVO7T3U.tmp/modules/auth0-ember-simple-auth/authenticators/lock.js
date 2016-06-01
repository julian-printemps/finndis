/* globals Auth0Lock, b64utos, KJUR */
import Ember from 'ember';
import BaseAuthenticator from 'ember-simple-auth/authenticators/base';
import getOwner from 'ember-getowner-polyfill';

var read = Ember.computed.readOnly,
    bool = Ember.computed.bool;

export default BaseAuthenticator.extend({

  //=======================
  // Properties
  //=======================

  /**
   * The session data
   * @type {Ember Object}
   */
  sessionData: read('_sessionData'),

  /**
   * The env config found in the environment config.
   * ENV['auth0-ember-simple-auth']
   *
   * @type {Object}
   */
  config: read('_config'),

  /**
   * Auth0 Lock Instance
   * @type {Auth0Lock}
   */
  lock: read('_lock'),

  /**
   * The Auth0 App ClientID found in your Auth0 dashboard
   * @type {String}
   */
  clientID: read('_clientID'),

  /**
   * The Auth0 App Domain found in your Auth0 dashboard
   * @type {String}
   */
  domain: read('_domain'),

  /**
   * The auth0 userID.
   * @return {String}
   */
  userID: read('_sessionData.profile.user_id'),

  /**
   * The access token.
   * @return {String}
   */
  accessToken: read('_sessionData.accessToken'),

  /**
   * The refresh token used to refresh the temporary access key.
   * @return {String}
   */
  refreshToken: read('_sessionData.refreshToken'),

  /**
   * Is there currently a refresh token
   * @return {Boolean}
   */
  hasRefreshToken: bool('refreshToken'),

  /**
   * The current session JWT.
   * @return {Base64 url encoded JWT}
   */
  jwt: read('_sessionData.jwt'),

  /**
   * Is there currently a jwt?
   * @return {Boolean}
   */
  hasJWT: Ember.computed('jwt', function () {
    return !Ember.isBlank(this.get('jwt'));
  }),

  /**
   * The current JWT's expire time
   * @return {Number in seconds}
   */
  expiresIn: Ember.computed('hasJWT', 'jwt', function () {
    if (this.get('hasJWT')) {
      return this._extractExpireTime(this.get('jwt'));
    } else {
      return 0;
    }
  }),

  //=======================
  // Hooks
  //=======================

  /**
   * Hook that gets called after the jwt has expired
   * but before we notify the rest of the system.
   * Great place to add cleanup to expire any third-party
   * tokens or other cleanup.
   *
   * IMPORTANT: You must return a promise, else logout
   * will not continue.
   *
   * @return {Promise}
   */
  beforeExpire: function beforeExpire() {
    return Ember.RSVP.resolve();
  },

  /**
   * Hook that gets called after Auth0 successfully
   * authenticates the user.
   * Great place to make additional calls to other
   * services, custom db, firebase, etc. then
   * decorate the session object and pass it along.
   *
   * IMPORTANT: You must return a promise with the
   * session data.
   *
   * @param  {Object} data Session object
   * @return {Promise}     Promise with decorated session object
   */
  afterAuth: function afterAuth(data) {
    return Ember.RSVP.resolve(data);
  },

  /**
   * Hook called after auth0 refreshes the jwt
   * based on the refreshToken.
   *
   * This only fires if lock.js was passed in
   * the offline_mode scope params
   *
   * IMPORTANT: You must return a promise with the
   * session data.
   *
   * @param  {Object} data The new jwt
   * @return {Promise}     The decorated session object
   */
  afterRestore: function afterRestore(data) {
    return Ember.RSVP.resolve(data);
  },

  /**
   * Hook that gets called after Auth0 successfully
   * refreshes the jwt if (refresh token is enabled).
   *
   * Great place to make additional calls to other
   * services, custom db, firebase, etc. then
   * decorate the session object and pass it along.
   *
   * IMPORTANT: You must return a promise with the
   * session data.
   *
   * @param  {Object} data Session object
   * @return {Promise}     Promise with decorated session object
   */
  afterRefresh: function afterRefresh(data) {
    return Ember.RSVP.resolve(data);
  },
  /**
   * Hook that gets called after Auth0 fails authentication for any reason.
   *
   *
   *
   * @param  {Error}  error object
   * @return {Promise}     Promise
   */
  onAuthError: function onAuthError() /* error */{
    return new Ember.RSVP.Promise();
  },

  restore: function restore(data) {
    var _this = this;

    this.get('sessionData').setProperties(data);

    if (this._jwtRemainingTime() < 1) {
      if (this.get('hasRefreshToken')) {
        return this._refreshAuth0Token();
      } else {
        return Ember.RSVP.reject();
      }
    } else {
      return this.afterRestore(this.get('sessionData')).then(function (response) {
        return Ember.RSVP.resolve(_this._setupFutureEvents(response));
      });
    }
  },

  authenticate: function authenticate(options) {
    var _this2 = this;

    return new Ember.RSVP.Promise(function (res) {
      _this2.get('lock').show(options, function (err, profile, jwt, accessToken, state, refreshToken) {
        if (err) {
          _this2.onAuthError(err);
        } else {
          var sessionData = { profile: profile, jwt: jwt, accessToken: accessToken, refreshToken: refreshToken };
          _this2.afterAuth(sessionData).then(function (response) {
            return res(_this2._setupFutureEvents(response));
          });
        }
      });
    });
  },

  invalidate: function invalidate() /* data */{
    var _this3 = this;

    if (this.get('hasRefreshToken')) {
      var domain = this.get('domain'),
          userID = this.get('userID'),
          refreshToken = this.get('refreshToken'),
          url = 'https://' + domain + '/api/users/' + userID + '/refresh_tokens/' + refreshToken;

      return this._makeAuth0Request(url, "DELETE").then(function () {
        return _this3.beforeExpire();
      });
    } else {
      return this.beforeExpire();
    }
  },

  //=======================
  // Overrides
  //=======================
  init: function init() {
    var applicationConfig = getOwner(this).resolveRegistration('config:environment');
    var config = applicationConfig['auth0-ember-simple-auth'];

    this.set('_config', config);

    this.set('_sessionData', Ember.Object.create());

    this.set('_clientID', config.clientID);
    this.set('_domain', config.domain);

    var lock = new Auth0Lock(this.get('clientID'), this.get('domain'));
    this.set('_lock', lock);

    this._super();
  },

  //=======================
  // Private Methods
  //=======================
  _makeAuth0Request: function _makeAuth0Request(url, method) {
    var headers = { 'Authorization': 'Bearer ' + this.get('jwt') };
    return Ember.$.ajax(url, { type: method, headers: headers });
  },

  _setupFutureEvents: function _setupFutureEvents(data) {
    this.get('sessionData').setProperties(data);
    this._clearJobs();
    this._scheduleExpire();

    if (this.get('hasRefreshToken')) {
      this._scheduleRefresh();
    }

    return this.get('sessionData');
  },

  _scheduleRefresh: function _scheduleRefresh() {
    Ember.run.cancel(this.get('_refreshJob'));

    var remaining = this._jwtRemainingTime();
    var earlyRefresh = 30;
    var refreshInSecond = remaining < earlyRefresh * 2 ? remaining / 2 : remaining - earlyRefresh;
    var refreshInMilli = refreshInSecond * 1000;

    if (!isNaN(refreshInMilli) && refreshInMilli >= 50) {
      var job = Ember.run.later(this, this._refreshAccessToken, refreshInMilli);
      this.set('_refreshJob', job);
    }
  },

  _scheduleExpire: function _scheduleExpire() {
    Ember.run.cancel(this.get('_expireJob'));
    var expireInMilli = this._jwtRemainingTime() * 1000;
    var job = Ember.run.later(this, this._processSessionExpired, expireInMilli);
    this.set('_expireJob', job);
  },

  _clearJobs: function _clearJobs() {
    Ember.run.cancel(this.get('_expireJob'));
    Ember.run.cancel(this.get('_refreshJob'));
  },

  _processSessionExpired: function _processSessionExpired() {
    var _this4 = this;

    this.beforeExpire().then(function () {
      return _this4.trigger('sessionDataInvalidated');
    });
  },

  _refreshAuth0Token: function _refreshAuth0Token() {
    var _this5 = this;

    return new Ember.RSVP.Promise(function (res, rej) {
      _this5.get('lock').getClient().refreshToken(_this5.get('refreshToken'), function (err, result) {
        if (err) {
          rej(err);
        } else {
          _this5.afterRefresh({ jwt: result.id_token }).then(function (response) {
            res(_this5._setupFutureEvents(response));
          });
        }
      });
    });
  },

  _refreshAccessToken: function _refreshAccessToken() {
    var _this6 = this;

    this._refreshAuth0Token().then(function (data) {
      return _this6.trigger('sessionDataUpdated', data);
    });
  },

  //=======================
  // Utility Methods
  //=======================
  _extractExpireTime: function _extractExpireTime(jwt) {
    var claim = b64utos(jwt.split(".")[1]);
    var decoded = KJUR.jws.JWS.readSafeJSONString(claim);
    return decoded.exp;
  },

  _jwtRemainingTime: function _jwtRemainingTime() {
    if (this.get('expiresIn') <= 0) {
      return 0;
    } else {
      var currentTime = new Date().getTime() / 1000;
      return this.get('expiresIn') - currentTime;
    }
  }
});