import Ember from 'ember';
import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

var Validations = buildValidations({
  // password: {
  //   description: 'Password',
  //   validators: [
  //     validator('presence', true),
  //     validator('length', {
  //       min: 8,
  //       max: 32
  //     }),
  //     validator('format', {
  //       regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/,
  //       message: '{description} must include at least one upper case letter, one lower case letter, and a number'
  //     })
  //   ]
  // },
  email: {
    validators: [
      validator('presence', true),
      validator('format', {
        type: 'email'
      })
    ]
  },

}, {
  debounce: 500
});

export default DS.Model.extend(Validations, {
  email: DS.attr('string'),
  password: DS.attr('string'),
  firstname: DS.attr('string'),
  lastname: DS.attr('string'),
  uid: DS.attr('string'),
  provider: DS.attr('string'),
  places: DS.hasMany('place', { async: true }),
  labels: DS.hasMany('label', { async: true })
});
