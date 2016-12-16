import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service('session'),

  userLabels: Ember.computed(function() {
    return this.get('store').peekAll('label');
  }),
  sortProps: ['numericId:desc'],
  sortedLabels: Ember.computed.sort('userLabels', 'sortProps'),

  sortedLabels2: Ember.computed('model', function() {
    var self = this;
    var model = this.get('model');
    var sortedLabels = [];
    var userLabels = this.get('store').peekAll('label');

    userLabels.forEach(function(userLabel){
      userLabel.set('isChecked', false);
    });

    userLabels.forEach(function(userLabel){
      model.get('labelsPlaces').forEach(function(placeLabel){
        if (placeLabel.get('id') === userLabel.get('id')) {
          userLabel.set('isChecked', true);
        }
        sortedLabels.pushObject(userLabel);
      });
    });

    return sortedLabels;
  }),

  actions: {
    checkedLabels() {

    },

    updateLabel(labelValue) {
      var self = this;
      var model = this.get('model');

      this.get('store').findRecord('label', labelValue ).then( function(label){
        var labelPlace = self.get('store').createRecord('labels-place', {
          label: label,
          place: model
        });
        labelPlace.save().then(function(labelPlace){
          model.get('labelsPlaces').pushObject(labelPlace);
          model.save();
        });


        // self.set('model.labels', label);
        // labelArray.addObject(label);
        // self.set('model.labels', labelArray);


        // self.get('model.labels').forEach(function(label){
        //   console.log(label.get('name'));
        // });
        //
        // if( self.get('autoSaveLabel') ){
        //   self.get('model').save();
        // }
        self.set('labelPanelDisplayed', '');
        $('body').toggleClass('__noscroll');
      });
    },

    closeMenuPanel() {
      this.set('labelPanelDisplayed', '');
      $('body').toggleClass('__noscroll');
    },

  }
});
