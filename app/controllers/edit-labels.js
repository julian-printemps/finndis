import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service('session'),
  labelsController: Ember.inject.controller('labels'),

  isEditing: false,
  labelName: '',

  userLabels: Ember.computed(function() {
    return this.get('store').peekAll('label');
  }),

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

    saveLabel(id) {
      var label = this.get('store').peekRecord('label', id );
      label.set('name', this.get('labelName'));
      label.set('isEditing', false);
      label.save();
    },

    deleteLabel(id) {
      var label = this.get('store').peekRecord('label', id );
      label.deleteRecord();
      label.get('isDeleted');
      label.save();
    }
  }
});
