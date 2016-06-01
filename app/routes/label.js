import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service('session'),
  labelId: '',

  model(params){
    this.set('labelId', params.label_id);
    return this.store.findRecord('label', params.label_id);
  },

  setupController: function(controller, model) {
    this._super(controller, model);
    controller.set('labelId', 1);
  }

});
