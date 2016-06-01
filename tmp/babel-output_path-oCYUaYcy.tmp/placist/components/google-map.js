define('finndis/components/google-map', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    session: _ember['default'].inject.service('session'),
    sessionAccount: _ember['default'].inject.service('session-account'),

    didInsertElement: function didInsertElement() {
      this._super.apply(this, arguments);
      var self = this;
      var map = '';

      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: { lat: parseFloat(self.get('latitude')), lng: parseFloat(self.get('longitude')) }
      });
      var marker = new google.maps.Marker({
        map: map,
        position: { lat: parseFloat(self.get('latitude')), lng: parseFloat(self.get('longitude')) }
      });
    },

    didUpdate: function didUpdate() {
      this._super.apply(this, arguments);
      var self = this;
      var map = '';

      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: { lat: parseFloat(self.get('latitude')), lng: parseFloat(self.get('longitude')) }
      });
      var marker = new google.maps.Marker({
        map: map,
        position: { lat: parseFloat(self.get('latitude')), lng: parseFloat(self.get('longitude')) }
      });
    }
  });
});