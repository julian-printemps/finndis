import Ember from 'ember';

var HASH_NAME = 'pagefront-hash';
var ENVIRONMENT_NAME = 'pagefront-environment';
var APP_NAME = 'pagefront-app';
var INTERVAL = 20000;
var HOST = 'https://beacon.pagefronthq.com';
var PATH = 'snapshots';
var ACTION = 'pagefrontDidRelease';

function fetchMeta(name) {
  return Ember.$('meta[name=\'' + name + '\']').attr('content');
};

export default Ember.Service.extend({
  app: fetchMeta(APP_NAME),
  environment: fetchMeta(ENVIRONMENT_NAME),
  currentHash: fetchMeta(HASH_NAME),
  target: null,

  start: Ember.on('init', function () {
    if (this.app && this.currentHash) {
      Ember.run.later(this, this.check, INTERVAL);
    }
  }),

  check: function check() {
    var base = [HOST, PATH, this.app].join('/');
    var environment = this.environment;
    var url = environment ? base + '?environment=' + environment : base;

    Ember.$.getJSON(url, Ember.run.bind(this, this.handle));
  },

  handle: function handle(snapshot) {
    if (snapshot.hash !== this.currentHash) {
      this.target.send(ACTION, snapshot);
    } else {
      Ember.run.later(this, this.check, INTERVAL);
    }
  }
});