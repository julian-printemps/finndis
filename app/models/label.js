import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  uid: DS.attr('string'),
  places: DS.hasMany('place', { async: true }),
  isEditing: DS.attr('boolean', {defaultValue: false}),
});
