"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('finndis/adapters/application', ['exports', 'ember-data', 'ember-simple-auth/mixins/data-adapter-mixin', 'finndis/config/environment'], function (exports, _emberData, _emberSimpleAuthMixinsDataAdapterMixin, _finndisConfigEnvironment) {
  exports['default'] = _emberData['default'].JSONAPIAdapter.extend(_emberSimpleAuthMixinsDataAdapterMixin['default'], {
    authorizer: 'authorizer:application',
    host: _finndisConfigEnvironment['default'].host,
    coalesceFindRequests: true
  });
});
define('finndis/app', ['exports', 'ember', 'finndis/resolver', 'ember-load-initializers', 'finndis/config/environment'], function (exports, _ember, _finndisResolver, _emberLoadInitializers, _finndisConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _finndisConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _finndisConfigEnvironment['default'].podModulePrefix,
    Resolver: _finndisResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _finndisConfigEnvironment['default'].modulePrefix);

  //Initialize Rails CSRF
  (0, _emberLoadInitializers['default'])(App, 'rails-csrf');

  exports['default'] = App;
});
define('finndis/authorizers/application', ['exports', 'ember-simple-auth/authorizers/oauth2-bearer'], function (exports, _emberSimpleAuthAuthorizersOauth2Bearer) {
  exports['default'] = _emberSimpleAuthAuthorizersOauth2Bearer['default'].extend();
});
define('finndis/component-tests/star-rating', ['exports', 'ember-cli-star-rating/component-tests/star-rating'], function (exports, _emberCliStarRatingComponentTestsStarRating) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliStarRatingComponentTestsStarRating['default'];
    }
  });
});
define('finndis/components/add-label-button', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    store: _ember['default'].inject.service(),
    session: _ember['default'].inject.service('session'),

    actions: {

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
          var uid = this.get('session.uid');

          var label = this.get('store').createRecord('label', {
            name: name,
            uid: uid
          });
          label.save();
          this.sendAction();
        }
      }
    }
  });
});
define('finndis/components/add-label', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    store: _ember['default'].inject.service(),
    session: _ember['default'].inject.service('session'),
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
          var uid = this.get('session.uid');

          var label = this.get('store').createRecord('label', {
            name: name,
            uid: uid
          });
          label.save();
          this.set('newLabel', '');
        }
      }
    }
  });
});
define('finndis/components/address-panel', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    store: _ember['default'].inject.service(),
    session: _ember['default'].inject.service('session'),
    addressPanelClass: '',

    actions: {

      setAddress: function setAddress() {
        var self = this;
        var place = this.get('place');
        var address = self.get('place.formattedaddress');

        console.log(address);

        // Check if a variable is set
        var isAddressSet = function isAddressSet(elem) {
          if (elem !== '') {
            return true;
          } else {
            return false;
          }
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
          });
        }
      }

    }
  });
});
define('finndis/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'finndis/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _finndisConfigEnvironment) {

  var name = _finndisConfigEnvironment['default'].APP.name;
  var version = _finndisConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
define('finndis/components/cdv-nav-bar', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'header'
  });
});
define('finndis/components/google-map', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    session: _ember['default'].inject.service('session'),

    didInsertElement: function didInsertElement() {
      this._super.apply(this, arguments);
      var self = this;
      var map = '';
      var finndis = "assets/images/finndis-icon.png";

      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: { lat: parseFloat(self.get('latitude')), lng: parseFloat(self.get('longitude')) },
        mapTypeControlOptions: {
          mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.HYBRID]
        }, // here´s the array of controls
        disableDefaultUI: true, // a way to quickly hide all controls
        mapTypeControl: false,
        scaleControl: true,
        zoomControl: true,
        zoomControlOptions: {
          style: google.maps.ZoomControlStyle.LARGE
        },
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      var marker = new google.maps.Marker({
        map: map,
        position: { lat: parseFloat(self.get('latitude')), lng: parseFloat(self.get('longitude')) },
        icon: finndis
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
define('finndis/components/google-search', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    store: _ember['default'].inject.service(),
    routing: _ember['default'].inject.service('-routing'),
    session: _ember['default'].inject.service('session'),

    userLabels: _ember['default'].computed(function () {
      var labels = this.get('store').peekAll('label');
      return labels;
    }),

    showPlaceDetails: false,
    searchPanelIsDisplayed: false,
    placeExist: false,
    showErrorLocation: false,
    searchPanelDisplayed: '',
    labelAdd: '',
    labelAddButton: '',
    labelPanelDisplayed: '',
    placePanelDisplayed: '',
    queryType: '',
    warningMessage: '',

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
      uid: '',
      label: '',
      types: ''
    },

    didInsertElement: function didInsertElement() {
      this._super.apply(this, arguments);
      var self = this;
      $(document).keyup(function (e) {
        if (e.keyCode === 27) {
          self.set('placePanelDisplayed', '');
          self.set('searchPanelIsDisplayed', false);
          self.set('searchPanelDisplayed', '');
        }
      });
      $('#navigation').addClass('__fixed');
      this.send('searchMaps');
    },

    actions: {
      showAddLabel: function showAddLabel() {
        this.set('labelPanelDisplayed', 'show');
      },

      searchMaps: function searchMaps(param) {
        var self = this;
        var map = '';
        var input = document.getElementById('searchKeyword');
        input.value = '';
        var finndis = "assets/images/finndis-icon.svg";

        // For search around
        if (param === undefined) {
          var keyword = null;
        } else {
          var keyword = param.get('name');
          self.set('queryType', keyword);
        }

        this.send('closeMenuPanel');
        self.set('searchPanelDisplayed', '');

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
            var geolocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            // Default map settings
            map = new google.maps.Map(document.getElementById('map'), {
              zoom: 16,
              center: geolocation,
              mapTypeControlOptions: {
                mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.HYBRID]
              }, // here´s the array of controls
              disableDefaultUI: true, // a way to quickly hide all controls
              mapTypeControl: false,
              scaleControl: true,
              zoomControl: true,
              zoomControlOptions: {
                style: google.maps.ZoomControlStyle.LARGE
              },
              mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            var marker = new google.maps.Marker({
              position: map.getCenter(),
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 5,
                fill: '#3d95d2',
                strokeColor: '#3d95d2',
                strokeWeight: 16
              },
              map: map
            });

            var markerUser = new google.maps.Marker({
              draggable: true,
              map: map,
              icon: finndis
            });

            var infoWindow = new google.maps.InfoWindow();
            infoWindow.setPosition(geolocation);
            var service = new google.maps.places.PlacesService(map);

            // Create the search box and link it to the UI element.
            var searchBox = new google.maps.places.SearchBox(input);
            // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
            $('#searchKeyword').show();
            var markers = [];

            // Choose which function
            if (keyword === null) {
              map.addListener('bounds_changed', function () {
                searchBox.setBounds(map.getBounds());
              });
            } else {
              map.addListener('idle', performSearch);
            }

            /*
            ** POI click
            */
            var set = google.maps.InfoWindow.prototype.set;
            google.maps.InfoWindow.prototype.set = function (key, val) {
              if (key === 'map' && !this.get('noSuppress')) {
                var geocoder = new google.maps.Geocoder();
                var location = this.getPosition();
                placeMarker(location);
                return;
              }
              set.apply(this, arguments);
            };

            /*
            ** Add marker on click & save new custon place
            */
            google.maps.event.addListener(map, 'click', function (event) {
              placeMarker(event.latLng);
            });

            function placeMarker(location) {
              markerUser.setPosition(location);

              loadPlace(location);
              google.maps.event.addListener(markerUser, 'click', function () {
                self.set('placePanelDisplayed', 'show');
                loadPlace(event.latLng);
              });

              google.maps.event.addListener(markerUser, 'dragend', function (event) {
                markerUser.setPosition(event.latLng);
                loadPlace(event.latLng);
              });
            }

            function loadPlace(location) {
              var geocoder = new google.maps.Geocoder();
              geocoder.geocode({ 'location': location }, function (result, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                  // Set info
                  var service = new google.maps.places.PlacesService(map);
                  service.getDetails({
                    placeId: result[0].place_id
                  }, function (place, status) {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                      self.send('setPlaceMaps', place);
                    }
                  });
                }
              });
            }

            /*
            ** Listen for the event fired when the user selects a prediction and retrieve
            */
            searchBox.addListener('places_changed', function () {
              var places = searchBox.getPlaces();
              if (places.length == 0) {
                return;
              }
              // Clear out the old markers.
              markers.forEach(function (marker) {
                marker.setMap(null);
              });
              markers = [];
              // For each place, get the icon, name and location.
              var bounds = new google.maps.LatLngBounds();
              places.forEach(function (place) {
                addMarker(place);

                if (place.geometry.viewport) {
                  // Only geocodes have viewport.
                  bounds.union(place.geometry.viewport);
                } else {
                  bounds.extend(place.geometry.location);
                }
                var service = new google.maps.places.PlacesService(map);
              });
              map.fitBounds(bounds);
            });

            /*
            ** Search around function// google functions
            */
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

            /*
            ** add marker from search
            */
            function addMarker(place) {
              var marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location,
                icon: finndis
              });

              google.maps.event.addListener(marker, 'click', function () {
                service.getDetails(place, function (result, status) {
                  if (status !== google.maps.places.PlacesServiceStatus.OK) {
                    console.error(status);
                    return;
                  }
                  self.set('placePanelDisplayed', 'show');
                  infoWindow.setContent('<div><strong id="placeName">' + result.name + '</strong></div>' + '<div>' + result.formatted_address + '</div>');
                  infoWindow.open(map, marker);

                  // Set current place
                  self.send('setPlaceMaps', result);
                });
              });
            }
          }, function (error) {
            if (error.code == error.PERMISSION_DENIED) {
              $('#load_overlay').hide();
              self.set('showErrorLocation', true);
            }
          });
        }
      },
      // End of searchMaps

      setPlaceMaps: function setPlaceMaps(result) {
        var self = this;

        self.get('store').query('place', { filter: { uid: self.get('session.uid'), mapid: result.place_id } }).then(function (currentPlace) {
          var placeCount = 0;
          currentPlace.forEach(function (elem) {
            placeCount++;
          });

          if (placeCount === 0) {
            self.set('placeExist', false);
          } else {
            self.set('placeExist', true);
          }
        });

        self.send('loadPlaceMaps', result);
      },

      loadPlaceMaps: function loadPlaceMaps(result) {
        var self = this;

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

        // Set current address
        self.send('setAddress', result.address_components);
      },

      setAddress: function setAddress(addressComponents) {
        var self = this;
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
      },

      showSearchPanel: function showSearchPanel() {
        this.set('searchPanelDisplayed', 'show');
        $('body').toggleClass('__noscroll');
        this.set('placePanelDisplayed', '');
        this.set('searchPanelIsDisplayed', true);
      },

      closeMenuPanel: function closeMenuPanel() {
        this.set('searchPanelDisplayed', '');
        this.set('searchPanelIsDisplayed', false);
        this.set('placePanelDisplayed', '');
        if ($('body').hasClass('__noscroll')) {
          $('body').removeClass('__noscroll');
        }
      },

      showLabelAdd: function showLabelAdd() {
        this.set('labelAdd', '__edition');
        this.set('labelAddButton', '__hidden');

        $(document).keyup(function (e) {
          if (e.keyCode === 27) {
            self.set('searchPanelIsDisplayed', false);
            self.set('placePanelDisplayed', '');
          }
        });
      },

      hideLabelAdd: function hideLabelAdd() {
        this.set('labelAdd', '');
        this.set('labelAddButton', '');
      },

      savePlace: function savePlace() {
        var self = this;
        var place = this.get('place');

        var newPlace = self.get('store').createRecord('place', {
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
          uid: self.get('session.uid'),
          label: place.label
        });

        newPlace.save().then(function () {
          self.get('routing').transitionTo('places');
        });
      }
    }
  });
});
define('finndis/components/label-panel', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    store: _ember['default'].inject.service(),
    session: _ember['default'].inject.service('session'),

    userLabels: _ember['default'].computed(function () {
      return this.get('store').peekAll('label');
    }),
    sortProps: ['numericId:desc'],
    sortedLabels: _ember['default'].computed.sort('userLabels', 'sortProps'),

    actions: {
      updateLabel: function updateLabel(labelValue) {
        var self = this;
        this.get('store').findRecord('label', labelValue).then(function (label) {
          self.set('model.label', label);

          if (self.get('autoSaveLabel')) {
            self.get('model').save();
          }
          self.set('labelPanelDisplayed', '');
          $('body').toggleClass('__noscroll');
        });
      },

      closeMenuPanel: function closeMenuPanel() {
        this.set('labelPanelDisplayed', '');
        $('body').toggleClass('__noscroll');
      }

    }
  });
});
define('finndis/components/labeled-radio-button', ['exports', 'ember-radio-button/components/labeled-radio-button'], function (exports, _emberRadioButtonComponentsLabeledRadioButton) {
  exports['default'] = _emberRadioButtonComponentsLabeledRadioButton['default'];
});
define('finndis/components/login-form', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    session: _ember['default'].inject.service('session'),

    actions: {
      authenticate: function authenticate() {
        var _this = this;

        var _getProperties = this.getProperties('identification', 'password');

        var identification = _getProperties.identification;
        var password = _getProperties.password;

        return this.get('session').authenticate('authenticator:devise', identification, password)['catch'](function (reason) {
          _this.set('errorMessage', reason.error);
        });
      },

      authenticateWithGoogle: function authenticateWithGoogle() {
        this.get('session').authenticate('authenticator:torii2', 'google-oauth2');
        return;
      },

      authenticateWithTwitter: function authenticateWithTwitter() {
        this.get('session').authenticate('authenticator:torii1', 'twitter');
        return;
      }

    }
  });
});
define('finndis/components/main-header', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    session: _ember['default'].inject.service('session'),

    actions: {

      login: function login() {
        var lockOptions = { authParams: { scope: 'openid' } };
        this.get('session').authenticate('simple-auth-authenticator:lock', lockOptions);
      }
    }
  });
});
define('finndis/components/masonry-grid/component', ['exports', 'ember-masonry-grid/components/masonry-grid/component'], function (exports, _emberMasonryGridComponentsMasonryGridComponent) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMasonryGridComponentsMasonryGridComponent['default'];
    }
  });
});
define('finndis/components/masonry-item/component', ['exports', 'ember-masonry-grid/components/masonry-item/component'], function (exports, _emberMasonryGridComponentsMasonryItemComponent) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMasonryGridComponentsMasonryItemComponent['default'];
    }
  });
});
define('finndis/components/menu-panel', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    store: _ember['default'].inject.service(),
    session: _ember['default'].inject.service('session'),

    userLabels: _ember['default'].computed(function () {
      var labels = this.get('store').peekAll('label');
      return labels;
    }),

    didInsertElement: function didInsertElement() {
      var lastScrollTop = 0;
      $(window).scroll(function (event) {
        var st = $(this).scrollTop();
        if (st > lastScrollTop && st > 150) {
          if (!$('#navigation').hasClass('__hidden')) {
            $('#navigation').addClass('__hidden');
          }
        } else {
          if ($('#navigation').hasClass('__hidden')) {
            $('#navigation').removeClass('__hidden');
          }
        }
        lastScrollTop = st;
      });
    },

    actions: {

      willTransition: function willTransition() {
        this._super();
        this.set('labelPanelClass', '');
      },

      showMenuPanel: function showMenuPanel() {
        this.set('labelPanelClass', 'show');
        $('body').toggleClass('__noscroll');
      },

      closeMenuPanel: function closeMenuPanel() {
        this.set('labelPanelClass', '');
        $('body').toggleClass('__noscroll');
      },

      logout: function logout() {
        this.get('session').invalidate();
      }

    }
  });
});
define('finndis/components/place-map', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    store: _ember['default'].inject.service(),
    routing: _ember['default'].inject.service('-routing'),
    session: _ember['default'].inject.service('session'),

    userLabels: _ember['default'].computed(function () {
      var labels = this.get('store').peekAll('label');
      return labels;
    }),

    showPlaceDetails: false,
    showErrorLocation: false,
    labelAdd: '',
    labelAddButton: '',
    labelPanelDisplayed: '',
    placePanelDisplayed: '',

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
      uid: '',
      label: '',
      types: ''
    },

    didInsertElement: function didInsertElement() {
      this._super.apply(this, arguments);
      var self = this;
      $(document).keyup(function (e) {
        if (e.keyCode === 27) {
          if (self.get('labelPanelDisplayed') === 'show') {
            self.set('labelPanelDisplayed', '');
          } else {
            self.set('placePanelDisplayed', '');
          }
        }
      });
      $('#navigation').addClass('__fixed');
      this.send('displayMap');
    },

    actions: {
      showAddLabel: function showAddLabel() {
        this.set('labelPanelDisplayed', 'show');
      },

      displayMap: function displayMap() {
        var self = this;
        var map = '';
        var model = this.get('model');
        var finndis = "assets/images/finndis-icon.png";
        this.send('closeMenuPanel');

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
            var geolocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            // Default map settings
            map = new google.maps.Map(document.getElementById('map'), {
              zoom: 16,
              center: geolocation,
              mapTypeControlOptions: {
                mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.HYBRID]
              }, // here´s the array of controls
              disableDefaultUI: true, // a way to quickly hide all controls
              mapTypeControl: false,
              scaleControl: true,
              zoomControl: true,
              zoomControlOptions: {
                style: google.maps.ZoomControlStyle.LARGE
              },
              mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            // Add marker for all place
            model.forEach(function (place) {
              addMarker(place);
            });

            /*
            ** Add marker
            */
            function addMarker(place) {
              var marker = new google.maps.Marker({
                map: map,
                position: { lat: parseFloat(place.get('locationlat')), lng: parseFloat(place.get('locationlng')) },
                icon: finndis
              });

              google.maps.event.addListener(marker, 'click', function () {
                self.set('place', place);
                self.set('placePanelDisplayed', 'show');
              });
            }
          }, function (error) {
            if (error.code == error.PERMISSION_DENIED) {
              $('#load_overlay').hide();
              self.set('showErrorLocation', true);
            }
          });
          // End geolocation
        }
      },
      // End of searchMaps

      closeMenuPanel: function closeMenuPanel() {
        this.set('placePanelDisplayed', '');
        if ($('body').hasClass('__noscroll')) {
          $('body').removeClass('__noscroll');
        }
      },

      showLabelAdd: function showLabelAdd() {
        this.set('labelAdd', '__edition');
        this.set('labelAddButton', '__hidden');

        $(document).keyup(function (e) {
          if (e.keyCode === 27) {
            self.set('searchPanelIsDisplayed', false);
            self.set('placePanelDisplayed', '');
          }
        });
      },

      setRating: function setRating(params) {
        var place = this.get('model');
        var model = params.item;
        var rating = params.rating;

        place.set('rating', rating);
        place.save();
      },

      hideLabelAdd: function hideLabelAdd() {
        this.set('labelAdd', '');
        this.set('labelAddButton', '');
      }

    }
  });
});
define('finndis/components/radio-button-input', ['exports', 'ember-radio-button/components/radio-button-input'], function (exports, _emberRadioButtonComponentsRadioButtonInput) {
  exports['default'] = _emberRadioButtonComponentsRadioButtonInput['default'];
});
define('finndis/components/radio-button', ['exports', 'ember-radio-button/components/radio-button'], function (exports, _emberRadioButtonComponentsRadioButton) {
  exports['default'] = _emberRadioButtonComponentsRadioButton['default'];
});
define('finndis/components/search-box', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    store: _ember['default'].inject.service(),
    session: _ember['default'].inject.service('session'),

    resultSearch: '',

    actions: {

      search: function search() {
        var self = this;
        var uid = this.get('session.uid');
        var keyword = this.get('search');

        this.get('store').query('place', { filter: { uid: uid, keyword: keyword } }).then(function (places) {
          self.set('resultSearch', places);
        });
      }
    }
  });
});
define('finndis/components/signup-form', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    store: _ember['default'].inject.service(),
    session: _ember['default'].inject.service('session'),

    actions: {

      willTransition: function willTransition() {
        this._super();
        this.set('signupPanelClass', '');
      },

      closeMenuPanel: function closeMenuPanel() {
        this.set('signupPanelClass', '');
      },

      signup: function signup() {
        var model = this.get('model');
        var firstname = model.get('firstname');
        var lastname = model.get('lastname');
        var password = model.get('password');
        var email = model.get('email');

        var userNew = this.get('store').createRecord('user', {
          email: email,
          password: password,
          firstname: firstname,
          lastname: lastname
        });

        userNew.save();

        // model.validate().then(({
        //     model, validations
        //   }) => {
        //     if (validations.get('isValid')) {
        //       this.setProperties({
        //         showAlert: false,
        //       });
        //       model.save().then(function(user) {
        //         console.log("User saved");
        //       });
        //     } else {
        //       this.set('showAlert', true);
        //     }
        //     this.set('didValidate', true);
        //   }, (errors) => {
        // });
      },

      authenticate: function authenticate() {
        var _this = this;

        var _getProperties = this.getProperties('email', 'password');

        var email = _getProperties.email;
        var password = _getProperties.password;

        return this.get('session').authenticate('authenticator:devise', email, password)['catch'](function (reason) {
          _this.set('errorMessage', reason.error);
        });
      }
    }
  });
});
define('finndis/components/star-rating-fa', ['exports', 'ember-cli-star-rating/components/star-rating'], function (exports, _emberCliStarRatingComponentsStarRating) {
  exports['default'] = _emberCliStarRatingComponentsStarRating['default'].extend({

    fullClassNames: 'fa fa-star',
    emptyClassNames: 'fa fa-star-o'

  });
});
define('finndis/components/star-rating', ['exports', 'ember-cli-star-rating/components/star-rating'], function (exports, _emberCliStarRatingComponentsStarRating) {
  exports['default'] = _emberCliStarRatingComponentsStarRating['default'];
});
define('finndis/components/start-guide', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({});
});
define('finndis/components/tool-box', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({});
});
define('finndis/components/zf-accordion-menu', ['exports', 'ember-cli-foundation-6-sass/components/zf-accordion-menu'], function (exports, _emberCliFoundation6SassComponentsZfAccordionMenu) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFoundation6SassComponentsZfAccordionMenu['default'];
    }
  });
});
define('finndis/components/zf-accordion', ['exports', 'ember-cli-foundation-6-sass/components/zf-accordion'], function (exports, _emberCliFoundation6SassComponentsZfAccordion) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFoundation6SassComponentsZfAccordion['default'];
    }
  });
});
define('finndis/components/zf-drilldown-menu', ['exports', 'ember-cli-foundation-6-sass/components/zf-drilldown-menu'], function (exports, _emberCliFoundation6SassComponentsZfDrilldownMenu) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFoundation6SassComponentsZfDrilldownMenu['default'];
    }
  });
});
define('finndis/components/zf-dropdown-menu', ['exports', 'ember-cli-foundation-6-sass/components/zf-dropdown-menu'], function (exports, _emberCliFoundation6SassComponentsZfDropdownMenu) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFoundation6SassComponentsZfDropdownMenu['default'];
    }
  });
});
define('finndis/components/zf-dropdown', ['exports', 'ember-cli-foundation-6-sass/components/zf-dropdown'], function (exports, _emberCliFoundation6SassComponentsZfDropdown) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFoundation6SassComponentsZfDropdown['default'];
    }
  });
});
define('finndis/components/zf-magellan', ['exports', 'ember-cli-foundation-6-sass/components/zf-magellan'], function (exports, _emberCliFoundation6SassComponentsZfMagellan) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFoundation6SassComponentsZfMagellan['default'];
    }
  });
});
define('finndis/components/zf-off-canvas', ['exports', 'ember-cli-foundation-6-sass/components/zf-off-canvas'], function (exports, _emberCliFoundation6SassComponentsZfOffCanvas) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFoundation6SassComponentsZfOffCanvas['default'];
    }
  });
});
define('finndis/components/zf-orbit', ['exports', 'ember-cli-foundation-6-sass/components/zf-orbit'], function (exports, _emberCliFoundation6SassComponentsZfOrbit) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFoundation6SassComponentsZfOrbit['default'];
    }
  });
});
define('finndis/components/zf-reveal', ['exports', 'ember-cli-foundation-6-sass/components/zf-reveal'], function (exports, _emberCliFoundation6SassComponentsZfReveal) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFoundation6SassComponentsZfReveal['default'];
    }
  });
});
define('finndis/components/zf-slider', ['exports', 'ember-cli-foundation-6-sass/components/zf-slider'], function (exports, _emberCliFoundation6SassComponentsZfSlider) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFoundation6SassComponentsZfSlider['default'];
    }
  });
});
define('finndis/components/zf-tabs', ['exports', 'ember-cli-foundation-6-sass/components/zf-tabs'], function (exports, _emberCliFoundation6SassComponentsZfTabs) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFoundation6SassComponentsZfTabs['default'];
    }
  });
});
define('finndis/components/zf-tooltip', ['exports', 'ember-cli-foundation-6-sass/components/zf-tooltip'], function (exports, _emberCliFoundation6SassComponentsZfTooltip) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFoundation6SassComponentsZfTooltip['default'];
    }
  });
});
define('finndis/controllers/application', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service()
  });
});
define('finndis/controllers/array', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('finndis/controllers/edit-labels', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    store: _ember['default'].inject.service(),
    session: _ember['default'].inject.service('session'),
    labelsController: _ember['default'].inject.controller('labels'),

    sortProps: ['numericId:desc'],
    sortedLabels: _ember['default'].computed.sort('model', 'sortProps'),

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
define('finndis/controllers/help', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service('session')
  });
});
define('finndis/controllers/label', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service('session'),
    labelsController: _ember['default'].inject.controller('labels'),

    labelId: '',

    placesListByLabel: _ember['default'].computed(function () {
      var label = this.store.peekRecord('label', this.get('labelId'));
      return label.get('places');
    })

  });
});
define('finndis/controllers/labels', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service('session')
  });
});
define('finndis/controllers/login', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service('session'),

    actions: {
      willTransition: function willTransition() {
        this._super();
        this.set('signupPanelClass', '');
      },

      showSignupPanel: function showSignupPanel() {
        this.set('signupPanelClass', 'show');
      },

      closeMenuPanel: function closeMenuPanel() {
        this.set('signupPanelClass', '');
      }
    }
  });
});
define('finndis/controllers/object', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('finndis/controllers/place', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service('session'),

    isEditing: false,
    labelPanelDisplayed: '',
    mapLat: _ember['default'].computed('model', function () {
      return this.get('model.locationlat');
    }),
    mapLng: _ember['default'].computed('model', function () {
      return this.get('model.locationlng');
    }),

    hasUrlOrWebsite: _ember['default'].computed(function () {
      if (this.get('model.url') !== '' && this.get('model.url') !== null || this.get('model.website') !== '' && this.get('model.website') !== null) {
        return true;
      } else {
        return false;
      }
    }),

    hasPhoneOrAddress: _ember['default'].computed(function () {
      if (this.get('model.longaddress') !== '' && this.get('model.longaddress') !== null || this.get('model.phone') !== '' && this.get('model.phone') !== null) {
        return true;
      } else {
        return false;
      }
    }),

    userLabels: _ember['default'].computed(function () {
      var labels = this.get('store').peekAll('label');
      return labels;
    }),

    actions: {

      showAddLabel: function showAddLabel() {
        this.set('labelPanelDisplayed', 'show');
        $('body').toggleClass('__noscroll');
      },

      closeMenuPanel: function closeMenuPanel() {
        this.set('labelPanelDisplayed', '');
      },

      toggleEdition: function toggleEdition() {
        var self = this;
        this.set('isEditing', true);

        $(document).keyup(function (e) {
          if (e.keyCode === 27) {
            self.set('isEditing', false);
          }
        });
      },

      setRating: function setRating(params) {
        var place = this.get('model');
        var model = params.item;
        var rating = params.rating;

        place.set('rating', rating);
        place.save();
      },

      setPrice: function setPrice(params) {
        var place = this.get('model');
        var model = params.item;
        var rating = params.rating;

        place.set('pricerange', rating);
        place.save();
      },

      savePlace: function savePlace(model) {
        var self = this;

        var isAddressSet = function isAddressSet(elem) {
          if (elem !== '') {
            return true;
          } else {
            return false;
          }
        };

        if (isAddressSet(model.get('formattedaddress'))) {
          var geocoder = new google.maps.Geocoder();

          geocoder.geocode({ 'address': model.get('formattedaddress') }, function (results, status) {

            if (status === google.maps.GeocoderStatus.OK) {
              model.set('locationlat', results[0].geometry.location.lat());
              model.set('locationlng', results[0].geometry.location.lng());
              self.set('mapLat', results[0].geometry.location.lat());
              self.set('mapLng', results[0].geometry.location.lng());

              model.set('formattedaddress', results[0].formatted_address);

              var addressComponents = results[0].address_components;
              addressComponents.forEach(function (component) {
                switch (component.types[0]) {
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
            } else {
              console.log('Geocode was not successful for the following reason: ' + status);
            }

            model.save();
          });
        } else {
          model.save();
        }

        this.set('isEditing', false);
      },

      cancelPlace: function cancelPlace() {
        var self = this;
        var model = this.get('model');
        this.get('store').findRecord('place', model.get('id')).then(function (place) {
          place.reload();
          self.set('model', place);
          self.set('isEditing', false);
        });
      },

      deletePlace: function deletePlace(model) {
        var self = this;
        model.deleteRecord();
        model.get('isDeleted');
        model.save().then(function () {
          self.set('isEditing', false);
          self.transitionToRoute('places');
        });
      }

    }
  });
});
define('finndis/controllers/places', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service('session'),

    sortProps: ['numericId:desc'],
    sortedPlaces: _ember['default'].computed.sort('model', 'sortProps'),

    labelsList: _ember['default'].computed(function () {
      var user = this.store.peekRecord('user', this.get('session.user.id'));
      return user.get('labels');
    })

  });
});
define('finndis/controllers/users', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service('session'),

    currentUser: _ember['default'].computed(function () {
      return this.get('session.user.id');
    })

  });
});
define('finndis/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('finndis/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define("finndis/initializers/active-model-adapter", ["exports", "active-model-adapter", "active-model-adapter/active-model-serializer"], function (exports, _activeModelAdapter, _activeModelAdapterActiveModelSerializer) {
  exports["default"] = {
    name: 'active-model-adapter',
    initialize: function initialize() {
      var application = arguments[1] || arguments[0];
      application.register('adapter:-active-model', _activeModelAdapter["default"]);
      application.register('serializer:-active-model', _activeModelAdapterActiveModelSerializer["default"]);
    }
  };
});
define('finndis/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'finndis/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _finndisConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_finndisConfigEnvironment['default'].APP.name, _finndisConfigEnvironment['default'].APP.version)
  };
});
define('finndis/initializers/auth0-ember-simple-auth-initializer', ['exports', 'auth0-ember-simple-auth/authenticators/lock', 'auth0-ember-simple-auth/authorizers/jwt'], function (exports, _auth0EmberSimpleAuthAuthenticatorsLock, _auth0EmberSimpleAuthAuthorizersJwt) {
  exports['default'] = {
    name: 'auth0-ember-simple-auth-initializer',
    before: 'ember-simple-auth',
    initialize: function initialize(registry) {
      registry.register('simple-auth-authenticator:lock', _auth0EmberSimpleAuthAuthenticatorsLock['default']);
      registry.register('simple-auth-authorizer:jwt', _auth0EmberSimpleAuthAuthorizersJwt['default']);
    }
  };
});
define('finndis/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('finndis/initializers/csrf-service', ['exports'], function (exports) {
  exports['default'] = {
    name: 'rails-csrf',
    initialize: function initialize(container, app) {
      app.inject('route', 'csrf', 'service:csrf');
      app.inject('controller', 'csrf', 'service:csrf');
    }
  };
});
define('finndis/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('finndis/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.ArrayController.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('finndis/initializers/ember-simple-auth', ['exports', 'ember', 'finndis/config/environment', 'ember-simple-auth/configuration', 'ember-simple-auth/initializers/setup-session', 'ember-simple-auth/initializers/setup-session-service'], function (exports, _ember, _finndisConfigEnvironment, _emberSimpleAuthConfiguration, _emberSimpleAuthInitializersSetupSession, _emberSimpleAuthInitializersSetupSessionService) {
  exports['default'] = {
    name: 'ember-simple-auth',
    initialize: function initialize(registry) {
      var config = _finndisConfigEnvironment['default']['ember-simple-auth'] || {};
      config.baseURL = _finndisConfigEnvironment['default'].baseURL;
      _emberSimpleAuthConfiguration['default'].load(config);

      (0, _emberSimpleAuthInitializersSetupSession['default'])(registry);
      (0, _emberSimpleAuthInitializersSetupSessionService['default'])(registry);
    }
  };
});
define('finndis/initializers/export-application-global', ['exports', 'ember', 'finndis/config/environment'], function (exports, _ember, _finndisConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_finndisConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var value = _finndisConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_finndisConfigEnvironment['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('finndis/initializers/in-app-livereload', ['exports', 'finndis/config/environment', 'ember-cli-cordova/initializers/in-app-livereload'], function (exports, _finndisConfigEnvironment, _emberCliCordovaInitializersInAppLivereload) {

  var inAppReload = _emberCliCordovaInitializersInAppLivereload['default'].initialize;

  var initialize = function initialize(app) {
    if (typeof cordova === 'undefined' || _finndisConfigEnvironment['default'].environment !== 'development' || _finndisConfigEnvironment['default'].cordova && (!_finndisConfigEnvironment['default'].cordova.liveReload || !_finndisConfigEnvironment['default'].cordova.liveReload.enabled)) {
      return;
    }

    return inAppReload(app, _finndisConfigEnvironment['default']);
  };

  exports.initialize = initialize;
  exports['default'] = {
    name: 'cordova:in-app-livereload',
    initialize: initialize
  };
});
/* globals cordova */
define('finndis/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('finndis/initializers/pagefront-beacon', ['exports', 'ember-pagefront/initializers/pagefront-beacon'], function (exports, _emberPagefrontInitializersPagefrontBeacon) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPagefrontInitializersPagefrontBeacon['default'];
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function get() {
      return _emberPagefrontInitializersPagefrontBeacon.initialize;
    }
  });
});
define('finndis/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: _ember['default'].K
  };
});
define('finndis/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('finndis/initializers/zf-widget', ['exports', 'ember-cli-foundation-6-sass/initializers/zf-widget'], function (exports, _emberCliFoundation6SassInitializersZfWidget) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFoundation6SassInitializersZfWidget['default'];
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function get() {
      return _emberCliFoundation6SassInitializersZfWidget.initialize;
    }
  });
});
define("finndis/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('finndis/instance-initializers/ember-simple-auth', ['exports', 'ember-simple-auth/instance-initializers/setup-session-restoration'], function (exports, _emberSimpleAuthInstanceInitializersSetupSessionRestoration) {
  exports['default'] = {
    name: 'ember-simple-auth',
    initialize: function initialize(instance) {
      (0, _emberSimpleAuthInstanceInitializersSetupSessionRestoration['default'])(instance);
    }
  };
});
define('finndis/instance-initializers/pagefront-beacon', ['exports', 'ember-pagefront/instance-initializers/pagefront-beacon'], function (exports, _emberPagefrontInstanceInitializersPagefrontBeacon) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPagefrontInstanceInitializersPagefrontBeacon['default'];
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function get() {
      return _emberPagefrontInstanceInitializersPagefrontBeacon.initialize;
    }
  });
});
define('finndis/models/label', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    name: _emberData['default'].attr('string'),
    uid: _emberData['default'].attr('string'),
    places: _emberData['default'].hasMany('place', { async: true }),
    isEditing: _emberData['default'].attr('boolean', { defaultValue: false }),
    numericId: Ember.computed(function () {
      if (this.get('id')) {
        var id = this.get('id');
        return +id;
      } else {
        return null;
      }
    })
  });
});
define('finndis/models/place', ['exports', 'ember', 'ember-data', 'ember-cp-validations'], function (exports, _ember, _emberData, _emberCpValidations) {

  var Validations = (0, _emberCpValidations.buildValidations)({
    name: {
      description: 'Place name',
      validators: [(0, _emberCpValidations.validator)('presence', true)]
    },
    phone: {
      validators: [(0, _emberCpValidations.validator)('format', {
        allowBlank: true,
        type: 'phone'
      })]
    },
    website: {
      validators: [(0, _emberCpValidations.validator)('format', {
        allowBlank: true,
        type: 'url'
      })]
    }
  }, {
    debounce: 500
  });

  exports['default'] = _emberData['default'].Model.extend(Validations, {
    name: _emberData['default'].attr('string'),
    mapid: _emberData['default'].attr('string'),
    locationlat: _emberData['default'].attr('string'),
    locationlng: _emberData['default'].attr('string'),

    formattedaddress: _emberData['default'].attr('string'),
    streetaddress: _emberData['default'].attr('string'),
    route: _emberData['default'].attr('string'),
    intersection: _emberData['default'].attr('string'),
    //osef
    political: _emberData['default'].attr('string'),
    country: _emberData['default'].attr('string'),
    administrativearealevel1: _emberData['default'].attr('string'),
    administrativearealevel2: _emberData['default'].attr('string'),
    administrativearealevel3: _emberData['default'].attr('string'),
    administrativearealevel4: _emberData['default'].attr('string'),
    administrativearealevel5: _emberData['default'].attr('string'),
    colloquialarea: _emberData['default'].attr('string'),
    locality: _emberData['default'].attr('string'),
    sublocality: _emberData['default'].attr('string'),
    sublocalitylevel1: _emberData['default'].attr('string'),
    sublocalitylevel2: _emberData['default'].attr('string'),
    sublocalitylevel3: _emberData['default'].attr('string'),
    sublocalitylevel4: _emberData['default'].attr('string'),
    sublocalitylevel5: _emberData['default'].attr('string'),
    neighborhood: _emberData['default'].attr('string'),
    premise: _emberData['default'].attr('string'),
    subpremise: _emberData['default'].attr('string'),
    postalcode: _emberData['default'].attr('string'),
    naturalfeature: _emberData['default'].attr('string'),
    airport: _emberData['default'].attr('string'),
    park: _emberData['default'].attr('string'),
    postbox: _emberData['default'].attr('string'),
    streetnumber: _emberData['default'].attr('string'),
    floor: _emberData['default'].attr('string'),
    room: _emberData['default'].attr('string'),
    permanentlyclosed: _emberData['default'].attr('boolean', { defaultValue: false }),
    phone: _emberData['default'].attr('string'),
    url: _emberData['default'].attr('string'),
    website: _emberData['default'].attr('string'),
    openinghours: _emberData['default'].attr('string'),
    rating: _emberData['default'].attr('number', { defaultValue: 0 }),
    description: _emberData['default'].attr('string'),
    pricerange: _emberData['default'].attr('string'),
    uid: _emberData['default'].attr('string'),
    label: _emberData['default'].belongsTo('label'),
    isEditing: _emberData['default'].attr('boolean', { defaultValue: false }),
    numericId: _ember['default'].computed(function () {
      if (this.get('id')) {
        var id = this.get('id');
        return +id;
      } else {
        return null;
      }
    })
  });
});
define('finndis/models/user', ['exports', 'ember', 'ember-data', 'ember-cp-validations'], function (exports, _ember, _emberData, _emberCpValidations) {

  var Validations = (0, _emberCpValidations.buildValidations)({
    // password: {
    //   description: 'Password',
    //   validators: [
    //     validator('presence', true),
    //     validator('length', {
    //       min: 8,
    //       max: 32
    //     }),
    //     validator('format', {
    //       regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/,
    //       message: '{description} must include at least one upper case letter, one lower case letter, and a number'
    //     })
    //   ]
    // },
    email: {
      validators: [(0, _emberCpValidations.validator)('presence', true), (0, _emberCpValidations.validator)('format', {
        type: 'email'
      })]
    }

  }, {
    debounce: 500
  });

  exports['default'] = _emberData['default'].Model.extend(Validations, {
    email: _emberData['default'].attr('string'),
    password: _emberData['default'].attr('string'),
    firstname: _emberData['default'].attr('string'),
    lastname: _emberData['default'].attr('string'),
    uid: _emberData['default'].attr('string'),
    provider: _emberData['default'].attr('string'),
    places: _emberData['default'].hasMany('place', { async: true }),
    labels: _emberData['default'].hasMany('label', { async: true })
  });
});
define('finndis/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('finndis/router', ['exports', 'ember', 'finndis/config/environment'], function (exports, _ember, _finndisConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _finndisConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    this.route('places', { path: '/home' });
    this.route('place', { path: '/:place_id' });
    this.route('add-place', { path: '/add' });
    this.route('labels');
    this.route('label', { path: 'labels/:label_id' });
    this.route('users', { path: '/profile' });
    this.route('search');
    this.route('edit-labels', { path: 'labels/edit' });
    this.route('login', { path: '/' });
    this.route('map');
    this.route('help');
  });

  exports['default'] = Router;
});
define('finndis/routes/add-place', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
    session: _ember['default'].inject.service('session')
  });
});
define('finndis/routes/application', ['exports', 'ember', 'ember-simple-auth/mixins/application-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsApplicationRouteMixin) {
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsApplicationRouteMixin['default'], {

    actions: {
      login: function login() {
        var lockOptions = { authParams: { scope: 'openid' } };
        this.get('session').authenticate('simple-auth-authenticator:lock', lockOptions);
      },

      logout: function logout() {
        this.get('session').invalidate();
      }
    }
  });
});
define('finndis/routes/edit-labels', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {

    model: function model() {
      var uid = this.get('session.uid');

      return this.store.query('label', { filter: { uid: uid } }).then(function (labels) {
        return labels;
      });
    }

  });
});
define('finndis/routes/help', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
    session: _ember['default'].inject.service('session')
  });
});
define('finndis/routes/index', ['exports', 'ember', 'ember-simple-auth/mixins/unauthenticated-route-mixin', 'ic-ajax', 'finndis/config/environment'], function (exports, _ember, _emberSimpleAuthMixinsUnauthenticatedRouteMixin, _icAjax, _finndisConfigEnvironment) {
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsUnauthenticatedRouteMixin['default'], {
    model: function model() {
      var host = _finndisConfigEnvironment['default'].host || '';
    }
  });
});
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
define('finndis/routes/labels', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
    session: _ember['default'].inject.service('session')
  });
});
define('finndis/routes/login', ['exports', 'ember', 'ember-simple-auth/mixins/unauthenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsUnauthenticatedRouteMixin) {
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsUnauthenticatedRouteMixin['default']);
});
define('finndis/routes/map', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
    session: _ember['default'].inject.service('session'),

    model: function model() {
      var uid = this.get('session.uid');

      return this.store.query('place', { filter: { uid: uid } }).then(function (places) {
        return places;
      });
    }
  });
});
define('finndis/routes/place', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
    session: _ember['default'].inject.service('session'),

    resetController: function resetController(controller, isExiting) {
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
define('finndis/routes/places', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
    session: _ember['default'].inject.service('session'),

    model: function model() {
      var uid = this.get('session.uid');

      return this.store.query('place', { filter: { uid: uid } }).then(function (places) {
        return places;
      });
    }
  });
});
define('finndis/routes/search', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
    session: _ember['default'].inject.service('session')
  });
});
define('finndis/routes/users', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
    session: _ember['default'].inject.service('session')
  });
});
define('finndis/serializers/application', ['exports', 'ember', 'ember-data'], function (exports, _ember, _emberData) {
  var underscore = _ember['default'].String.underscore;

  exports['default'] = _emberData['default'].JSONAPISerializer.extend({

    keyForAttribute: function keyForAttribute(attr) {
      return underscore(attr);
    },

    keyForRelationship: function keyForRelationship(rawKey) {
      return underscore(rawKey);
    },

    serialize: function serialize() {

      var result = this._super.apply(this, arguments),
          attr = result.data.attributes || {},
          rel = result.data.relationships || {};

      return Object.keys(rel).reduce(function (acc, elem) {
        var data = rel[elem].data;
        if (data) {
          acc[elem + "_id"] = data.id;
        }
        if (data && data.type) {
          acc[elem + "_type"] = data.type[0].toUpperCase() + data.type.slice(1, -1);
        }
        return acc;
      }, attr);
    }

  });
});
define('finndis/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define('finndis/services/cordova', ['exports', 'ember-cli-cordova/services/cordova'], function (exports, _emberCliCordovaServicesCordova) {
  exports['default'] = _emberCliCordovaServicesCordova['default'].extend({});
});
/* jshint esnext:true */
define('finndis/services/csrf', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Object.extend({
    onAjaxComplete: (function () {
      var _this = this;
      this.fetchToken();

      _ember['default'].$(document).on("ajaxComplete", function (event, xhr, settings) {
        var csrf_param = xhr.getResponseHeader('X-CSRF-Param'),
            csrf_token = xhr.getResponseHeader('X-CSRF-Token');

        if (csrf_param && csrf_token) {
          _this.setData({ csrf_param: csrf_token });
        }
      });
    }).on('init'),
    setPrefilter: function setPrefilter() {
      var token = this.get('data').token;
      var preFilter = function preFilter(options, originalOptions, jqXHR) {
        return jqXHR.setRequestHeader('X-CSRF-Token', token);
      };
      $.ajaxPrefilter(preFilter);
    },
    setData: function setData(data) {
      var param = _ember['default'].keys(data)[0];
      this.set('data', { param: param, token: data[param] });
      this.setPrefilter();

      return this.get('data');
    },
    fetchToken: function fetchToken() {
      var _this = this;
      var token = _ember['default'].$('meta[name="csrf-token"]').attr('content') || '';

      return _ember['default'].RSVP.resolve().then(function () {
        return _this.setData({ 'authenticity_token': token });
      });
    }
  });
});
define('finndis/services/pagefront-beacon', ['exports', 'ember-pagefront/services/pagefront-beacon'], function (exports, _emberPagefrontServicesPagefrontBeacon) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPagefrontServicesPagefrontBeacon['default'];
    }
  });
});
define('finndis/services/session', ['exports', 'ember', 'ember-simple-auth/services/session'], function (exports, _ember, _emberSimpleAuthServicesSession) {
  exports['default'] = _emberSimpleAuthServicesSession['default'].extend({
    store: _ember['default'].inject.service(),

    setCurrentUser: (function () {
      var self = this;

      if (self.get('isAuthenticated')) {

        var identities = this.get('data.authenticated.profile.identities');
        var uid = identities[0].user_id;

        self.set('uid', uid);

        return this.get('store').query('label', { filter: { uid: uid } }).then(function (labels) {
          if (labels.get("length") === 0) {
            var label = self.get('store').createRecord('label', {
              name: 'Bar',
              uid: uid
            });
            label.save();
          } else {
            self.set('labels', labels);
          }
        });
      }
    }).observes('isAuthenticated')
  });
});
define('finndis/session-stores/application', ['exports', 'ember-simple-auth/session-stores/adaptive'], function (exports, _emberSimpleAuthSessionStoresAdaptive) {
  exports['default'] = _emberSimpleAuthSessionStoresAdaptive['default'].extend();
});
define("finndis/templates/add-place", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.3.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 12,
            "column": 0
          }
        },
        "moduleName": "finndis/templates/add-place.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "page-wrapper row big");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "columns");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "map_search--holder row");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "columns medium-8 medium-offset-2");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [2, 1, 1, 1]), 1, 1);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["inline", "main-header", [], ["menuHideAddNew", true], ["loc", [null, [1, 0], [1, 35]]]], ["inline", "google-search", [], ["latitude", "34.851939", "longitude", "-82.399752"], ["loc", [null, [7, 8], [7, 69]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("finndis/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.3.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "finndis/templates/application.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [1, 0], [1, 10]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("finndis/templates/cdv-generic-nav-bar", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.2",
            "loc": {
              "source": null,
              "start": {
                "line": 3,
                "column": 4
              },
              "end": {
                "line": 5,
                "column": 4
              }
            },
            "moduleName": "finndis/templates/cdv-generic-nav-bar.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("i");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element2 = dom.childAt(fragment, [1]);
            var morphs = new Array(1);
            morphs[0] = dom.createAttrMorph(element2, 'class');
            return morphs;
          },
          statements: [["attribute", "class", ["concat", ["icon ", ["get", "nav.leftButton.icon", ["loc", [null, [4, 23], [4, 42]]]]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": {
            "name": "modifiers",
            "modifiers": ["action"]
          },
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 8,
              "column": 0
            }
          },
          "moduleName": "finndis/templates/cdv-generic-nav-bar.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element3 = dom.childAt(fragment, [1]);
          var morphs = new Array(3);
          morphs[0] = dom.createElementMorph(element3);
          morphs[1] = dom.createMorphAt(element3, 1, 1);
          morphs[2] = dom.createMorphAt(element3, 3, 3);
          return morphs;
        },
        statements: [["element", "action", ["leftButton"], [], ["loc", [null, [2, 10], [2, 33]]]], ["block", "if", [["get", "nav.leftButton.icon", ["loc", [null, [3, 10], [3, 29]]]]], [], 0, null, ["loc", [null, [3, 4], [5, 11]]]], ["content", "nav.leftButton.text", ["loc", [null, [6, 4], [6, 27]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 10,
              "column": 0
            },
            "end": {
              "line": 14,
              "column": 0
            }
          },
          "moduleName": "finndis/templates/cdv-generic-nav-bar.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("h1");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
          return morphs;
        },
        statements: [["content", "nav.title.text", ["loc", [null, [12, 4], [12, 22]]]]],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.2",
            "loc": {
              "source": null,
              "start": {
                "line": 18,
                "column": 4
              },
              "end": {
                "line": 20,
                "column": 4
              }
            },
            "moduleName": "finndis/templates/cdv-generic-nav-bar.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("i");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1]);
            var morphs = new Array(1);
            morphs[0] = dom.createAttrMorph(element0, 'class');
            return morphs;
          },
          statements: [["attribute", "class", ["concat", ["icon ", ["get", "nav.rightButton.icon", ["loc", [null, [19, 23], [19, 43]]]]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 16,
              "column": 0
            },
            "end": {
              "line": 23,
              "column": 0
            }
          },
          "moduleName": "finndis/templates/cdv-generic-nav-bar.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element1 = dom.childAt(fragment, [1]);
          var morphs = new Array(3);
          morphs[0] = dom.createElementMorph(element1);
          morphs[1] = dom.createMorphAt(element1, 1, 1);
          morphs[2] = dom.createMorphAt(element1, 3, 3);
          return morphs;
        },
        statements: [["element", "action", ["rightButton"], [], ["loc", [null, [17, 10], [17, 34]]]], ["block", "if", [["get", "nav.rightButton.icon", ["loc", [null, [18, 10], [18, 30]]]]], [], 0, null, ["loc", [null, [18, 4], [20, 11]]]], ["content", "nav.rightButton.text", ["loc", [null, [21, 4], [21, 28]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.3.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 24,
            "column": 0
          }
        },
        "moduleName": "finndis/templates/cdv-generic-nav-bar.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "nav.leftButton.text", ["loc", [null, [1, 6], [1, 25]]]]], [], 0, null, ["loc", [null, [1, 0], [8, 7]]]], ["block", "if", [["get", "nav.title.text", ["loc", [null, [10, 6], [10, 20]]]]], [], 1, null, ["loc", [null, [10, 0], [14, 7]]]], ["block", "if", [["get", "nav.rightButton.text", ["loc", [null, [16, 6], [16, 26]]]]], [], 2, null, ["loc", [null, [16, 0], [23, 7]]]]],
      locals: [],
      templates: [child0, child1, child2]
    };
  })());
});
define("finndis/templates/components/add-label-button", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "modifiers",
          "modifiers": ["action"]
        },
        "revision": "Ember@2.3.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 9,
            "column": 0
          }
        },
        "moduleName": "finndis/templates/components/add-label-button.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("form");
        dom.setAttribute(el1, "class", "label-add--holder row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "columns small-10");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "columns small-1 label-add--button--holder");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("button");
        dom.setAttribute(el3, "type", "submit");
        dom.setAttribute(el3, "class", "label-add--icon--holder");
        var el4 = dom.createElement("i");
        dom.setAttribute(el4, "class", "label-add--icon fa fa-plus");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [3]);
        var morphs = new Array(3);
        morphs[0] = dom.createElementMorph(element0);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [1]), 1, 1);
        morphs[2] = dom.createElementMorph(element1);
        return morphs;
      },
      statements: [["element", "action", ["addLabel"], ["bubbles", false, "on", "submit"], ["loc", [null, [1, 36], [1, 83]]]], ["inline", "input", [], ["type", "text", "class", "label-editor--input", "placeholder", "Add a new label", "value", ["subexpr", "@mut", [["get", "newLabel", ["loc", [null, [3, 88], [3, 96]]]]], [], []]], ["loc", [null, [3, 4], [3, 98]]]], ["element", "action", ["addLabel"], ["bubbles", false, "on", "click"], ["loc", [null, [5, 57], [5, 103]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("finndis/templates/components/add-label", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "modifiers",
          "modifiers": ["action"]
        },
        "revision": "Ember@2.3.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 9,
            "column": 0
          }
        },
        "moduleName": "finndis/templates/components/add-label.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("form");
        dom.setAttribute(el1, "class", "label-add--holder row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "columns small-10 small-offset-1");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "columns small-1 label-add--button--holder");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("button");
        dom.setAttribute(el3, "type", "submit");
        dom.setAttribute(el3, "class", "label-add--icon--holder");
        var el4 = dom.createElement("i");
        dom.setAttribute(el4, "class", "label-add--icon fa fa-plus");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [3]);
        var morphs = new Array(3);
        morphs[0] = dom.createElementMorph(element0);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [1]), 1, 1);
        morphs[2] = dom.createElementMorph(element1);
        return morphs;
      },
      statements: [["element", "action", ["addLabel"], ["bubbles", false, "on", "submit"], ["loc", [null, [1, 36], [1, 83]]]], ["inline", "input", [], ["type", "text", "class", "label-editor--input", "placeholder", "Add a new label", "value", ["subexpr", "@mut", [["get", "newLabel", ["loc", [null, [3, 88], [3, 96]]]]], [], []]], ["loc", [null, [3, 4], [3, 98]]]], ["element", "action", ["addLabel"], ["bubbles", false, "on", "click"], ["loc", [null, [5, 57], [5, 103]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("finndis/templates/components/address-panel", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.3.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "finndis/templates/components/address-panel.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "place.formattedaddress", ["loc", [null, [1, 14], [1, 36]]]]], [], []], "class", "place--main-input place--address--elem", "type", "text", "placeholder", "Add an address", "focus-out", "setAddress", "bubbles", "false"], ["loc", [null, [1, 0], [1, 165]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("finndis/templates/components/cdv-nav-bar", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.3.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "finndis/templates/components/cdv-nav-bar.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "yield", ["loc", [null, [1, 0], [1, 9]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("finndis/templates/components/google-map", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.3.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "finndis/templates/components/google-map.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "id", "map");
        dom.setAttribute(el1, "class", "map-place");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  })());
});
define("finndis/templates/components/google-search", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 3,
              "column": 0
            },
            "end": {
              "line": 14,
              "column": 0
            }
          },
          "moduleName": "finndis/templates/components/google-search.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "map_error--holder row");
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "columns shrink");
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("i");
          dom.setAttribute(el3, "class", "map_error--icon fa fa-exclamation-circle");
          dom.setAttribute(el3, "aria-hidden", "true");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n  ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "columns");
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "map_error");
          var el4 = dom.createTextNode("\n      It seems like there is a problem with the geolocation. Please make sure it is enabled in your settings.\n    ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n  ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 38,
              "column": 8
            },
            "end": {
              "line": 47,
              "column": 8
            }
          },
          "moduleName": "finndis/templates/components/google-search.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "place--info--holder row");
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "shrink columns");
          var el3 = dom.createTextNode("\n            ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("i");
          dom.setAttribute(el3, "class", "place--action--icon fa fa-exclamation-circle");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n          ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "columns");
          var el3 = dom.createTextNode("\n            This place seems to be in your list.\n          ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 50,
              "column": 10
            },
            "end": {
              "line": 61,
              "column": 10
            }
          },
          "moduleName": "finndis/templates/components/google-search.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("          ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "columns small-12");
          var el2 = dom.createTextNode("\n            ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "place--address row");
          var el3 = dom.createTextNode("\n              ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "shrink columns");
          var el4 = dom.createTextNode("\n                ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("i");
          dom.setAttribute(el4, "class", "place--main--icon fa fa-map-marker");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n              ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n              ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "columns");
          var el4 = dom.createTextNode("\n                ");
          dom.appendChild(el3, el4);
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n              ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n            ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 1, 3]), 1, 1);
          return morphs;
        },
        statements: [["content", "place.formattedaddress", ["loc", [null, [57, 16], [57, 42]]]]],
        locals: [],
        templates: []
      };
    })();
    var child3 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 62,
              "column": 10
            },
            "end": {
              "line": 75,
              "column": 10
            }
          },
          "moduleName": "finndis/templates/components/google-search.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("          ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "columns small-12");
          var el2 = dom.createTextNode("\n            ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("a");
          var el3 = dom.createTextNode("\n              ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "place--phone row");
          var el4 = dom.createTextNode("\n                ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          dom.setAttribute(el4, "class", "shrink columns");
          var el5 = dom.createTextNode("\n                  ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("i");
          dom.setAttribute(el5, "class", "place--main--icon fa fa-phone");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n                ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n                ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          dom.setAttribute(el4, "class", "columns");
          var el5 = dom.createTextNode("\n                  ");
          dom.appendChild(el4, el5);
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n                ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n              ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n            ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element5 = dom.childAt(fragment, [1, 1]);
          var morphs = new Array(2);
          morphs[0] = dom.createAttrMorph(element5, 'href');
          morphs[1] = dom.createMorphAt(dom.childAt(element5, [1, 3]), 1, 1);
          return morphs;
        },
        statements: [["attribute", "href", ["concat", ["tel:", ["get", "place.phone", ["loc", [null, [64, 27], [64, 38]]]]]]], ["content", "place.phone", ["loc", [null, [70, 18], [70, 33]]]]],
        locals: [],
        templates: []
      };
    })();
    var child4 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 80,
              "column": 10
            },
            "end": {
              "line": 93,
              "column": 10
            }
          },
          "moduleName": "finndis/templates/components/google-search.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("          ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "columns small-12");
          var el2 = dom.createTextNode("\n            ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("a");
          var el3 = dom.createTextNode("\n              ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "place--website row");
          var el4 = dom.createTextNode("\n                ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          dom.setAttribute(el4, "class", "shrink columns");
          var el5 = dom.createTextNode("\n                  ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("i");
          dom.setAttribute(el5, "class", "place--main--icon fa fa-globe");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n                ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n                ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          dom.setAttribute(el4, "class", "columns");
          var el5 = dom.createTextNode("\n                  ");
          dom.appendChild(el4, el5);
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n                ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n              ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n            ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element4 = dom.childAt(fragment, [1, 1]);
          var morphs = new Array(2);
          morphs[0] = dom.createAttrMorph(element4, 'href');
          morphs[1] = dom.createMorphAt(dom.childAt(element4, [1, 3]), 1, 1);
          return morphs;
        },
        statements: [["attribute", "href", ["concat", [["get", "place.website", ["loc", [null, [82, 23], [82, 36]]]]]]], ["content", "place.website", ["loc", [null, [88, 18], [88, 35]]]]],
        locals: [],
        templates: []
      };
    })();
    var child5 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 94,
              "column": 10
            },
            "end": {
              "line": 107,
              "column": 10
            }
          },
          "moduleName": "finndis/templates/components/google-search.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("          ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "columns small-12");
          var el2 = dom.createTextNode("\n            ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("a");
          var el3 = dom.createTextNode("\n              ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "place--url row");
          var el4 = dom.createTextNode("\n                ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          dom.setAttribute(el4, "class", "shrink columns");
          var el5 = dom.createTextNode("\n                  ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("i");
          dom.setAttribute(el5, "class", "place--main--icon fa fa-google");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n                ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n                ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          dom.setAttribute(el4, "class", "columns");
          var el5 = dom.createTextNode("\n                  Google Map\n                ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n              ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n            ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element3 = dom.childAt(fragment, [1, 1]);
          var morphs = new Array(1);
          morphs[0] = dom.createAttrMorph(element3, 'href');
          return morphs;
        },
        statements: [["attribute", "href", ["concat", [["get", "place.url", ["loc", [null, [96, 23], [96, 32]]]]]]]],
        locals: [],
        templates: []
      };
    })();
    var child6 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 125,
              "column": 8
            },
            "end": {
              "line": 133,
              "column": 8
            }
          },
          "moduleName": "finndis/templates/components/google-search.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "place--info--holder row");
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "columns");
          var el3 = dom.createTextNode("\n            ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "place--rating");
          var el4 = dom.createTextNode("\n              ");
          dom.appendChild(el3, el4);
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n            ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n          ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 1, 1]), 1, 1);
          return morphs;
        },
        statements: [["inline", "star-rating-fa", [], ["item", ["subexpr", "@mut", [["get", "place", ["loc", [null, [129, 36], [129, 41]]]]], [], []], "rating", ["subexpr", "@mut", [["get", "place.rating", ["loc", [null, [129, 49], [129, 61]]]]], [], []]], ["loc", [null, [129, 14], [129, 63]]]]],
        locals: [],
        templates: []
      };
    })();
    var child7 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 148,
              "column": 8
            },
            "end": {
              "line": 150,
              "column": 8
            }
          },
          "moduleName": "finndis/templates/components/google-search.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("          ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("a");
          dom.setAttribute(el1, "class", "button tool_box--button");
          var el2 = dom.createElement("i");
          dom.setAttribute(el2, "class", "tool_box--icon fa fa-times");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode(" Close");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element2 = dom.childAt(fragment, [1]);
          var morphs = new Array(1);
          morphs[0] = dom.createElementMorph(element2);
          return morphs;
        },
        statements: [["element", "action", ["closeMenuPanel"], [], ["loc", [null, [149, 45], [149, 72]]]]],
        locals: [],
        templates: []
      };
    })();
    var child8 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 150,
              "column": 8
            },
            "end": {
              "line": 152,
              "column": 8
            }
          },
          "moduleName": "finndis/templates/components/google-search.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("          ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("a");
          dom.setAttribute(el1, "class", "button tool_box--button");
          var el2 = dom.createElement("i");
          dom.setAttribute(el2, "class", "tool_box--icon fa fa-search");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode(" Search around me");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element1 = dom.childAt(fragment, [1]);
          var morphs = new Array(1);
          morphs[0] = dom.createElementMorph(element1);
          return morphs;
        },
        statements: [["element", "action", ["showSearchPanel"], [], ["loc", [null, [151, 45], [151, 73]]]]],
        locals: [],
        templates: []
      };
    })();
    var child9 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 175,
              "column": 8
            },
            "end": {
              "line": 177,
              "column": 8
            }
          },
          "moduleName": "finndis/templates/components/google-search.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("          ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("a");
          dom.setAttribute(el1, "class", "button button_label");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createElementMorph(element0);
          morphs[1] = dom.createMorphAt(element0, 0, 0);
          return morphs;
        },
        statements: [["element", "action", ["searchMaps", ["get", "label", ["loc", [null, [176, 63], [176, 68]]]]], [], ["loc", [null, [176, 41], [176, 70]]]], ["content", "label.name", ["loc", [null, [176, 71], [176, 85]]]]],
        locals: ["label"],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.3.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 189,
            "column": 0
          }
        },
        "moduleName": "finndis/templates/components/google-search.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "id", "load_overlay");
        dom.setAttribute(el1, "class", "load_overlay");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "id", "map");
        dom.setAttribute(el1, "class", "map-canvas map_search");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "id", "place_map");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "place_map--inner");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("article");
        dom.setAttribute(el3, "class", "place");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("header");
        dom.setAttribute(el4, "class", "place--header");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("a");
        dom.setAttribute(el5, "href", "#");
        dom.setAttribute(el5, "class", "button edit-button");
        var el6 = dom.createElement("i");
        dom.setAttribute(el6, "class", "place--action--icon fa fa-star");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("Save");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("a");
        dom.setAttribute(el5, "href", "#");
        dom.setAttribute(el5, "class", "button delete-button");
        var el6 = dom.createElement("i");
        dom.setAttribute(el6, "class", "place--action--icon fa fa-times");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("Close");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("i");
        dom.setAttribute(el5, "class", "place--labels--icon fa fa-tag");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("ul");
        dom.setAttribute(el5, "class", "place--labels clearfix");
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("li");
        dom.setAttribute(el6, "class", "place--labelitem");
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("li");
        dom.setAttribute(el6, "class", "place--labelitem");
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("i");
        dom.setAttribute(el7, "class", "place--add--icon fa fa-plus");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n          ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("main");
        dom.setAttribute(el4, "class", "place--main");
        var el5 = dom.createTextNode("\n\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "place--info--holder row");
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "place--info--holder row");
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "place--info--holder row");
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "columns small-12");
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("a");
        dom.setAttribute(el7, "target", "_blank");
        var el8 = dom.createTextNode("\n              ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("div");
        dom.setAttribute(el8, "class", "place--direction row");
        var el9 = dom.createTextNode("\n                ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("div");
        dom.setAttribute(el9, "class", "shrink columns");
        var el10 = dom.createTextNode("\n                  ");
        dom.appendChild(el9, el10);
        var el10 = dom.createElement("i");
        dom.setAttribute(el10, "class", "place--main--icon fa fa-location-arrow");
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("\n                ");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("div");
        dom.setAttribute(el9, "class", "columns");
        var el10 = dom.createTextNode("\n                  Get direction\n                ");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n              ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n            ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n          ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "tool_box--holder search_tool");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "row align-middle align-right");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "google_footer small-4 medium-5 columns");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("img");
        dom.setAttribute(el4, "src", "assets/images/powered-by-google/android/res/drawable-hdpi/powered_by_google_on_white.png");
        dom.setAttribute(el4, "alt", "powered-by-google");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "tool_box small-8 medium-7 columns");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "button-group tool_box--button-group");
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "row");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "small-12 medium-8 medium-offset-2 columns");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("h3");
        dom.setAttribute(el4, "class", "panel--section--title");
        var el5 = dom.createTextNode("Choose a label");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "row label-panel--list--holder");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "small-12 medium-8 medium-offset-2 columns");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "row");
        var el5 = dom.createTextNode("\n          ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("a");
        var el6 = dom.createElement("i");
        dom.setAttribute(el6, "class", "label_edition--icon fa fa-plus");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n          ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        var el6 = dom.createTextNode("\n            ");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("    ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("a");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("a");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element6 = dom.childAt(fragment, [8]);
        var element7 = dom.childAt(element6, [1, 1]);
        var element8 = dom.childAt(element7, [1]);
        var element9 = dom.childAt(element8, [1]);
        var element10 = dom.childAt(element8, [3]);
        var element11 = dom.childAt(element8, [7]);
        var element12 = dom.childAt(element8, [9]);
        var element13 = dom.childAt(element7, [3]);
        var element14 = dom.childAt(element13, [3]);
        var element15 = dom.childAt(element13, [5]);
        var element16 = dom.childAt(element13, [7, 1, 1]);
        var element17 = dom.childAt(fragment, [12]);
        var element18 = dom.childAt(element17, [4, 1, 1]);
        var element19 = dom.childAt(element18, [1]);
        var element20 = dom.childAt(element18, [3]);
        var element21 = dom.childAt(fragment, [17]);
        var element22 = dom.childAt(fragment, [19]);
        var morphs = new Array(28);
        morphs[0] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        morphs[2] = dom.createAttrMorph(element6, 'class');
        morphs[3] = dom.createElementMorph(element9);
        morphs[4] = dom.createElementMorph(element10);
        morphs[5] = dom.createMorphAt(element8, 5, 5);
        morphs[6] = dom.createElementMorph(element11);
        morphs[7] = dom.createElementMorph(element12);
        morphs[8] = dom.createMorphAt(dom.childAt(element12, [1]), 0, 0);
        morphs[9] = dom.createMorphAt(element13, 1, 1);
        morphs[10] = dom.createMorphAt(element14, 1, 1);
        morphs[11] = dom.createMorphAt(element14, 2, 2);
        morphs[12] = dom.createMorphAt(element15, 1, 1);
        morphs[13] = dom.createMorphAt(element15, 2, 2);
        morphs[14] = dom.createAttrMorph(element16, 'href');
        morphs[15] = dom.createMorphAt(element13, 9, 9);
        morphs[16] = dom.createMorphAt(dom.childAt(fragment, [10, 1, 3, 1]), 1, 1);
        morphs[17] = dom.createAttrMorph(element17, 'class');
        morphs[18] = dom.createAttrMorph(element19, 'class');
        morphs[19] = dom.createElementMorph(element19);
        morphs[20] = dom.createAttrMorph(element20, 'class');
        morphs[21] = dom.createMorphAt(element20, 1, 1);
        morphs[22] = dom.createMorphAt(element18, 5, 5);
        morphs[23] = dom.createMorphAt(fragment, 15, 15, contextualElement);
        morphs[24] = dom.createAttrMorph(element21, 'class');
        morphs[25] = dom.createElementMorph(element21);
        morphs[26] = dom.createAttrMorph(element22, 'class');
        morphs[27] = dom.createElementMorph(element22);
        return morphs;
      },
      statements: [["block", "if", [["get", "showErrorLocation", ["loc", [null, [3, 6], [3, 23]]]]], [], 0, null, ["loc", [null, [3, 0], [14, 7]]]], ["inline", "input", [], ["id", "searchKeyword", "type", "text", "placeholder", "Search with Google Map", "value", ["subexpr", "@mut", [["get", "searchText", ["loc", [null, [16, 82], [16, 92]]]]], [], []]], ["loc", [null, [16, 0], [16, 94]]]], ["attribute", "class", ["concat", ["place_map panel left ", ["get", "placePanelDisplayed", ["loc", [null, [20, 50], [20, 69]]]]]]], ["element", "action", ["savePlace"], [], ["loc", [null, [24, 47], [24, 69]]]], ["element", "action", ["closeMenuPanel"], [], ["loc", [null, [25, 49], [25, 76]]]], ["inline", "input", [], ["class", "place--title __input", "type", "text", "placeholder", "Name", "value", ["subexpr", "@mut", [["get", "place.name", ["loc", [null, [26, 82], [26, 92]]]]], [], []]], ["loc", [null, [26, 8], [26, 94]]]], ["element", "action", ["showAddLabel"], ["bubbles", "false"], ["loc", [null, [27, 49], [27, 90]]]], ["element", "action", ["showAddLabel"], ["bubbles", "false"], ["loc", [null, [28, 43], [28, 84]]]], ["content", "place.label.name", ["loc", [null, [29, 39], [29, 59]]]], ["block", "if", [["get", "placeExist", ["loc", [null, [38, 14], [38, 24]]]]], [], 1, null, ["loc", [null, [38, 8], [47, 15]]]], ["block", "if", [["get", "place.formattedaddress", ["loc", [null, [50, 16], [50, 38]]]]], [], 2, null, ["loc", [null, [50, 10], [61, 17]]]], ["block", "if", [["get", "place.phone", ["loc", [null, [62, 16], [62, 27]]]]], [], 3, null, ["loc", [null, [62, 10], [75, 17]]]], ["block", "if", [["get", "place.website", ["loc", [null, [80, 16], [80, 29]]]]], [], 4, null, ["loc", [null, [80, 10], [93, 17]]]], ["block", "if", [["get", "place.url", ["loc", [null, [94, 16], [94, 25]]]]], [], 5, null, ["loc", [null, [94, 10], [107, 17]]]], ["attribute", "href", ["concat", ["http://maps.google.com/maps?daddr=", ["get", "place.locationlat", ["loc", [null, [112, 57], [112, 74]]]], ",", ["get", "place.locationlng", ["loc", [null, [112, 79], [112, 96]]]], "&ll="]]], ["block", "if", [["get", "place.rating", ["loc", [null, [125, 14], [125, 26]]]]], [], 6, null, ["loc", [null, [125, 8], [133, 15]]]], ["block", "if", [["get", "searchPanelIsDisplayed", ["loc", [null, [148, 14], [148, 36]]]]], [], 7, 8, ["loc", [null, [148, 8], [152, 15]]]], ["attribute", "class", ["concat", ["panel search_panel bottom ", ["get", "searchPanelDisplayed", ["loc", [null, [160, 40], [160, 60]]]]]]], ["attribute", "class", ["concat", ["button button_label label_edition ", ["get", "labelAddButton", ["loc", [null, [170, 56], [170, 70]]]]]]], ["element", "action", ["showLabelAdd", ["get", "label", ["loc", [null, [170, 98], [170, 103]]]]], [], ["loc", [null, [170, 74], [170, 105]]]], ["attribute", "class", ["concat", ["label_edition--content ", ["get", "labelAdd", ["loc", [null, [171, 47], [171, 55]]]]]]], ["inline", "add-label-button", [], ["action", "hideLabelAdd"], ["loc", [null, [172, 12], [172, 54]]]], ["block", "each", [["get", "userLabels", ["loc", [null, [175, 16], [175, 26]]]]], [], 9, null, ["loc", [null, [175, 8], [177, 17]]]], ["inline", "label-panel", [], ["userLabels", ["subexpr", "@mut", [["get", "userLabels", ["loc", [null, [185, 25], [185, 35]]]]], [], []], "labelPanelDisplayed", ["subexpr", "@mut", [["get", "labelPanelDisplayed", ["loc", [null, [185, 56], [185, 75]]]]], [], []], "model", ["subexpr", "@mut", [["get", "place", ["loc", [null, [185, 82], [185, 87]]]]], [], []], "autoSaveLabel", false], ["loc", [null, [185, 0], [185, 109]]]], ["attribute", "class", ["concat", ["panel-overlay bottom ", ["get", "searchPanelDisplayed", ["loc", [null, [187, 33], [187, 53]]]]]]], ["element", "action", ["closeMenuPanel"], [], ["loc", [null, [187, 57], [187, 84]]]], ["attribute", "class", ["concat", ["panel-overlay place_map ", ["get", "placePanelDisplayed", ["loc", [null, [188, 36], [188, 55]]]]]]], ["element", "action", ["closeMenuPanel"], [], ["loc", [null, [188, 59], [188, 86]]]]],
      locals: [],
      templates: [child0, child1, child2, child3, child4, child5, child6, child7, child8, child9]
    };
  })());
});
define("finndis/templates/components/label-panel", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 14,
              "column": 10
            },
            "end": {
              "line": 35,
              "column": 10
            }
          },
          "moduleName": "finndis/templates/components/label-panel.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          dom.setAttribute(el1, "class", "label-editor--holder");
          var el2 = dom.createTextNode("\n              ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("label");
          dom.setAttribute(el2, "class", "label--listitem--label");
          var el3 = dom.createTextNode("\n                ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "label--listitem label-editor collapse align-middle row");
          var el4 = dom.createTextNode("\n                  ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          dom.setAttribute(el4, "class", "label--icon-holder small-1 columns");
          var el5 = dom.createTextNode("\n                    ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("i");
          dom.setAttribute(el5, "class", "label--icon fa fa-tag");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n                  ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n                  ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          dom.setAttribute(el4, "class", "small-10 columns");
          var el5 = dom.createTextNode("\n                    ");
          dom.appendChild(el4, el5);
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n                  ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n                  ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          dom.setAttribute(el4, "class", "label--icon-holder small-1 columns");
          var el5 = dom.createTextNode("\n                    ");
          dom.appendChild(el4, el5);
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n                  ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n                ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n              ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n            ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1, 1, 1]);
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(dom.childAt(element0, [3]), 1, 1);
          morphs[1] = dom.createMorphAt(dom.childAt(element0, [5]), 1, 1);
          return morphs;
        },
        statements: [["content", "label.name", ["loc", [null, [22, 20], [22, 34]]]], ["inline", "radio-button", [], ["id", ["subexpr", "@mut", [["get", "label.id", ["loc", [null, [26, 25], [26, 33]]]]], [], []], "value", ["subexpr", "@mut", [["get", "label.id", ["loc", [null, [27, 28], [27, 36]]]]], [], []], "groupValue", ["subexpr", "@mut", [["get", "labelValue", ["loc", [null, [28, 33], [28, 43]]]]], [], []], "changed", "updateLabel", "name", "label"], ["loc", [null, [25, 20], [30, 36]]]]],
        locals: ["label"],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.3.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 42,
            "column": 0
          }
        },
        "moduleName": "finndis/templates/components/label-panel.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("form");
        dom.setAttribute(el2, "class", "add-label--form");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "row");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "back-button--holder small-2 columns");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("a");
        var el6 = dom.createElement("i");
        dom.setAttribute(el6, "class", "back-button fa fa-times");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "small-10 columns");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "row");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "medium-12 columns");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("ul");
        dom.setAttribute(el5, "class", "label--list");
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("a");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [0]);
        var element2 = dom.childAt(element1, [1]);
        var element3 = dom.childAt(element2, [1]);
        var element4 = dom.childAt(element3, [1, 1]);
        var element5 = dom.childAt(fragment, [2]);
        var morphs = new Array(6);
        morphs[0] = dom.createAttrMorph(element1, 'class');
        morphs[1] = dom.createElementMorph(element4);
        morphs[2] = dom.createMorphAt(dom.childAt(element3, [3]), 1, 1);
        morphs[3] = dom.createMorphAt(dom.childAt(element2, [3, 1, 1]), 1, 1);
        morphs[4] = dom.createAttrMorph(element5, 'class');
        morphs[5] = dom.createElementMorph(element5);
        return morphs;
      },
      statements: [["attribute", "class", ["concat", ["panel right ", ["get", "labelPanelDisplayed", ["loc", [null, [1, 26], [1, 45]]]]]]], ["element", "action", ["closeMenuPanel"], [], ["loc", [null, [5, 11], [5, 38]]]], ["content", "add-label", ["loc", [null, [8, 8], [8, 21]]]], ["block", "each", [["get", "sortedLabels", ["loc", [null, [14, 18], [14, 30]]]]], [], 0, null, ["loc", [null, [14, 10], [35, 19]]]], ["attribute", "class", ["concat", ["panel-overlay right ", ["get", "labelPanelDisplayed", ["loc", [null, [41, 32], [41, 51]]]]]]], ["element", "action", ["closeMenuPanel"], [], ["loc", [null, [41, 55], [41, 82]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("finndis/templates/components/labeled-radio-button", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.3.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 12,
            "column": 0
          }
        },
        "moduleName": "finndis/templates/components/labeled-radio-button.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["inline", "radio-button", [], ["radioClass", ["subexpr", "@mut", [["get", "radioClass", ["loc", [null, [2, 15], [2, 25]]]]], [], []], "radioId", ["subexpr", "@mut", [["get", "radioId", ["loc", [null, [3, 12], [3, 19]]]]], [], []], "changed", "innerRadioChanged", "disabled", ["subexpr", "@mut", [["get", "disabled", ["loc", [null, [5, 13], [5, 21]]]]], [], []], "groupValue", ["subexpr", "@mut", [["get", "groupValue", ["loc", [null, [6, 15], [6, 25]]]]], [], []], "name", ["subexpr", "@mut", [["get", "name", ["loc", [null, [7, 9], [7, 13]]]]], [], []], "required", ["subexpr", "@mut", [["get", "required", ["loc", [null, [8, 13], [8, 21]]]]], [], []], "value", ["subexpr", "@mut", [["get", "value", ["loc", [null, [9, 10], [9, 15]]]]], [], []]], ["loc", [null, [1, 0], [9, 17]]]], ["content", "yield", ["loc", [null, [11, 0], [11, 9]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("finndis/templates/components/login-form", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 21,
              "column": 8
            },
            "end": {
              "line": 23,
              "column": 8
            }
          },
          "moduleName": "finndis/templates/components/login-form.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("          ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["content", "errorMessage", ["loc", [null, [22, 10], [22, 26]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.3.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 35,
            "column": 0
          }
        },
        "moduleName": "finndis/templates/components/login-form.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "medium-8 medium-offset-2 columns");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("form");
        dom.setAttribute(el3, "class", "login-form");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "row");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "small-12 medium-6 columns");
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "small-12 medium-6 columns");
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "login-form--button-holder row");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "small-12 columns");
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("button");
        dom.setAttribute(el6, "type", "submit");
        dom.setAttribute(el6, "class", "button");
        var el7 = dom.createElement("i");
        dom.setAttribute(el7, "class", "fa fa-sign-in");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode(" Sign in");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "row");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "columns");
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "row");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "columns");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("a");
        dom.setAttribute(el5, "class", "button");
        var el6 = dom.createTextNode("Login with Google");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 1]);
        var element1 = dom.childAt(element0, [1]);
        var element2 = dom.childAt(element1, [1]);
        var element3 = dom.childAt(element0, [5, 1, 1]);
        var morphs = new Array(5);
        morphs[0] = dom.createElementMorph(element1);
        morphs[1] = dom.createMorphAt(dom.childAt(element2, [1]), 1, 1);
        morphs[2] = dom.createMorphAt(dom.childAt(element2, [3]), 1, 1);
        morphs[3] = dom.createMorphAt(dom.childAt(element0, [3, 1]), 1, 1);
        morphs[4] = dom.createElementMorph(element3);
        return morphs;
      },
      statements: [["element", "action", ["authenticate"], ["on", "submit"], ["loc", [null, [3, 10], [3, 47]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "identification", ["loc", [null, [6, 24], [6, 38]]]]], [], []], "type", "email", "placeholder", "Enter Login"], ["loc", [null, [6, 10], [6, 79]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "password", ["loc", [null, [9, 24], [9, 32]]]]], [], []], "type", "password", "placeholder", "Enter Password"], ["loc", [null, [9, 10], [9, 79]]]], ["block", "if", [["get", "errorMessage", ["loc", [null, [21, 14], [21, 26]]]]], [], 0, null, ["loc", [null, [21, 8], [23, 15]]]], ["element", "action", ["authenticateWithGoogle"], [], ["loc", [null, [29, 11], [29, 46]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("finndis/templates/components/main-header", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": {
            "name": "missing-wrapper",
            "problems": ["wrong-type"]
          },
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 3,
              "column": 0
            }
          },
          "moduleName": "finndis/templates/components/main-header.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "menu-panel", [], ["menuShowLogo", ["subexpr", "@mut", [["get", "menuShowLogo", ["loc", [null, [2, 28], [2, 40]]]]], [], []], "menuHideAddNew", ["subexpr", "@mut", [["get", "menuHideAddNew", ["loc", [null, [2, 56], [2, 70]]]]], [], []]], ["loc", [null, [2, 2], [2, 72]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.2",
            "loc": {
              "source": null,
              "start": {
                "line": 9,
                "column": 56
              },
              "end": {
                "line": 9,
                "column": 158
              }
            },
            "moduleName": "finndis/templates/components/main-header.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createElement("img");
            dom.setAttribute(el1, "class", "logo--svg");
            dom.setAttribute(el1, "src", "assets/images/finndis-icon.svg");
            dom.setAttribute(el1, "alt", "Finndis");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode(" Finndis");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 3,
              "column": 0
            },
            "end": {
              "line": 19,
              "column": 0
            }
          },
          "moduleName": "finndis/templates/components/main-header.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "navigation--holder home");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "row");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "columns small-12");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("nav");
          dom.setAttribute(el4, "class", "row navigation");
          var el5 = dom.createTextNode("\n          ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("div");
          dom.setAttribute(el5, "class", "navigation--title small-7 medum-8 large-9 columns");
          var el6 = dom.createTextNode("\n            ");
          dom.appendChild(el5, el6);
          var el6 = dom.createElement("h1");
          dom.setAttribute(el6, "class", "site-title");
          var el7 = dom.createElement("strong");
          dom.setAttribute(el7, "class", "logo");
          var el8 = dom.createComment("");
          dom.appendChild(el7, el8);
          dom.appendChild(el6, el7);
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("\n          ");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n\n          ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("div");
          dom.setAttribute(el5, "class", "small-5 medum-4 large-3 columns");
          var el6 = dom.createTextNode("\n            ");
          dom.appendChild(el5, el6);
          var el6 = dom.createElement("a");
          dom.setAttribute(el6, "class", "button expanded button_login");
          var el7 = dom.createTextNode("Login");
          dom.appendChild(el6, el7);
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("\n          ");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n        ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1, 1, 1, 1]);
          var element1 = dom.childAt(element0, [3, 1]);
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(dom.childAt(element0, [1, 1, 0]), 0, 0);
          morphs[1] = dom.createElementMorph(element1);
          return morphs;
        },
        statements: [["block", "link-to", ["places"], [], 0, null, ["loc", [null, [9, 56], [9, 170]]]], ["element", "action", ["login"], [], ["loc", [null, [13, 52], [13, 70]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.3.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 20,
            "column": 0
          }
        },
        "moduleName": "finndis/templates/components/main-header.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "session.isAuthenticated", ["loc", [null, [1, 6], [1, 29]]]]], [], 0, 1, ["loc", [null, [1, 0], [19, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("finndis/templates/components/menu-panel", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.2",
            "loc": {
              "source": null,
              "start": {
                "line": 8,
                "column": 54
              },
              "end": {
                "line": 8,
                "column": 156
              }
            },
            "moduleName": "finndis/templates/components/menu-panel.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createElement("img");
            dom.setAttribute(el1, "class", "logo--svg");
            dom.setAttribute(el1, "src", "assets/images/finndis-icon.svg");
            dom.setAttribute(el1, "alt", "Finndis");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode(" Finndis");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 6,
              "column": 8
            },
            "end": {
              "line": 10,
              "column": 8
            }
          },
          "moduleName": "finndis/templates/components/menu-panel.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "navigation--title columns");
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("h1");
          dom.setAttribute(el2, "class", "site-title");
          var el3 = dom.createElement("strong");
          dom.setAttribute(el3, "class", "logo");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 1, 0]), 0, 0);
          return morphs;
        },
        statements: [["block", "link-to", ["places"], [], 0, null, ["loc", [null, [8, 54], [8, 168]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.2",
            "loc": {
              "source": null,
              "start": {
                "line": 13,
                "column": 45
              },
              "end": {
                "line": 13,
                "column": 156
              }
            },
            "moduleName": "finndis/templates/components/menu-panel.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createElement("i");
            dom.setAttribute(el1, "class", "navigation--icon no_text fa fa-arrow-left");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 10,
              "column": 8
            },
            "end": {
              "line": 16,
              "column": 8
            }
          },
          "moduleName": "finndis/templates/components/menu-panel.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "columns navigation--button-holder left");
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("ul");
          dom.setAttribute(el2, "class", "dropdown menu navigation--list");
          var el3 = dom.createTextNode("\n            ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("li");
          dom.setAttribute(el3, "class", "navigation--listitem");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n          ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 1, 1]), 0, 0);
          return morphs;
        },
        statements: [["block", "link-to", ["places"], ["class", "navigation--link no_text"], 0, null, ["loc", [null, [13, 45], [13, 168]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 18,
              "column": 10
            },
            "end": {
              "line": 22,
              "column": 10
            }
          },
          "moduleName": "finndis/templates/components/menu-panel.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("ul");
          dom.setAttribute(el1, "class", "dropdown menu navigation--list");
          var el2 = dom.createTextNode("\n              ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("li");
          dom.setAttribute(el2, "class", "navigation--listitem");
          var el3 = dom.createElement("a");
          dom.setAttribute(el3, "class", "navigation--link");
          var el4 = dom.createElement("i");
          dom.setAttribute(el4, "class", "navigation--icon fa fa-bars");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("Menu");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n            ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element5 = dom.childAt(fragment, [1, 1]);
          var morphs = new Array(1);
          morphs[0] = dom.createElementMorph(element5);
          return morphs;
        },
        statements: [["element", "action", ["showMenuPanel"], ["on", "click"], ["loc", [null, [20, 47], [20, 84]]]]],
        locals: [],
        templates: []
      };
    })();
    var child3 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.2",
            "loc": {
              "source": null,
              "start": {
                "line": 24,
                "column": 47
              },
              "end": {
                "line": 24,
                "column": 142
              }
            },
            "moduleName": "finndis/templates/components/menu-panel.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createElement("i");
            dom.setAttribute(el1, "class", "navigation--icon fa fa-plus");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("New");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 22,
              "column": 10
            },
            "end": {
              "line": 27,
              "column": 10
            }
          },
          "moduleName": "finndis/templates/components/menu-panel.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("ul");
          dom.setAttribute(el1, "class", "dropdown menu navigation--list");
          var el2 = dom.createTextNode("\n              ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("li");
          dom.setAttribute(el2, "class", "navigation--listitem");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n              ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("li");
          dom.setAttribute(el2, "class", "navigation--listitem");
          var el3 = dom.createElement("a");
          dom.setAttribute(el3, "class", "navigation--link");
          var el4 = dom.createElement("i");
          dom.setAttribute(el4, "class", "navigation--icon fa fa-bars");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("Menu");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n            ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element3 = dom.childAt(fragment, [1]);
          var element4 = dom.childAt(element3, [3]);
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(dom.childAt(element3, [1]), 0, 0);
          morphs[1] = dom.createElementMorph(element4);
          return morphs;
        },
        statements: [["block", "link-to", ["add-place"], ["class", "navigation--link"], 0, null, ["loc", [null, [24, 47], [24, 154]]]], ["element", "action", ["showMenuPanel"], ["on", "click"], ["loc", [null, [25, 47], [25, 84]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child4 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 45,
              "column": 4
            },
            "end": {
              "line": 54,
              "column": 4
            }
          },
          "moduleName": "finndis/templates/components/menu-panel.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "row align-middle");
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "small-3 columns");
          var el3 = dom.createTextNode("\n          ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("img");
          dom.setAttribute(el3, "class", "user-section--image");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n        ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "small-9 columns");
          var el3 = dom.createTextNode("\n          ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          dom.setAttribute(el3, "class", "user-section--name");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n        ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element1 = dom.childAt(fragment, [1]);
          var element2 = dom.childAt(element1, [1, 1]);
          var morphs = new Array(2);
          morphs[0] = dom.createAttrMorph(element2, 'src');
          morphs[1] = dom.createMorphAt(dom.childAt(element1, [3, 1]), 0, 0);
          return morphs;
        },
        statements: [["attribute", "src", ["concat", [["get", "session.data.authenticated.profile.picture", ["loc", [null, [48, 50], [48, 92]]]]]]], ["content", "session.data.authenticated.profile.name", ["loc", [null, [51, 43], [51, 86]]]]],
        locals: [],
        templates: []
      };
    })();
    var child5 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 61,
              "column": 8
            },
            "end": {
              "line": 61,
              "column": 93
            }
          },
          "moduleName": "finndis/templates/components/menu-panel.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("i");
          dom.setAttribute(el1, "class", "fa fa-home");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode(" Home");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child6 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 73,
              "column": 4
            },
            "end": {
              "line": 73,
              "column": 108
            }
          },
          "moduleName": "finndis/templates/components/menu-panel.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("i");
          dom.setAttribute(el1, "class", "navigation--icon fa fa-map-marker");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("My places");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child7 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 80,
              "column": 4
            },
            "end": {
              "line": 80,
              "column": 103
            }
          },
          "moduleName": "finndis/templates/components/menu-panel.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("i");
          dom.setAttribute(el1, "class", "navigation--icon fa fa-plus");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("Add new");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child8 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 87,
              "column": 4
            },
            "end": {
              "line": 87,
              "column": 112
            }
          },
          "moduleName": "finndis/templates/components/menu-panel.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("i");
          dom.setAttribute(el1, "class", "navigation--icon fa fa-search");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("Search in finndis");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child9 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 94,
              "column": 4
            },
            "end": {
              "line": 94,
              "column": 99
            }
          },
          "moduleName": "finndis/templates/components/menu-panel.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("i");
          dom.setAttribute(el1, "class", "navigation--icon fa fa-question");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("Help");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child10 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 101,
              "column": 4
            },
            "end": {
              "line": 101,
              "column": 54
            }
          },
          "moduleName": "finndis/templates/components/menu-panel.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Edit");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child11 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.2",
            "loc": {
              "source": null,
              "start": {
                "line": 106,
                "column": 10
              },
              "end": {
                "line": 115,
                "column": 10
              }
            },
            "moduleName": "finndis/templates/components/menu-panel.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("          ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "label--listitem label-editor row");
            var el2 = dom.createTextNode("\n            ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "label--icon-holder small-2 columns");
            var el3 = dom.createTextNode("\n              ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("i");
            dom.setAttribute(el3, "class", "label--icon fa fa-tag");
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n            ");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n            ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "small-10 columns");
            var el3 = dom.createTextNode("\n              ");
            dom.appendChild(el2, el3);
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n            ");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n          ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 3]), 1, 1);
            return morphs;
          },
          statements: [["content", "label.name", ["loc", [null, [112, 14], [112, 28]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 104,
              "column": 6
            },
            "end": {
              "line": 117,
              "column": 6
            }
          },
          "moduleName": "finndis/templates/components/menu-panel.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          dom.setAttribute(el1, "class", "label-editor--holder");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("        ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createAttrMorph(element0, 'id');
          morphs[1] = dom.createMorphAt(element0, 1, 1);
          return morphs;
        },
        statements: [["attribute", "id", ["concat", [["get", "label.labelId", ["loc", [null, [105, 18], [105, 31]]]]]]], ["block", "link-to", ["label", ["get", "label", ["loc", [null, [106, 29], [106, 34]]]]], [], 0, null, ["loc", [null, [106, 10], [115, 22]]]]],
        locals: ["label"],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.3.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 124,
            "column": 0
          }
        },
        "moduleName": "finndis/templates/components/menu-panel.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "id", "navigation");
        dom.setAttribute(el1, "class", "navigation--holder");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "row");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "columns small-12");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("nav");
        dom.setAttribute(el4, "class", "row navigation");
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "shrink columns end navigation--button-holder");
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("nav");
        dom.setAttribute(el1, "id", "panel-menu");
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "panel--section user-section");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("a");
        dom.setAttribute(el3, "class", "close-button");
        var el4 = dom.createElement("i");
        dom.setAttribute(el4, "class", "fa fa-times");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "row");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "small-4 columns");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("a");
        dom.setAttribute(el5, "class", "button user-button left");
        var el6 = dom.createTextNode("Logout ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("i");
        dom.setAttribute(el6, "class", "fa fa-sign-out");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "small-4 columns");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n\n\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "panel--section");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "panel--section");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "panel--section");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "panel--section");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "panel--section label-section");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h3");
        dom.setAttribute(el3, "class", "panel--section--title");
        var el4 = dom.createTextNode("Labels");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3, "class", "label--list");
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("a");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element6 = dom.childAt(fragment, [1]);
        var element7 = dom.childAt(element6, [1, 1, 1]);
        var element8 = dom.childAt(fragment, [3]);
        var element9 = dom.childAt(element8, [2]);
        var element10 = dom.childAt(element9, [2]);
        var element11 = dom.childAt(element9, [7]);
        var element12 = dom.childAt(element11, [1, 1]);
        var element13 = dom.childAt(element8, [6]);
        var element14 = dom.childAt(element8, [10]);
        var element15 = dom.childAt(element8, [14]);
        var element16 = dom.childAt(element8, [18]);
        var element17 = dom.childAt(element8, [22]);
        var element18 = dom.childAt(fragment, [5]);
        var morphs = new Array(22);
        morphs[0] = dom.createElementMorph(element6);
        morphs[1] = dom.createMorphAt(element7, 1, 1);
        morphs[2] = dom.createMorphAt(dom.childAt(element7, [3]), 1, 1);
        morphs[3] = dom.createAttrMorph(element8, 'class');
        morphs[4] = dom.createElementMorph(element10);
        morphs[5] = dom.createMorphAt(element9, 5, 5);
        morphs[6] = dom.createElementMorph(element11);
        morphs[7] = dom.createElementMorph(element12);
        morphs[8] = dom.createMorphAt(dom.childAt(element11, [3]), 1, 1);
        morphs[9] = dom.createElementMorph(element13);
        morphs[10] = dom.createMorphAt(element13, 1, 1);
        morphs[11] = dom.createElementMorph(element14);
        morphs[12] = dom.createMorphAt(element14, 1, 1);
        morphs[13] = dom.createElementMorph(element15);
        morphs[14] = dom.createMorphAt(element15, 1, 1);
        morphs[15] = dom.createElementMorph(element16);
        morphs[16] = dom.createMorphAt(element16, 1, 1);
        morphs[17] = dom.createElementMorph(element17);
        morphs[18] = dom.createMorphAt(element17, 3, 3);
        morphs[19] = dom.createMorphAt(dom.childAt(element17, [5]), 1, 1);
        morphs[20] = dom.createAttrMorph(element18, 'class');
        morphs[21] = dom.createElementMorph(element18);
        return morphs;
      },
      statements: [["element", "action", ["showNav"], ["on", "scroll"], ["loc", [null, [2, 48], [2, 80]]]], ["block", "if", [["get", "menuShowLogo", ["loc", [null, [6, 14], [6, 26]]]]], [], 0, 1, ["loc", [null, [6, 8], [16, 15]]]], ["block", "if", [["get", "menuHideAddNew", ["loc", [null, [18, 16], [18, 30]]]]], [], 2, 3, ["loc", [null, [18, 10], [27, 17]]]], ["attribute", "class", ["concat", ["panel-menu panel left ", ["get", "labelPanelClass", ["loc", [null, [37, 52], [37, 67]]]]]]], ["element", "action", ["closeMenuPanel"], [], ["loc", [null, [42, 30], [42, 57]]]], ["block", "link-to", ["places"], ["class", "navigation--user-link"], 4, null, ["loc", [null, [45, 4], [54, 16]]]], ["element", "action", ["closeMenuPanel"], ["on", "click"], ["loc", [null, [56, 21], [56, 59]]]], ["element", "action", ["logout"], [], ["loc", [null, [58, 43], [58, 62]]]], ["block", "link-to", ["places"], ["class", "button user-button right"], 5, null, ["loc", [null, [61, 8], [61, 105]]]], ["element", "action", ["closeMenuPanel"], ["on", "click"], ["loc", [null, [72, 30], [72, 68]]]], ["block", "link-to", ["places"], ["class", "navigation--link"], 6, null, ["loc", [null, [73, 4], [73, 120]]]], ["element", "action", ["closeMenuPanel"], ["on", "click"], ["loc", [null, [79, 30], [79, 68]]]], ["block", "link-to", ["add-place"], ["class", "navigation--link"], 7, null, ["loc", [null, [80, 4], [80, 115]]]], ["element", "action", ["closeMenuPanel"], ["on", "click"], ["loc", [null, [86, 30], [86, 68]]]], ["block", "link-to", ["search"], ["class", "navigation--link"], 8, null, ["loc", [null, [87, 4], [87, 124]]]], ["element", "action", ["closeMenuPanel"], ["on", "click"], ["loc", [null, [93, 30], [93, 68]]]], ["block", "link-to", ["help"], ["class", "navigation--link"], 9, null, ["loc", [null, [94, 4], [94, 111]]]], ["element", "action", ["closeMenuPanel"], ["on", "click"], ["loc", [null, [99, 44], [99, 82]]]], ["block", "link-to", ["edit-labels"], ["class", "edit-button"], 10, null, ["loc", [null, [101, 4], [101, 66]]]], ["block", "each", [["get", "userLabels", ["loc", [null, [104, 14], [104, 24]]]]], [], 11, null, ["loc", [null, [104, 6], [117, 15]]]], ["attribute", "class", ["concat", ["panel-overlay left __nav ", ["get", "labelPanelClass", ["loc", [null, [123, 37], [123, 52]]]]]]], ["element", "action", ["closeMenuPanel"], [], ["loc", [null, [123, 56], [123, 83]]]]],
      locals: [],
      templates: [child0, child1, child2, child3, child4, child5, child6, child7, child8, child9, child10, child11]
    };
  })());
});
define("finndis/templates/components/place-map", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 3,
              "column": 0
            },
            "end": {
              "line": 14,
              "column": 0
            }
          },
          "moduleName": "finndis/templates/components/place-map.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "map_error--holder row");
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "columns shrink");
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("i");
          dom.setAttribute(el3, "class", "map_error--icon fa fa-exclamation-circle");
          dom.setAttribute(el3, "aria-hidden", "true");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n  ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "columns");
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "map_error");
          var el4 = dom.createTextNode("\n      It seems like there is a problem with the geolocation. Please make sure it is enabled in your settings.\n    ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n  ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 23,
              "column": 8
            },
            "end": {
              "line": 23,
              "column": 126
            }
          },
          "moduleName": "finndis/templates/components/place-map.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("i");
          dom.setAttribute(el1, "class", "place--action--icon fa fa-info-circle");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("View details");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 37,
              "column": 10
            },
            "end": {
              "line": 48,
              "column": 10
            }
          },
          "moduleName": "finndis/templates/components/place-map.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("          ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "columns small-12");
          var el2 = dom.createTextNode("\n            ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "place--address row");
          var el3 = dom.createTextNode("\n              ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "small-1 columns");
          var el4 = dom.createTextNode("\n                ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("i");
          dom.setAttribute(el4, "class", "place--main--icon fa fa-map-marker");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n              ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n              ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "small-11 columns");
          var el4 = dom.createTextNode("\n                ");
          dom.appendChild(el3, el4);
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n              ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n            ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 1, 3]), 1, 1);
          return morphs;
        },
        statements: [["content", "place.formattedaddress", ["loc", [null, [44, 16], [44, 42]]]]],
        locals: [],
        templates: []
      };
    })();
    var child3 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 49,
              "column": 10
            },
            "end": {
              "line": 62,
              "column": 10
            }
          },
          "moduleName": "finndis/templates/components/place-map.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("          ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "columns small-12");
          var el2 = dom.createTextNode("\n            ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("a");
          var el3 = dom.createTextNode("\n              ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "place--phone row");
          var el4 = dom.createTextNode("\n                ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          dom.setAttribute(el4, "class", "small-1 columns");
          var el5 = dom.createTextNode("\n                  ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("i");
          dom.setAttribute(el5, "class", "place--main--icon fa fa-phone");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n                ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n                ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          dom.setAttribute(el4, "class", "small-11 columns");
          var el5 = dom.createTextNode("\n                  ");
          dom.appendChild(el4, el5);
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n                ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n              ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n            ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element2 = dom.childAt(fragment, [1, 1]);
          var morphs = new Array(2);
          morphs[0] = dom.createAttrMorph(element2, 'href');
          morphs[1] = dom.createMorphAt(dom.childAt(element2, [1, 3]), 1, 1);
          return morphs;
        },
        statements: [["attribute", "href", ["concat", ["tel:", ["get", "place.phone", ["loc", [null, [51, 27], [51, 38]]]]]]], ["content", "place.phone", ["loc", [null, [57, 18], [57, 33]]]]],
        locals: [],
        templates: []
      };
    })();
    var child4 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 67,
              "column": 10
            },
            "end": {
              "line": 80,
              "column": 10
            }
          },
          "moduleName": "finndis/templates/components/place-map.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("          ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "columns small-12");
          var el2 = dom.createTextNode("\n            ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("a");
          var el3 = dom.createTextNode("\n              ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "place--website row");
          var el4 = dom.createTextNode("\n                ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          dom.setAttribute(el4, "class", "small-1 columns");
          var el5 = dom.createTextNode("\n                  ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("i");
          dom.setAttribute(el5, "class", "place--main--icon fa fa-globe");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n                ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n                ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          dom.setAttribute(el4, "class", "small-11 columns");
          var el5 = dom.createTextNode("\n                  ");
          dom.appendChild(el4, el5);
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n                ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n              ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n            ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element1 = dom.childAt(fragment, [1, 1]);
          var morphs = new Array(2);
          morphs[0] = dom.createAttrMorph(element1, 'href');
          morphs[1] = dom.createMorphAt(dom.childAt(element1, [1, 3]), 1, 1);
          return morphs;
        },
        statements: [["attribute", "href", ["concat", [["get", "place.website", ["loc", [null, [69, 23], [69, 36]]]]]]], ["content", "place.website", ["loc", [null, [75, 18], [75, 35]]]]],
        locals: [],
        templates: []
      };
    })();
    var child5 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 81,
              "column": 10
            },
            "end": {
              "line": 94,
              "column": 10
            }
          },
          "moduleName": "finndis/templates/components/place-map.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("          ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "columns small-12");
          var el2 = dom.createTextNode("\n            ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("a");
          var el3 = dom.createTextNode("\n              ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "place--url row");
          var el4 = dom.createTextNode("\n                ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          dom.setAttribute(el4, "class", "small-1 columns");
          var el5 = dom.createTextNode("\n                  ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("i");
          dom.setAttribute(el5, "class", "place--main--icon fa fa-google");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n                ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n                ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          dom.setAttribute(el4, "class", "small-11 columns");
          var el5 = dom.createTextNode("\n                  Google Map\n                ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n              ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n            ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1, 1]);
          var morphs = new Array(1);
          morphs[0] = dom.createAttrMorph(element0, 'href');
          return morphs;
        },
        statements: [["attribute", "href", ["concat", [["get", "place.url", ["loc", [null, [83, 23], [83, 32]]]]]]]],
        locals: [],
        templates: []
      };
    })();
    var child6 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 112,
              "column": 8
            },
            "end": {
              "line": 120,
              "column": 8
            }
          },
          "moduleName": "finndis/templates/components/place-map.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "place--info--holder row");
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "columns");
          var el3 = dom.createTextNode("\n            ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "place--rating");
          var el4 = dom.createTextNode("\n              ");
          dom.appendChild(el3, el4);
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n            ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n          ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 1, 1]), 1, 1);
          return morphs;
        },
        statements: [["inline", "star-rating-fa", [], ["item", ["subexpr", "@mut", [["get", "place", ["loc", [null, [116, 36], [116, 41]]]]], [], []], "rating", ["subexpr", "@mut", [["get", "place.rating", ["loc", [null, [116, 49], [116, 61]]]]], [], []]], ["loc", [null, [116, 14], [116, 63]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.3.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 130,
            "column": 0
          }
        },
        "moduleName": "finndis/templates/components/place-map.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "id", "load_overlay");
        dom.setAttribute(el1, "class", "load_overlay");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "id", "map");
        dom.setAttribute(el1, "class", "map-canvas map_search");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "id", "place_map");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "place_map--inner");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("article");
        dom.setAttribute(el3, "class", "place");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("header");
        dom.setAttribute(el4, "class", "place--header");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("a");
        dom.setAttribute(el5, "href", "#");
        dom.setAttribute(el5, "class", "button delete-button");
        var el6 = dom.createElement("i");
        dom.setAttribute(el6, "class", "place--action--icon fa fa-times");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("Close");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("h2");
        dom.setAttribute(el5, "class", "place--title");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("i");
        dom.setAttribute(el5, "class", "place--labels--icon fa fa-tag");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("ul");
        dom.setAttribute(el5, "class", "place--labels clearfix");
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("li");
        dom.setAttribute(el6, "class", "place--labelitem");
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("li");
        dom.setAttribute(el6, "class", "place--labelitem");
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("i");
        dom.setAttribute(el7, "class", "place--add--icon fa fa-plus");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n          ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("main");
        dom.setAttribute(el4, "class", "place--main");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "place--info--holder row");
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "place--info--holder row");
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "place--info--holder row");
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "columns small-12");
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("a");
        dom.setAttribute(el7, "target", "_blank");
        var el8 = dom.createTextNode("\n              ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("div");
        dom.setAttribute(el8, "class", "place--direction row");
        var el9 = dom.createTextNode("\n                ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("div");
        dom.setAttribute(el9, "class", "small-1 columns");
        var el10 = dom.createTextNode("\n                  ");
        dom.appendChild(el9, el10);
        var el10 = dom.createElement("i");
        dom.setAttribute(el10, "class", "place--main--icon fa fa-location-arrow");
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("\n                ");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("div");
        dom.setAttribute(el9, "class", "small-11 columns");
        var el10 = dom.createTextNode("\n                  Get direction\n                ");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n              ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n            ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n          ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("a");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element3 = dom.childAt(fragment, [6]);
        var element4 = dom.childAt(element3, [1, 1]);
        var element5 = dom.childAt(element4, [1]);
        var element6 = dom.childAt(element5, [3]);
        var element7 = dom.childAt(element5, [7]);
        var element8 = dom.childAt(element5, [9]);
        var element9 = dom.childAt(element4, [3]);
        var element10 = dom.childAt(element9, [1]);
        var element11 = dom.childAt(element9, [3]);
        var element12 = dom.childAt(element9, [5, 1, 1]);
        var element13 = dom.childAt(fragment, [10]);
        var morphs = new Array(17);
        morphs[0] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        morphs[1] = dom.createAttrMorph(element3, 'class');
        morphs[2] = dom.createMorphAt(element5, 1, 1);
        morphs[3] = dom.createElementMorph(element6);
        morphs[4] = dom.createMorphAt(dom.childAt(element5, [5]), 0, 0);
        morphs[5] = dom.createElementMorph(element7);
        morphs[6] = dom.createElementMorph(element8);
        morphs[7] = dom.createMorphAt(dom.childAt(element8, [1]), 0, 0);
        morphs[8] = dom.createMorphAt(element10, 1, 1);
        morphs[9] = dom.createMorphAt(element10, 2, 2);
        morphs[10] = dom.createMorphAt(element11, 1, 1);
        morphs[11] = dom.createMorphAt(element11, 2, 2);
        morphs[12] = dom.createAttrMorph(element12, 'href');
        morphs[13] = dom.createMorphAt(element9, 7, 7);
        morphs[14] = dom.createMorphAt(fragment, 8, 8, contextualElement);
        morphs[15] = dom.createAttrMorph(element13, 'class');
        morphs[16] = dom.createElementMorph(element13);
        return morphs;
      },
      statements: [["block", "if", [["get", "showErrorLocation", ["loc", [null, [3, 6], [3, 23]]]]], [], 0, null, ["loc", [null, [3, 0], [14, 7]]]], ["attribute", "class", ["concat", ["place_map panel left ", ["get", "placePanelDisplayed", ["loc", [null, [19, 50], [19, 69]]]]]]], ["block", "link-to", ["place", ["get", "place", ["loc", [null, [23, 27], [23, 32]]]]], ["class", "button edit-button"], 1, null, ["loc", [null, [23, 8], [23, 138]]]], ["element", "action", ["closeMenuPanel"], [], ["loc", [null, [24, 49], [24, 76]]]], ["content", "place.name", ["loc", [null, [25, 33], [25, 47]]]], ["element", "action", ["showAddLabel"], ["bubbles", "false"], ["loc", [null, [26, 49], [26, 90]]]], ["element", "action", ["showAddLabel"], ["bubbles", "false"], ["loc", [null, [27, 43], [27, 84]]]], ["content", "place.label.name", ["loc", [null, [28, 39], [28, 59]]]], ["block", "if", [["get", "place.formattedaddress", ["loc", [null, [37, 16], [37, 38]]]]], [], 2, null, ["loc", [null, [37, 10], [48, 17]]]], ["block", "if", [["get", "place.phone", ["loc", [null, [49, 16], [49, 27]]]]], [], 3, null, ["loc", [null, [49, 10], [62, 17]]]], ["block", "if", [["get", "place.website", ["loc", [null, [67, 16], [67, 29]]]]], [], 4, null, ["loc", [null, [67, 10], [80, 17]]]], ["block", "if", [["get", "place.url", ["loc", [null, [81, 16], [81, 25]]]]], [], 5, null, ["loc", [null, [81, 10], [94, 17]]]], ["attribute", "href", ["concat", ["http://maps.google.com/maps?daddr=", ["get", "place.locationlat", ["loc", [null, [99, 57], [99, 74]]]], ",", ["get", "place.locationlng", ["loc", [null, [99, 79], [99, 96]]]], "&ll="]]], ["block", "if", [["get", "place.rating", ["loc", [null, [112, 14], [112, 26]]]]], [], 6, null, ["loc", [null, [112, 8], [120, 15]]]], ["inline", "label-panel", [], ["userLabels", ["subexpr", "@mut", [["get", "userLabels", ["loc", [null, [127, 25], [127, 35]]]]], [], []], "labelPanelDisplayed", ["subexpr", "@mut", [["get", "labelPanelDisplayed", ["loc", [null, [127, 56], [127, 75]]]]], [], []], "model", ["subexpr", "@mut", [["get", "place", ["loc", [null, [127, 82], [127, 87]]]]], [], []], "autoSaveLabel", true], ["loc", [null, [127, 0], [127, 108]]]], ["attribute", "class", ["concat", ["panel-overlay place_map ", ["get", "placePanelDisplayed", ["loc", [null, [129, 36], [129, 55]]]]]]], ["element", "action", ["closeMenuPanel"], [], ["loc", [null, [129, 59], [129, 86]]]]],
      locals: [],
      templates: [child0, child1, child2, child3, child4, child5, child6]
    };
  })());
});
define("finndis/templates/components/radio-button", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": {
            "name": "triple-curlies"
          },
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 15,
              "column": 0
            }
          },
          "moduleName": "finndis/templates/components/radio-button.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("label");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(4);
          morphs[0] = dom.createAttrMorph(element0, 'class');
          morphs[1] = dom.createAttrMorph(element0, 'for');
          morphs[2] = dom.createMorphAt(element0, 1, 1);
          morphs[3] = dom.createMorphAt(element0, 3, 3);
          return morphs;
        },
        statements: [["attribute", "class", ["concat", ["ember-radio-button ", ["subexpr", "if", [["get", "checked", ["loc", [null, [2, 40], [2, 47]]]], "checked"], [], ["loc", [null, [2, 35], [2, 59]]]], " ", ["get", "joinedClassNames", ["loc", [null, [2, 62], [2, 78]]]]]]], ["attribute", "for", ["get", "radioId", ["loc", [null, [2, 88], [2, 95]]]]], ["inline", "radio-button-input", [], ["class", ["subexpr", "@mut", [["get", "radioClass", ["loc", [null, [4, 14], [4, 24]]]]], [], []], "id", ["subexpr", "@mut", [["get", "radioId", ["loc", [null, [5, 11], [5, 18]]]]], [], []], "disabled", ["subexpr", "@mut", [["get", "disabled", ["loc", [null, [6, 17], [6, 25]]]]], [], []], "name", ["subexpr", "@mut", [["get", "name", ["loc", [null, [7, 13], [7, 17]]]]], [], []], "required", ["subexpr", "@mut", [["get", "required", ["loc", [null, [8, 17], [8, 25]]]]], [], []], "groupValue", ["subexpr", "@mut", [["get", "groupValue", ["loc", [null, [9, 19], [9, 29]]]]], [], []], "value", ["subexpr", "@mut", [["get", "value", ["loc", [null, [10, 14], [10, 19]]]]], [], []], "changed", "changed"], ["loc", [null, [3, 4], [11, 27]]]], ["content", "yield", ["loc", [null, [13, 4], [13, 13]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 15,
              "column": 0
            },
            "end": {
              "line": 25,
              "column": 0
            }
          },
          "moduleName": "finndis/templates/components/radio-button.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "radio-button-input", [], ["class", ["subexpr", "@mut", [["get", "radioClass", ["loc", [null, [17, 12], [17, 22]]]]], [], []], "id", ["subexpr", "@mut", [["get", "radioId", ["loc", [null, [18, 9], [18, 16]]]]], [], []], "disabled", ["subexpr", "@mut", [["get", "disabled", ["loc", [null, [19, 15], [19, 23]]]]], [], []], "name", ["subexpr", "@mut", [["get", "name", ["loc", [null, [20, 11], [20, 15]]]]], [], []], "required", ["subexpr", "@mut", [["get", "required", ["loc", [null, [21, 15], [21, 23]]]]], [], []], "groupValue", ["subexpr", "@mut", [["get", "groupValue", ["loc", [null, [22, 17], [22, 27]]]]], [], []], "value", ["subexpr", "@mut", [["get", "value", ["loc", [null, [23, 12], [23, 17]]]]], [], []], "changed", "changed"], ["loc", [null, [16, 2], [24, 25]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.3.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 26,
            "column": 0
          }
        },
        "moduleName": "finndis/templates/components/radio-button.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "hasBlock", ["loc", [null, [1, 6], [1, 14]]]]], [], 0, 1, ["loc", [null, [1, 0], [25, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("finndis/templates/components/search-box", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          var child0 = (function () {
            return {
              meta: {
                "fragmentReason": false,
                "revision": "Ember@2.3.2",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 26,
                    "column": 14
                  },
                  "end": {
                    "line": 35,
                    "column": 14
                  }
                },
                "moduleName": "finndis/templates/components/search-box.hbs"
              },
              isEmpty: false,
              arity: 0,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createTextNode("                ");
                dom.appendChild(el0, el1);
                var el1 = dom.createElement("div");
                dom.setAttribute(el1, "class", "card--address card--section row");
                var el2 = dom.createTextNode("\n                  ");
                dom.appendChild(el1, el2);
                var el2 = dom.createElement("div");
                dom.setAttribute(el2, "class", "small-1 columns");
                var el3 = dom.createTextNode("\n                    ");
                dom.appendChild(el2, el3);
                var el3 = dom.createElement("i");
                dom.setAttribute(el3, "class", "card--main--icon fa fa-map-marker");
                dom.appendChild(el2, el3);
                var el3 = dom.createTextNode("\n                  ");
                dom.appendChild(el2, el3);
                dom.appendChild(el1, el2);
                var el2 = dom.createTextNode("\n                  ");
                dom.appendChild(el1, el2);
                var el2 = dom.createElement("div");
                dom.setAttribute(el2, "class", "small-11 columns");
                var el3 = dom.createTextNode("\n                    ");
                dom.appendChild(el2, el3);
                var el3 = dom.createComment("");
                dom.appendChild(el2, el3);
                var el3 = dom.createTextNode("\n                  ");
                dom.appendChild(el2, el3);
                dom.appendChild(el1, el2);
                var el2 = dom.createTextNode("\n                ");
                dom.appendChild(el1, el2);
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n");
                dom.appendChild(el0, el1);
                return el0;
              },
              buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                var morphs = new Array(1);
                morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 3]), 1, 1);
                return morphs;
              },
              statements: [["content", "place.formattedaddress", ["loc", [null, [32, 20], [32, 46]]]]],
              locals: [],
              templates: []
            };
          })();
          var child1 = (function () {
            return {
              meta: {
                "fragmentReason": false,
                "revision": "Ember@2.3.2",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 37,
                    "column": 14
                  },
                  "end": {
                    "line": 46,
                    "column": 14
                  }
                },
                "moduleName": "finndis/templates/components/search-box.hbs"
              },
              isEmpty: false,
              arity: 0,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createTextNode("                ");
                dom.appendChild(el0, el1);
                var el1 = dom.createElement("div");
                dom.setAttribute(el1, "class", "card--phone card--section row");
                var el2 = dom.createTextNode("\n                  ");
                dom.appendChild(el1, el2);
                var el2 = dom.createElement("div");
                dom.setAttribute(el2, "class", "small-1 columns");
                var el3 = dom.createTextNode("\n                    ");
                dom.appendChild(el2, el3);
                var el3 = dom.createElement("i");
                dom.setAttribute(el3, "class", "card--main--icon fa fa-phone");
                dom.appendChild(el2, el3);
                var el3 = dom.createTextNode("\n                  ");
                dom.appendChild(el2, el3);
                dom.appendChild(el1, el2);
                var el2 = dom.createTextNode("\n                  ");
                dom.appendChild(el1, el2);
                var el2 = dom.createElement("div");
                dom.setAttribute(el2, "class", "small-11 columns");
                var el3 = dom.createTextNode("\n                    ");
                dom.appendChild(el2, el3);
                var el3 = dom.createComment("");
                dom.appendChild(el2, el3);
                var el3 = dom.createTextNode("\n                  ");
                dom.appendChild(el2, el3);
                dom.appendChild(el1, el2);
                var el2 = dom.createTextNode("\n                ");
                dom.appendChild(el1, el2);
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n");
                dom.appendChild(el0, el1);
                return el0;
              },
              buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                var morphs = new Array(1);
                morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 3]), 1, 1);
                return morphs;
              },
              statements: [["content", "place.phone", ["loc", [null, [43, 20], [43, 35]]]]],
              locals: [],
              templates: []
            };
          })();
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.3.2",
              "loc": {
                "source": null,
                "start": {
                  "line": 22,
                  "column": 8
                },
                "end": {
                  "line": 52,
                  "column": 8
                }
              },
              "moduleName": "finndis/templates/components/search-box.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("          ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("article");
              dom.setAttribute(el1, "class", "card");
              var el2 = dom.createTextNode("\n            ");
              dom.appendChild(el1, el2);
              var el2 = dom.createElement("h3");
              dom.setAttribute(el2, "class", "card--title");
              var el3 = dom.createComment("");
              dom.appendChild(el2, el3);
              dom.appendChild(el1, el2);
              var el2 = dom.createTextNode("\n            ");
              dom.appendChild(el1, el2);
              var el2 = dom.createElement("main");
              dom.setAttribute(el2, "class", "card--main");
              var el3 = dom.createTextNode("\n");
              dom.appendChild(el2, el3);
              var el3 = dom.createComment("");
              dom.appendChild(el2, el3);
              var el3 = dom.createTextNode("\n");
              dom.appendChild(el2, el3);
              var el3 = dom.createComment("");
              dom.appendChild(el2, el3);
              var el3 = dom.createTextNode("              ");
              dom.appendChild(el2, el3);
              var el3 = dom.createElement("div");
              dom.setAttribute(el3, "class", "card--icon--holder card--section");
              var el4 = dom.createTextNode("\n                ");
              dom.appendChild(el3, el4);
              var el4 = dom.createElement("i");
              dom.setAttribute(el4, "class", "card--icon fa fa-tag");
              dom.appendChild(el3, el4);
              var el4 = dom.createComment("");
              dom.appendChild(el3, el4);
              var el4 = dom.createTextNode("\n              ");
              dom.appendChild(el3, el4);
              dom.appendChild(el2, el3);
              var el3 = dom.createTextNode("\n            ");
              dom.appendChild(el2, el3);
              dom.appendChild(el1, el2);
              var el2 = dom.createTextNode("\n          ");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var element0 = dom.childAt(fragment, [1]);
              var element1 = dom.childAt(element0, [3]);
              var morphs = new Array(5);
              morphs[0] = dom.createAttrMorph(element0, 'id');
              morphs[1] = dom.createMorphAt(dom.childAt(element0, [1]), 0, 0);
              morphs[2] = dom.createMorphAt(element1, 1, 1);
              morphs[3] = dom.createMorphAt(element1, 3, 3);
              morphs[4] = dom.createMorphAt(dom.childAt(element1, [5]), 2, 2);
              return morphs;
            },
            statements: [["attribute", "id", ["concat", ["card_", ["get", "index", ["loc", [null, [23, 30], [23, 35]]]]]]], ["content", "place.name", ["loc", [null, [24, 36], [24, 50]]]], ["block", "if", [["get", "place.formattedaddress", ["loc", [null, [26, 20], [26, 42]]]]], [], 0, null, ["loc", [null, [26, 14], [35, 21]]]], ["block", "if", [["get", "place.phone", ["loc", [null, [37, 20], [37, 31]]]]], [], 1, null, ["loc", [null, [37, 14], [46, 21]]]], ["content", "place.label.name", ["loc", [null, [48, 52], [48, 72]]]]],
            locals: [],
            templates: [child0, child1]
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.2",
            "loc": {
              "source": null,
              "start": {
                "line": 21,
                "column": 6
              },
              "end": {
                "line": 53,
                "column": 6
              }
            },
            "moduleName": "finndis/templates/components/search-box.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["block", "link-to", ["place", ["get", "place", ["loc", [null, [22, 27], [22, 32]]]]], [], 0, null, ["loc", [null, [22, 8], [52, 20]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 20,
              "column": 4
            },
            "end": {
              "line": 54,
              "column": 4
            }
          },
          "moduleName": "finndis/templates/components/search-box.hbs"
        },
        isEmpty: false,
        arity: 3,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "masonry-item", [], ["item", ["subexpr", "@mut", [["get", "place", ["loc", [null, [21, 27], [21, 32]]]]], [], []], "grid", ["subexpr", "@mut", [["get", "grid", ["loc", [null, [21, 38], [21, 42]]]]], [], []]], 0, null, ["loc", [null, [21, 6], [53, 23]]]]],
        locals: ["place", "index", "grid"],
        templates: [child0]
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 60,
              "column": 0
            },
            "end": {
              "line": 62,
              "column": 0
            }
          },
          "moduleName": "finndis/templates/components/search-box.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["content", "tool-box", ["loc", [null, [61, 2], [61, 14]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.3.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 63,
            "column": 0
          }
        },
        "moduleName": "finndis/templates/components/search-box.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "columns");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("form");
        dom.setAttribute(el3, "class", "search_box");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "columns small-12 medium-8 medium-offset-2");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "row");
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "small-10 columns");
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n          ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "small-2 columns");
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("button");
        dom.setAttribute(el7, "type", "submit");
        dom.setAttribute(el7, "class", "button");
        var el8 = dom.createElement("i");
        dom.setAttribute(el8, "class", "fa fa-search");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n          ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "columns");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element2 = dom.childAt(fragment, [0, 1, 1]);
        var element3 = dom.childAt(fragment, [2, 1]);
        var morphs = new Array(5);
        morphs[0] = dom.createElementMorph(element2);
        morphs[1] = dom.createMorphAt(dom.childAt(element2, [1, 1, 1]), 1, 1);
        morphs[2] = dom.createMorphAt(element3, 1, 1);
        morphs[3] = dom.createMorphAt(element3, 3, 3);
        morphs[4] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["element", "action", ["search"], ["bubbles", false, "on", "submit"], ["loc", [null, [3, 29], [3, 74]]]], ["inline", "input", [], ["type", "text", "class", "search_box--input", "placeholder", "Search in finndis", "value", ["subexpr", "@mut", [["get", "search", ["loc", [null, [7, 96], [7, 102]]]]], [], []]], ["loc", [null, [7, 12], [7, 104]]]], ["block", "masonry-grid", [], ["items", ["subexpr", "@mut", [["get", "resultSearch", ["loc", [null, [20, 26], [20, 38]]]]], [], []], "customLayout", true], 0, null, ["loc", [null, [20, 4], [54, 21]]]], ["content", "outlet", ["loc", [null, [56, 4], [56, 14]]]], ["block", "if", [["get", "session.isAuthenticated", ["loc", [null, [60, 6], [60, 29]]]]], [], 1, null, ["loc", [null, [60, 0], [62, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("finndis/templates/components/signup-form", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 9,
              "column": 4
            },
            "end": {
              "line": 11,
              "column": 4
            }
          },
          "moduleName": "finndis/templates/components/signup-form.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("span");
          dom.setAttribute(el1, "class", "user-section--name");
          var el2 = dom.createTextNode("Have fun :)");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 32,
              "column": 10
            },
            "end": {
              "line": 36,
              "column": 10
            }
          },
          "moduleName": "finndis/templates/components/signup-form.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("small");
          dom.setAttribute(el1, "class", "legend");
          var el2 = dom.createTextNode("\n              ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n            ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
          return morphs;
        },
        statements: [["inline", "get", [["subexpr", "get", [["get", "model.validations.attrs", []], "email"], [], []], "message"], [], ["loc", [null, [34, 14], [34, 47]]]]],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 42,
              "column": 10
            },
            "end": {
              "line": 46,
              "column": 10
            }
          },
          "moduleName": "finndis/templates/components/signup-form.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("small");
          dom.setAttribute(el1, "class", "legend");
          var el2 = dom.createTextNode("\n              ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n            ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
          return morphs;
        },
        statements: [["inline", "get", [["subexpr", "get", [["get", "model.validations.attrs", []], "password"], [], []], "message"], [], ["loc", [null, [44, 14], [44, 50]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.3.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 61,
            "column": 0
          }
        },
        "moduleName": "finndis/templates/components/signup-form.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("nav");
        dom.setAttribute(el1, "id", "panel-sigup");
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "panel--section user-section");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("a");
        dom.setAttribute(el3, "class", "close-button");
        var el4 = dom.createElement("i");
        dom.setAttribute(el4, "class", "fa fa-times");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "panel--section");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("form");
        dom.setAttribute(el3, "class", "signup-form");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "input-holder row");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "small-12 medium-6 columns");
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("small");
        dom.setAttribute(el6, "class", "legend");
        var el7 = dom.createTextNode("(optional)");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "small-12 medium-6 columns");
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("small");
        dom.setAttribute(el6, "class", "legend");
        var el7 = dom.createTextNode("(optional)");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "input-holder row");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "small-12 columns");
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "input-holder row");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "small-12 medium-12 columns");
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "login-form--button-holder row");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "small-12 columns");
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("button");
        dom.setAttribute(el6, "type", "submit");
        dom.setAttribute(el6, "class", "button expanded");
        var el7 = dom.createElement("i");
        dom.setAttribute(el7, "class", "fa fa-user-plus");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode(" Sign up");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("a");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [2]);
        var element2 = dom.childAt(element1, [2]);
        var element3 = dom.childAt(element0, [6, 1]);
        var element4 = dom.childAt(element3, [1]);
        var element5 = dom.childAt(element3, [3, 1]);
        var element6 = dom.childAt(element3, [5, 1]);
        var element7 = dom.childAt(fragment, [2]);
        var morphs = new Array(13);
        morphs[0] = dom.createAttrMorph(element0, 'class');
        morphs[1] = dom.createElementMorph(element1);
        morphs[2] = dom.createElementMorph(element2);
        morphs[3] = dom.createMorphAt(element1, 5, 5);
        morphs[4] = dom.createElementMorph(element3);
        morphs[5] = dom.createMorphAt(dom.childAt(element4, [1]), 1, 1);
        morphs[6] = dom.createMorphAt(dom.childAt(element4, [3]), 1, 1);
        morphs[7] = dom.createMorphAt(element5, 1, 1);
        morphs[8] = dom.createMorphAt(element5, 3, 3);
        morphs[9] = dom.createMorphAt(element6, 1, 1);
        morphs[10] = dom.createMorphAt(element6, 3, 3);
        morphs[11] = dom.createAttrMorph(element7, 'class');
        morphs[12] = dom.createElementMorph(element7);
        return morphs;
      },
      statements: [["attribute", "class", ["concat", ["panel-menu panel left ", ["get", "signupPanelClass", ["loc", [null, [1, 53], [1, 69]]]]]]], ["element", "action", ["closeMenuPanel"], ["on", "click"], ["loc", [null, [4, 43], [4, 81]]]], ["element", "action", ["closeMenuPanel"], [], ["loc", [null, [6, 30], [6, 57]]]], ["block", "link-to", ["users"], ["class", "navigation--user-link"], 0, null, ["loc", [null, [9, 4], [11, 16]]]], ["element", "action", ["signup"], ["on", "submit"], ["loc", [null, [18, 10], [18, 41]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "model.firstname", ["loc", [null, [21, 24], [21, 39]]]]], [], []], "type", "text", "placeholder", "Your first name"], ["loc", [null, [21, 10], [21, 83]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "model.lastname", ["loc", [null, [25, 24], [25, 38]]]]], [], []], "type", "text", "placeholder", "Your last name"], ["loc", [null, [25, 10], [25, 81]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "model.email", ["loc", [null, [31, 24], [31, 35]]]]], [], []], "type", "email", "placeholder", "e-mail address"], ["loc", [null, [31, 10], [31, 79]]]], ["block", "if", [["subexpr", "get", [["subexpr", "get", [["get", "model.validations.attrs", []], "email"], [], []], "isInvalid"], [], ["loc", [null, [32, 16], [32, 49]]]]], [], 1, null, ["loc", [null, [32, 10], [36, 17]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "model.password", ["loc", [null, [41, 24], [41, 38]]]]], [], []], "type", "password", "placeholder", "Password"], ["loc", [null, [41, 10], [41, 79]]]], ["block", "if", [["subexpr", "get", [["subexpr", "get", [["get", "model.validations.attrs", []], "password"], [], []], "isInvalid"], [], ["loc", [null, [42, 16], [42, 52]]]]], [], 2, null, ["loc", [null, [42, 10], [46, 17]]]], ["attribute", "class", ["concat", ["panel-overlay left ", ["get", "signupPanelClass", ["loc", [null, [60, 31], [60, 47]]]]]]], ["element", "action", ["closeMenuPanel"], [], ["loc", [null, [60, 51], [60, 78]]]]],
      locals: [],
      templates: [child0, child1, child2]
    };
  })());
});
define("finndis/templates/components/start-guide", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.3.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 62,
            "column": 0
          }
        },
        "moduleName": "finndis/templates/components/start-guide.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "guide row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "columns small-12 medium-10 medium-offset-1");
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "guide--article row align-middle");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "small-12 medium-6 columns");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("h3");
        dom.setAttribute(el5, "class", "guide--title");
        var el6 = dom.createTextNode("Search & save any place");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("p");
        dom.setAttribute(el5, "class", "guide--content");
        var el6 = dom.createTextNode("\n          Use the map to find any place you want.\n          Drop a marker and spot the exact position you want to save.\n          Or use the search box to find any kind of place listed on Google Map.\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "small-12 medium-5 medium-offset-1 columns");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("img");
        dom.setAttribute(el5, "src", "assets/images/guide/maps.png");
        dom.setAttribute(el5, "alt", "Maps with marker");
        dom.setAttribute(el5, "class", "guide--image");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "guide--article row align-middle reversed");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "small-12 medium-6 medium-offset-1 columns");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("h3");
        dom.setAttribute(el5, "class", "guide--title");
        var el6 = dom.createTextNode("Find your places in a second");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("p");
        dom.setAttribute(el5, "class", "guide--content");
        var el6 = dom.createTextNode("\n          Filter by labels or keywords and display only what you're looking for. Or display eveything.\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "small-12 medium-5 columns");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("img");
        dom.setAttribute(el5, "src", "assets/images/guide/list.png");
        dom.setAttribute(el5, "alt", "Maps with marker");
        dom.setAttribute(el5, "class", "guide--image");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "guide--article row align-middle");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "small-12 medium-6 columns");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("h3");
        dom.setAttribute(el5, "class", "guide--title");
        var el6 = dom.createTextNode("Open & edit place's details");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("p");
        dom.setAttribute(el5, "class", "guide--content");
        var el6 = dom.createTextNode("\n          Open a place's details to access its information.\n          Saving with Maps allows you to get some information automatically,\n          but you can always update it, add missing information, or just delete everything.\n          It's up to you!\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "small-12 medium-5 medium-offset-1 columns");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("img");
        dom.setAttribute(el5, "src", "assets/images/guide/save-edit.png");
        dom.setAttribute(el5, "alt", "Maps with marker");
        dom.setAttribute(el5, "class", "guide--image");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "guide--article row align-middle reversed");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "small-12 medium-6 medium-offset-1 columns");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("h3");
        dom.setAttribute(el5, "class", "guide--title");
        var el6 = dom.createTextNode("Edit your labels");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("p");
        dom.setAttribute(el5, "class", "guide--content");
        var el6 = dom.createTextNode("\n          Add, remove, edit your labels. No limitation, you can add as many labels as you want to create your own categories and organize your list.\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "small-12 medium-5 columns");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("img");
        dom.setAttribute(el5, "src", "assets/images/guide/labels.png");
        dom.setAttribute(el5, "alt", "Maps with marker");
        dom.setAttribute(el5, "class", "guide--image");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  })());
});
define("finndis/templates/components/tool-box", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.2",
            "loc": {
              "source": null,
              "start": {
                "line": 9,
                "column": 10
              },
              "end": {
                "line": 9,
                "column": 110
              }
            },
            "moduleName": "finndis/templates/components/tool-box.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createElement("i");
            dom.setAttribute(el1, "class", "tool_box--icon fa fa-map-marker");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("Map");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 8,
              "column": 8
            },
            "end": {
              "line": 10,
              "column": 8
            }
          },
          "moduleName": "finndis/templates/components/tool-box.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("          ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["block", "link-to", ["map"], ["class", "button tool_box--button"], 0, null, ["loc", [null, [9, 10], [9, 122]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.2",
            "loc": {
              "source": null,
              "start": {
                "line": 12,
                "column": 10
              },
              "end": {
                "line": 12,
                "column": 111
              }
            },
            "moduleName": "finndis/templates/components/tool-box.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createElement("i");
            dom.setAttribute(el1, "class", "tool_box--icon fa fa-th-list");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("List");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 11,
              "column": 8
            },
            "end": {
              "line": 13,
              "column": 8
            }
          },
          "moduleName": "finndis/templates/components/tool-box.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("          ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["block", "link-to", ["places"], ["class", "button tool_box--button"], 0, null, ["loc", [null, [12, 10], [12, 123]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.3.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 18,
            "column": 0
          }
        },
        "moduleName": "finndis/templates/components/tool-box.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "tool_box--holder");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "row align-middle align-right");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "google_footer small-4 medium-5 columns");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("img");
        dom.setAttribute(el4, "src", "assets/images/powered-by-google/android/res/drawable-hdpi/powered_by_google_on_white.png");
        dom.setAttribute(el4, "alt", "powered-by-google");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "tool_box small-8 medium-7 columns");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "button-group tool_box--button-group");
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 1, 3, 1]);
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(element0, 1, 1);
        morphs[1] = dom.createMorphAt(element0, 2, 2);
        return morphs;
      },
      statements: [["block", "if", [["get", "toolShowMap", ["loc", [null, [8, 14], [8, 25]]]]], [], 0, null, ["loc", [null, [8, 8], [10, 15]]]], ["block", "if", [["get", "toolShowList", ["loc", [null, [11, 14], [11, 26]]]]], [], 1, null, ["loc", [null, [11, 8], [13, 15]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("finndis/templates/edit-labels", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.2",
            "loc": {
              "source": null,
              "start": {
                "line": 19,
                "column": 16
              },
              "end": {
                "line": 35,
                "column": 16
              }
            },
            "moduleName": "finndis/templates/edit-labels.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("                  ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("li");
            dom.setAttribute(el1, "class", "label-editor--holder edition");
            var el2 = dom.createTextNode("\n                    ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "label--listitem label-editor row");
            var el3 = dom.createTextNode("\n                      ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("div");
            dom.setAttribute(el3, "class", "label-editor--delete label--icon-holder medium-1 columns");
            var el4 = dom.createTextNode("\n                        ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("i");
            dom.setAttribute(el4, "class", "fa fa-trash");
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n                      ");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n                      ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("div");
            dom.setAttribute(el3, "class", "medium-10 columns");
            var el4 = dom.createTextNode("\n                        ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("form");
            var el5 = dom.createTextNode("\n                          ");
            dom.appendChild(el4, el5);
            var el5 = dom.createComment("");
            dom.appendChild(el4, el5);
            var el5 = dom.createTextNode("\n                        ");
            dom.appendChild(el4, el5);
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n                      ");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n                      ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("div");
            dom.setAttribute(el3, "class", "label-editor--save label--icon-holder medium-1 columns");
            var el4 = dom.createTextNode("\n                        ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("i");
            dom.setAttribute(el4, "class", "fa fa-check");
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n                      ");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n                    ");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n                  ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element1 = dom.childAt(fragment, [1]);
            var element2 = dom.childAt(element1, [1]);
            var element3 = dom.childAt(element2, [1]);
            var element4 = dom.childAt(element2, [3, 1]);
            var element5 = dom.childAt(element2, [5]);
            var morphs = new Array(5);
            morphs[0] = dom.createAttrMorph(element1, 'id');
            morphs[1] = dom.createElementMorph(element3);
            morphs[2] = dom.createElementMorph(element4);
            morphs[3] = dom.createMorphAt(element4, 1, 1);
            morphs[4] = dom.createElementMorph(element5);
            return morphs;
          },
          statements: [["attribute", "id", ["concat", [["get", "label.labelId", ["loc", [null, [20, 28], [20, 41]]]]]]], ["element", "action", ["deleteLabel", ["get", "label.id", ["loc", [null, [22, 115], [22, 123]]]]], ["on", "click"], ["loc", [null, [22, 92], [22, 136]]]], ["element", "action", ["saveLabel", ["get", "label.id", ["loc", [null, [26, 51], [26, 59]]]]], ["on", "submit"], ["loc", [null, [26, 30], [26, 73]]]], ["inline", "input", [], ["type", "text", "class", "label-editor--input", "value", ["subexpr", "@mut", [["get", "labelName", ["loc", [null, [27, 80], [27, 89]]]]], [], []]], ["loc", [null, [27, 26], [27, 91]]]], ["element", "action", ["saveLabel", ["get", "label.id", ["loc", [null, [30, 111], [30, 119]]]]], ["on", "click"], ["loc", [null, [30, 90], [30, 132]]]]],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.2",
            "loc": {
              "source": null,
              "start": {
                "line": 35,
                "column": 16
              },
              "end": {
                "line": 49,
                "column": 16
              }
            },
            "moduleName": "finndis/templates/edit-labels.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("                  ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("li");
            dom.setAttribute(el1, "class", "label-editor--holder");
            var el2 = dom.createTextNode("\n                    ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "label--listitem label-editor row");
            var el3 = dom.createTextNode("\n                      ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("div");
            dom.setAttribute(el3, "class", "label--icon-holder medium-1 columns");
            var el4 = dom.createTextNode("\n                        ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("i");
            dom.setAttribute(el4, "class", "label--icon fa fa-tag");
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n                      ");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n                      ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("div");
            dom.setAttribute(el3, "class", "medium-10 columns");
            var el4 = dom.createTextNode("\n                        ");
            dom.appendChild(el3, el4);
            var el4 = dom.createComment("");
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n                      ");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n                      ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("div");
            dom.setAttribute(el3, "class", "label--icon-holder medium-1 columns");
            var el4 = dom.createTextNode("\n                        ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("i");
            dom.setAttribute(el4, "class", "fa fa-pencil");
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n                      ");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n                    ");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n                  ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1]);
            var morphs = new Array(3);
            morphs[0] = dom.createAttrMorph(element0, 'id');
            morphs[1] = dom.createElementMorph(element0);
            morphs[2] = dom.createMorphAt(dom.childAt(element0, [1, 3]), 1, 1);
            return morphs;
          },
          statements: [["attribute", "id", ["concat", [["get", "label.labelId", ["loc", [null, [36, 28], [36, 41]]]]]]], ["element", "action", ["toggleEdition", ["get", "label.id", ["loc", [null, [36, 99], [36, 107]]]]], ["on", "click"], ["loc", [null, [36, 74], [36, 120]]]], ["content", "label.name", ["loc", [null, [42, 24], [42, 38]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 17,
              "column": 14
            },
            "end": {
              "line": 50,
              "column": 14
            }
          },
          "moduleName": "finndis/templates/edit-labels.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "if", [["get", "label.isEditing", ["loc", [null, [19, 22], [19, 37]]]]], [], 0, 1, ["loc", [null, [19, 16], [49, 23]]]]],
        locals: ["label"],
        templates: [child0, child1]
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 57,
              "column": 4
            },
            "end": {
              "line": 59,
              "column": 4
            }
          },
          "moduleName": "finndis/templates/edit-labels.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["content", "tool-box", ["loc", [null, [58, 6], [58, 18]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.3.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 62,
            "column": 0
          }
        },
        "moduleName": "finndis/templates/edit-labels.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "page-wrapper row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "columns");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "row");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "medium-6 medium-offset-3 columns");
        var el5 = dom.createTextNode("\n\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "row");
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "columns small-12 medium-12");
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n          ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "row");
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "medium-12 columns");
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("ul");
        dom.setAttribute(el7, "class", "label--list");
        var el8 = dom.createTextNode("\n");
        dom.appendChild(el7, el8);
        var el8 = dom.createComment("");
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("            ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n          ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element6 = dom.childAt(fragment, [2, 1]);
        var element7 = dom.childAt(element6, [1, 1]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(dom.childAt(element7, [1, 1]), 1, 1);
        morphs[2] = dom.createMorphAt(dom.childAt(element7, [3, 1, 1]), 1, 1);
        morphs[3] = dom.createMorphAt(element6, 3, 3);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "main-header", ["loc", [null, [1, 0], [1, 15]]]], ["content", "add-label", ["loc", [null, [10, 12], [10, 25]]]], ["block", "each", [["get", "sortedLabels", ["loc", [null, [17, 22], [17, 34]]]]], [], 0, null, ["loc", [null, [17, 14], [50, 23]]]], ["block", "if", [["get", "session.isAuthenticated", ["loc", [null, [57, 10], [57, 33]]]]], [], 1, null, ["loc", [null, [57, 4], [59, 11]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("finndis/templates/help", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.3.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 17,
            "column": 0
          }
        },
        "moduleName": "finndis/templates/help.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "page-wrapper row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "columns");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "banner row");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "columns");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "banner--content");
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("h2");
        dom.setAttribute(el6, "class", "banner--title");
        var el7 = dom.createTextNode("Welcome in Finndis");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("h3");
        dom.setAttribute(el6, "class", "banner--subtitle");
        var el7 = dom.createTextNode("Simplify your life by saving all the places you want to remember");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [2, 1]), 3, 3);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "main-header", ["loc", [null, [1, 0], [1, 15]]]], ["content", "start-guide", ["loc", [null, [14, 4], [14, 19]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("finndis/templates/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.3.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 5,
            "column": 0
          }
        },
        "moduleName": "finndis/templates/index.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("This is an example of route that does not require authentication.");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Clicking the link below will open the Auth0 login window");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("a");
        dom.setAttribute(el1, "href", "#");
        var el2 = dom.createTextNode("Login");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [4]);
        var morphs = new Array(1);
        morphs[0] = dom.createElementMorph(element0);
        return morphs;
      },
      statements: [["element", "action", ["login"], [], ["loc", [null, [4, 12], [4, 30]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("finndis/templates/label", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          var child0 = (function () {
            return {
              meta: {
                "fragmentReason": false,
                "revision": "Ember@2.3.2",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 13,
                    "column": 18
                  },
                  "end": {
                    "line": 22,
                    "column": 18
                  }
                },
                "moduleName": "finndis/templates/label.hbs"
              },
              isEmpty: false,
              arity: 0,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createTextNode("                    ");
                dom.appendChild(el0, el1);
                var el1 = dom.createElement("div");
                dom.setAttribute(el1, "class", "card--address card--section row");
                var el2 = dom.createTextNode("\n                      ");
                dom.appendChild(el1, el2);
                var el2 = dom.createElement("div");
                dom.setAttribute(el2, "class", "small-1 columns");
                var el3 = dom.createTextNode("\n                        ");
                dom.appendChild(el2, el3);
                var el3 = dom.createElement("i");
                dom.setAttribute(el3, "class", "place--main--icon fa fa-map-marker");
                dom.appendChild(el2, el3);
                var el3 = dom.createTextNode("\n                      ");
                dom.appendChild(el2, el3);
                dom.appendChild(el1, el2);
                var el2 = dom.createTextNode("\n                      ");
                dom.appendChild(el1, el2);
                var el2 = dom.createElement("div");
                dom.setAttribute(el2, "class", "small-11 columns");
                var el3 = dom.createTextNode("\n                        ");
                dom.appendChild(el2, el3);
                var el3 = dom.createComment("");
                dom.appendChild(el2, el3);
                var el3 = dom.createTextNode("\n                      ");
                dom.appendChild(el2, el3);
                dom.appendChild(el1, el2);
                var el2 = dom.createTextNode("\n                    ");
                dom.appendChild(el1, el2);
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n");
                dom.appendChild(el0, el1);
                return el0;
              },
              buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                var morphs = new Array(1);
                morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 3]), 1, 1);
                return morphs;
              },
              statements: [["content", "place.formattedaddress", ["loc", [null, [19, 24], [19, 50]]]]],
              locals: [],
              templates: []
            };
          })();
          var child1 = (function () {
            return {
              meta: {
                "fragmentReason": false,
                "revision": "Ember@2.3.2",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 24,
                    "column": 18
                  },
                  "end": {
                    "line": 33,
                    "column": 18
                  }
                },
                "moduleName": "finndis/templates/label.hbs"
              },
              isEmpty: false,
              arity: 0,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createTextNode("                    ");
                dom.appendChild(el0, el1);
                var el1 = dom.createElement("div");
                dom.setAttribute(el1, "class", "card--phone card--section row");
                var el2 = dom.createTextNode("\n                      ");
                dom.appendChild(el1, el2);
                var el2 = dom.createElement("div");
                dom.setAttribute(el2, "class", "small-1 columns");
                var el3 = dom.createTextNode("\n                        ");
                dom.appendChild(el2, el3);
                var el3 = dom.createElement("i");
                dom.setAttribute(el3, "class", "place--main--icon fa fa-phone");
                dom.appendChild(el2, el3);
                var el3 = dom.createTextNode("\n                      ");
                dom.appendChild(el2, el3);
                dom.appendChild(el1, el2);
                var el2 = dom.createTextNode("\n                      ");
                dom.appendChild(el1, el2);
                var el2 = dom.createElement("div");
                dom.setAttribute(el2, "class", "small-11 columns");
                var el3 = dom.createTextNode("\n                        ");
                dom.appendChild(el2, el3);
                var el3 = dom.createComment("");
                dom.appendChild(el2, el3);
                var el3 = dom.createTextNode("\n                      ");
                dom.appendChild(el2, el3);
                dom.appendChild(el1, el2);
                var el2 = dom.createTextNode("\n                    ");
                dom.appendChild(el1, el2);
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n");
                dom.appendChild(el0, el1);
                return el0;
              },
              buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                var morphs = new Array(1);
                morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 3]), 1, 1);
                return morphs;
              },
              statements: [["content", "place.phone", ["loc", [null, [30, 24], [30, 39]]]]],
              locals: [],
              templates: []
            };
          })();
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.3.2",
              "loc": {
                "source": null,
                "start": {
                  "line": 9,
                  "column": 12
                },
                "end": {
                  "line": 39,
                  "column": 12
                }
              },
              "moduleName": "finndis/templates/label.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("              ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("article");
              dom.setAttribute(el1, "class", "card");
              var el2 = dom.createTextNode("\n                ");
              dom.appendChild(el1, el2);
              var el2 = dom.createElement("h3");
              dom.setAttribute(el2, "class", "card--title");
              var el3 = dom.createComment("");
              dom.appendChild(el2, el3);
              dom.appendChild(el1, el2);
              var el2 = dom.createTextNode("\n                ");
              dom.appendChild(el1, el2);
              var el2 = dom.createElement("main");
              dom.setAttribute(el2, "class", "card--main");
              var el3 = dom.createTextNode("\n");
              dom.appendChild(el2, el3);
              var el3 = dom.createComment("");
              dom.appendChild(el2, el3);
              var el3 = dom.createTextNode("\n");
              dom.appendChild(el2, el3);
              var el3 = dom.createComment("");
              dom.appendChild(el2, el3);
              var el3 = dom.createTextNode("                  ");
              dom.appendChild(el2, el3);
              var el3 = dom.createElement("div");
              dom.setAttribute(el3, "class", "card--icon--holder card--section");
              var el4 = dom.createTextNode("\n                    ");
              dom.appendChild(el3, el4);
              var el4 = dom.createElement("i");
              dom.setAttribute(el4, "class", "card--icon fa fa-tag");
              dom.appendChild(el3, el4);
              var el4 = dom.createComment("");
              dom.appendChild(el3, el4);
              var el4 = dom.createTextNode("\n                  ");
              dom.appendChild(el3, el4);
              dom.appendChild(el2, el3);
              var el3 = dom.createTextNode("\n                ");
              dom.appendChild(el2, el3);
              dom.appendChild(el1, el2);
              var el2 = dom.createTextNode("\n              ");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var element0 = dom.childAt(fragment, [1]);
              var element1 = dom.childAt(element0, [3]);
              var morphs = new Array(5);
              morphs[0] = dom.createAttrMorph(element0, 'id');
              morphs[1] = dom.createMorphAt(dom.childAt(element0, [1]), 0, 0);
              morphs[2] = dom.createMorphAt(element1, 1, 1);
              morphs[3] = dom.createMorphAt(element1, 3, 3);
              morphs[4] = dom.createMorphAt(dom.childAt(element1, [5]), 2, 2);
              return morphs;
            },
            statements: [["attribute", "id", ["concat", ["card_", ["get", "index", ["loc", [null, [10, 34], [10, 39]]]]]]], ["content", "place.name", ["loc", [null, [11, 40], [11, 54]]]], ["block", "if", [["get", "place.formattedaddress", ["loc", [null, [13, 24], [13, 46]]]]], [], 0, null, ["loc", [null, [13, 18], [22, 25]]]], ["block", "if", [["get", "place.phone", ["loc", [null, [24, 24], [24, 35]]]]], [], 1, null, ["loc", [null, [24, 18], [33, 25]]]], ["content", "place.label.name", ["loc", [null, [35, 56], [35, 76]]]]],
            locals: [],
            templates: [child0, child1]
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.2",
            "loc": {
              "source": null,
              "start": {
                "line": 8,
                "column": 10
              },
              "end": {
                "line": 40,
                "column": 10
              }
            },
            "moduleName": "finndis/templates/label.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["block", "link-to", ["place", ["get", "place", ["loc", [null, [9, 31], [9, 36]]]]], [], 0, null, ["loc", [null, [9, 12], [39, 24]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 7,
              "column": 8
            },
            "end": {
              "line": 41,
              "column": 8
            }
          },
          "moduleName": "finndis/templates/label.hbs"
        },
        isEmpty: false,
        arity: 3,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "masonry-item", [], ["item", ["subexpr", "@mut", [["get", "place", ["loc", [null, [8, 31], [8, 36]]]]], [], []], "grid", ["subexpr", "@mut", [["get", "grid", ["loc", [null, [8, 42], [8, 46]]]]], [], []]], 0, null, ["loc", [null, [8, 10], [40, 27]]]]],
        locals: ["place", "index", "grid"],
        templates: [child0]
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 47,
              "column": 4
            },
            "end": {
              "line": 49,
              "column": 4
            }
          },
          "moduleName": "finndis/templates/label.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["content", "tool-box", ["loc", [null, [48, 6], [48, 18]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.3.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 52,
            "column": 0
          }
        },
        "moduleName": "finndis/templates/label.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "page-wrapper row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "columns");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "row");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "columns");
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element2 = dom.childAt(fragment, [2, 1]);
        var element3 = dom.childAt(element2, [1, 1]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(element3, 1, 1);
        morphs[2] = dom.createMorphAt(element3, 3, 3);
        morphs[3] = dom.createMorphAt(element2, 3, 3);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "main-header", ["loc", [null, [1, 0], [1, 15]]]], ["block", "masonry-grid", [], ["items", ["subexpr", "@mut", [["get", "model.places", ["loc", [null, [7, 30], [7, 42]]]]], [], []], "customLayout", true], 0, null, ["loc", [null, [7, 8], [41, 25]]]], ["content", "outlet", ["loc", [null, [43, 8], [43, 18]]]], ["block", "if", [["get", "session.isAuthenticated", ["loc", [null, [47, 10], [47, 33]]]]], [], 1, null, ["loc", [null, [47, 4], [49, 11]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("finndis/templates/labels", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 11,
              "column": 16
            },
            "end": {
              "line": 11,
              "column": 61
            }
          },
          "moduleName": "finndis/templates/labels.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Edit");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.2",
            "loc": {
              "source": null,
              "start": {
                "line": 22,
                "column": 18
              },
              "end": {
                "line": 31,
                "column": 18
              }
            },
            "moduleName": "finndis/templates/labels.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("                  ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "label--listitem label-editor row");
            var el2 = dom.createTextNode("\n                    ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "label--icon-holder medium-1 columns");
            var el3 = dom.createTextNode("\n                      ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("i");
            dom.setAttribute(el3, "class", "label--icon fa fa-tag");
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n                    ");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n                    ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "medium-11 columns");
            var el3 = dom.createTextNode("\n                      ");
            dom.appendChild(el2, el3);
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n                    ");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n                  ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 3]), 1, 1);
            return morphs;
          },
          statements: [["content", "label.name", ["loc", [null, [28, 22], [28, 36]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 20,
              "column": 14
            },
            "end": {
              "line": 33,
              "column": 14
            }
          },
          "moduleName": "finndis/templates/labels.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          dom.setAttribute(el1, "class", "label-editor--holder");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("                ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createAttrMorph(element0, 'id');
          morphs[1] = dom.createMorphAt(element0, 1, 1);
          return morphs;
        },
        statements: [["attribute", "id", ["concat", [["get", "label.labelId", ["loc", [null, [21, 26], [21, 39]]]]]]], ["block", "link-to", ["label", ["get", "label", ["loc", [null, [22, 37], [22, 42]]]]], [], 0, null, ["loc", [null, [22, 18], [31, 30]]]]],
        locals: ["label"],
        templates: [child0]
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 40,
              "column": 4
            },
            "end": {
              "line": 42,
              "column": 4
            }
          },
          "moduleName": "finndis/templates/labels.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["content", "tool-box", ["loc", [null, [41, 6], [41, 18]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.3.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 45,
            "column": 0
          }
        },
        "moduleName": "finndis/templates/labels.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "page-wrapper row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "columns");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "row");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "medium-6 medium-offset-3 columns");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "row");
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "medium-12 columns");
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7, "class", "row");
        var el8 = dom.createTextNode("\n              ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("div");
        dom.setAttribute(el8, "class", "columns medium-12");
        var el9 = dom.createTextNode("\n                ");
        dom.appendChild(el8, el9);
        var el9 = dom.createComment("");
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n              ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n            ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n          ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "row");
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "columns");
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("ul");
        dom.setAttribute(el7, "class", "label--list");
        var el8 = dom.createTextNode("\n");
        dom.appendChild(el7, el8);
        var el8 = dom.createComment("");
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("            ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n          ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [2, 1]);
        var element2 = dom.childAt(element1, [1, 1]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(dom.childAt(element2, [1, 1, 1, 1]), 1, 1);
        morphs[2] = dom.createMorphAt(dom.childAt(element2, [3, 1, 1]), 1, 1);
        morphs[3] = dom.createMorphAt(element1, 3, 3);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "main-header", ["loc", [null, [1, 0], [1, 15]]]], ["block", "link-to", ["edit-labels"], ["class", "button"], 0, null, ["loc", [null, [11, 16], [11, 73]]]], ["block", "each", [["get", "session.user.labels", ["loc", [null, [20, 22], [20, 41]]]]], [], 1, null, ["loc", [null, [20, 14], [33, 23]]]], ["block", "if", [["get", "session.isAuthenticated", ["loc", [null, [40, 10], [40, 33]]]]], [], 2, null, ["loc", [null, [40, 4], [42, 11]]]]],
      locals: [],
      templates: [child0, child1, child2]
    };
  })());
});
define("finndis/templates/login", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 14,
              "column": 4
            },
            "end": {
              "line": 15,
              "column": 4
            }
          },
          "moduleName": "finndis/templates/login.hbs"
        },
        isEmpty: true,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 15,
              "column": 4
            },
            "end": {
              "line": 21,
              "column": 4
            }
          },
          "moduleName": "finndis/templates/login.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "row");
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "small-6 small-offset-3 medium-4 medium-offset-4 large-4 large-offset-4 columns");
          var el3 = dom.createTextNode("\n        ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("a");
          dom.setAttribute(el3, "class", "button expanded button_login");
          var el4 = dom.createTextNode("Login / Signup");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1, 1, 1]);
          var morphs = new Array(1);
          morphs[0] = dom.createElementMorph(element0);
          return morphs;
        },
        statements: [["element", "action", ["login"], [], ["loc", [null, [18, 48], [18, 66]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.3.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 27,
            "column": 0
          }
        },
        "moduleName": "finndis/templates/login.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "page-wrapper row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "columns");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "banner row");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "small-12 columns");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "banner--content");
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("h2");
        dom.setAttribute(el6, "class", "banner--title");
        var el7 = dom.createTextNode("Save everywhere");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("h3");
        dom.setAttribute(el6, "class", "banner--subtitle");
        var el7 = dom.createTextNode("Simplify your life by saving all the places you want to remember");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [2, 1]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(element1, 3, 3);
        morphs[2] = dom.createMorphAt(element1, 5, 5);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["inline", "main-header", [], ["menuShowLogo", true], ["loc", [null, [1, 0], [1, 33]]]], ["block", "if", [["get", "session.isAuthenticated", ["loc", [null, [14, 10], [14, 33]]]]], [], 0, 1, ["loc", [null, [14, 4], [21, 11]]]], ["content", "start-guide", ["loc", [null, [23, 4], [23, 19]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("finndis/templates/map", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.3.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 14,
            "column": 0
          }
        },
        "moduleName": "finndis/templates/map.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "page-wrapper row big");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "columns");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "map_search--holder row");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "columns medium-8 medium-offset-2");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [2, 1, 1, 1]), 1, 1);
        morphs[2] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["inline", "main-header", [], ["menuShowLogo", true], ["loc", [null, [1, 0], [1, 33]]]], ["inline", "place-map", [], ["model", ["subexpr", "@mut", [["get", "model", ["loc", [null, [7, 26], [7, 31]]]]], [], []], "latitude", "34.851939", "longitude", "-82.399752"], ["loc", [null, [7, 8], [7, 77]]]], ["inline", "tool-box", [], ["toolShowList", true], ["loc", [null, [13, 0], [13, 30]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("finndis/templates/place", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          var child0 = (function () {
            return {
              meta: {
                "fragmentReason": false,
                "revision": "Ember@2.3.2",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 39,
                    "column": 28
                  },
                  "end": {
                    "line": 41,
                    "column": 28
                  }
                },
                "moduleName": "finndis/templates/place.hbs"
              },
              isEmpty: false,
              arity: 0,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createTextNode("                              ");
                dom.appendChild(el0, el1);
                var el1 = dom.createElement("a");
                dom.setAttribute(el1, "class", "star-rating fa fa-star");
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n");
                dom.appendChild(el0, el1);
                return el0;
              },
              buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                var element22 = dom.childAt(fragment, [1]);
                var morphs = new Array(1);
                morphs[0] = dom.createElementMorph(element22);
                return morphs;
              },
              statements: [["element", "action", [["get", "set", ["loc", [null, [40, 73], [40, 76]]]], ["get", "star.rating", ["loc", [null, [40, 77], [40, 88]]]]], [], ["loc", [null, [40, 64], [40, 90]]]]],
              locals: [],
              templates: []
            };
          })();
          var child1 = (function () {
            return {
              meta: {
                "fragmentReason": false,
                "revision": "Ember@2.3.2",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 41,
                    "column": 28
                  },
                  "end": {
                    "line": 43,
                    "column": 28
                  }
                },
                "moduleName": "finndis/templates/place.hbs"
              },
              isEmpty: false,
              arity: 0,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createTextNode("                              ");
                dom.appendChild(el0, el1);
                var el1 = dom.createElement("a");
                dom.setAttribute(el1, "class", "star-rating fa fa-star-o");
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n");
                dom.appendChild(el0, el1);
                return el0;
              },
              buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                var element21 = dom.childAt(fragment, [1]);
                var morphs = new Array(1);
                morphs[0] = dom.createElementMorph(element21);
                return morphs;
              },
              statements: [["element", "action", [["get", "set", ["loc", [null, [42, 75], [42, 78]]]], ["get", "star.rating", ["loc", [null, [42, 79], [42, 90]]]]], [], ["loc", [null, [42, 66], [42, 92]]]]],
              locals: [],
              templates: []
            };
          })();
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.3.2",
              "loc": {
                "source": null,
                "start": {
                  "line": 38,
                  "column": 26
                },
                "end": {
                  "line": 44,
                  "column": 26
                }
              },
              "moduleName": "finndis/templates/place.hbs"
            },
            isEmpty: false,
            arity: 1,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
              dom.insertBoundary(fragment, 0);
              dom.insertBoundary(fragment, null);
              return morphs;
            },
            statements: [["block", "if", [["get", "star.full", ["loc", [null, [39, 34], [39, 43]]]]], [], 0, 1, ["loc", [null, [39, 28], [43, 35]]]]],
            locals: ["star"],
            templates: [child0, child1]
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.2",
            "loc": {
              "source": null,
              "start": {
                "line": 37,
                "column": 24
              },
              "end": {
                "line": 45,
                "column": 24
              }
            },
            "moduleName": "finndis/templates/place.hbs"
          },
          isEmpty: false,
          arity: 2,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["block", "each", [["get", "stars", ["loc", [null, [38, 34], [38, 39]]]]], [], 0, null, ["loc", [null, [38, 26], [44, 35]]]]],
          locals: ["stars", "set"],
          templates: [child0]
        };
      })();
      var child1 = (function () {
        var child0 = (function () {
          var child0 = (function () {
            return {
              meta: {
                "fragmentReason": false,
                "revision": "Ember@2.3.2",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 106,
                    "column": 32
                  },
                  "end": {
                    "line": 108,
                    "column": 32
                  }
                },
                "moduleName": "finndis/templates/place.hbs"
              },
              isEmpty: false,
              arity: 0,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createTextNode("                                  ");
                dom.appendChild(el0, el1);
                var el1 = dom.createElement("a");
                dom.setAttribute(el1, "class", "price-rating fa fa-square");
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n");
                dom.appendChild(el0, el1);
                return el0;
              },
              buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                var element20 = dom.childAt(fragment, [1]);
                var morphs = new Array(1);
                morphs[0] = dom.createElementMorph(element20);
                return morphs;
              },
              statements: [["element", "action", [["get", "set", ["loc", [null, [107, 80], [107, 83]]]], ["get", "star.rating", ["loc", [null, [107, 84], [107, 95]]]]], [], ["loc", [null, [107, 71], [107, 97]]]]],
              locals: [],
              templates: []
            };
          })();
          var child1 = (function () {
            return {
              meta: {
                "fragmentReason": false,
                "revision": "Ember@2.3.2",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 108,
                    "column": 32
                  },
                  "end": {
                    "line": 110,
                    "column": 32
                  }
                },
                "moduleName": "finndis/templates/place.hbs"
              },
              isEmpty: false,
              arity: 0,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createTextNode("                                  ");
                dom.appendChild(el0, el1);
                var el1 = dom.createElement("a");
                dom.setAttribute(el1, "class", "price-rating fa fa-square-o");
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n");
                dom.appendChild(el0, el1);
                return el0;
              },
              buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                var element19 = dom.childAt(fragment, [1]);
                var morphs = new Array(1);
                morphs[0] = dom.createElementMorph(element19);
                return morphs;
              },
              statements: [["element", "action", [["get", "set", ["loc", [null, [109, 82], [109, 85]]]], ["get", "star.rating", ["loc", [null, [109, 86], [109, 97]]]]], [], ["loc", [null, [109, 73], [109, 99]]]]],
              locals: [],
              templates: []
            };
          })();
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.3.2",
              "loc": {
                "source": null,
                "start": {
                  "line": 105,
                  "column": 30
                },
                "end": {
                  "line": 111,
                  "column": 30
                }
              },
              "moduleName": "finndis/templates/place.hbs"
            },
            isEmpty: false,
            arity: 1,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
              dom.insertBoundary(fragment, 0);
              dom.insertBoundary(fragment, null);
              return morphs;
            },
            statements: [["block", "if", [["get", "star.full", ["loc", [null, [106, 38], [106, 47]]]]], [], 0, 1, ["loc", [null, [106, 32], [110, 39]]]]],
            locals: ["star"],
            templates: [child0, child1]
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.2",
            "loc": {
              "source": null,
              "start": {
                "line": 104,
                "column": 28
              },
              "end": {
                "line": 112,
                "column": 28
              }
            },
            "moduleName": "finndis/templates/place.hbs"
          },
          isEmpty: false,
          arity: 2,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["block", "each", [["get", "stars", ["loc", [null, [105, 38], [105, 43]]]]], [], 0, null, ["loc", [null, [105, 30], [111, 39]]]]],
          locals: ["stars", "set"],
          templates: [child0]
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 7,
              "column": 0
            },
            "end": {
              "line": 136,
              "column": 0
            }
          },
          "moduleName": "finndis/templates/place.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "place_details row");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "__edition medium-8 medium-offset-2 columns");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("form");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          dom.setAttribute(el4, "class", "row");
          var el5 = dom.createTextNode("\n          ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("div");
          dom.setAttribute(el5, "class", "columns");
          var el6 = dom.createTextNode("\n            ");
          dom.appendChild(el5, el6);
          var el6 = dom.createElement("div");
          dom.setAttribute(el6, "class", "place--holder");
          var el7 = dom.createTextNode("\n              ");
          dom.appendChild(el6, el7);
          var el7 = dom.createElement("article");
          dom.setAttribute(el7, "class", "place");
          var el8 = dom.createTextNode("\n                ");
          dom.appendChild(el7, el8);
          var el8 = dom.createElement("header");
          dom.setAttribute(el8, "class", "place--header");
          var el9 = dom.createTextNode("\n                  ");
          dom.appendChild(el8, el9);
          var el9 = dom.createElement("a");
          dom.setAttribute(el9, "href", "#");
          dom.setAttribute(el9, "class", "button delete-button");
          var el10 = dom.createElement("i");
          dom.setAttribute(el10, "class", "place--action--icon fa fa-trash");
          dom.appendChild(el9, el10);
          var el10 = dom.createTextNode("Delete");
          dom.appendChild(el9, el10);
          dom.appendChild(el8, el9);
          var el9 = dom.createTextNode("\n                  ");
          dom.appendChild(el8, el9);
          var el9 = dom.createElement("a");
          dom.setAttribute(el9, "href", "#");
          dom.setAttribute(el9, "class", "button cancel-button");
          var el10 = dom.createElement("i");
          dom.setAttribute(el10, "class", "place--action--icon fa fa-times");
          dom.appendChild(el9, el10);
          var el10 = dom.createTextNode("Cancel");
          dom.appendChild(el9, el10);
          dom.appendChild(el8, el9);
          var el9 = dom.createTextNode("\n                  ");
          dom.appendChild(el8, el9);
          var el9 = dom.createElement("button");
          dom.setAttribute(el9, "type", "submit");
          dom.setAttribute(el9, "class", "button edit-button");
          var el10 = dom.createElement("i");
          dom.setAttribute(el10, "class", "place--action--icon fa fa-check");
          dom.appendChild(el9, el10);
          var el10 = dom.createTextNode("Save");
          dom.appendChild(el9, el10);
          dom.appendChild(el8, el9);
          var el9 = dom.createTextNode("\n\n                  ");
          dom.appendChild(el8, el9);
          var el9 = dom.createElement("h2");
          dom.setAttribute(el9, "class", "place--title");
          var el10 = dom.createTextNode("\n                    ");
          dom.appendChild(el9, el10);
          var el10 = dom.createComment("");
          dom.appendChild(el9, el10);
          var el10 = dom.createTextNode("\n                  ");
          dom.appendChild(el9, el10);
          dom.appendChild(el8, el9);
          var el9 = dom.createTextNode("\n                  ");
          dom.appendChild(el8, el9);
          var el9 = dom.createElement("i");
          dom.setAttribute(el9, "class", "place--labels--icon fa fa-tag");
          dom.appendChild(el8, el9);
          var el9 = dom.createTextNode("\n                  ");
          dom.appendChild(el8, el9);
          var el9 = dom.createElement("ul");
          dom.setAttribute(el9, "class", "place--labels clearfix");
          var el10 = dom.createTextNode("\n                    ");
          dom.appendChild(el9, el10);
          var el10 = dom.createElement("li");
          dom.setAttribute(el10, "class", "place--labelitem");
          var el11 = dom.createComment("");
          dom.appendChild(el10, el11);
          dom.appendChild(el9, el10);
          var el10 = dom.createTextNode("\n                    ");
          dom.appendChild(el9, el10);
          var el10 = dom.createElement("li");
          dom.setAttribute(el10, "class", "place--labelitem");
          var el11 = dom.createTextNode("\n                      ");
          dom.appendChild(el10, el11);
          var el11 = dom.createElement("i");
          dom.setAttribute(el11, "class", "place--add--icon fa fa-plus");
          dom.appendChild(el10, el11);
          var el11 = dom.createTextNode("\n                    ");
          dom.appendChild(el10, el11);
          dom.appendChild(el9, el10);
          var el10 = dom.createTextNode("\n                  ");
          dom.appendChild(el9, el10);
          dom.appendChild(el8, el9);
          var el9 = dom.createTextNode("\n                ");
          dom.appendChild(el8, el9);
          dom.appendChild(el7, el8);
          var el8 = dom.createTextNode("\n                ");
          dom.appendChild(el7, el8);
          var el8 = dom.createElement("main");
          dom.setAttribute(el8, "class", "place--main");
          var el9 = dom.createTextNode("\n                  ");
          dom.appendChild(el8, el9);
          var el9 = dom.createElement("div");
          dom.setAttribute(el9, "class", "place--info--holder row");
          var el10 = dom.createTextNode("\n                    ");
          dom.appendChild(el9, el10);
          var el10 = dom.createElement("div");
          dom.setAttribute(el10, "class", "columns");
          var el11 = dom.createTextNode("\n                      ");
          dom.appendChild(el10, el11);
          var el11 = dom.createElement("div");
          dom.setAttribute(el11, "class", "place--rating");
          var el12 = dom.createTextNode("\n");
          dom.appendChild(el11, el12);
          var el12 = dom.createComment("");
          dom.appendChild(el11, el12);
          var el12 = dom.createTextNode("                      ");
          dom.appendChild(el11, el12);
          dom.appendChild(el10, el11);
          var el11 = dom.createTextNode("\n                    ");
          dom.appendChild(el10, el11);
          dom.appendChild(el9, el10);
          var el10 = dom.createTextNode("\n                  ");
          dom.appendChild(el9, el10);
          dom.appendChild(el8, el9);
          var el9 = dom.createTextNode("\n\n                  ");
          dom.appendChild(el8, el9);
          var el9 = dom.createElement("div");
          dom.setAttribute(el9, "class", "place--info--holder align-middle row");
          var el10 = dom.createTextNode("\n");
          dom.appendChild(el9, el10);
          var el10 = dom.createTextNode("                    ");
          dom.appendChild(el9, el10);
          var el10 = dom.createElement("div");
          dom.setAttribute(el10, "class", "small-12 columns");
          var el11 = dom.createTextNode("\n                      ");
          dom.appendChild(el10, el11);
          var el11 = dom.createElement("div");
          dom.setAttribute(el11, "class", "row");
          var el12 = dom.createTextNode("\n                        ");
          dom.appendChild(el11, el12);
          var el12 = dom.createElement("div");
          dom.setAttribute(el12, "class", "columns");
          var el13 = dom.createTextNode("\n                          ");
          dom.appendChild(el12, el13);
          var el13 = dom.createElement("label");
          var el14 = dom.createElement("i");
          dom.setAttribute(el14, "class", "fa fa-map-marker");
          dom.appendChild(el13, el14);
          var el14 = dom.createTextNode(" Address\n                            ");
          dom.appendChild(el13, el14);
          var el14 = dom.createComment("");
          dom.appendChild(el13, el14);
          var el14 = dom.createTextNode("\n                          ");
          dom.appendChild(el13, el14);
          dom.appendChild(el12, el13);
          var el13 = dom.createTextNode("\n                        ");
          dom.appendChild(el12, el13);
          dom.appendChild(el11, el12);
          var el12 = dom.createTextNode("\n                      ");
          dom.appendChild(el11, el12);
          dom.appendChild(el10, el11);
          var el11 = dom.createTextNode("\n                    ");
          dom.appendChild(el10, el11);
          dom.appendChild(el9, el10);
          var el10 = dom.createTextNode("\n");
          dom.appendChild(el9, el10);
          var el10 = dom.createTextNode("                  ");
          dom.appendChild(el9, el10);
          dom.appendChild(el8, el9);
          var el9 = dom.createTextNode("\n\n                  ");
          dom.appendChild(el8, el9);
          var el9 = dom.createElement("div");
          dom.setAttribute(el9, "class", "place--info--holder row");
          var el10 = dom.createTextNode("\n                    ");
          dom.appendChild(el9, el10);
          var el10 = dom.createElement("div");
          dom.setAttribute(el10, "class", "columns small-12 medium-6");
          var el11 = dom.createTextNode("\n                      ");
          dom.appendChild(el10, el11);
          var el11 = dom.createElement("div");
          dom.setAttribute(el11, "class", "place--website align-middle row");
          var el12 = dom.createTextNode("\n                        ");
          dom.appendChild(el11, el12);
          var el12 = dom.createElement("div");
          dom.setAttribute(el12, "class", "small-12 columns");
          var el13 = dom.createTextNode("\n                          ");
          dom.appendChild(el12, el13);
          var el13 = dom.createElement("label");
          var el14 = dom.createElement("i");
          dom.setAttribute(el14, "class", "fa fa-globe");
          dom.appendChild(el13, el14);
          var el14 = dom.createTextNode(" Website\n                            ");
          dom.appendChild(el13, el14);
          var el14 = dom.createComment("");
          dom.appendChild(el13, el14);
          var el14 = dom.createTextNode("\n                          ");
          dom.appendChild(el13, el14);
          dom.appendChild(el12, el13);
          var el13 = dom.createTextNode("\n                        ");
          dom.appendChild(el12, el13);
          dom.appendChild(el11, el12);
          var el12 = dom.createTextNode("\n                      ");
          dom.appendChild(el11, el12);
          dom.appendChild(el10, el11);
          var el11 = dom.createTextNode("\n                    ");
          dom.appendChild(el10, el11);
          dom.appendChild(el9, el10);
          var el10 = dom.createTextNode("\n                    ");
          dom.appendChild(el9, el10);
          var el10 = dom.createElement("div");
          dom.setAttribute(el10, "class", "columns small-12 medium-6");
          var el11 = dom.createTextNode("\n                      ");
          dom.appendChild(el10, el11);
          var el11 = dom.createElement("div");
          dom.setAttribute(el11, "class", "place--phone align-middle row");
          var el12 = dom.createTextNode("\n                        ");
          dom.appendChild(el11, el12);
          var el12 = dom.createElement("div");
          dom.setAttribute(el12, "class", "small-12 columns");
          var el13 = dom.createTextNode("\n                          ");
          dom.appendChild(el12, el13);
          var el13 = dom.createElement("label");
          var el14 = dom.createElement("i");
          dom.setAttribute(el14, "class", "fa fa-phone");
          dom.appendChild(el13, el14);
          var el14 = dom.createTextNode(" Phone number\n                            ");
          dom.appendChild(el13, el14);
          var el14 = dom.createComment("");
          dom.appendChild(el13, el14);
          var el14 = dom.createTextNode("\n                          ");
          dom.appendChild(el13, el14);
          dom.appendChild(el12, el13);
          var el13 = dom.createTextNode("\n                        ");
          dom.appendChild(el12, el13);
          dom.appendChild(el11, el12);
          var el12 = dom.createTextNode("\n                      ");
          dom.appendChild(el11, el12);
          dom.appendChild(el10, el11);
          var el11 = dom.createTextNode("\n                    ");
          dom.appendChild(el10, el11);
          dom.appendChild(el9, el10);
          var el10 = dom.createTextNode("\n                  ");
          dom.appendChild(el9, el10);
          dom.appendChild(el8, el9);
          var el9 = dom.createTextNode("\n\n                  ");
          dom.appendChild(el8, el9);
          var el9 = dom.createElement("div");
          dom.setAttribute(el9, "class", "place--info--holder row");
          var el10 = dom.createTextNode("\n                    ");
          dom.appendChild(el9, el10);
          var el10 = dom.createElement("div");
          dom.setAttribute(el10, "class", "columns");
          var el11 = dom.createTextNode("\n                      ");
          dom.appendChild(el10, el11);
          var el11 = dom.createElement("div");
          dom.setAttribute(el11, "class", "place--phone align-middle row");
          var el12 = dom.createTextNode("\n                        ");
          dom.appendChild(el11, el12);
          var el12 = dom.createElement("div");
          dom.setAttribute(el12, "class", "small-12 columns");
          var el13 = dom.createTextNode("\n                          ");
          dom.appendChild(el12, el13);
          var el13 = dom.createElement("label");
          var el14 = dom.createElement("i");
          dom.setAttribute(el14, "class", "fa fa-info");
          dom.appendChild(el13, el14);
          var el14 = dom.createTextNode(" Notes\n                            ");
          dom.appendChild(el13, el14);
          var el14 = dom.createComment("");
          dom.appendChild(el13, el14);
          var el14 = dom.createTextNode("\n                          ");
          dom.appendChild(el13, el14);
          dom.appendChild(el12, el13);
          var el13 = dom.createTextNode("\n                        ");
          dom.appendChild(el12, el13);
          dom.appendChild(el11, el12);
          var el12 = dom.createTextNode("\n                      ");
          dom.appendChild(el11, el12);
          dom.appendChild(el10, el11);
          var el11 = dom.createTextNode("\n                    ");
          dom.appendChild(el10, el11);
          dom.appendChild(el9, el10);
          var el10 = dom.createTextNode("\n                  ");
          dom.appendChild(el9, el10);
          dom.appendChild(el8, el9);
          var el9 = dom.createTextNode("\n\n");
          dom.appendChild(el8, el9);
          var el9 = dom.createTextNode("\n                  ");
          dom.appendChild(el8, el9);
          var el9 = dom.createElement("div");
          dom.setAttribute(el9, "class", "place--info--holder row");
          var el10 = dom.createTextNode("\n                    ");
          dom.appendChild(el9, el10);
          var el10 = dom.createElement("div");
          dom.setAttribute(el10, "class", "columns small-12 medium-6");
          var el11 = dom.createTextNode("\n                      ");
          dom.appendChild(el10, el11);
          var el11 = dom.createElement("div");
          dom.setAttribute(el11, "class", "place--phone align-middle row");
          var el12 = dom.createTextNode("\n                        ");
          dom.appendChild(el11, el12);
          var el12 = dom.createElement("div");
          dom.setAttribute(el12, "class", "small-12 columns");
          var el13 = dom.createTextNode("\n                          ");
          dom.appendChild(el12, el13);
          var el13 = dom.createElement("label");
          var el14 = dom.createElement("i");
          dom.setAttribute(el14, "class", "fa fa-usd");
          dom.appendChild(el13, el14);
          var el14 = dom.createTextNode(" Price\n");
          dom.appendChild(el13, el14);
          var el14 = dom.createComment("");
          dom.appendChild(el13, el14);
          var el14 = dom.createTextNode("                          ");
          dom.appendChild(el13, el14);
          dom.appendChild(el12, el13);
          var el13 = dom.createTextNode("\n                        ");
          dom.appendChild(el12, el13);
          dom.appendChild(el11, el12);
          var el12 = dom.createTextNode("\n                      ");
          dom.appendChild(el11, el12);
          dom.appendChild(el10, el11);
          var el11 = dom.createTextNode("\n                    ");
          dom.appendChild(el10, el11);
          dom.appendChild(el9, el10);
          var el10 = dom.createTextNode("\n                  ");
          dom.appendChild(el9, el10);
          dom.appendChild(el8, el9);
          var el9 = dom.createTextNode("\n\n");
          dom.appendChild(el8, el9);
          var el9 = dom.createTextNode("\n                ");
          dom.appendChild(el8, el9);
          dom.appendChild(el7, el8);
          var el8 = dom.createTextNode("\n              ");
          dom.appendChild(el7, el8);
          dom.appendChild(el6, el7);
          var el7 = dom.createTextNode("\n            ");
          dom.appendChild(el6, el7);
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("\n          ");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n        ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          dom.setAttribute(el4, "class", "place--info--holder row");
          var el5 = dom.createTextNode("\n          ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("div");
          dom.setAttribute(el5, "class", "columns");
          var el6 = dom.createTextNode("\n            ");
          dom.appendChild(el5, el6);
          var el6 = dom.createElement("button");
          dom.setAttribute(el6, "type", "submit");
          dom.setAttribute(el6, "class", "button expanded");
          var el7 = dom.createTextNode("Save");
          dom.appendChild(el6, el7);
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("\n          ");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n        ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element23 = dom.childAt(fragment, [2, 1, 1]);
          var element24 = dom.childAt(element23, [1, 1, 1, 1]);
          var element25 = dom.childAt(element24, [1]);
          var element26 = dom.childAt(element25, [1]);
          var element27 = dom.childAt(element25, [3]);
          var element28 = dom.childAt(element25, [9]);
          var element29 = dom.childAt(element25, [11]);
          var element30 = dom.childAt(element24, [3]);
          var element31 = dom.childAt(element30, [5]);
          var morphs = new Array(13);
          morphs[0] = dom.createElementMorph(element23);
          morphs[1] = dom.createElementMorph(element26);
          morphs[2] = dom.createElementMorph(element27);
          morphs[3] = dom.createMorphAt(dom.childAt(element25, [7]), 1, 1);
          morphs[4] = dom.createElementMorph(element28);
          morphs[5] = dom.createElementMorph(element29);
          morphs[6] = dom.createMorphAt(dom.childAt(element29, [1]), 0, 0);
          morphs[7] = dom.createMorphAt(dom.childAt(element30, [1, 1, 1]), 1, 1);
          morphs[8] = dom.createMorphAt(dom.childAt(element30, [3, 2, 1, 1, 1]), 2, 2);
          morphs[9] = dom.createMorphAt(dom.childAt(element31, [1, 1, 1, 1]), 2, 2);
          morphs[10] = dom.createMorphAt(dom.childAt(element31, [3, 1, 1, 1]), 2, 2);
          morphs[11] = dom.createMorphAt(dom.childAt(element30, [7, 1, 1, 1, 1]), 2, 2);
          morphs[12] = dom.createMorphAt(dom.childAt(element30, [10, 1, 1, 1, 1]), 2, 2);
          return morphs;
        },
        statements: [["element", "action", ["savePlace", ["get", "model", ["loc", [null, [12, 33], [12, 38]]]]], ["on", "submit"], ["loc", [null, [12, 12], [12, 52]]]], ["element", "action", ["deletePlace", ["get", "model", ["loc", [null, [18, 82], [18, 87]]]]], ["bubbles", "false"], ["loc", [null, [18, 59], [18, 105]]]], ["element", "action", ["cancelPlace", ["get", "model", ["loc", [null, [19, 82], [19, 87]]]]], ["bubbles", "false"], ["loc", [null, [19, 59], [19, 105]]]], ["inline", "input", [], ["type", "text", "class", "place--input", "value", ["subexpr", "@mut", [["get", "model.name", ["loc", [null, [23, 67], [23, 77]]]]], [], []]], ["loc", [null, [23, 20], [23, 79]]]], ["element", "action", ["showAddLabel"], ["bubbles", "false"], ["loc", [null, [25, 59], [25, 100]]]], ["element", "action", ["showAddLabel"], ["bubbles", "false"], ["loc", [null, [26, 53], [26, 94]]]], ["content", "model.label.name", ["loc", [null, [27, 49], [27, 69]]]], ["block", "star-rating-fa", [], ["item", ["subexpr", "@mut", [["get", "model", ["loc", [null, [37, 48], [37, 53]]]]], [], []], "rating", ["subexpr", "@mut", [["get", "model.rating", ["loc", [null, [37, 61], [37, 73]]]]], [], []], "on-click", ["subexpr", "action", ["setRating"], [], ["loc", [null, [37, 83], [37, 103]]]]], 0, null, ["loc", [null, [37, 24], [45, 43]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "model.formattedaddress", ["loc", [null, [56, 42], [56, 64]]]]], [], []], "class", "place--main-input", "type", "text"], ["loc", [null, [56, 28], [56, 105]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "model.website", ["loc", [null, [69, 42], [69, 55]]]]], [], []], "class", "place--main-input", "type", "text"], ["loc", [null, [69, 28], [69, 95]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "model.phone", ["loc", [null, [78, 42], [78, 53]]]]], [], []], "class", "place--main-input", "type", "text"], ["loc", [null, [78, 28], [78, 93]]]], ["inline", "textarea", [], ["type", "text", "cols", "60", "rows", "3", "class", "place--main-input", "value", ["subexpr", "@mut", [["get", "model.description", ["loc", [null, [90, 102], [90, 119]]]]], [], []]], ["loc", [null, [90, 28], [90, 121]]]], ["block", "star-rating-fa", [], ["item", ["subexpr", "@mut", [["get", "model", ["loc", [null, [104, 52], [104, 57]]]]], [], []], "rating", ["subexpr", "@mut", [["get", "model.pricerange", ["loc", [null, [104, 65], [104, 81]]]]], [], []], "on-click", ["subexpr", "action", ["setPrice"], [], ["loc", [null, [104, 91], [104, 110]]]]], 1, null, ["loc", [null, [104, 28], [112, 47]]]]],
        locals: [],
        templates: [child0, child1]
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.2",
            "loc": {
              "source": null,
              "start": {
                "line": 142,
                "column": 6
              },
              "end": {
                "line": 148,
                "column": 6
              }
            },
            "moduleName": "finndis/templates/place.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "row");
            var el2 = dom.createTextNode("\n        ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "columns");
            var el3 = dom.createTextNode("\n          ");
            dom.appendChild(el2, el3);
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n        ");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 1]), 1, 1);
            return morphs;
          },
          statements: [["inline", "google-map", [], ["longitude", ["subexpr", "@mut", [["get", "mapLng", ["loc", [null, [145, 33], [145, 39]]]]], [], []], "latitude", ["subexpr", "@mut", [["get", "mapLat", ["loc", [null, [145, 49], [145, 55]]]]], [], []]], ["loc", [null, [145, 10], [145, 57]]]]],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.3.2",
              "loc": {
                "source": null,
                "start": {
                  "line": 171,
                  "column": 18
                },
                "end": {
                  "line": 182,
                  "column": 18
                }
              },
              "moduleName": "finndis/templates/place.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("                  ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("div");
              dom.setAttribute(el1, "class", "columns small-12 medium-6");
              var el2 = dom.createTextNode("\n                    ");
              dom.appendChild(el1, el2);
              var el2 = dom.createElement("div");
              dom.setAttribute(el2, "class", "place--spacing place--address row");
              var el3 = dom.createTextNode("\n                      ");
              dom.appendChild(el2, el3);
              var el3 = dom.createElement("div");
              dom.setAttribute(el3, "class", "place--main--icon--holder small-1 columns");
              var el4 = dom.createTextNode("\n                        ");
              dom.appendChild(el3, el4);
              var el4 = dom.createElement("i");
              dom.setAttribute(el4, "class", "place--main--icon fa fa-map-marker");
              dom.appendChild(el3, el4);
              var el4 = dom.createTextNode("\n                      ");
              dom.appendChild(el3, el4);
              dom.appendChild(el2, el3);
              var el3 = dom.createTextNode("\n                      ");
              dom.appendChild(el2, el3);
              var el3 = dom.createElement("div");
              dom.setAttribute(el3, "class", "small-11 columns");
              var el4 = dom.createTextNode("\n                        ");
              dom.appendChild(el3, el4);
              var el4 = dom.createComment("");
              dom.appendChild(el3, el4);
              var el4 = dom.createTextNode("\n                      ");
              dom.appendChild(el3, el4);
              dom.appendChild(el2, el3);
              var el3 = dom.createTextNode("\n                    ");
              dom.appendChild(el2, el3);
              dom.appendChild(el1, el2);
              var el2 = dom.createTextNode("\n                  ");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 1, 3]), 1, 1);
              return morphs;
            },
            statements: [["content", "model.formattedaddress", ["loc", [null, [178, 24], [178, 50]]]]],
            locals: [],
            templates: []
          };
        })();
        var child1 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.3.2",
              "loc": {
                "source": null,
                "start": {
                  "line": 183,
                  "column": 18
                },
                "end": {
                  "line": 196,
                  "column": 18
                }
              },
              "moduleName": "finndis/templates/place.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("                  ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("div");
              dom.setAttribute(el1, "class", "columns small-12 medium-6");
              var el2 = dom.createTextNode("\n                    ");
              dom.appendChild(el1, el2);
              var el2 = dom.createElement("a");
              var el3 = dom.createTextNode("\n                      ");
              dom.appendChild(el2, el3);
              var el3 = dom.createElement("div");
              dom.setAttribute(el3, "class", "place--phone row");
              var el4 = dom.createTextNode("\n                        ");
              dom.appendChild(el3, el4);
              var el4 = dom.createElement("div");
              dom.setAttribute(el4, "class", "place--main--icon--holder small-1 columns");
              var el5 = dom.createTextNode("\n                          ");
              dom.appendChild(el4, el5);
              var el5 = dom.createElement("i");
              dom.setAttribute(el5, "class", "place--main--icon fa fa-phone");
              dom.appendChild(el4, el5);
              var el5 = dom.createTextNode("\n                        ");
              dom.appendChild(el4, el5);
              dom.appendChild(el3, el4);
              var el4 = dom.createTextNode("\n                        ");
              dom.appendChild(el3, el4);
              var el4 = dom.createElement("div");
              dom.setAttribute(el4, "class", "small-11 columns");
              var el5 = dom.createTextNode("\n                          ");
              dom.appendChild(el4, el5);
              var el5 = dom.createComment("");
              dom.appendChild(el4, el5);
              var el5 = dom.createTextNode("\n                        ");
              dom.appendChild(el4, el5);
              dom.appendChild(el3, el4);
              var el4 = dom.createTextNode("\n                      ");
              dom.appendChild(el3, el4);
              dom.appendChild(el2, el3);
              var el3 = dom.createTextNode("\n                    ");
              dom.appendChild(el2, el3);
              dom.appendChild(el1, el2);
              var el2 = dom.createTextNode("\n                  ");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var element7 = dom.childAt(fragment, [1, 1]);
              var morphs = new Array(2);
              morphs[0] = dom.createAttrMorph(element7, 'href');
              morphs[1] = dom.createMorphAt(dom.childAt(element7, [1, 3]), 1, 1);
              return morphs;
            },
            statements: [["attribute", "href", ["concat", ["tel:", ["get", "model.phone", ["loc", [null, [185, 35], [185, 46]]]]]]], ["content", "model.phone", ["loc", [null, [191, 26], [191, 41]]]]],
            locals: [],
            templates: []
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.2",
            "loc": {
              "source": null,
              "start": {
                "line": 169,
                "column": 16
              },
              "end": {
                "line": 198,
                "column": 16
              }
            },
            "moduleName": "finndis/templates/place.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("                ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "place--info--holder row");
            var el2 = dom.createTextNode("\n");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("                ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element8 = dom.childAt(fragment, [1]);
            var morphs = new Array(2);
            morphs[0] = dom.createMorphAt(element8, 1, 1);
            morphs[1] = dom.createMorphAt(element8, 2, 2);
            return morphs;
          },
          statements: [["block", "if", [["get", "model.formattedaddress", ["loc", [null, [171, 24], [171, 46]]]]], [], 0, null, ["loc", [null, [171, 18], [182, 25]]]], ["block", "if", [["get", "model.phone", ["loc", [null, [183, 24], [183, 35]]]]], [], 1, null, ["loc", [null, [183, 18], [196, 25]]]]],
          locals: [],
          templates: [child0, child1]
        };
      })();
      var child2 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.3.2",
              "loc": {
                "source": null,
                "start": {
                  "line": 203,
                  "column": 18
                },
                "end": {
                  "line": 216,
                  "column": 18
                }
              },
              "moduleName": "finndis/templates/place.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("                  ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("div");
              dom.setAttribute(el1, "class", "columns small-12 medium-6");
              var el2 = dom.createTextNode("\n                    ");
              dom.appendChild(el1, el2);
              var el2 = dom.createElement("a");
              var el3 = dom.createTextNode("\n                      ");
              dom.appendChild(el2, el3);
              var el3 = dom.createElement("div");
              dom.setAttribute(el3, "class", "place--spacing place--website row align-middle");
              var el4 = dom.createTextNode("\n                        ");
              dom.appendChild(el3, el4);
              var el4 = dom.createElement("div");
              dom.setAttribute(el4, "class", "place--main--icon--holder small-1 columns");
              var el5 = dom.createTextNode("\n                          ");
              dom.appendChild(el4, el5);
              var el5 = dom.createElement("i");
              dom.setAttribute(el5, "class", "place--main--icon fa fa-globe");
              dom.appendChild(el4, el5);
              var el5 = dom.createTextNode("\n                        ");
              dom.appendChild(el4, el5);
              dom.appendChild(el3, el4);
              var el4 = dom.createTextNode("\n                        ");
              dom.appendChild(el3, el4);
              var el4 = dom.createElement("div");
              dom.setAttribute(el4, "class", "small-11 columns");
              var el5 = dom.createTextNode("\n                          ");
              dom.appendChild(el4, el5);
              var el5 = dom.createComment("");
              dom.appendChild(el4, el5);
              var el5 = dom.createTextNode("\n                        ");
              dom.appendChild(el4, el5);
              dom.appendChild(el3, el4);
              var el4 = dom.createTextNode("\n                      ");
              dom.appendChild(el3, el4);
              dom.appendChild(el2, el3);
              var el3 = dom.createTextNode("\n                    ");
              dom.appendChild(el2, el3);
              dom.appendChild(el1, el2);
              var el2 = dom.createTextNode("\n                  ");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var element5 = dom.childAt(fragment, [1, 1]);
              var morphs = new Array(2);
              morphs[0] = dom.createAttrMorph(element5, 'href');
              morphs[1] = dom.createMorphAt(dom.childAt(element5, [1, 3]), 1, 1);
              return morphs;
            },
            statements: [["attribute", "href", ["concat", [["get", "model.website", ["loc", [null, [205, 31], [205, 44]]]]]]], ["content", "model.website", ["loc", [null, [211, 26], [211, 43]]]]],
            locals: [],
            templates: []
          };
        })();
        var child1 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.3.2",
              "loc": {
                "source": null,
                "start": {
                  "line": 217,
                  "column": 18
                },
                "end": {
                  "line": 230,
                  "column": 18
                }
              },
              "moduleName": "finndis/templates/place.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("                  ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("div");
              dom.setAttribute(el1, "class", "columns small-12 medium-6");
              var el2 = dom.createTextNode("\n                    ");
              dom.appendChild(el1, el2);
              var el2 = dom.createElement("a");
              dom.setAttribute(el2, "target", "_blank");
              var el3 = dom.createTextNode("\n                      ");
              dom.appendChild(el2, el3);
              var el3 = dom.createElement("div");
              dom.setAttribute(el3, "class", "place--url row align-middle");
              var el4 = dom.createTextNode("\n                        ");
              dom.appendChild(el3, el4);
              var el4 = dom.createElement("div");
              dom.setAttribute(el4, "class", "place--main--icon--holder small-1 columns");
              var el5 = dom.createTextNode("\n                          ");
              dom.appendChild(el4, el5);
              var el5 = dom.createElement("i");
              dom.setAttribute(el5, "class", "place--main--icon fa fa-google");
              dom.appendChild(el4, el5);
              var el5 = dom.createTextNode("\n                        ");
              dom.appendChild(el4, el5);
              dom.appendChild(el3, el4);
              var el4 = dom.createTextNode("\n                        ");
              dom.appendChild(el3, el4);
              var el4 = dom.createElement("div");
              dom.setAttribute(el4, "class", "small-11 columns");
              var el5 = dom.createTextNode("\n                          Google Map\n                        ");
              dom.appendChild(el4, el5);
              dom.appendChild(el3, el4);
              var el4 = dom.createTextNode("\n                      ");
              dom.appendChild(el3, el4);
              dom.appendChild(el2, el3);
              var el3 = dom.createTextNode("\n                    ");
              dom.appendChild(el2, el3);
              dom.appendChild(el1, el2);
              var el2 = dom.createTextNode("\n                  ");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var element4 = dom.childAt(fragment, [1, 1]);
              var morphs = new Array(1);
              morphs[0] = dom.createAttrMorph(element4, 'href');
              return morphs;
            },
            statements: [["attribute", "href", ["concat", [["get", "model.url", ["loc", [null, [219, 31], [219, 40]]]]]]]],
            locals: [],
            templates: []
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.2",
            "loc": {
              "source": null,
              "start": {
                "line": 201,
                "column": 16
              },
              "end": {
                "line": 232,
                "column": 16
              }
            },
            "moduleName": "finndis/templates/place.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("                ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "place--info--holder row");
            var el2 = dom.createTextNode("\n");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("                ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element6 = dom.childAt(fragment, [1]);
            var morphs = new Array(2);
            morphs[0] = dom.createMorphAt(element6, 1, 1);
            morphs[1] = dom.createMorphAt(element6, 2, 2);
            return morphs;
          },
          statements: [["block", "if", [["get", "model.website", ["loc", [null, [203, 24], [203, 37]]]]], [], 0, null, ["loc", [null, [203, 18], [216, 25]]]], ["block", "if", [["get", "model.url", ["loc", [null, [217, 24], [217, 33]]]]], [], 1, null, ["loc", [null, [217, 18], [230, 25]]]]],
          locals: [],
          templates: [child0, child1]
        };
      })();
      var child3 = (function () {
        var child0 = (function () {
          var child0 = (function () {
            var child0 = (function () {
              return {
                meta: {
                  "fragmentReason": false,
                  "revision": "Ember@2.3.2",
                  "loc": {
                    "source": null,
                    "start": {
                      "line": 256,
                      "column": 28
                    },
                    "end": {
                      "line": 258,
                      "column": 28
                    }
                  },
                  "moduleName": "finndis/templates/place.hbs"
                },
                isEmpty: false,
                arity: 0,
                cachedFragment: null,
                hasRendered: false,
                buildFragment: function buildFragment(dom) {
                  var el0 = dom.createDocumentFragment();
                  var el1 = dom.createTextNode("                              ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createElement("a");
                  dom.setAttribute(el1, "class", "price-rating fa fa-square");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode("\n");
                  dom.appendChild(el0, el1);
                  return el0;
                },
                buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                  var element3 = dom.childAt(fragment, [1]);
                  var morphs = new Array(1);
                  morphs[0] = dom.createElementMorph(element3);
                  return morphs;
                },
                statements: [["element", "action", [["get", "set", ["loc", [null, [257, 76], [257, 79]]]], ["get", "star.rating", ["loc", [null, [257, 80], [257, 91]]]]], [], ["loc", [null, [257, 67], [257, 93]]]]],
                locals: [],
                templates: []
              };
            })();
            var child1 = (function () {
              return {
                meta: {
                  "fragmentReason": false,
                  "revision": "Ember@2.3.2",
                  "loc": {
                    "source": null,
                    "start": {
                      "line": 258,
                      "column": 28
                    },
                    "end": {
                      "line": 260,
                      "column": 28
                    }
                  },
                  "moduleName": "finndis/templates/place.hbs"
                },
                isEmpty: false,
                arity: 0,
                cachedFragment: null,
                hasRendered: false,
                buildFragment: function buildFragment(dom) {
                  var el0 = dom.createDocumentFragment();
                  var el1 = dom.createTextNode("                              ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createElement("a");
                  dom.setAttribute(el1, "class", "price-rating fa fa-square-o");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode("\n");
                  dom.appendChild(el0, el1);
                  return el0;
                },
                buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                  var element2 = dom.childAt(fragment, [1]);
                  var morphs = new Array(1);
                  morphs[0] = dom.createElementMorph(element2);
                  return morphs;
                },
                statements: [["element", "action", [["get", "set", ["loc", [null, [259, 78], [259, 81]]]], ["get", "star.rating", ["loc", [null, [259, 82], [259, 93]]]]], [], ["loc", [null, [259, 69], [259, 95]]]]],
                locals: [],
                templates: []
              };
            })();
            return {
              meta: {
                "fragmentReason": false,
                "revision": "Ember@2.3.2",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 255,
                    "column": 26
                  },
                  "end": {
                    "line": 261,
                    "column": 26
                  }
                },
                "moduleName": "finndis/templates/place.hbs"
              },
              isEmpty: false,
              arity: 1,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createComment("");
                dom.appendChild(el0, el1);
                return el0;
              },
              buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                var morphs = new Array(1);
                morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
                dom.insertBoundary(fragment, 0);
                dom.insertBoundary(fragment, null);
                return morphs;
              },
              statements: [["block", "if", [["get", "star.full", ["loc", [null, [256, 34], [256, 43]]]]], [], 0, 1, ["loc", [null, [256, 28], [260, 35]]]]],
              locals: ["star"],
              templates: [child0, child1]
            };
          })();
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.3.2",
              "loc": {
                "source": null,
                "start": {
                  "line": 254,
                  "column": 24
                },
                "end": {
                  "line": 262,
                  "column": 24
                }
              },
              "moduleName": "finndis/templates/place.hbs"
            },
            isEmpty: false,
            arity: 2,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
              dom.insertBoundary(fragment, 0);
              dom.insertBoundary(fragment, null);
              return morphs;
            },
            statements: [["block", "each", [["get", "stars", ["loc", [null, [255, 34], [255, 39]]]]], [], 0, null, ["loc", [null, [255, 26], [261, 35]]]]],
            locals: ["stars", "set"],
            templates: [child0]
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.2",
            "loc": {
              "source": null,
              "start": {
                "line": 247,
                "column": 18
              },
              "end": {
                "line": 266,
                "column": 18
              }
            },
            "moduleName": "finndis/templates/place.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("                  ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "columns small-12 medium-6");
            var el2 = dom.createTextNode("\n                    ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "place--price row align-middle");
            var el3 = dom.createTextNode("\n                      ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("div");
            dom.setAttribute(el3, "class", "place--main--icon--holder small-1 columns");
            var el4 = dom.createTextNode("\n                        ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("i");
            dom.setAttribute(el4, "class", "place--main--icon fa fa-usd");
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n                      ");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n                      ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("div");
            dom.setAttribute(el3, "class", "small-11 columns");
            var el4 = dom.createTextNode("\n");
            dom.appendChild(el3, el4);
            var el4 = dom.createComment("");
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("                      ");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n                    ");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n                  ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 1, 3]), 1, 1);
            return morphs;
          },
          statements: [["block", "star-rating-fa", [], ["item", ["subexpr", "@mut", [["get", "model", ["loc", [null, [254, 48], [254, 53]]]]], [], []], "rating", ["subexpr", "@mut", [["get", "model.pricerange", ["loc", [null, [254, 61], [254, 77]]]]], [], []], "on-click", ["subexpr", "action", ["setPrice"], [], ["loc", [null, [254, 87], [254, 106]]]]], 0, null, ["loc", [null, [254, 24], [262, 43]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      var child4 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.2",
            "loc": {
              "source": null,
              "start": {
                "line": 269,
                "column": 16
              },
              "end": {
                "line": 282,
                "column": 16
              }
            },
            "moduleName": "finndis/templates/place.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("                ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "place--info--holder row");
            var el2 = dom.createTextNode("\n                  ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "columns small-12 medium-6");
            var el3 = dom.createTextNode("\n                    ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("div");
            dom.setAttribute(el3, "class", "place--description row");
            var el4 = dom.createTextNode("\n                      ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("div");
            dom.setAttribute(el4, "class", "place--main--icon--holder small-1 columns");
            var el5 = dom.createTextNode("\n                        ");
            dom.appendChild(el4, el5);
            var el5 = dom.createElement("i");
            dom.setAttribute(el5, "class", "place--main--icon fa fa-info");
            dom.appendChild(el4, el5);
            var el5 = dom.createTextNode("\n                      ");
            dom.appendChild(el4, el5);
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n                      ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("div");
            dom.setAttribute(el4, "class", "small-11 columns");
            var el5 = dom.createTextNode("\n                        ");
            dom.appendChild(el4, el5);
            var el5 = dom.createComment("");
            dom.appendChild(el4, el5);
            var el5 = dom.createTextNode("\n                      ");
            dom.appendChild(el4, el5);
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n                    ");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n                  ");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n                ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 1, 1, 3]), 1, 1);
            return morphs;
          },
          statements: [["content", "model.description", ["loc", [null, [277, 24], [277, 45]]]]],
          locals: [],
          templates: []
        };
      })();
      var child5 = (function () {
        var child0 = (function () {
          var child0 = (function () {
            return {
              meta: {
                "fragmentReason": false,
                "revision": "Ember@2.3.2",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 288,
                    "column": 26
                  },
                  "end": {
                    "line": 290,
                    "column": 26
                  }
                },
                "moduleName": "finndis/templates/place.hbs"
              },
              isEmpty: false,
              arity: 0,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createTextNode("                            ");
                dom.appendChild(el0, el1);
                var el1 = dom.createElement("a");
                dom.setAttribute(el1, "class", "star-rating fa fa-star");
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n");
                dom.appendChild(el0, el1);
                return el0;
              },
              buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                var element1 = dom.childAt(fragment, [1]);
                var morphs = new Array(1);
                morphs[0] = dom.createElementMorph(element1);
                return morphs;
              },
              statements: [["element", "action", [["get", "set", ["loc", [null, [289, 71], [289, 74]]]], ["get", "star.rating", ["loc", [null, [289, 75], [289, 86]]]]], [], ["loc", [null, [289, 62], [289, 88]]]]],
              locals: [],
              templates: []
            };
          })();
          var child1 = (function () {
            return {
              meta: {
                "fragmentReason": false,
                "revision": "Ember@2.3.2",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 290,
                    "column": 26
                  },
                  "end": {
                    "line": 292,
                    "column": 26
                  }
                },
                "moduleName": "finndis/templates/place.hbs"
              },
              isEmpty: false,
              arity: 0,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createTextNode("                            ");
                dom.appendChild(el0, el1);
                var el1 = dom.createElement("a");
                dom.setAttribute(el1, "class", "star-rating fa fa-star-o");
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n");
                dom.appendChild(el0, el1);
                return el0;
              },
              buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                var element0 = dom.childAt(fragment, [1]);
                var morphs = new Array(1);
                morphs[0] = dom.createElementMorph(element0);
                return morphs;
              },
              statements: [["element", "action", [["get", "set", ["loc", [null, [291, 73], [291, 76]]]], ["get", "star.rating", ["loc", [null, [291, 77], [291, 88]]]]], [], ["loc", [null, [291, 64], [291, 90]]]]],
              locals: [],
              templates: []
            };
          })();
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.3.2",
              "loc": {
                "source": null,
                "start": {
                  "line": 287,
                  "column": 24
                },
                "end": {
                  "line": 293,
                  "column": 24
                }
              },
              "moduleName": "finndis/templates/place.hbs"
            },
            isEmpty: false,
            arity: 1,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
              dom.insertBoundary(fragment, 0);
              dom.insertBoundary(fragment, null);
              return morphs;
            },
            statements: [["block", "if", [["get", "star.full", ["loc", [null, [288, 32], [288, 41]]]]], [], 0, 1, ["loc", [null, [288, 26], [292, 33]]]]],
            locals: ["star"],
            templates: [child0, child1]
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.2",
            "loc": {
              "source": null,
              "start": {
                "line": 286,
                "column": 22
              },
              "end": {
                "line": 294,
                "column": 22
              }
            },
            "moduleName": "finndis/templates/place.hbs"
          },
          isEmpty: false,
          arity: 2,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["block", "each", [["get", "stars", ["loc", [null, [287, 32], [287, 37]]]]], [], 0, null, ["loc", [null, [287, 24], [293, 33]]]]],
          locals: ["stars", "set"],
          templates: [child0]
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 136,
              "column": 0
            },
            "end": {
              "line": 307,
              "column": 0
            }
          },
          "moduleName": "finndis/templates/place.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "place_details __display row");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "__display medium-12 columns");
          var el3 = dom.createTextNode("\n\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "row");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          dom.setAttribute(el4, "class", "columns");
          var el5 = dom.createTextNode("\n          ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("div");
          dom.setAttribute(el5, "class", "place--holder");
          var el6 = dom.createTextNode("\n            ");
          dom.appendChild(el5, el6);
          var el6 = dom.createElement("article");
          dom.setAttribute(el6, "class", "place");
          var el7 = dom.createTextNode("\n              ");
          dom.appendChild(el6, el7);
          var el7 = dom.createElement("header");
          dom.setAttribute(el7, "class", "place--header");
          var el8 = dom.createTextNode("\n                ");
          dom.appendChild(el7, el8);
          var el8 = dom.createElement("a");
          dom.setAttribute(el8, "href", "#");
          dom.setAttribute(el8, "class", "button share-button");
          var el9 = dom.createElement("i");
          dom.setAttribute(el9, "class", "place--action--icon fa fa-share-alt");
          dom.appendChild(el8, el9);
          var el9 = dom.createTextNode("Share");
          dom.appendChild(el8, el9);
          dom.appendChild(el7, el8);
          var el8 = dom.createTextNode("\n                ");
          dom.appendChild(el7, el8);
          var el8 = dom.createElement("a");
          dom.setAttribute(el8, "href", "#");
          dom.setAttribute(el8, "class", "button edit-button");
          var el9 = dom.createElement("i");
          dom.setAttribute(el9, "class", "place--action--icon fa fa-pencil-square-o");
          dom.appendChild(el8, el9);
          var el9 = dom.createTextNode("Edit");
          dom.appendChild(el8, el9);
          dom.appendChild(el7, el8);
          var el8 = dom.createTextNode("\n\n                ");
          dom.appendChild(el7, el8);
          var el8 = dom.createComment("");
          dom.appendChild(el7, el8);
          var el8 = dom.createTextNode("\n                ");
          dom.appendChild(el7, el8);
          var el8 = dom.createElement("i");
          dom.setAttribute(el8, "class", "place--labels--icon fa fa-tag");
          dom.appendChild(el7, el8);
          var el8 = dom.createTextNode("\n                ");
          dom.appendChild(el7, el8);
          var el8 = dom.createElement("ul");
          dom.setAttribute(el8, "class", "place--labels clearfix");
          var el9 = dom.createTextNode("\n                  ");
          dom.appendChild(el8, el9);
          var el9 = dom.createElement("li");
          dom.setAttribute(el9, "class", "place--labelitem");
          var el10 = dom.createComment("");
          dom.appendChild(el9, el10);
          dom.appendChild(el8, el9);
          var el9 = dom.createTextNode("\n                  ");
          dom.appendChild(el8, el9);
          var el9 = dom.createElement("li");
          dom.setAttribute(el9, "class", "place--labelitem");
          var el10 = dom.createTextNode("\n                    ");
          dom.appendChild(el9, el10);
          var el10 = dom.createElement("i");
          dom.setAttribute(el10, "class", "place--add--icon fa fa-plus");
          dom.appendChild(el9, el10);
          var el10 = dom.createTextNode("\n                  ");
          dom.appendChild(el9, el10);
          dom.appendChild(el8, el9);
          var el9 = dom.createTextNode("\n                ");
          dom.appendChild(el8, el9);
          dom.appendChild(el7, el8);
          var el8 = dom.createTextNode("\n              ");
          dom.appendChild(el7, el8);
          dom.appendChild(el6, el7);
          var el7 = dom.createTextNode("\n\n              ");
          dom.appendChild(el6, el7);
          var el7 = dom.createElement("main");
          dom.setAttribute(el7, "class", "place--main");
          var el8 = dom.createTextNode("\n");
          dom.appendChild(el7, el8);
          var el8 = dom.createComment("");
          dom.appendChild(el7, el8);
          var el8 = dom.createTextNode("\n\n");
          dom.appendChild(el7, el8);
          var el8 = dom.createComment("");
          dom.appendChild(el7, el8);
          var el8 = dom.createTextNode("\n                ");
          dom.appendChild(el7, el8);
          var el8 = dom.createElement("div");
          dom.setAttribute(el8, "class", "place--info--holder row");
          var el9 = dom.createTextNode("\n                  ");
          dom.appendChild(el8, el9);
          var el9 = dom.createElement("div");
          dom.setAttribute(el9, "class", "columns small-12 medium-6");
          var el10 = dom.createTextNode("\n                    ");
          dom.appendChild(el9, el10);
          var el10 = dom.createElement("a");
          dom.setAttribute(el10, "target", "_blank");
          var el11 = dom.createTextNode("\n                      ");
          dom.appendChild(el10, el11);
          var el11 = dom.createElement("div");
          dom.setAttribute(el11, "class", "place--spacing place--direction align-middle row");
          var el12 = dom.createTextNode("\n                        ");
          dom.appendChild(el11, el12);
          var el12 = dom.createElement("div");
          dom.setAttribute(el12, "class", "place--main--icon--holder small-1 columns");
          var el13 = dom.createTextNode("\n                          ");
          dom.appendChild(el12, el13);
          var el13 = dom.createElement("i");
          dom.setAttribute(el13, "class", "place--main--icon fa fa-location-arrow");
          dom.appendChild(el12, el13);
          var el13 = dom.createTextNode("\n                        ");
          dom.appendChild(el12, el13);
          dom.appendChild(el11, el12);
          var el12 = dom.createTextNode("\n                        ");
          dom.appendChild(el11, el12);
          var el12 = dom.createElement("div");
          dom.setAttribute(el12, "class", "small-11 columns");
          var el13 = dom.createTextNode("\n                          Get direction\n                        ");
          dom.appendChild(el12, el13);
          dom.appendChild(el11, el12);
          var el12 = dom.createTextNode("\n                      ");
          dom.appendChild(el11, el12);
          dom.appendChild(el10, el11);
          var el11 = dom.createTextNode("\n                    ");
          dom.appendChild(el10, el11);
          dom.appendChild(el9, el10);
          var el10 = dom.createTextNode("\n                  ");
          dom.appendChild(el9, el10);
          dom.appendChild(el8, el9);
          var el9 = dom.createTextNode("\n");
          dom.appendChild(el8, el9);
          var el9 = dom.createComment("");
          dom.appendChild(el8, el9);
          var el9 = dom.createTextNode("                ");
          dom.appendChild(el8, el9);
          dom.appendChild(el7, el8);
          var el8 = dom.createTextNode("\n\n");
          dom.appendChild(el7, el8);
          var el8 = dom.createComment("");
          dom.appendChild(el7, el8);
          var el8 = dom.createTextNode("                ");
          dom.appendChild(el7, el8);
          var el8 = dom.createElement("div");
          dom.setAttribute(el8, "class", "place--info--holder row");
          var el9 = dom.createTextNode("\n                  ");
          dom.appendChild(el8, el9);
          var el9 = dom.createElement("div");
          dom.setAttribute(el9, "class", "columns");
          var el10 = dom.createTextNode("\n                    ");
          dom.appendChild(el9, el10);
          var el10 = dom.createElement("div");
          dom.setAttribute(el10, "class", "place--rating");
          var el11 = dom.createTextNode("\n");
          dom.appendChild(el10, el11);
          var el11 = dom.createComment("");
          dom.appendChild(el10, el11);
          var el11 = dom.createTextNode("                    ");
          dom.appendChild(el10, el11);
          dom.appendChild(el9, el10);
          var el10 = dom.createTextNode("\n                  ");
          dom.appendChild(el9, el10);
          dom.appendChild(el8, el9);
          var el9 = dom.createTextNode("\n                ");
          dom.appendChild(el8, el9);
          dom.appendChild(el7, el8);
          var el8 = dom.createTextNode("\n              ");
          dom.appendChild(el7, el8);
          dom.appendChild(el6, el7);
          var el7 = dom.createTextNode("\n            ");
          dom.appendChild(el6, el7);
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("\n          ");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n        ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element9 = dom.childAt(fragment, [2, 1]);
          var element10 = dom.childAt(element9, [3, 1, 1, 1]);
          var element11 = dom.childAt(element10, [1]);
          var element12 = dom.childAt(element11, [1]);
          var element13 = dom.childAt(element11, [3]);
          var element14 = dom.childAt(element11, [7]);
          var element15 = dom.childAt(element11, [9]);
          var element16 = dom.childAt(element10, [3]);
          var element17 = dom.childAt(element16, [5]);
          var element18 = dom.childAt(element17, [1, 1]);
          var morphs = new Array(13);
          morphs[0] = dom.createMorphAt(element9, 1, 1);
          morphs[1] = dom.createElementMorph(element12);
          morphs[2] = dom.createElementMorph(element13);
          morphs[3] = dom.createMorphAt(element11, 5, 5);
          morphs[4] = dom.createElementMorph(element14);
          morphs[5] = dom.createElementMorph(element15);
          morphs[6] = dom.createMorphAt(dom.childAt(element15, [1]), 0, 0);
          morphs[7] = dom.createMorphAt(element16, 1, 1);
          morphs[8] = dom.createMorphAt(element16, 3, 3);
          morphs[9] = dom.createAttrMorph(element18, 'href');
          morphs[10] = dom.createMorphAt(element17, 3, 3);
          morphs[11] = dom.createMorphAt(element16, 7, 7);
          morphs[12] = dom.createMorphAt(dom.childAt(element16, [9, 1, 1]), 1, 1);
          return morphs;
        },
        statements: [["block", "if", [["get", "model.locationlat", ["loc", [null, [142, 12], [142, 29]]]]], [], 0, null, ["loc", [null, [142, 6], [148, 13]]]], ["element", "action", ["sharePlace"], [], ["loc", [null, [155, 56], [155, 79]]]], ["element", "action", ["toggleEdition"], [], ["loc", [null, [156, 55], [156, 81]]]], ["inline", "input", [], ["class", "place--title __input", "type", "text", "placeholder", "Name", "value", ["subexpr", "@mut", [["get", "model.name", ["loc", [null, [158, 90], [158, 100]]]]], [], []]], ["loc", [null, [158, 16], [158, 102]]]], ["element", "action", ["showAddLabel"], ["bubbles", "false"], ["loc", [null, [159, 57], [159, 98]]]], ["element", "action", ["showAddLabel"], ["bubbles", "false"], ["loc", [null, [160, 51], [160, 92]]]], ["content", "model.label.name", ["loc", [null, [161, 47], [161, 67]]]], ["block", "if", [["get", "hasPhoneOrAddress", ["loc", [null, [169, 22], [169, 39]]]]], [], 1, null, ["loc", [null, [169, 16], [198, 23]]]], ["block", "if", [["get", "hasUrlOrWebsite", ["loc", [null, [201, 22], [201, 37]]]]], [], 2, null, ["loc", [null, [201, 16], [232, 23]]]], ["attribute", "href", ["concat", ["http://maps.google.com/maps?daddr=", ["get", "model.locationlat", ["loc", [null, [236, 65], [236, 82]]]], ",", ["get", "model.locationlng", ["loc", [null, [236, 87], [236, 104]]]], "&ll="]]], ["block", "if", [["get", "model.pricerange", ["loc", [null, [247, 24], [247, 40]]]]], [], 3, null, ["loc", [null, [247, 18], [266, 25]]]], ["block", "if", [["get", "model.description", ["loc", [null, [269, 22], [269, 39]]]]], [], 4, null, ["loc", [null, [269, 16], [282, 23]]]], ["block", "star-rating-fa", [], ["item", ["subexpr", "@mut", [["get", "model", ["loc", [null, [286, 46], [286, 51]]]]], [], []], "rating", ["subexpr", "@mut", [["get", "model.rating", ["loc", [null, [286, 59], [286, 71]]]]], [], []], "on-click", ["subexpr", "action", ["setRating"], [], ["loc", [null, [286, 81], [286, 101]]]]], 5, null, ["loc", [null, [286, 22], [294, 41]]]]],
        locals: [],
        templates: [child0, child1, child2, child3, child4, child5]
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 310,
              "column": 2
            },
            "end": {
              "line": 312,
              "column": 2
            }
          },
          "moduleName": "finndis/templates/place.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["content", "tool-box", ["loc", [null, [311, 4], [311, 16]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.3.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 315,
            "column": 0
          }
        },
        "moduleName": "finndis/templates/place.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "page-wrapper row big");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "columns");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element32 = dom.childAt(fragment, [2, 1]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(element32, 1, 1);
        morphs[2] = dom.createMorphAt(element32, 3, 3);
        morphs[3] = dom.createMorphAt(element32, 5, 5);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "main-header", ["loc", [null, [1, 0], [1, 15]]]], ["inline", "label-panel", [], ["labelPanelDisplayed", ["subexpr", "@mut", [["get", "labelPanelDisplayed", ["loc", [null, [5, 38], [5, 57]]]]], [], []], "model", ["subexpr", "@mut", [["get", "model", ["loc", [null, [5, 64], [5, 69]]]]], [], []], "autoSaveLabel", true], ["loc", [null, [5, 4], [5, 90]]]], ["block", "if", [["get", "isEditing", ["loc", [null, [7, 6], [7, 15]]]]], [], 0, 1, ["loc", [null, [7, 0], [307, 7]]]], ["block", "if", [["get", "session.isAuthenticated", ["loc", [null, [310, 8], [310, 31]]]]], [], 2, null, ["loc", [null, [310, 2], [312, 9]]]]],
      locals: [],
      templates: [child0, child1, child2]
    };
  })());
});
define("finndis/templates/places", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          var child0 = (function () {
            return {
              meta: {
                "fragmentReason": false,
                "revision": "Ember@2.3.2",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 13,
                    "column": 18
                  },
                  "end": {
                    "line": 22,
                    "column": 18
                  }
                },
                "moduleName": "finndis/templates/places.hbs"
              },
              isEmpty: false,
              arity: 0,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createTextNode("                    ");
                dom.appendChild(el0, el1);
                var el1 = dom.createElement("div");
                dom.setAttribute(el1, "class", "card--address card--section row");
                var el2 = dom.createTextNode("\n                      ");
                dom.appendChild(el1, el2);
                var el2 = dom.createElement("div");
                dom.setAttribute(el2, "class", "small-1 columns");
                var el3 = dom.createTextNode("\n                        ");
                dom.appendChild(el2, el3);
                var el3 = dom.createElement("i");
                dom.setAttribute(el3, "class", "card--main--icon fa fa-map-marker");
                dom.appendChild(el2, el3);
                var el3 = dom.createTextNode("\n                      ");
                dom.appendChild(el2, el3);
                dom.appendChild(el1, el2);
                var el2 = dom.createTextNode("\n                      ");
                dom.appendChild(el1, el2);
                var el2 = dom.createElement("div");
                dom.setAttribute(el2, "class", "small-11 columns");
                var el3 = dom.createTextNode("\n                        ");
                dom.appendChild(el2, el3);
                var el3 = dom.createComment("");
                dom.appendChild(el2, el3);
                var el3 = dom.createTextNode("\n                      ");
                dom.appendChild(el2, el3);
                dom.appendChild(el1, el2);
                var el2 = dom.createTextNode("\n                    ");
                dom.appendChild(el1, el2);
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n");
                dom.appendChild(el0, el1);
                return el0;
              },
              buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                var morphs = new Array(1);
                morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 3]), 1, 1);
                return morphs;
              },
              statements: [["content", "place.formattedaddress", ["loc", [null, [19, 24], [19, 50]]]]],
              locals: [],
              templates: []
            };
          })();
          var child1 = (function () {
            return {
              meta: {
                "fragmentReason": false,
                "revision": "Ember@2.3.2",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 24,
                    "column": 18
                  },
                  "end": {
                    "line": 33,
                    "column": 18
                  }
                },
                "moduleName": "finndis/templates/places.hbs"
              },
              isEmpty: false,
              arity: 0,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createTextNode("                    ");
                dom.appendChild(el0, el1);
                var el1 = dom.createElement("div");
                dom.setAttribute(el1, "class", "card--phone card--section row");
                var el2 = dom.createTextNode("\n                      ");
                dom.appendChild(el1, el2);
                var el2 = dom.createElement("div");
                dom.setAttribute(el2, "class", "small-1 columns");
                var el3 = dom.createTextNode("\n                        ");
                dom.appendChild(el2, el3);
                var el3 = dom.createElement("i");
                dom.setAttribute(el3, "class", "card--main--icon fa fa-phone");
                dom.appendChild(el2, el3);
                var el3 = dom.createTextNode("\n                      ");
                dom.appendChild(el2, el3);
                dom.appendChild(el1, el2);
                var el2 = dom.createTextNode("\n                      ");
                dom.appendChild(el1, el2);
                var el2 = dom.createElement("div");
                dom.setAttribute(el2, "class", "small-11 columns");
                var el3 = dom.createTextNode("\n                        ");
                dom.appendChild(el2, el3);
                var el3 = dom.createComment("");
                dom.appendChild(el2, el3);
                var el3 = dom.createTextNode("\n                      ");
                dom.appendChild(el2, el3);
                dom.appendChild(el1, el2);
                var el2 = dom.createTextNode("\n                    ");
                dom.appendChild(el1, el2);
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n");
                dom.appendChild(el0, el1);
                return el0;
              },
              buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                var morphs = new Array(1);
                morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 3]), 1, 1);
                return morphs;
              },
              statements: [["content", "place.phone", ["loc", [null, [30, 24], [30, 39]]]]],
              locals: [],
              templates: []
            };
          })();
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.3.2",
              "loc": {
                "source": null,
                "start": {
                  "line": 9,
                  "column": 12
                },
                "end": {
                  "line": 39,
                  "column": 12
                }
              },
              "moduleName": "finndis/templates/places.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("              ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("article");
              dom.setAttribute(el1, "class", "card");
              var el2 = dom.createTextNode("\n                ");
              dom.appendChild(el1, el2);
              var el2 = dom.createElement("h3");
              dom.setAttribute(el2, "class", "card--title");
              var el3 = dom.createComment("");
              dom.appendChild(el2, el3);
              dom.appendChild(el1, el2);
              var el2 = dom.createTextNode("\n                ");
              dom.appendChild(el1, el2);
              var el2 = dom.createElement("main");
              dom.setAttribute(el2, "class", "card--main");
              var el3 = dom.createTextNode("\n");
              dom.appendChild(el2, el3);
              var el3 = dom.createComment("");
              dom.appendChild(el2, el3);
              var el3 = dom.createTextNode("\n");
              dom.appendChild(el2, el3);
              var el3 = dom.createComment("");
              dom.appendChild(el2, el3);
              var el3 = dom.createTextNode("                  ");
              dom.appendChild(el2, el3);
              var el3 = dom.createElement("div");
              dom.setAttribute(el3, "class", "card--icon--holder card--section");
              var el4 = dom.createTextNode("\n                    ");
              dom.appendChild(el3, el4);
              var el4 = dom.createElement("i");
              dom.setAttribute(el4, "class", "card--icon fa fa-tag");
              dom.appendChild(el3, el4);
              var el4 = dom.createComment("");
              dom.appendChild(el3, el4);
              var el4 = dom.createTextNode("\n                  ");
              dom.appendChild(el3, el4);
              dom.appendChild(el2, el3);
              var el3 = dom.createTextNode("\n                ");
              dom.appendChild(el2, el3);
              dom.appendChild(el1, el2);
              var el2 = dom.createTextNode("\n              ");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var element0 = dom.childAt(fragment, [1]);
              var element1 = dom.childAt(element0, [3]);
              var morphs = new Array(5);
              morphs[0] = dom.createAttrMorph(element0, 'id');
              morphs[1] = dom.createMorphAt(dom.childAt(element0, [1]), 0, 0);
              morphs[2] = dom.createMorphAt(element1, 1, 1);
              morphs[3] = dom.createMorphAt(element1, 3, 3);
              morphs[4] = dom.createMorphAt(dom.childAt(element1, [5]), 2, 2);
              return morphs;
            },
            statements: [["attribute", "id", ["concat", ["card_", ["get", "index", ["loc", [null, [10, 34], [10, 39]]]]]]], ["content", "place.name", ["loc", [null, [11, 40], [11, 54]]]], ["block", "if", [["get", "place.formattedaddress", ["loc", [null, [13, 24], [13, 46]]]]], [], 0, null, ["loc", [null, [13, 18], [22, 25]]]], ["block", "if", [["get", "place.phone", ["loc", [null, [24, 24], [24, 35]]]]], [], 1, null, ["loc", [null, [24, 18], [33, 25]]]], ["content", "place.label.name", ["loc", [null, [35, 56], [35, 76]]]]],
            locals: [],
            templates: [child0, child1]
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.2",
            "loc": {
              "source": null,
              "start": {
                "line": 8,
                "column": 10
              },
              "end": {
                "line": 40,
                "column": 10
              }
            },
            "moduleName": "finndis/templates/places.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["block", "link-to", ["place", ["get", "place", ["loc", [null, [9, 31], [9, 36]]]]], [], 0, null, ["loc", [null, [9, 12], [39, 24]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 7,
              "column": 8
            },
            "end": {
              "line": 41,
              "column": 8
            }
          },
          "moduleName": "finndis/templates/places.hbs"
        },
        isEmpty: false,
        arity: 3,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "masonry-item", [], ["item", ["subexpr", "@mut", [["get", "place", ["loc", [null, [8, 31], [8, 36]]]]], [], []], "grid", ["subexpr", "@mut", [["get", "grid", ["loc", [null, [8, 42], [8, 46]]]]], [], []]], 0, null, ["loc", [null, [8, 10], [40, 27]]]]],
        locals: ["place", "index", "grid"],
        templates: [child0]
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 47,
              "column": 4
            },
            "end": {
              "line": 49,
              "column": 4
            }
          },
          "moduleName": "finndis/templates/places.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "tool-box", [], ["toolShowMap", true], ["loc", [null, [48, 6], [48, 35]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.3.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 52,
            "column": 0
          }
        },
        "moduleName": "finndis/templates/places.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "page-wrapper row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "columns");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "row");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "columns");
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element2 = dom.childAt(fragment, [2, 1]);
        var element3 = dom.childAt(element2, [1, 1]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(element3, 1, 1);
        morphs[2] = dom.createMorphAt(element3, 3, 3);
        morphs[3] = dom.createMorphAt(element2, 3, 3);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["inline", "main-header", [], ["menuShowLogo", true], ["loc", [null, [1, 0], [1, 33]]]], ["block", "masonry-grid", [], ["items", ["subexpr", "@mut", [["get", "sortedPlaces", ["loc", [null, [7, 30], [7, 42]]]]], [], []], "customLayout", true], 0, null, ["loc", [null, [7, 8], [41, 25]]]], ["content", "outlet", ["loc", [null, [43, 8], [43, 18]]]], ["block", "if", [["get", "session.isAuthenticated", ["loc", [null, [47, 10], [47, 33]]]]], [], 1, null, ["loc", [null, [47, 4], [49, 11]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("finndis/templates/search", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 11,
              "column": 4
            },
            "end": {
              "line": 13,
              "column": 4
            }
          },
          "moduleName": "finndis/templates/search.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["content", "tool-box", ["loc", [null, [12, 6], [12, 18]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.3.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 16,
            "column": 0
          }
        },
        "moduleName": "finndis/templates/search.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "page-wrapper row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "columns");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "row");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "columns medium-12");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2, 1]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [1, 1]), 1, 1);
        morphs[2] = dom.createMorphAt(element0, 3, 3);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "main-header", ["loc", [null, [1, 0], [1, 15]]]], ["content", "search-box", ["loc", [null, [7, 8], [7, 22]]]], ["block", "if", [["get", "session.isAuthenticated", ["loc", [null, [11, 10], [11, 33]]]]], [], 0, null, ["loc", [null, [11, 4], [13, 11]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("finndis/templates/users", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 18,
              "column": 4
            },
            "end": {
              "line": 20,
              "column": 4
            }
          },
          "moduleName": "finndis/templates/users.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["content", "tool-box", ["loc", [null, [19, 6], [19, 18]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.3.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 23,
            "column": 0
          }
        },
        "moduleName": "finndis/templates/users.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "page-wrapper row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "columns");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "row");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "columns");
        var el5 = dom.createTextNode("\n          Welcome ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "row");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "columns");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("a");
        dom.setAttribute(el5, "class", "button");
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("i");
        dom.setAttribute(el6, "class", "fa fa-sign-out");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode(" Sign out\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 1]);
        var element1 = dom.childAt(element0, [3, 1, 1]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [1, 1]), 1, 1);
        morphs[1] = dom.createElementMorph(element1);
        morphs[2] = dom.createMorphAt(element0, 5, 5);
        return morphs;
      },
      statements: [["content", "session.data.authenticated.profile.name", ["loc", [null, [5, 18], [5, 61]]]], ["element", "action", ["logout"], [], ["loc", [null, [11, 26], [11, 45]]]], ["block", "if", [["get", "session.isAuthenticated", ["loc", [null, [18, 10], [18, 33]]]]], [], 0, null, ["loc", [null, [18, 4], [20, 11]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define('finndis/validators/belongs-to', ['exports', 'ember', 'ember-cp-validations/validators/base'], function (exports, _ember, _emberCpValidationsValidatorsBase) {
  var get = _ember['default'].get;
  var canInvoke = _ember['default'].canInvoke;

  /**
   *  Identifies a `belongs-to` relationship in an Ember Data Model or Ember.Object.
   *  This is used to create a link to the validations object of the child model.
   *
   *  _**Note:** Validations must exist on **both** models/objects_
   *
   *  ### Ember Model
   *
   *  ```javascript
   *  // model/users.js
   *
   *  const Validations = buildValidations({
   *    details: validator('belongs-to')
   *  });
   *
   *  export default DS.Model.extend(Validations, {
   *    'details': DS.belongsTo('user-detail')
   *  });
   *  ```
   *
   *  ```javascript
   *  // model/user-details.js
   *
   *  const Validations = buildValidations({
   *    firstName: validator('presence', true),
   *    lastName: validator('presence', true)
   *  });
   *
   *  export default DS.Model.extend(Validations, {
   *    "firstName": attr('string'),
   *    "lastName": attr('string'),
   *  });
   *  ```
   *
   *  ### Ember Object
   *
   *  ```javascript
   *  // model/users.js
   *
   *  import UserDetails from '../user-details';
   *
   *  const Validations = buildValidations({
   *    details: validator('belongs-to')
   *  });
   *
   *  export default Ember.Object.extend(Validations, {
   *    details: null,
   *
   *    init() {
   *      this._super(...arguments);
   *      let owner = Ember.getOwner(this);
   *      this.set('details', UserDetails.create(owner.ownerInjection()));
   *    }
   *  });
   *  ```
   *
   *  From our `user` model, we can now check any validation propery on the `user-details` model.
   *
   *  ```javascript
   *  get(model, 'validations.attrs.details.isValid')
   *  get(model, 'validations.attrs.details.messages')
   *  ```
   *
   *  @class Belongs To
   *  @module Validators
   *  @extends Base
   */
  exports['default'] = _emberCpValidationsValidatorsBase['default'].extend({
    validate: function validate(value) {
      if (value) {
        if (canInvoke(value, 'then')) {
          return value.then(function (model) {
            return get(model, 'validations');
          });
        } else {
          return get(value, 'validations');
        }
      }

      return true;
    }
  });
});
/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
define('finndis/validators/collection', ['exports', 'ember', 'ember-cp-validations/validators/base'], function (exports, _ember, _emberCpValidationsValidatorsBase) {
  var isArray = _ember['default'].isArray;

  /**
   *  If `true` validates that the given value is a valid collection and will add `<ATTRIUTE>.[]` as a dependent key to the CP. If `false`, validates that the given value is singular. Use this validator if you want validation to occur when the content of your collection changes.
   *
   *  ```javascript
   *  // Examples
   *  validator('collection', true)
   *  validator('collection', false)
   *  validator('collection', {
   *    collection: true,
   *    message: 'must be a collection'
   *  })
   *  ```
   *
   *  @class Collection
   *  @module Validators
   *  @extends Base
   */
  exports['default'] = _emberCpValidationsValidatorsBase['default'].extend({
    buildOptions: function buildOptions(options, defaultOptions) {
      if (typeof options === 'boolean') {
        options = {
          collection: options
        };
      }
      return this._super(options, defaultOptions);
    },

    validate: function validate(value, options) {
      if (options.collection === true && !isArray(value)) {
        return this.createErrorMessage('collection', value, options);
      }

      if (options.collection === false && isArray(value)) {
        return this.createErrorMessage('singular', value, options);
      }

      return true;
    }
  });
});
/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
define('finndis/validators/confirmation', ['exports', 'ember', 'ember-cp-validations/validators/base'], function (exports, _ember, _emberCpValidationsValidatorsBase) {
  var get = _ember['default'].get;
  var isEqual = _ember['default'].isEqual;
  var isNone = _ember['default'].isNone;

  /**
   *  You should use this validator when you have two text fields that should receive exactly the same content. For example, you may want to confirm an email address or a password. This validator doesnt have to be created on an attribute defined in your model. This means that when you save your model, in this case, `verfiedEmail` will not be part of the payload.
   *
   *  ```javascript
   *  // Example
   *  email: validator('format', {
   *    type: 'email'
   *  })
   *  verifiedEmail: validator('confirmation', {
   *    on: 'email',
   *    message: 'do not match',
   *    description: 'Email addresses'
   *  })
   *  ```
   *
   *  @class Confirmation
   *  @module Validators
   *  @extends Base
   */
  exports['default'] = _emberCpValidationsValidatorsBase['default'].extend({
    validate: function validate(value, options, model) {
      if (!isNone(options.on) && !isEqual(value, get(model, options.on))) {
        return this.createErrorMessage('confirmation', value, options);
      }

      return true;
    }
  });
});
/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
define('finndis/validators/date', ['exports', 'ember', 'ember-cp-validations/validators/base'], function (exports, _ember, _emberCpValidationsValidatorsBase) {
  var moment = (self.requirejs.entries['moment'] || self.requirejs.entries['moment/index']) && self.require('moment')['default'];

  if (moment === undefined) {
    throw new Error('MomentJS is required to use the Date validator. The easiest way to install moment.js is to install ember-moment.\nInstallation instructions and documentation can be found at https://github.com/stefanpenner/ember-moment');
  }

  var isEmpty = _ember['default'].isEmpty;

  /**
   *  Validate over a date range. Uses [MomentJS](http://momentjs.com/) for date mathematics and calculations.
   *
   *  -*Note**: MomentJS must be installed to be able to use this validator. The easiest way to do this is to install [ember-moment](https://github.com/stefanpenner/ember-moment)
   *
   *   #### Options
   *  - `allowBlank` (**Boolean**): If true, skips validation if the value is empty
   *  - `before` (**String**): The specified date must be before this date
   *  - `after` (**String**): The specified date must be after this date
   *  - `format` (**String**): Input value date format
   *  - `errorFormat` (**String**): Error output date format. Defaults to `MMM Do, YYYY`
   *
   *  ```javascript
   *  // Example
   *  validator('date', {
   *      after: 'now',
   *      before: '1/1/2020',
   *      format: 'M/D/YYY',
   *      errorFormat: 'M/D/YYY'
   *  })
   *  // If before or after is set to 'now', the value given to the validator will be tested against the current date and time.
   *  ```
   *
   *  @class Date
   *  @module Validators
   *  @extends Base
   */
  exports['default'] = _emberCpValidationsValidatorsBase['default'].extend({

    _parseDate: function _parseDate(dateStr, format) {
      if (dateStr === 'now' || isEmpty(dateStr)) {
        return moment();
      } else {
        return format ? moment(dateStr, format) : moment(new Date(dateStr));
      }
    },

    validate: function validate(value, options) {
      var errorFormat = options.errorFormat || 'MMM Do, YYYY';
      var format = options.format;
      var before = options.before;
      var after = options.after;

      if (options.allowBlank && isEmpty(value)) {
        return true;
      }

      var date = this._parseDate(value, format);

      if (!date.isValid()) {
        return this.createErrorMessage('date', value, options);
      }

      if (format && !moment(value, format, true).isValid()) {
        return this.createErrorMessage('wrongDateFormat', value, options);
      }

      if (before) {
        before = this._parseDate(before, format);
        if (before < date) {
          options.before = before.format(errorFormat);
          return this.createErrorMessage('before', value, options);
        }
      }

      if (after) {
        after = this._parseDate(after, format);
        if (after > date) {
          options.after = after.format(errorFormat);
          return this.createErrorMessage('after', value, options);
        }
      }

      return true;
    }
  });
});
/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
define('finndis/validators/dependent', ['exports', 'ember', 'ember-cp-validations/validators/base'], function (exports, _ember, _emberCpValidationsValidatorsBase) {
  var get = _ember['default'].get;
  var isNone = _ember['default'].isNone;
  var isEmpty = _ember['default'].isEmpty;

  /**
   *  Defines an attribute as valid only if its dependents are valid.
   *
   *   #### Options
   *  - `on` (**Array**): Attributes this field is dependent on
   *
   *  ```javascript
   *  // Example
   *  // Full name will only be valid if firstName and lastName are filled in
   *  validator('dependent', {
   *      on: ['firstName', 'lastName'],
   *  })
   *  ```
   *
   *  @class Dependent
   *  @module Validators
   *  @extends Base
   */
  exports['default'] = _emberCpValidationsValidatorsBase['default'].extend({
    validate: function validate(value, options, model) {
      if (isNone(options) || isNone(model) || isEmpty(Object.keys(options))) {
        return true;
      }

      if (options.allowBlank && isEmpty(value)) {
        return true;
      }

      if (isEmpty(options.on)) {
        return true;
      }

      var dependentValidations = options.on.map(function (dependent) {
        return get(model, 'validations.attrs.' + dependent);
      });
      if (!isEmpty(dependentValidations.filter(function (v) {
        return !get(v, 'isTruelyValid');
      }))) {
        return this.createErrorMessage('invalid', value, options);
      }

      return true;
    }
  });
});
/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
define('finndis/validators/ds-error', ['exports', 'ember', 'ember-cp-validations/validators/base'], function (exports, _ember, _emberCpValidationsValidatorsBase) {
  var DS = self.DS;

  if (typeof self.DS === 'undefined') {
    throw new Error('Ember-Data is required to use the DS Error validator.');
  }

  var get = _ember['default'].get;
  var isNone = _ember['default'].isNone;

  /**
   *  Creates a link between this library and Ember-Data's [DS.Errors](http://emberjs.com/api/data/classes/DS.Errors.html)
   *  to fetch the latest message for the given attribute.
   *
   *  ```javascript
   *  // Examples
   *  validator('ds-error')
   *  ```
   *
   *  @class DS Error
   *  @module Validators
   *  @extends Base
   */
  exports['default'] = _emberCpValidationsValidatorsBase['default'].extend({
    validate: function validate(value, options, model, attribute) {
      var errors = get(model, 'errors');

      if (!isNone(errors) && errors instanceof DS.Errors && errors.has(attribute)) {
        return get(errors.errorsFor(attribute), 'lastObject.message');
      }

      return true;
    }
  });
});
/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
define('finndis/validators/exclusion', ['exports', 'ember', 'ember-cp-validations/validators/base'], function (exports, _ember, _emberCpValidationsValidatorsBase) {
  var typeOf = _ember['default'].typeOf;
  var isEmpty = _ember['default'].isEmpty;

  /**
   *  Validates that the attributes’ values are not included in a given list. All comparisons are done using strict equality so type matters! For range, the value type is checked against both lower and upper bounds for type equality.
   *
   *   #### Options
   *  - `allowBlank` (**Boolean**): If true, skips validation if the value is empty
   *  - `in` (**Array**): The list of values this attribute should not be
   *  - `range` (**Array**): The range in which the attribute's value should not reside in
   *
   *  ```javascript
   *  // Examples
   *  validator('exclusion', {
   *      in: ['Admin', 'Super Admin']
   *  })
   *  validator('exclusion', {
   *      range: [0, 5] // Cannot be between 0 (inclusive) to 5 (inclusive)
   *  })
   *  ```
   *
   *  @class Exclusion
   *  @module Validators
   *  @extends Base
   */
  exports['default'] = _emberCpValidationsValidatorsBase['default'].extend({
    validate: function validate(value, options) {
      var array = options['in'];
      var range = options.range;

      if (isEmpty(Object.keys(options))) {
        return true;
      }

      if (options.allowBlank && isEmpty(value)) {
        return true;
      }

      if (array && array.indexOf(value) !== -1) {
        return this.createErrorMessage('exclusion', value, options);
      }

      if (range && range.length === 2) {
        var min = range[0];
        var max = range[1];
        var equalType = typeOf(value) === typeOf(min) && typeOf(value) === typeOf(max);
        if (equalType && min <= value && value <= max) {
          return this.createErrorMessage('exclusion', value, options);
        }
      }

      return true;
    }
  });
});
/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
define('finndis/validators/format', ['exports', 'ember', 'ember-cp-validations/validators/base'], function (exports, _ember, _emberCpValidationsValidatorsBase) {
  var get = _ember['default'].get;
  var isNone = _ember['default'].isNone;
  var isEmpty = _ember['default'].isEmpty;

  /**
   *  Validate over a predefined or custom regular expression.
   *
   *   #### Options
   *  - `allowBlank` (**Boolean**): If true, skips validation if the value is empty
   *  - `type` (**String**): Can be the one of the following options [`email`, `phone`, `url`]
   *  - `regex` (**RegExp**): The regular expression to test against
   *
   *  ```javascript
   *  // Examples
   *  validator('format', {
   *    type: 'email'
   *  })
   *  validator('format', {
   *    allowBlank: true
   *    type: 'phone'
   *  })
   *  validator('format', {
   *    type: 'url'
   *  })
   *  validator('format', {
   *      regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/,
   *      message: 'Password must include at least one upper case letter, one lower case letter, and a number'
   *  })
   *  ```
   *
   *  If you do not want to use the predefined regex for a specific type, you can do something like this
   *
   *  ```javascript
   *  // Example
   *  validator('format', {
   *    type: 'email',
   *    regex: /My Better Email Regexp/
   *  })
   *  ```
   *  This allows you to still keep the email error message but with your own custom regex.
   *  @class Format
   *  @module Validators
   *  @extends Base
   */
  exports['default'] = _emberCpValidationsValidatorsBase['default'].extend({
    regularExpressions: {
      email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      phone: /^([\+]?1\s*[-\/\.]?\s*)?(\((\d{3})\)|(\d{3}))\s*[-\/\.]?\s*(\d{3})\s*[-\/\.]?\s*(\d{4})\s*(([xX]|[eE][xX][tT]?[\.]?|extension)\s*([#*\d]+))*$/,
      url: /(?:([A-Za-z]+):)?(\/{0,3})[a-zA-Z0-9][a-zA-Z-0-9]*(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-{}]*[\w@?^=%&amp;\/~+#-{}])??/
    },

    buildOptions: function buildOptions() {
      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
      var defaultOptions = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var regularExpressions = get(this, 'regularExpressions');

      if (options.type && !isNone(regularExpressions[options.type]) && isNone(options.regex)) {
        options.regex = regularExpressions[options.type];
      }
      return this._super(options, defaultOptions);
    },

    validate: function validate(value, options) {
      if (isEmpty(Object.keys(options))) {
        return true;
      }

      if (options.allowBlank && isEmpty(value)) {
        return true;
      }

      if (options.regex && !options.regex.test(value)) {
        if (options.type) {
          return this.createErrorMessage(options.type, value, options);
        }
        return this.createErrorMessage('invalid', value, options);
      }

      return true;
    }
  });
});
/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
define('finndis/validators/has-many', ['exports', 'ember', 'ember-cp-validations/validators/base'], function (exports, _ember, _emberCpValidationsValidatorsBase) {
  var canInvoke = _ember['default'].canInvoke;

  /**
   *  Identifies a `has-many` relationship in an Ember Data Model or Ember.Object.
   *  This is used to create a validation collection of the `has-many` validations.
   *
   *  _**Note:** Validations must exist on **all** models/objects_
   *
   *  ### Ember Models
   *
   *  ```javascript
   *  // model/users.js
   *
   *  const Validations = buildValidations({
   *    friends: validator('has-many')
   *  });
   *
   *  export default DS.Model.extend(Validations, {
   *    friends: DS.hasMany('user')
   *  });
   *  ```
   *
   *  ### Ember Objects
   *
   *  ```javascript
   *  // model/users.js
   *
   *  const Validations = buildValidations({
   *    friends: validator('has-many')
   *  });
   *
   *  export default Ember.Object.extend(Validations, {
   *    friends: null
   *  });
   *  ```
   *
   *  From our `user` model, we can now check validation properties on the `friends` attribute.
   *
   *  ```javascript
   *  get(model, 'validations.attrs.friends.isValid')
   *  get(model, 'validations.attrs.friends.messages')
   *  ```
   *
   *  @class Has Many
   *  @module Validators
   *  @extends Base
   */
  exports['default'] = _emberCpValidationsValidatorsBase['default'].extend({
    validate: function validate(value) {
      if (value) {
        if (canInvoke(value, 'then')) {
          return value.then(function (models) {
            return models.map(function (m) {
              return m.get('validations');
            });
          });
        } else {
          return value.map(function (m) {
            return m.get('validations');
          });
        }
      }

      return true;
    }
  });
});
/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
define('finndis/validators/inclusion', ['exports', 'ember', 'ember-cp-validations/validators/base'], function (exports, _ember, _emberCpValidationsValidatorsBase) {
  var typeOf = _ember['default'].typeOf;
  var isEmpty = _ember['default'].isEmpty;

  /**
   *  Validates that the attributes’ values are included in a given list. All comparisons are done using strict equality so type matters! For range, the value type is checked against both lower and upper bounds for type equality.
   *
   *   #### Options
   *  - `allowBlank` (**Boolean**): If true, skips validation if the value is empty
   *  - `in` (**Array**): The list of values this attribute could be
   *  - `range` (**Array**): The range in which the attribute's value should reside in
   *
   *  ```javascript
   *  // Examples
   *  validator('inclusion', {
   *      in: ['User', 'Admin']
   *  })
   *  validator('inclusion', {
   *      range: [0, 5] // Must be between 0 (inclusive) to 5 (inclusive)
   *  })
   *  ```
   *
   *  Because of the strict equality comparisons, you can use this validator in many different ways.
   *
   *  ```javascript
   *  // Examples
   *  validator('inclusion', {
   *      in: ['Admin'] // Input must be equal to 'Admin'
   *  })
   *  validator('inclusion', {
   *      range: [0, Infinity] // Input must be positive number
   *  })
   *  validator('inclusion', {
   *      range: [-Infinity, Infinity] // Input must be a number
   *  })
   *  ```
   *
   *  @class Inclusion
   *  @module Validators
   *  @extends Base
   */
  exports['default'] = _emberCpValidationsValidatorsBase['default'].extend({
    validate: function validate(value, options) {
      var array = options['in'];
      var range = options.range;

      if (isEmpty(Object.keys(options))) {
        return true;
      }

      if (options.allowBlank && isEmpty(value)) {
        return true;
      }

      if (array && array.indexOf(value) === -1) {
        return this.createErrorMessage('inclusion', value, options);
      }

      if (range && range.length === 2) {
        var min = range[0];
        var max = range[1];
        var equalType = typeOf(value) === typeOf(min) && typeOf(value) === typeOf(max);
        if (!equalType || min > value || value > max) {
          return this.createErrorMessage('inclusion', value, options);
        }
      }

      return true;
    }
  });
});
/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
define('finndis/validators/length', ['exports', 'ember', 'ember-cp-validations/validators/base'], function (exports, _ember, _emberCpValidationsValidatorsBase) {
  var get = _ember['default'].get;
  var isNone = _ember['default'].isNone;
  var isEmpty = _ember['default'].isEmpty;

  /**
   *  Validates the length of the attributes’ values.
   *
   *   #### Options
   *  - `allowBlank` (**Boolean**): If true, skips validation if the value is empty
   *  - `is` (**Number**): The exact length the value can be
   *  - `min` (**Number**): The minimum length the value can be
   *  - `max` (**Number**): The maximum length the value can be
   *
   *  ```javascript
   *  // Examples
   *  validator('length', {
   *    is: 15
   *  })
   *  validator('length', {
   *      min: 5,
   *      max: 10
   *  })
   *  ```
   *
   *  @class Length
   *  @module Validators
   *  @extends Base
   */
  exports['default'] = _emberCpValidationsValidatorsBase['default'].extend({
    validate: function validate(value, options) {
      if (isEmpty(Object.keys(options))) {
        return true;
      }

      if (options.allowBlank && isEmpty(value)) {
        return true;
      }

      if (isNone(value)) {
        return true;
      }

      if (!isNone(options.is) && options.is !== get(value, 'length')) {
        return this.createErrorMessage('wrongLength', value, options);
      }

      if (!isNone(options.min) && options.min > get(value, 'length')) {
        return this.createErrorMessage('tooShort', value, options);
      }

      if (!isNone(options.max) && options.max < get(value, 'length')) {
        return this.createErrorMessage('tooLong', value, options);
      }

      return true;
    }
  });
});
/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
define('finndis/validators/messages', ['exports', 'ember-cp-validations/validators/messages'], function (exports, _emberCpValidationsValidatorsMessages) {
  /**
   * Copyright 2016, Yahoo! Inc.
   * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
   */

  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCpValidationsValidatorsMessages['default'];
    }
  });
});
define('finndis/validators/number', ['exports', 'ember', 'ember-cp-validations/validators/base'], function (exports, _ember, _emberCpValidationsValidatorsBase) {
  var isEmpty = _ember['default'].isEmpty;

  /**
   *  Validates that your attributes have only numeric values.
   *
   *   #### Options
   *  - `allowBlank` (**Boolean**): If true, skips validation if the value is empty
   *  - `allowString` (**Boolean**): If true, validator will accept string representation of a number
   *  - `integer` (**Boolean**): Number must be an integer
   *  - `positive` (**Boolean**): Number must be greater than 0
   *  - `odd` (**Boolean**): Number must be odd
   *  - `even` (**Boolean**): Number must be even
   *  - `is` (**Number**): Number must be equal to this value
   *  - `lt` (**Number**): Number must be less than this value
   *  - `lte` (**Number**): Number must be less than or equal to this value
   *  - `gt` (**Number**): Number must be greater than this value
   *  - `gte` (**Number**): Number must be greater than or equal to this value
   *
   *  ```javascript
   *  // Examples
   *  validator('number') // Simple check if the value is a number
   *  validator('number', {
   *      allowString: true,
   *      integer: true,
   *      gt: 5,
   *      lte: 100
   *  })
   *  ```
   *
   *  @class Number
   *  @module Validators
   *  @extends Base
   */
  exports['default'] = _emberCpValidationsValidatorsBase['default'].extend({
    validate: function validate(value, options) {
      var numValue = Number(value);
      var optionKeys = Object.keys(options);

      if (options.allowBlank && isEmpty(value)) {
        return true;
      }

      if (typeof value === 'string' && (isEmpty(value) || !options.allowString)) {
        return this.createErrorMessage('notANumber', value, options);
      }

      if (!this.isNumber(numValue)) {
        return this.createErrorMessage('notANumber', value, options);
      }

      if (options.integer && !this.isInteger(numValue)) {
        return this.createErrorMessage('notAnInteger', value, options);
      }

      for (var i = 0; i < optionKeys.length; i++) {
        var type = optionKeys[i];
        var m = this._validateType(type, options, numValue);
        if (typeof m === 'string') {
          return m;
        }
      }

      return true;
    },

    _validateType: function _validateType(type, options, value) {
      var expected = options[type];
      var actual = value;

      if (type === 'is' && actual !== expected) {
        return this.createErrorMessage('equalTo', value, options);
      } else if (type === 'lt' && actual >= expected) {
        return this.createErrorMessage('lessThan', value, options);
      } else if (type === 'lte' && actual > expected) {
        return this.createErrorMessage('lessThanOrEqualTo', value, options);
      } else if (type === 'gt' && actual <= expected) {
        return this.createErrorMessage('greaterThan', value, options);
      } else if (type === 'gte' && actual < expected) {
        return this.createErrorMessage('greaterThanOrEqualTo', value, options);
      } else if (type === 'positive' && actual < 0) {
        return this.createErrorMessage('positive', value, options);
      } else if (type === 'odd' && actual % 2 === 0) {
        return this.createErrorMessage('odd', value, options);
      } else if (type === 'even' && actual % 2 !== 0) {
        return this.createErrorMessage('even', value, options);
      }

      return true;
    },

    /* Use polyfills instead of Number.isNaN or Number.isInteger to support IE & Safari */

    isNumber: function isNumber(value) {
      return typeof value === "number" && !isNaN(value);
    },

    isInteger: function isInteger(value) {
      return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
    }
  });
});
/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
define('finndis/validators/presence', ['exports', 'ember', 'ember-cp-validations/validators/base'], function (exports, _ember, _emberCpValidationsValidatorsBase) {
  var get = _ember['default'].get;
  var isEmpty = _ember['default'].isEmpty;

  /**
   *  If `true` validates that the given value is not empty, if `false`, validates that the given value is empty.
   *
   *  ```javascript
   *  // Examples
   *  validator('presence', true)
   *  validator('presence', false)
   *  validator('presence', {
   *    presence: true,
   *    message: 'should not be empty'
   *  })
   *  ```
   *
   *  @class Presence
   *  @module Validators
   *  @extends Base
   */
  exports['default'] = _emberCpValidationsValidatorsBase['default'].extend({
    /**
     * Normalized options passed in.
     * ```js
     * validator('presence', true)
     * // Becomes
     * validator('presence', {
     *   presence: true
     * })
     * ```
     * @method buildOptions
     * @param  {Object}     options
     * @param  {Object}     defaultOptions
     * @return {Object}
     */
    buildOptions: function buildOptions(options, defaultOptions) {
      if (typeof options === 'boolean') {
        options = {
          presence: options
        };
      }
      return this._super(options, defaultOptions);
    },

    validate: function validate(value, options) {
      if (options.presence === true && !this._isPresent(value)) {
        return this.createErrorMessage('blank', value, options);
      }

      if (options.presence === false && this._isPresent(value)) {
        return this.createErrorMessage('present', value, options);
      }

      return true;
    },

    /**
     * Handle presence of ember proxy based instances
     */
    _isPresent: function _isPresent(value) {
      if (value instanceof _ember['default'].ObjectProxy || value instanceof _ember['default'].ArrayProxy) {
        return this._isPresent(get(value, 'content'));
      }
      return !isEmpty(value);
    }
  });
});
/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('finndis/config/environment', ['ember'], function(Ember) {
  var prefix = 'finndis';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("finndis/app")["default"].create({"LOG_ACTIVE_GENERATION":true,"LOG_VIEW_LOOKUPS":true,"name":"finndis","version":"0.0.0+4ccfd60b"});
}

/* jshint ignore:end */
//# sourceMappingURL=finndis.map