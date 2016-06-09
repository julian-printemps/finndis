import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  uid: DS.attr('string'),
  places: DS.hasMany('place', { async: true }),
  isEditing: DS.attr('boolean', {defaultValue: false}),
  numericId: Ember.computed(function() {
    if(this.get('id')) {
      var id = this.get('id');
      return +id;
    }
    else {
      return null;
    }
  }),
});
