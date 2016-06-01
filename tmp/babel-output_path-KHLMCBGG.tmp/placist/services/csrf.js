define('finndis/services/csrf', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Object.extend({
    onAjaxComplete: (function () {
      var _this = this;
      this.fetchToken();

      _ember['default'].$(document).on("ajaxComplete", function (event, xhr, settings) {
        var csrf_param = xhr.getResponseHeader('X-CSRF-Param'),
            csrf_token = xhr.getResponseHeader('X-CSRF-Token');

        if (csrf_param && csrf_token) {
          _this.setData({ csrf_param: csrf_token });
        }
      });
    }).on('init'),
    setPrefilter: function setPrefilter() {
      var token = this.get('data').token;
      var preFilter = function preFilter(options, originalOptions, jqXHR) {
        return jqXHR.setRequestHeader('X-CSRF-Token', token);
      };
      $.ajaxPrefilter(preFilter);
    },
    setData: function setData(data) {
      var param = _ember['default'].keys(data)[0];
      this.set('data', { param: param, token: data[param] });
      this.setPrefilter();

      return this.get('data');
    },
    fetchToken: function fetchToken() {
      var _this = this;
      var token = _ember['default'].$('meta[name="csrf-token"]').attr('content') || '';

      return _ember['default'].RSVP.resolve().then(function () {
        return _this.setData({ 'authenticity_token': token });
      });
    }
  });
});