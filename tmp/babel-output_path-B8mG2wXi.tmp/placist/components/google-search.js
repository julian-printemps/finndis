define('finndis/components/google-search', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    store: _ember['default'].inject.service(),
    routing: _ember['default'].inject.service('-routing'),
    session: _ember['default'].inject.service('session'),
    sessionAccount: _ember['default'].inject.service('session-account'),

    user: _ember['default'].computed(function () {
      return this.get('store').peekRecord('user', this.get('sessionAccount.user.id'));
    }),

    showPlaceDetails: false,
    labelPanelDisplayed: '',
    searchText: '',
    queryType: '',
    map: '',

    place: {
      mapid: '',
      name: '',
      locationlat: '',
      locationlng: '',
      formattedaddress: '',
      streetaddress: '',
      route: '',
      intersection: '',
      political: '',
      country: '',
      administrativearealevel1: '',
      administrativearealevel2: '',
      administrativearealevel3: '',
      administrativearealevel4: '',
      administrativearealevel5: '',
      colloquialarea: '',
      locality: '',
      sublocality: '',
      sublocalitylevel1: '',
      sublocalitylevel2: '',
      sublocalitylevel3: '',
      sublocalitylevel4: '',
      sublocalitylevel5: '',
      neighborhood: '',
      premise: '',
      subpremise: '',
      postalcode: '',
      naturalfeature: '',
      airport: '',
      park: '',
      postbox: '',
      streetnumber: '',
      floor: '',
      room: '',
      phone: '',
      openinghours: '',
      permanentlyclosed: '',
      rating: '',
      types: '',
      url: '',
      website: '',
      description: '',
      pricerange: '',
      label: ''
    },

    actions: {
      showPanelLabelList: function showPanelLabelList() {
        this.set('labelPanelDisplayed', 'show');
      },

      closeMenuPanel: function closeMenuPanel() {
        this.set('labelPanelDisplayed', '');
      },

      searchPlace: function searchPlace(param) {
        var self = this;
        var label = param;

        if (param === undefined) {
          var keyword = self.get('searchText');
        } else {
          var keyword = param.get('name');
        }

        self.set('labelPanelDisplayed', '');
        self.set('queryType', keyword);
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 16
        });
        var service;
        var infoWindow = new google.maps.InfoWindow();

        // Check if geolocation ok
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
            var geolocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            infoWindow.setPosition(geolocation);
            infoWindow.setContent('Location found.');
            map.setCenter(geolocation);

            var service = new google.maps.places.PlacesService(map);
            map.addListener('idle', performSearch);

            // google functions
            function performSearch() {
              var request = {
                bounds: map.getBounds(),
                keyword: self.get('queryType')
              };
              service.radarSearch(request, callback);
            }

            function callback(results, status) {
              if (status !== google.maps.places.PlacesServiceStatus.OK) {
                console.error(status);
                return;
              }
              for (var i = 0, result; result = results[i]; i++) {
                addMarker(result);
              }
            }

            function addMarker(place) {
              var marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location
              });

              google.maps.event.addListener(marker, 'click', function () {

                service.getDetails(place, function (result, status) {
                  if (status !== google.maps.places.PlacesServiceStatus.OK) {
                    console.error(status);
                    return;
                  }

                  self.set('showPlaceDetails', true);

                  infoWindow.setContent('<a onclick="$(\'body\').scrollTop($(\'#place-info\').offset().top);"><div><strong id="placeName">' + result.name + '</strong></div>' + '<div>' + result.formatted_address + '</div></a>');
                  infoWindow.open(map, marker);

                  // Set current place
                  self.set('place.label', label);

                  if (result.place_id) {
                    self.set('place.mapid', result.place_id);
                  }
                  if (result.name) {
                    self.set('place.name', result.name);
                  }
                  if (result.geometry.location) {
                    self.set('place.locationlat', result.geometry.location.lat());
                    self.set('place.locationlng', result.geometry.location.lng());
                  }
                  if (result.international_phone_number) {
                    self.set('place.phone', result.international_phone_number);
                  }
                  if (result.opening_hours !== undefined) {
                    self.set('place.openinghours', result.opening_hours.periods);
                  }
                  if (result.permanently_closed) {
                    self.set('place.permanentlyclosed', result.permanently_closed);
                  }
                  if (result.rating) {
                    self.set('place.rating', result.rating);
                  }
                  if (result.url) {
                    self.set('place.url', result.url);
                  }
                  if (result.website) {
                    self.set('place.website', result.website);
                  }

                  self.set('place.formattedaddress', result.formatted_address);

                  console.log(self.get('place.formattedaddress'));

                  var addressComponents = result.address_components;
                  addressComponents.forEach(function (component) {
                    switch (component.types[0]) {
                      case "street_address":
                        self.set('place.streetaddress', component.long_name);
                        break;
                      case "country":
                        self.set('place.country', component.long_name);
                        break;
                      case "intersection":
                        self.set('place.intersection', component.long_name);
                        break;
                      case "route":
                        self.set('place.route', component.long_name);
                        break;
                      case "sublocality_level_5":
                        self.set('place.sublocalitylevel5', component.long_name);
                        break;
                      case "sublocality_level_4":
                        self.set('place.sublocalitylevel4', component.long_name);
                        break;
                      case "sublocality_level_3":
                        self.set('place.sublocalitylevel3', component.long_name);
                        break;
                      case "sublocality_level_2":
                        self.set('place.sublocalitylevel2', component.long_name);
                        break;
                      case "sublocality_level_1":
                        self.set('place.sublocalitylevel1', component.long_name);
                        break;
                      case "sublocality":
                        self.set('place.sublocality', component.long_name);
                        break;
                      case "locality":
                        self.set('place.locality', component.long_name);
                        break;
                      case "administrative_area_level_1":
                        self.set('place.administrativearealevel1', component.long_name);
                        break;
                      case "administrative_area_level_2":
                        self.set('place.administrativearealevel2', component.long_name);
                        break;
                      case "administrative_area_level_3":
                        self.set('place.administrativearealevel3', component.long_name);
                        break;
                      case "administrative_area_level_4":
                        self.set('place.administrativearealevel4', component.long_name);
                        break;
                      case "administrative_area_level_5":
                        self.set('place.administrativearealevel5', component.long_name);
                        break;
                      case "premise":
                        self.set('place.premise', component.long_name);
                        break;
                      case "subpremise":
                        self.set('place.subpremise', component.long_name);
                        break;
                      case "colloquial_area":
                        self.set('place.colloquialarea', component.long_name);
                        break;
                      case "postal_code":
                        self.set('place.postalcode', component.long_name);
                        break;
                      case "neighborhood":
                        self.set('place.neighborhood', component.long_name);
                        break;
                      case "natural_feature":
                        self.set('place.naturalfeature', component.long_name);
                        break;
                      case "airport":
                        self.set('place.airport', component.long_name);
                        break;
                      case "park":
                        self.set('place.park', component.long_name);
                        break;
                      case "post_box":
                        self.set('place.postbox', component.long_name);
                        break;
                      case "street_number":
                        self.set('place.streetnumber', component.long_name);
                        break;
                      case "floor":
                        self.set('place.floor', component.long_name);
                        break;
                      case "room":
                        self.set('place.room', component.long_name);
                        break;
                      default:
                        break;
                    }
                  });
                });
              });
            }
          });
        }
        self.set('map', map);
      },

      savePlace: function savePlace() {
        var self = this;
        var place = this.get('place');
        var user = this.get('store').peekRecord('user', this.get('sessionAccount.user.id'));

        var newPlace = this.get('store').createRecord('place', {
          name: place.name,
          mapid: place.mapid,
          locationlat: place.locationlat,
          locationlng: place.locationlng,
          formattedaddress: place.formattedaddress,
          streetaddress: place.streetaddress,
          route: place.route,
          intersection: place.intersection,
          political: '',
          country: place.country,
          administrativearealevel1: place.administrativearealevel1,
          administrativearealevel2: place.administrativearealevel2,
          administrativearealevel3: place.administrativearealevel3,
          administrativearealevel4: place.administrativearealevel4,
          administrativearealevel5: place.administrativearealevel5,
          colloquialarea: place.colloquialarea,
          locality: place.locality,
          sublocality: place.sublocality,
          sublocalitylevel1: place.sublocalitylevel1,
          sublocalitylevel2: place.sublocalitylevel2,
          sublocalitylevel3: place.sublocalitylevel3,
          sublocalitylevel4: place.sublocalitylevel4,
          sublocalitylevel5: place.sublocalitylevel5,
          neighborhood: place.neighborhood,
          premise: place.premise,
          subpremise: place.subpremise,
          postalcode: place.postalcode,
          naturalfeature: place.naturalfeature,
          airport: place.airport,
          park: place.park,
          postbox: place.postbox,
          streetnumber: place.streetnumber,
          floor: place.floor,
          room: place.room,
          permanentlyclosed: place.permanentlyclosed,
          phone: place.phone,
          url: place.url,
          website: place.website,
          rating: place.rating,
          description: place.description,
          openinghours: '',
          pricerange: place.pricerange,
          user: user,
          label: place.label
        });

        newPlace.save().then(function (newPlace) {
          self.get('routing').transitionTo('places');
        });
      }

    }
  });
});