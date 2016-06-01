import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service('session'),

  actions: {

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
        this.sendAction();
      }
    }
  }
});
