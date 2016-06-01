define('finndis/components/add-label', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    store: _ember['default'].inject.service(),
    session: _ember['default'].inject.service('session'),
    sessionAccount: _ember['default'].inject.service('session-account'),
    isDisplayed: false,
    newLabel: '',

    actions: {
      showAddLabel: function showAddLabel() {
        var isDisplayed = this.get('isDisplayed');
        if (isDisplayed) {
          this.set('isDisplayed', false);
        } else {
          this.set('isDisplayed', true);
        }
      },

      addLabel: function addLabel() {
        var name = this.get('newLabel');
        var labelAlreadyExist = false;
        var labelList = this.get('store').peekAll('label');

        labelList.forEach(function (label) {
          if (label.get('name') === name) {
            labelAlreadyExist = true;
          }
        });

        if (!labelAlreadyExist && name !== '') {
          var user = this.get('store').peekRecord('user', this.get('sessionAccount.user.id'));
          var label = this.get('store').createRecord('label', {
            name: name,
            user: user
          });
          label.save();
          this.set('newLabel', '');
        }
      }
    }
  });
});