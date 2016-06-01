import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service('session'),

  resultSearch: '',

  actions: {

    search(){
      var self = this;
      var uid = this.get('session.uid');
      var keyword = this.get('search');

      this.get('store').query('place', { filter: { uid: uid, keyword: keyword } }).then(function(places) {
        self.set('resultSearch', places);
      });
    }
  }
});
