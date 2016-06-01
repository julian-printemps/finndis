define('finndis/models/label', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    name: _emberData['default'].attr('string'),
    uid: _emberData['default'].attr('string'),
    places: _emberData['default'].hasMany('place', { async: true }),
    isEditing: _emberData['default'].attr('boolean', { defaultValue: false })
  });
});