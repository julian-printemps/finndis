import DS from 'ember-data';

export default DS.Model.extend({
  label: DS.belongsTo('label', { async: true }),
  place: DS.belongsTo('place', { async: true }),
});
