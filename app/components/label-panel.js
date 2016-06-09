import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service('session'),

  userLabels: Ember.computed(function() {
    return this.get('store').peekAll('label');
  }),
  sortProps: ['numericId:desc'],
  sortedLabels: Ember.computed.sort('userLabels', 'sortProps'),


  actions: {
    updateLabel(labelValue) {
      var self = this;
      this.get('store').findRecord('label', labelValue ).then( function(label){
        self.set('model.label', label);

        if( self.get('autoSaveLabel') ){
          self.get('model').save();
        }
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
