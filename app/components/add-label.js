import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service('session'),
  isDisplayed: false,
  newLabel: '',

  actions: {
    showAddLabel(){
      var isDisplayed = this.get('isDisplayed');
      if(isDisplayed){
        this.set('isDisplayed', false);
      }
      else {
        this.set('isDisplayed', true);
      }
    },

    addLabel() {
      var name = this.get('newLabel');
      var labelAlreadyExist = false;
      var labelList = this.get('store').peekAll('label');

      labelList.forEach(function(label) {
        if(label.get('name') === name){
          labelAlreadyExist = true;
        }
      });

      if( !labelAlreadyExist && name !== ''){
        var uid = this.get('session.uid');

        var label = this.get('store').createRecord('label', {
          name: name,
          uid: uid
        });
        label.save();
        this.set('newLabel', '');
      }
    }
  }
});
