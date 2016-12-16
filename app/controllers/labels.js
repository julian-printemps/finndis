import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service('session'),
  labelsController: Ember.inject.controller('labels'),

  userLabels: Ember.computed(function() {
    return this.get('store').findAll('label');
  }),
  sortProps: ['numericId:desc'],
  sortedLabels: Ember.computed.sort('userLabels', 'sortProps'),

  isEditing: false,
  labelName: '',

  actions: {
    toggleEdition(id) {
      var label = this.get('store').peekRecord('label', id );
      var labels = this.get('store').peekAll('label');
      labels.forEach( function(lab){
        lab.set('isEditing', false);
      });
      label.set('isEditing', true);
      this.set('labelName', label.get('name'));
    },

    updateLabel(id) {
      var self = this;
      this.get('store').findRecord('label', id).then(function(label) {
        label.set('name', self.get('labelName'));
        label.set('isEditing', false);
        label.save();
      });
    },

    deleteLabel(model) {
      model.get('places').then(function(places){
        places.forEach(function(place){
          place.set('label', null);
          place.save();
        });

        model.deleteRecord();
        model.get('isDeleted');
        model.save();
      });

    },

  }
});
