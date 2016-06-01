import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
import request from 'ic-ajax';
import config from '../config/environment';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  model: function()  {
    var host = config.host || '';
  }
});
