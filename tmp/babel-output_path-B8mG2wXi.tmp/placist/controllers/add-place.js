define('finndis/controllers/add-place', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service('session'),
    sessionAccount: _ember['default'].inject.service('session-account'),
    placeController: _ember['default'].inject.controller('places'),

    showAlert: false,
    addressFieldIsDisplayed: false,

    user: _ember['default'].computed(function () {
      return this.store.peekRecord('user', this.get('sessionAccount.user.id'));
    }),

    actions: {

      showAddressFields: function showAddressFields() {
        this.set('addressFieldIsDisplayed', true);
      },

      setAutoAddress: function setAutoAddress() {
        var self = this;
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
            var geolocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            self.set('model.locationlat', geolocation.lat);
            self.set('model.locationlng', geolocation.lng);

            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'location': geolocation }, function (results, status) {
              if (status === google.maps.GeocoderStatus.OK) {
                var address_components = results[0].address_components;
                var locality;
                var administrative_area_level_1;

                var addressstreet = '';

                address_components.forEach(function (component) {
                  switch (component.types[0]) {
                    case "premise":
                      self.set('model.name', component.short_name);
                      break;
                    case "sublocality_level_4":
                      if (component.short_name !== '' || component.short_name !== undefined || component.short_name !== null) {
                        addressstreet = addressstreet + component.short_name + ', ';
                      }
                      break;
                    case "sublocality_level_3":
                      if (component.short_name !== '' || component.short_name !== undefined || component.short_name !== null) {
                        addressstreet = addressstreet + component.short_name + ', ';
                      }
                      break;
                    case "sublocality_level_2":
                      if (component.short_name !== '' || component.short_name !== undefined || component.short_name !== null) {
                        addressstreet = addressstreet + component.short_name + ', ';
                      }
                      break;
                    case "sublocality_level_1":
                      if (component.short_name !== '' || component.short_name !== undefined || component.short_name !== null) {
                        addressstreet = addressstreet + component.short_name + ', ';
                      }
                      break;
                    case "locality":
                      self.set('model.addresscity', component.short_name);
                      break;
                    case "country":
                      self.set('model.addresscountry', component.long_name);
                      break;
                    case "postal_code":
                      self.set('model.addresszip', component.short_name);
                      break;
                    default:
                      break;
                  }
                });
                self.set('model.mapid', results[0].place_id);
                self.set('model.longaddress', results[0].formatted_address);
                console.log(results[0].formatted_address);
                self.set('model.addressstreet', addressstreet);
              } else {
                console.log('Geocode was not successful for the following reason: ' + status);
              }
            });
          });
        }
      },

      showAddLabel: function showAddLabel() {
        this.set('labelPanelDisplayed', 'show');
      },

      closeMenuPanel: function closeMenuPanel() {
        this.set('labelPanelDisplayed', '');
      },

      addLabel: function addLabel(labelValue) {
        var self = this;
        var place = self.get('place');
        this.get('store').findRecord('label', labelValue).then(function (label) {
          self.set('model.label', label);
        });
      },

      setRating: function setRating(params) {
        var model = params.item;
        var rating = params.rating;

        this.set('model.rating', rating);
      },

      addPlace: function addPlace() {
        var _this = this;

        var self = this;
        var model = this.get('model');

        if (this.get('model.longaddress') !== '') {
          var longaddress = this.get('model.longaddress');
        } else {
          var longaddress = model.get("addressstreet") + ', ' + model.get("addresscity") + ', ' + model.get("addresszip") + ', ' + model.get("addresscountry");
        }

        var shortaddress = model.get('addressstreet') + ', ' + model.get('addresscity');
        this.set('model.longaddress', longaddress);
        this.set('model.shortaddress', shortaddress);

        var user = this.get('store').peekRecord('user', this.get('sessionAccount.user.id'));
        var newPlace = this.get('store').createRecord('place', {
          name: model.get('name'),
          mapid: model.get('mapid'),
          locationlat: model.get('locationlat'),
          locationlng: model.get('locationlng'),
          formattedaddress: model.get('formattedaddress'),
          streetaddress: model.get('streetaddress'),
          route: model.get('route'),
          intersection: model.get('intersection'),
          political: '',
          country: model.get('country'),
          administrativearealevel1: model.get('administrativearealevel1'),
          administrativearealevel2: model.get('administrativearealevel2'),
          administrativearealevel3: model.get('administrativearealevel3'),
          administrativearealevel4: model.get('administrativearealevel4'),
          administrativearealevel5: model.get('administrativearealevel5'),
          colloquialarea: model.get('colloquialarea'),
          locality: model.get('locality'),
          sublocality: model.get('sublocality'),
          sublocalitylevel1: model.get('sublocalitylevel1'),
          sublocalitylevel2: model.get('sublocalitylevel2'),
          sublocalitylevel3: model.get('sublocalitylevel3'),
          sublocalitylevel4: model.get('sublocalitylevel4'),
          sublocalitylevel5: model.get('sublocalitylevel5'),
          neighborhood: model.get('neighborhood'),
          premise: model.get('premise'),
          subpremise: model.get('subpremise'),
          postalcode: model.get('postalcode'),
          naturalfeature: model.get('naturalfeature'),
          airport: model.get('airport'),
          park: model.get('park'),
          postbox: model.get('postbox'),
          streetnumber: model.get('streetnumber'),
          floor: model.get('floor'),
          room: model.get('room'),
          permanentlyclosed: false,
          phone: model.get('phone'),
          url: '',
          website: model.get('website'),
          openinghours: '',
          rating: model.get('rating'),
          description: model.get('description'),
          pricerange: model.get('pricerange'),
          user: user,
          label: model.get('label')
        });

        model.validate().then(function (_ref) {
          var model = _ref.model;
          var validations = _ref.validations;

          if (validations.get('isValid')) {
            _this.setProperties({
              showAlert: false
            });
            newPlace.save().then(function (place) {
              self.transitionToRoute('place', place);
            });
          } else {
            _this.set('showAlert', true);
          }
          _this.set('didValidate', true);
        }, function (errors) {});
      }

    }
  });
});