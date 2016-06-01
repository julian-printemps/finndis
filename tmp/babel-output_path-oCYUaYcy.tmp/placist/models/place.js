define('finndis/models/place', ['exports', 'ember', 'ember-data', 'ember-cp-validations'], function (exports, _ember, _emberData, _emberCpValidations) {

  var Validations = (0, _emberCpValidations.buildValidations)({
    name: {
      description: 'Place name',
      validators: [(0, _emberCpValidations.validator)('presence', true)]
    },
    phone: {
      validators: [(0, _emberCpValidations.validator)('format', {
        allowBlank: true,
        type: 'phone'
      })]
    },
    website: {
      validators: [(0, _emberCpValidations.validator)('format', {
        allowBlank: true,
        type: 'url'
      })]
    }
  }, {
    debounce: 500
  });

  exports['default'] = _emberData['default'].Model.extend(Validations, {
    name: _emberData['default'].attr('string'),
    mapid: _emberData['default'].attr('string'),
    locationlat: _emberData['default'].attr('string'),
    locationlng: _emberData['default'].attr('string'),

    formattedaddress: _emberData['default'].attr('string'),
    streetaddress: _emberData['default'].attr('string'),
    route: _emberData['default'].attr('string'),
    intersection: _emberData['default'].attr('string'),
    //osef
    political: _emberData['default'].attr('string'),
    country: _emberData['default'].attr('string'),
    administrativearealevel1: _emberData['default'].attr('string'),
    administrativearealevel2: _emberData['default'].attr('string'),
    administrativearealevel3: _emberData['default'].attr('string'),
    administrativearealevel4: _emberData['default'].attr('string'),
    administrativearealevel5: _emberData['default'].attr('string'),
    colloquialarea: _emberData['default'].attr('string'),
    locality: _emberData['default'].attr('string'),
    sublocality: _emberData['default'].attr('string'),
    sublocalitylevel1: _emberData['default'].attr('string'),
    sublocalitylevel2: _emberData['default'].attr('string'),
    sublocalitylevel3: _emberData['default'].attr('string'),
    sublocalitylevel4: _emberData['default'].attr('string'),
    sublocalitylevel5: _emberData['default'].attr('string'),
    neighborhood: _emberData['default'].attr('string'),
    premise: _emberData['default'].attr('string'),
    subpremise: _emberData['default'].attr('string'),
    postalcode: _emberData['default'].attr('string'),
    naturalfeature: _emberData['default'].attr('string'),
    airport: _emberData['default'].attr('string'),
    park: _emberData['default'].attr('string'),
    postbox: _emberData['default'].attr('string'),
    streetnumber: _emberData['default'].attr('string'),
    floor: _emberData['default'].attr('string'),
    room: _emberData['default'].attr('string'),

    permanentlyclosed: _emberData['default'].attr('boolean', { defaultValue: false }),
    phone: _emberData['default'].attr('string'),
    url: _emberData['default'].attr('string'),
    website: _emberData['default'].attr('string'),
    openinghours: _emberData['default'].attr('string'),
    rating: _emberData['default'].attr('number', { defaultValue: 0 }),
    description: _emberData['default'].attr('string'),
    pricerange: _emberData['default'].attr('string'),
    user: _emberData['default'].belongsTo('user'),
    label: _emberData['default'].belongsTo('label'),
    isEditing: _emberData['default'].attr('boolean', { defaultValue: false }),
    numericId: _ember['default'].computed(function () {
      if (this.get('id')) {
        var id = this.get('id');
        return +id;
      } else {
        return null;
      }
    })
  });
});