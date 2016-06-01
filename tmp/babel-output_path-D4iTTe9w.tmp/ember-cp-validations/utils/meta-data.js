define('ember-cp-validations/utils/meta-data', ['exports', 'ember'], function (exports, _ember) {
  /**
   * Copyright 2016, Yahoo! Inc.
   * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
   */

  'use strict';

  var id = 0;
  var dataKey = symbol('data');

  function symbol(key) {
    return '_' + key + '_' + new Date().getTime() + '_' + id++;
  }

  function getData(obj, symbol) {
    var m = _ember['default'].meta(obj);
    var data = m[dataKey];
    if (data) {
      return data[symbol];
    }
  }

  function setData(obj, symbol, value) {
    var m = _ember['default'].meta(obj);
    var data = m[dataKey] = m[dataKey] || {};
    data[symbol] = value;
  }

  exports['default'] = { symbol: symbol, getData: getData, setData: setData };
});