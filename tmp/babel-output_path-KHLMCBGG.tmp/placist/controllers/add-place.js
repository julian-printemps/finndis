define('finndis/controllers/add-place', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service('session'),
    placeController: _ember['default'].inject.controller('places'),

    showAlert: false,
    addressFieldIsDisplayed: false,

    userLabels: _ember['default'].computed(function () {
      var labels = this.get('store').peekAll('label');
      return labels;
    }),

    actions: {

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
                var addressstreet = '';
                var model = self.get('model');

                model.set('formattedaddress', results[0].formatted_address);

                address_components.forEach(function (component) {
                  switch (component.types[0]) {
                    case "premise":
                      self.set('model.name', component.short_name);
                      break;
                    case "street_address":
                      model.set('streetaddress', component.long_name);
                      break;
                    case "country":
                      model.set('country', component.long_name);
                      break;
                    case "intersection":
                      model.set('intersection', component.long_name);
                      break;
                    case "route":
                      model.set('route', component.long_name);
                      break;
                    case "sublocality_level_5":
                      model.set('sublocalitylevel5', component.long_name);
                      break;
                    case "sublocality_level_4":
                      model.set('sublocalitylevel4', component.long_name);
                      break;
                    case "sublocality_level_3":
                      model.set('sublocalitylevel3', component.long_name);
                      break;
                    case "sublocality_level_2":
                      model.set('sublocalitylevel2', component.long_name);
                      break;
                    case "sublocality_level_1":
                      model.set('sublocalitylevel1', component.long_name);
                      break;
                    case "sublocality":
                      model.set('sublocality', component.long_name);
                      break;
                    case "locality":
                      model.set('locality', component.long_name);
                      break;
                    case "administrative_area_level_1":
                      model.set('administrativearealevel1', component.long_name);
                      break;
                    case "administrative_area_level_2":
                      model.set('administrativearealevel2', component.long_name);
                      break;
                    case "administrative_area_level_3":
                      model.set('administrativearealevel3', component.long_name);
                      break;
                    case "administrative_area_level_4":
                      model.set('administrativearealevel4', component.long_name);
                      break;
                    case "administrative_area_level_5":
                      model.set('administrativearealevel5', component.long_name);
                      break;
                    case "premise":
                      model.set('premise', component.long_name);
                      break;
                    case "subpremise":
                      model.set('subpremise', component.long_name);
                      break;
                    case "colloquial_area":
                      model.set('colloquialarea', component.long_name);
                      break;
                    case "postal_code":
                      model.set('postalcode', component.long_name);
                      break;
                    case "neighborhood":
                      model.set('neighborhood', component.long_name);
                      break;
                    case "natural_feature":
                      model.set('naturalfeature', component.long_name);
                      break;
                    case "airport":
                      model.set('airport', component.long_name);
                      break;
                    case "park":
                      model.set('park', component.long_name);
                      break;
                    case "post_box":
                      model.set('postbox', component.long_name);
                      break;
                    case "street_number":
                      model.set('streetnumber', component.long_name);
                      break;
                    case "floor":
                      model.set('floor', component.long_name);
                      break;
                    case "room":
                      model.set('room', component.long_name);
                      break;
                    default:
                      break;
                  }
                });
                self.set('model.mapid', results[0].place_id);
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
        var longaddress;

        if (this.get('model.longaddress') !== '') {
          longaddress = this.get('model.longaddress');
        } else {
          longaddress = model.get("addressstreet") + ', ' + model.get("addresscity") + ', ' + model.get("addresszip") + ', ' + model.get("addresscountry");
        }

        var shortaddress = model.get('addressstreet') + ', ' + model.get('addresscity');
        this.set('model.longaddress', longaddress);
        this.set('model.shortaddress', shortaddress);

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
          uid: self.get('session.uid'),
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