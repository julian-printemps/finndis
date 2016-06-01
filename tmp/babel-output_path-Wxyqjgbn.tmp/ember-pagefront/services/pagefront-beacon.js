define('ember-pagefront/services/pagefront-beacon', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  var HASH_NAME = 'pagefront-hash';
  var ENVIRONMENT_NAME = 'pagefront-environment';
  var APP_NAME = 'pagefront-app';
  var INTERVAL = 20000;
  var HOST = 'https://beacon.pagefronthq.com';
  var PATH = 'snapshots';
  var ACTION = 'pagefrontDidRelease';

  function fetchMeta(name) {
    return _ember['default'].$('meta[name=\'' + name + '\']').attr('content');
  };

  exports['default'] = _ember['default'].Service.extend({
    app: fetchMeta(APP_NAME),
    environment: fetchMeta(ENVIRONMENT_NAME),
    currentHash: fetchMeta(HASH_NAME),
    target: null,

    start: _ember['default'].on('init', function () {
      if (this.app && this.currentHash) {
        _ember['default'].run.later(this, this.check, INTERVAL);
      }
    }),

    check: function check() {
      var base = [HOST, PATH, this.app].join('/');
      var environment = this.environment;
      var url = environment ? base + '?environment=' + environment : base;

      _ember['default'].$.getJSON(url, _ember['default'].run.bind(this, this.handle));
    },

    handle: function handle(snapshot) {
      if (snapshot.hash !== this.currentHash) {
        this.target.send(ACTION, snapshot);
      } else {
        _ember['default'].run.later(this, this.check, INTERVAL);
      }
    }
  });
});