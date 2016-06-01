define('finndis/routes/place', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
    session: _ember['default'].inject.service('session'),
    sessionAccount: _ember['default'].inject.service('session-account'),

    resetController: function resetController(controller, isExiting, transition) {
      if (isExiting) {
        controller.set('isEditing', false);
        controller.set('labelPanelDisplayed', '');
      }
    },

    model: function model(params) {
      return this.store.findRecord('place', params.place_id);
    }
  });
});