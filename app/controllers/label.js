import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  labelsController: Ember.inject.controller('labels'),

  labelId: '',

  placesListByLabel: Ember.computed(function() {
    let label = this.store.peekRecord('label', this.get('labelId'));
    return label.get('places');
  }),

});
