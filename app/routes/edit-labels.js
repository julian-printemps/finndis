import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  model(){
    var uid = this.get('session.uid');

    return this.store.query('label', { filter: { uid: uid } }).then(function(labels) {
      return labels;
    });
  },

});
