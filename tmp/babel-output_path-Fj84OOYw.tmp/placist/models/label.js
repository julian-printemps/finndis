define('finndis/models/label', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    name: _emberData['default'].attr('string'),
    user: _emberData['default'].belongsTo('user'),
    places: _emberData['default'].hasMany('place', { async: true }),
    isEditing: _emberData['default'].attr('boolean', { defaultValue: false })
  });
});