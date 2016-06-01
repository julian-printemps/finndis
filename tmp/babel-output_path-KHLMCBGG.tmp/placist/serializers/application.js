define('finndis/serializers/application', ['exports', 'ember', 'ember-data'], function (exports, _ember, _emberData) {
  var underscore = _ember['default'].String.underscore;

  exports['default'] = _emberData['default'].JSONAPISerializer.extend({

    keyForAttribute: function keyForAttribute(attr) {
      return underscore(attr);
    },

    keyForRelationship: function keyForRelationship(rawKey) {
      return underscore(rawKey);
    },

    serialize: function serialize() {

      var result = this._super.apply(this, arguments),
          attr = result.data.attributes || {},
          rel = result.data.relationships || {};

      return Object.keys(rel).reduce(function (acc, elem) {
        var data = rel[elem].data;
        if (data) {
          acc[elem + "_id"] = data.id;
        }
        if (data && data.type) {
          acc[elem + "_type"] = data.type[0].toUpperCase() + data.type.slice(1, -1);
        }
        return acc;
      }, attr);
    }

  });
});