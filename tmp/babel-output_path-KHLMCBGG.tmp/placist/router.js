define('finndis/router', ['exports', 'ember', 'finndis/config/environment'], function (exports, _ember, _finndisConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _finndisConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    this.route('places', { path: '/' });
    this.route('place', { path: '/:place_id' });
    this.route('add-place', { path: '/add' });
    this.route('labels');
    this.route('label', { path: 'labels/:label_id' });
    this.route('users', { path: '/profile' });
    this.route('search');
    this.route('edit-labels', { path: 'labels/edit' });
    this.route('login');
    this.route('map');
  });

  exports['default'] = Router;
});