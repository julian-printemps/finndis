import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service('session'),

  actions: {
    updateLabel(labelValue) {
      var self = this;
      this.get('store').findRecord('label', labelValue ).then( function(label){
        self.set('model.label', label);

        if( self.get('autoSaveLabel') ){
          self.get('model').save();
        }
        self.set('labelPanelDisplayed', '');
      });
    },

    closeMenuPanel() {
      this.set('labelPanelDisplayed', '');
    },

  }
});
