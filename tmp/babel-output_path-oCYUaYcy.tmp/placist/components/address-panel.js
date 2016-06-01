define('finndis/components/address-panel', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    store: _ember['default'].inject.service(),
    session: _ember['default'].inject.service('session'),
    sessionAccount: _ember['default'].inject.service('session-account'),
    addressPanelClass: '',

    actions: {

      showAddressPanel: function showAddressPanel() {
        this.set('addressPanelClass', 'show');
      },

      closeMenuPanel: function closeMenuPanel() {
        this.set('addressPanelClass', '');
      },

      setAddress: function setAddress() {
        var self = this;
        var place = this.get('place');
        var address = self.get('place.formattedaddress');

        // Check if a variable is set
        var isAddressSet = function isAddressSet(elem) {
          if (elem !== '') {
            return true;
          } else return false;
        };

        if (isAddressSet(address)) {
          var geocoder = new google.maps.Geocoder();
          geocoder.geocode({ 'address': address }, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {

              // Set the address
              place.set('locationlat', results[0].geometry.location.lat());
              place.set('locationlng', results[0].geometry.location.lng());
              place.set('formattedaddress', results[0].formatted_address);

              var addressComponents = results[0].address_components;
              addressComponents.forEach(function (component) {
                switch (component.types[0]) {
                  case "street_address":
                    place.set('streetaddress', component.long_name);
                    break;
                  case "country":
                    place.set('country', component.long_name);
                    break;
                  case "intersection":
                    place.set('intersection', component.long_name);
                    break;
                  case "route":
                    place.set('route', component.long_name);
                    break;
                  case "sublocality_level_5":
                    place.set('sublocalitylevel5', component.long_name);
                    break;
                  case "sublocality_level_4":
                    place.set('sublocalitylevel4', component.long_name);
                    break;
                  case "sublocality_level_3":
                    place.set('sublocalitylevel3', component.long_name);
                    break;
                  case "sublocality_level_2":
                    place.set('sublocalitylevel2', component.long_name);
                    break;
                  case "sublocality_level_1":
                    place.set('sublocalitylevel1', component.long_name);
                    break;
                  case "sublocality":
                    place.set('sublocality', component.long_name);
                    break;
                  case "locality":
                    place.set('locality', component.long_name);
                    break;
                  case "administrative_area_level_1":
                    place.set('administrativearealevel1', component.long_name);
                    break;
                  case "administrative_area_level_2":
                    place.set('administrativearealevel2', component.long_name);
                    break;
                  case "administrative_area_level_3":
                    place.set('administrativearealevel3', component.long_name);
                    break;
                  case "administrative_area_level_4":
                    place.set('administrativearealevel4', component.long_name);
                    break;
                  case "administrative_area_level_5":
                    place.set('administrativearealevel5', component.long_name);
                    break;
                  case "premise":
                    place.set('premise', component.long_name);
                    break;
                  case "subpremise":
                    place.set('subpremise', component.long_name);
                    break;
                  case "colloquial_area":
                    place.set('colloquialarea', component.long_name);
                    break;
                  case "postal_code":
                    place.set('postalcode', component.long_name);
                    break;
                  case "neighborhood":
                    place.set('neighborhood', component.long_name);
                    break;
                  case "natural_feature":
                    place.set('naturalfeature', component.long_name);
                    break;
                  case "airport":
                    place.set('airport', component.long_name);
                    break;
                  case "park":
                    place.set('park', component.long_name);
                    break;
                  case "post_box":
                    place.set('postbox', component.long_name);
                    break;
                  case "street_number":
                    place.set('streetnumber', component.long_name);
                    break;
                  case "floor":
                    place.set('floor', component.long_name);
                    break;
                  case "room":
                    place.set('room', component.long_name);
                    break;
                  default:
                    break;
                }
              });
            } else {
              console.log('Geocode was not successful for the following reason: ' + status);
            }

            // model.save();

            self.send('closeMenuPanel');
          });
        }
      }

    }
  });
});