define('finndis/routes/label', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
    session: _ember['default'].inject.service('session'),
    labelId: '',

    model: function model(params) {
      this.set('labelId', params.label_id);
      return this.store.findRecord('label', params.label_id);
    },

    setupController: function setupController(controller, model) {
      this._super(controller, model);
      controller.set('labelId', 1);
    }

  });
});