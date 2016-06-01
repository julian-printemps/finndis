define('finndis/models/user', ['exports', 'ember', 'ember-data', 'ember-cp-validations'], function (exports, _ember, _emberData, _emberCpValidations) {

  var Validations = (0, _emberCpValidations.buildValidations)({
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
      validators: [(0, _emberCpValidations.validator)('presence', true), (0, _emberCpValidations.validator)('format', {
        type: 'email'
      })]
    }

  }, {
    debounce: 500
  });

  exports['default'] = _emberData['default'].Model.extend(Validations, {
    email: _emberData['default'].attr('string'),
    password: _emberData['default'].attr('string'),
    firstname: _emberData['default'].attr('string'),
    lastname: _emberData['default'].attr('string'),
    uid: _emberData['default'].attr('string'),
    provider: _emberData['default'].attr('string'),
    places: _emberData['default'].hasMany('place', { async: true }),
    labels: _emberData['default'].hasMany('label', { async: true })
  });
});