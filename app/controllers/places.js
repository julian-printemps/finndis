import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  sortProps: ['numericId:desc'],
  sortedPlaces: Ember.computed.sort('model', 'sortProps'),

  labelsList: Ember.computed(function() {
    let user = this.store.peekRecord('user', this.get('session.user.id'));
    return user.get('labels');
  }),

});
