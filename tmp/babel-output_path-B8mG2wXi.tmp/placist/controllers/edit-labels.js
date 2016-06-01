define('finndis/controllers/edit-labels', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service('session'),
    sessionAccount: _ember['default'].inject.service('session-account'),
    labelsController: _ember['default'].inject.controller('labels'),

    isEditing: false,
    labelName: '',

    actions: {
      toggleEdition: function toggleEdition(id) {
        var label = this.get('store').peekRecord('label', id);
        var labels = this.get('store').peekAll('label');
        labels.forEach(function (lab) {
          lab.set('isEditing', false);
        });
        label.set('isEditing', true);
        this.set('labelName', label.get('name'));
      },

      saveLabel: function saveLabel(id) {
        var label = this.get('store').peekRecord('label', id);
        label.set('name', this.get('labelName'));
        label.set('isEditing', false);
        label.save();
      },

      deleteLabel: function deleteLabel(id) {
        var label = this.get('store').peekRecord('label', id);
        label.deleteRecord();
        label.get('isDeleted');
        label.save();
      }
    }
  });
});