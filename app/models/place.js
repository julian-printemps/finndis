import Ember from 'ember';
import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

var Validations = buildValidations({
  name: {
    description: 'Place name',
    validators: [
      validator('presence', true),
    ]
  },
  phone: {
    validators: [
      validator('format', {
        allowBlank: true,
        type: 'phone'
      })
    ]
  },
  website: {
    validators: [
      validator('format', {
        allowBlank: true,
        type: 'url'
      })
    ]
  },
}, {
  debounce: 500
});

export default DS.Model.extend(Validations, {
  name: DS.attr('string'),
  mapid: DS.attr('string'),
  locationlat: DS.attr('string'),
  locationlng: DS.attr('string'),

  formattedaddress: DS.attr('string'),
  streetaddress: DS.attr('string'),
  route: DS.attr('string'),
  intersection: DS.attr('string'),
  //osef
  political: DS.attr('string'),
  country: DS.attr('string'),
  administrativearealevel1: DS.attr('string'),
  administrativearealevel2: DS.attr('string'),
  administrativearealevel3: DS.attr('string'),
  administrativearealevel4: DS.attr('string'),
  administrativearealevel5: DS.attr('string'),
  colloquialarea: DS.attr('string'),
  locality: DS.attr('string'),
  sublocality: DS.attr('string'),
  sublocalitylevel1: DS.attr('string'),
  sublocalitylevel2: DS.attr('string'),
  sublocalitylevel3: DS.attr('string'),
  sublocalitylevel4: DS.attr('string'),
  sublocalitylevel5: DS.attr('string'),
  neighborhood: DS.attr('string'),
  premise: DS.attr('string'),
  subpremise: DS.attr('string'),
  postalcode: DS.attr('string'),
  naturalfeature: DS.attr('string'),
  airport: DS.attr('string'),
  park: DS.attr('string'),
  postbox: DS.attr('string'),
  streetnumber: DS.attr('string'),
  floor: DS.attr('string'),
  room: DS.attr('string'),
  permanentlyclosed: DS.attr('boolean', {defaultValue: false}),
  phone: DS.attr('string'),
  url: DS.attr('string'),
  website: DS.attr('string'),
  openinghours: DS.attr('string'),
  rating: DS.attr('number', {defaultValue: 0}),
  description: DS.attr('string'),
  pricerange: DS.attr('string'),
  uid: DS.attr('string'),
  labelsPlaces: DS.hasMany('labels-place', { async: true }),
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
