define('finndis/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'finndis/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _finndisConfigEnvironment) {

  var name = _finndisConfigEnvironment['default'].APP.name;
  var version = _finndisConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});