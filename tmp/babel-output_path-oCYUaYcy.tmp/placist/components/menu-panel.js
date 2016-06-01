define('finndis/components/menu-panel', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    session: _ember['default'].inject.service('session'),
    sessionAccount: _ember['default'].inject.service('session-account'),

    actions: {

      willTransition: function willTransition() {
        this._super();
        this.set('labelPanelClass', '');
      },

      showMenuPanel: function showMenuPanel() {
        this.set('labelPanelClass', 'show');
      },

      closeMenuPanel: function closeMenuPanel() {
        this.set('labelPanelClass', '');
      },

      logout: function logout() {
        this.get('session').invalidate();
      }
    }
  });
});