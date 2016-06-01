import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service('session'),

  model(){
    var uid = this.get('session.uid');

    return this.store.query('place', { filter: { uid: uid } }).then(function(places) {
      return places;
    });
  },
});
