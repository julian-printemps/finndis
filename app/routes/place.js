import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service('session'),

  resetController: function(controller, isExiting) {
    if (isExiting) {
      controller.set('isEditing', false);
      controller.set('labelPanelDisplayed', '');
    }
  },

  model(params){
    return this.store.findRecord('place', params.place_id);
  },
});
