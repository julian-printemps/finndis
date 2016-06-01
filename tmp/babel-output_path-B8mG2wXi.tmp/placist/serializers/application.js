define("finndis/serializers/application", ["exports", "ember-data"], function (exports, _emberData) {
  exports["default"] = _emberData["default"].JSONAPISerializer.extend({

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