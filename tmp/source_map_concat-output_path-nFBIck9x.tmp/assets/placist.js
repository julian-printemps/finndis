"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('finndis/adapters/application', ['exports', 'ember-data', 'ember-simple-auth/mixins/data-adapter-mixin'], function (exports, _emberData, _emberSimpleAuthMixinsDataAdapterMixin) {
  exports['default'] = _emberData['default'].JSONAPIAdapter.extend(_emberSimpleAuthMixinsDataAdapterMixin['default'], {
    authorizer: 'authorizer:application'
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

  exports['default'] = App;
});
define('finndis/authenticators/devise', ['exports', 'ember-simple-auth/authenticators/devise'], function (exports, _emberSimpleAuthAuthenticatorsDevise) {
  exports['default'] = _emberSimpleAuthAuthenticatorsDevise['default'].extend({
    // serverTokenEndpoint: 'http://localhost:3000/users/sign_in'
  });
});
define('finndis/authenticators/torii1', ['exports', 'ember', 'ember-simple-auth/authenticators/torii', 'ic-ajax'], function (exports, _ember, _emberSimpleAuthAuthenticatorsTorii, _icAjax) {
  var RSVP = _ember['default'].RSVP;
  exports['default'] = _emberSimpleAuthAuthenticatorsTorii['default'].extend({
    torii: _ember['default'].inject.service(),

    authenticate: function authenticate() {
      var _this = this,
          _arguments = arguments;

      return new RSVP.Promise(function (resolve, reject) {
        _this._super.apply(_this, _arguments).then(function (data) {

          (0, _icAjax['default'])({
            url: '/users/auth/twitter/callback',
            type: 'POST',
            dataType: 'json',
            data: { 'code': data.authorizationCode }
          }).then(function (response) {
            resolve({
              // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
              access_token: response.access_token,
              // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
              provider: response.provider
            });
          }, reject);
        }, reject);
      });
    }
  });
});
define('finndis/authenticators/torii2', ['exports', 'ember', 'ember-simple-auth/authenticators/torii', 'ic-ajax'], function (exports, _ember, _emberSimpleAuthAuthenticatorsTorii, _icAjax) {
  var RSVP = _ember['default'].RSVP;
  exports['default'] = _emberSimpleAuthAuthenticatorsTorii['default'].extend({
    torii: _ember['default'].inject.service(),

    authenticate: function authenticate() {
      var _this = this,
          _arguments = arguments;

      return new RSVP.Promise(function (resolve, reject) {
        _this._super.apply(_this, _arguments).then(function (data) {

          (0, _icAjax['default'])({
            url: 'http://localhost:4200/users/auth/google_oauth2/callback',
            type: 'POST',
            dataType: 'json',
            data: { 'code': data.authorizationCode }
          }).then(function (response) {
            resolve({
              // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
              access_token: response.access_token,
              // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
              provider: response.provider
            });
          }, reject);
        }, reject);
      });
    }
  });
});
define('finndis/authorizers/application', ['exports', 'ember-simple-auth/authorizers/oauth2-bearer'], function (exports, _emberSimpleAuthAuthorizersOauth2Bearer) {
  exports['default'] = _emberSimpleAuthAuthorizersOauth2Bearer['default'].extend();
});
define('finndis/authorizers/devise', ['exports', 'ember-simple-auth/authorizers/devise'], function (exports, _emberSimpleAuthAuthorizersDevise) {
  exports['default'] = _emberSimpleAuthAuthorizersDevise['default'].extend({});
});
define('finndis/component-tests/star-rating', ['exports', 'ember-cli-star-rating/component-tests/star-rating'], function (exports, _emberCliStarRatingComponentTestsStarRating) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliStarRatingComponentTestsStarRating['default'];
    }
  });
});
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
define('finndis/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'finndis/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _finndisConfigEnvironment) {

  var name = _finndisConfigEnvironment['default'].APP.name;
  var version = _finndisConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
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
define('finndis/components/labeled-radio-button', ['exports', 'ember-radio-button/components/labeled-radio-button'], function (exports, _emberRadioButtonComponentsLabeledRadioButton) {
  exports['default'] = _emberRadioButtonComponentsLabeledRadioButton['default'];
});
define('finndis/components/login-form', ['exports', 'ember'], function (exports, _ember) {
  var service = _ember['default'].inject.service;
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
    session: _ember['default'].inject.service('session')
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
define('finndis/components/radio-button-input', ['exports', 'ember-radio-button/components/radio-button-input'], function (exports, _emberRadioButtonComponentsRadioButtonInput) {
  exports['default'] = _emberRadioButtonComponentsRadioButtonInput['default'];
});
define('finndis/components/radio-button', ['exports', 'ember-radio-button/components/radio-button'], function (exports, _emberRadioButtonComponentsRadioButton) {
  exports['default'] = _emberRadioButtonComponentsRadioButton['default'];
});
define('finndis/components/signup-form', ['exports', 'ember'], function (exports, _ember) {
  var service = _ember['default'].inject.service;
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
        var self = this;
        var model = this.get('model');
        var firstname = model.get('firstname');
        var lastname = model.get('lastname');
        var password = model.get('password');
        var email = model.get('email');

        var newUser = this.get('store').createRecord('user', {
          email: email,
          password: password,
          firstname: firstname,
          lastname: lastname
        });

        newUser.save();

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
define('finndis/controllers/application', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service('session'),
    sessionAccount: _ember['default'].inject.service('session-account'),

    actions: {
      transitionToLoginRoute: function transitionToLoginRoute() {
        this.transitionToRoute('login');
      }
    }
  });
});
define('finndis/controllers/array', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
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
define('finndis/controllers/label', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service('session'),
    sessionAccount: _ember['default'].inject.service('session-account'),
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
    session: _ember['default'].inject.service('session'),
    sessionAccount: _ember['default'].inject.service('session-account'),

    labelsList: _ember['default'].computed(function () {
      var user = this.store.peekRecord('user', this.get('sessionAccount.user.id'));
      return user.get('labels');
    })
  });
});
define('finndis/controllers/login', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service('session'),
    sessionAccount: _ember['default'].inject.service('session-account'),
    signupPanelClass: '',

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
    sessionAccount: _ember['default'].inject.service('session-account'),

    isEditing: false,
    labelPanelDisplayed: '',
    mapLat: _ember['default'].computed('model', function () {
      return this.get('model.locationlat');
    }),
    mapLng: _ember['default'].computed('model', function () {
      return this.get('model.locationlng');
    }),

    labelsList: _ember['default'].computed('model', function () {
      this.send('setPlaces');
      return this.store.peekRecord('user', this.get('sessionAccount.user.id'));
    }),

    hasUrlOrWebsite: _ember['default'].computed(function () {
      if (this.get('model.url') !== '' || this.get('model.website') !== '') {
        return true;
      } else {
        return false;
      }
    }),

    hasPhoneOrAddress: _ember['default'].computed(function () {
      if (this.get('model.longaddress') !== '' || this.get('model.phone') !== '') {
        return true;
      } else {
        return false;
      }
    }),

    actions: {

      setPlaces: function setPlaces() {
        var self = this;
        var place = this.get('model');
        this.store.findRecord('user', this.get('sessionAccount.user.id')).then(function (user) {
          self.set('labelValue', place.get("label.id"));
        });
      },

      showAddLabel: function showAddLabel() {
        this.set('labelPanelDisplayed', 'show');
      },

      closeMenuPanel: function closeMenuPanel() {
        this.set('labelPanelDisplayed', '');
      },

      toggleEdition: function toggleEdition() {
        this.set('isEditing', true);
      },

      updateLabel: function updateLabel(labelValue) {
        var self = this;
        this.get('store').findRecord('label', labelValue).then(function (label) {
          self.set('model.label', label);
          self.get('model').save();
        });
      },

      setRating: function setRating(params) {
        var place = this.get('model');
        var model = params.item;
        var rating = params.rating;

        place.set('rating', rating);
      },

      savePlace: function savePlace(model) {
        var self = this;

        var isAddressSet = function isAddressSet(elem) {
          if (elem !== '') {
            return true;
          } else return false;
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

      deletePlace: function deletePlace(model) {
        model.deleteRecord();
        model.get('isDeleted');
        model.save();
        this.set('isEditing', false);
        this.transitionToRoute('places');
      }

    }
  });
});
define('finndis/controllers/places', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service('session'),
    sessionAccount: _ember['default'].inject.service('session-account'),

    userPlaces: _ember['default'].computed(function () {
      return this.get('sessionAccount.user.places');
    }),

    sortProps: ['numericId:desc'],
    sortedPlaces: _ember['default'].computed.sort('userPlaces', 'sortProps'),

    labelsList: _ember['default'].computed(function () {
      var user = this.store.peekRecord('user', this.get('sessionAccount.user.id'));
      return user.get('labels');
    })

  });
});
define('finndis/controllers/users', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service('session'),
    sessionAccount: _ember['default'].inject.service('session-account'),

    currentUser: _ember['default'].computed(function () {
      return this.get('sessionAccount.user.id');
    })

  });
});
define('finndis/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('finndis/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('finndis/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'finndis/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _finndisConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_finndisConfigEnvironment['default'].APP.name, _finndisConfigEnvironment['default'].APP.version)
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
define('finndis/initializers/initialize-torii-callback', ['exports', 'torii/redirect-handler'], function (exports, _toriiRedirectHandler) {
  exports['default'] = {
    name: 'torii-callback',
    before: 'torii',
    initialize: function initialize(application) {
      if (arguments[1]) {
        // Ember < 2.1
        application = arguments[1];
      }
      application.deferReadiness();
      _toriiRedirectHandler['default'].handle(window)['catch'](function () {
        application.advanceReadiness();
      });
    }
  };
});
define('finndis/initializers/initialize-torii-session', ['exports', 'torii/configuration', 'torii/bootstrap/session'], function (exports, _toriiConfiguration, _toriiBootstrapSession) {
  exports['default'] = {
    name: 'torii-session',
    after: 'torii',

    initialize: function initialize(application) {
      if (arguments[1]) {
        // Ember < 2.1
        application = arguments[1];
      }
      if (_toriiConfiguration['default'].sessionServiceName) {
        (0, _toriiBootstrapSession['default'])(application, _toriiConfiguration['default'].sessionServiceName);

        var sessionFactoryName = 'service:' + _toriiConfiguration['default'].sessionServiceName;
        application.inject('adapter', _toriiConfiguration['default'].sessionServiceName, sessionFactoryName);
      }
    }
  };
});
define('finndis/initializers/initialize-torii', ['exports', 'torii/bootstrap/torii', 'torii/configuration'], function (exports, _toriiBootstrapTorii, _toriiConfiguration) {

  var initializer = {
    name: 'torii',
    initialize: function initialize(application) {
      if (arguments[1]) {
        // Ember < 2.1
        application = arguments[1];
      }
      (0, _toriiBootstrapTorii['default'])(application);
      application.inject('route', 'torii', 'service:torii');
    }
  };

  if (window.DS) {
    initializer.after = 'store';
  }

  exports['default'] = initializer;
});
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
define('finndis/instance-initializers/setup-routes', ['exports', 'torii/configuration', 'torii/bootstrap/routing', 'torii/router-dsl-ext'], function (exports, _toriiConfiguration, _toriiBootstrapRouting, _toriiRouterDslExt) {
  exports['default'] = {
    name: 'torii-setup-routes',
    initialize: function initialize(applicationInstance, registry) {
      if (_toriiConfiguration['default'].sessionServiceName) {
        var router = applicationInstance.get('router');
        var setupRoutes = function setupRoutes() {
          var authenticatedRoutes = router.router.authenticatedRoutes;
          var hasAuthenticatedRoutes = !Ember.isEmpty(authenticatedRoutes);
          if (hasAuthenticatedRoutes) {
            (0, _toriiBootstrapRouting['default'])(applicationInstance, authenticatedRoutes);
          }
          router.off('willTransition', setupRoutes);
        };
        router.on('willTransition', setupRoutes);
      }
    }
  };
});
define('finndis/instance-initializers/walk-providers', ['exports', 'torii/configuration', 'torii/lib/container-utils'], function (exports, _toriiConfiguration, _toriiLibContainerUtils) {
  exports['default'] = {
    name: 'torii-walk-providers',
    initialize: function initialize(applicationInstance) {
      // Walk all configured providers and eagerly instantiate
      // them. This gives providers with initialization side effects
      // like facebook-connect a chance to load up assets.
      for (var key in _toriiConfiguration['default'].providers) {
        if (_toriiConfiguration['default'].providers.hasOwnProperty(key)) {
          (0, _toriiLibContainerUtils.lookup)(applicationInstance, 'torii-provider:' + key);
        }
      }
    }
  };
});
define('finndis/models/label', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    name: _emberData['default'].attr('string'),
    user: _emberData['default'].belongsTo('user'),
    places: _emberData['default'].hasMany('place', { async: true }),
    isEditing: _emberData['default'].attr('boolean', { defaultValue: false })
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
    user: _emberData['default'].belongsTo('user'),
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
    this.route('places', { path: '/' });
    this.route('place', { path: '/:place_id' });
    this.route('add-place', { path: '/add' });
    this.route('labels');
    this.route('label', { path: 'labels/:label_id' });
    this.route('users');
    this.route('search');
    this.route('edit-labels', { path: 'labels/edit' });
    this.route('login');
    this.route('dashboard');
  });

  exports['default'] = Router;
});
define('finndis/routes/add-place', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
    session: _ember['default'].inject.service('session'),
    sessionAccount: _ember['default'].inject.service('session-account'),

    resetController: function resetController(controller, isExiting, transition) {
      if (isExiting) {
        controller.set('isEditing', false);
        controller.set('labelPanelDisplayed', '');
      }
    },

    model: function model() {
      return this.store.createRecord('place');
    }
  });
});
define('finndis/routes/application', ['exports', 'ember', 'ember-simple-auth/mixins/application-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsApplicationRouteMixin) {
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsApplicationRouteMixin['default'], {
    session: _ember['default'].inject.service('session'),
    sessionAccount: _ember['default'].inject.service('session-account'),

    beforeModel: function beforeModel() {
      return this._loadCurrentUser();
    },

    sessionAuthenticated: function sessionAuthenticated() {
      var _this = this;

      this._super.apply(this, arguments);
      this._loadCurrentUser()['catch'](function () {
        return _this.get('session').invalidate();
      });
    },

    _loadCurrentUser: function _loadCurrentUser() {
      return this.get('sessionAccount').loadCurrentUser();
    }
  });
});
define('finndis/routes/dashboard', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
    session: _ember['default'].inject.service('session'),
    sessionAccount: _ember['default'].inject.service('session-account'),

    model: function model() {
      return this.get('sessionAccount');
    },

    actions: {
      logout: function logout() {
        this.get('session').invalidate();
      }
    }
  });
});
define('finndis/routes/edit-labels', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
    session: _ember['default'].inject.service('session'),
    sessionAccount: _ember['default'].inject.service('session-account')
  });
});
define('finndis/routes/label', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
    session: _ember['default'].inject.service('session'),
    sessionAccount: _ember['default'].inject.service('session-account'),
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
    session: _ember['default'].inject.service('session'),
    sessionAccount: _ember['default'].inject.service('session-account'),

    model: function model() {
      return this.store.peekRecord('user', this.get('sessionAccount.user.id'));
    }
  });
});
define('finndis/routes/login', ['exports', 'ember', 'ember-simple-auth/mixins/unauthenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsUnauthenticatedRouteMixin) {
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsUnauthenticatedRouteMixin['default'], {

    model: function model() {
      return this.store.createRecord('user');
    }
  });
});
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
define('finndis/routes/places', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
    session: _ember['default'].inject.service('session'),
    sessionAccount: _ember['default'].inject.service('session-account')
  });
});
define('finndis/routes/search', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
    session: _ember['default'].inject.service('session'),
    sessionAccount: _ember['default'].inject.service('session-account'),

    model: function model() {
      return this.store.findRecord('user', this.get('sessionAccount.user.id'));
    }
  });
});
define('finndis/routes/users', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
    session: _ember['default'].inject.service('session'),
    sessionAccount: _ember['default'].inject.service('session-account'),

    model: function model() {
      return this.store.findRecord('user', this.get('sessionAccount.user.id'));
    }
  });
});
define("finndis/serializers/application", ["exports", "ember-data"], function (exports, _emberData) {
  exports["default"] = _emberData["default"].JSONAPISerializer.extend({

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
define('finndis/services/session-account', ['exports', 'ember'], function (exports, _ember) {
  var service = _ember['default'].inject.service;
  var RSVP = _ember['default'].RSVP;
  exports['default'] = _ember['default'].Service.extend({
    session: service(),
    store: service(),

    userPlaces: '',
    sortProps: ['numericId:desc'],
    sortedPlaces: _ember['default'].computed.sort('userPlaces', 'sortProps'),

    loadCurrentUser: function loadCurrentUser() {
      var _this = this;

      return new RSVP.Promise(function (resolve, reject) {
        var userId = _this.get('session.data.authenticated.id');

        console.log('Session account');
        console.log(_this.get('session.data.authenticated'));

        if (!_ember['default'].isEmpty(userId)) {
          return _this.get('store').findRecord('user', userId).then(function (user) {
            _this.set('user', user);
            _this.set('userPlaces', user.get('places'));
            resolve();
          }, reject);
        } else {
          resolve();
        }
      });
    }
  });
});
define('finndis/services/session', ['exports', 'ember-simple-auth/services/session'], function (exports, _emberSimpleAuthServicesSession) {
  exports['default'] = _emberSimpleAuthServicesSession['default'];
});
define('finndis/session-stores/application', ['exports', 'ember-simple-auth/session-stores/adaptive'], function (exports, _emberSimpleAuthSessionStoresAdaptive) {
  exports['default'] = _emberSimpleAuthSessionStoresAdaptive['default'].extend();
});
define("finndis/templates/add-place", ["exports"], function (exports) {
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
              "column": 14
            },
            "end": {
              "line": 41,
              "column": 14
            }
          },
          "moduleName": "finndis/templates/add-place.hbs"
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
          var el2 = dom.createTextNode("\n                  ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("label");
          dom.setAttribute(el2, "class", "label--listitem--label");
          var el3 = dom.createTextNode("\n                    ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "label--listitem label-editor collapse align-middle row");
          var el4 = dom.createTextNode("\n                      ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          dom.setAttribute(el4, "class", "label--icon-holder small-1 columns");
          var el5 = dom.createTextNode("\n                        ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("i");
          dom.setAttribute(el5, "class", "label--icon fa fa-tag");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n                      ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n                      ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          dom.setAttribute(el4, "class", "small-10 columns");
          var el5 = dom.createTextNode("\n                        ");
          dom.appendChild(el4, el5);
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n                      ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n                      ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          dom.setAttribute(el4, "class", "label--icon-holder small-1 columns");
          var el5 = dom.createTextNode("\n");
          dom.appendChild(el4, el5);
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
          var element2 = dom.childAt(fragment, [1, 1, 1]);
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(dom.childAt(element2, [3]), 1, 1);
          morphs[1] = dom.createMorphAt(dom.childAt(element2, [5]), 2, 2);
          return morphs;
        },
        statements: [["content", "label.name", ["loc", [null, [26, 24], [26, 38]]]], ["inline", "radio-button", [], ["id", ["subexpr", "@mut", [["get", "label.id", ["loc", [null, [32, 29], [32, 37]]]]], [], []], "value", ["subexpr", "@mut", [["get", "label.id", ["loc", [null, [33, 32], [33, 40]]]]], [], []], "groupValue", ["subexpr", "@mut", [["get", "labelValue", ["loc", [null, [34, 37], [34, 47]]]]], [], []], "changed", "addLabel", "name", "label"], ["loc", [null, [31, 24], [36, 40]]]]],
        locals: ["label"],
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
              "line": 61,
              "column": 18
            },
            "end": {
              "line": 65,
              "column": 18
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
          var el1 = dom.createTextNode("                    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "error");
          var el2 = dom.createTextNode("\n                      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
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
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
          return morphs;
        },
        statements: [["inline", "get", [["subexpr", "get", [["get", "model.validations.attrs", []], "name"], [], []], "message"], [], ["loc", [null, [63, 22], [63, 54]]]]],
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
              "line": 102,
              "column": 26
            },
            "end": {
              "line": 106,
              "column": 26
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
          var el1 = dom.createTextNode("                            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "error");
          var el2 = dom.createTextNode("\n                              ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n                            ");
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
        statements: [["inline", "get", [["subexpr", "get", [["get", "model.validations.attrs", []], "website"], [], []], "message"], [], ["loc", [null, [104, 30], [104, 65]]]]],
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
              "line": 119,
              "column": 26
            },
            "end": {
              "line": 123,
              "column": 26
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
          var el1 = dom.createTextNode("                            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "error");
          var el2 = dom.createTextNode("\n                              ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n                            ");
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
        statements: [["inline", "get", [["subexpr", "get", [["get", "model.validations.attrs", []], "phone"], [], []], "message"], [], ["loc", [null, [121, 30], [121, 63]]]]],
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
              "line": 125,
              "column": 24
            },
            "end": {
              "line": 127,
              "column": 24
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
          var el1 = dom.createTextNode("                            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("span");
          dom.setAttribute(el1, "class", "error errorForValidation");
          var el2 = dom.createElement("i");
          dom.setAttribute(el2, "class", "fa fa-exclamation-circle");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode(" ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 2, 2);
          return morphs;
        },
        statements: [["content", "errors.newFirstname", ["loc", [null, [126, 109], [126, 132]]]]],
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
                  "line": 168,
                  "column": 26
                },
                "end": {
                  "line": 170,
                  "column": 26
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
            statements: [["element", "action", [["get", "set", ["loc", [null, [169, 71], [169, 74]]]], ["get", "star.rating", ["loc", [null, [169, 75], [169, 86]]]]], [], ["loc", [null, [169, 62], [169, 88]]]]],
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
                  "line": 170,
                  "column": 26
                },
                "end": {
                  "line": 172,
                  "column": 26
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
            statements: [["element", "action", [["get", "set", ["loc", [null, [171, 73], [171, 76]]]], ["get", "star.rating", ["loc", [null, [171, 77], [171, 88]]]]], [], ["loc", [null, [171, 64], [171, 90]]]]],
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
                "line": 167,
                "column": 24
              },
              "end": {
                "line": 173,
                "column": 24
              }
            },
            "moduleName": "finndis/templates/add-place.hbs"
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
          statements: [["block", "if", [["get", "star.full", ["loc", [null, [168, 32], [168, 41]]]]], [], 0, 1, ["loc", [null, [168, 26], [172, 33]]]]],
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
              "line": 166,
              "column": 22
            },
            "end": {
              "line": 174,
              "column": 22
            }
          },
          "moduleName": "finndis/templates/add-place.hbs"
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
        statements: [["block", "each", [["get", "stars", ["loc", [null, [167, 32], [167, 37]]]]], [], 0, null, ["loc", [null, [167, 24], [173, 33]]]]],
        locals: ["stars", "set"],
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
            "line": 193,
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
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "medium-8 medium-offset-2 columns");
        var el3 = dom.createTextNode("\n\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("form");
        dom.setAttribute(el4, "class", "add-label--form");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "row");
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "back-button--holder small-2 columns");
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("a");
        var el8 = dom.createElement("i");
        dom.setAttribute(el8, "class", "back-button fa fa-arrow-left");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n          ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
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
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
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
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("a");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("form");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "edition row");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "columns");
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "place--holder");
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("article");
        dom.setAttribute(el7, "class", "place");
        var el8 = dom.createTextNode("\n              ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("header");
        dom.setAttribute(el8, "class", "place--header");
        var el9 = dom.createTextNode("\n                ");
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
        var el9 = dom.createTextNode("\n\n                ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("h2");
        dom.setAttribute(el9, "class", "place--title");
        var el10 = dom.createTextNode("\n                  ");
        dom.appendChild(el9, el10);
        var el10 = dom.createComment("");
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("\n");
        dom.appendChild(el9, el10);
        var el10 = dom.createComment("");
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("\n");
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("                ");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("i");
        dom.setAttribute(el9, "class", "place--labels--icon fa fa-tag");
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("ul");
        dom.setAttribute(el9, "class", "place--labels clearfix");
        var el10 = dom.createTextNode("\n                  ");
        dom.appendChild(el9, el10);
        var el10 = dom.createElement("li");
        dom.setAttribute(el10, "class", "place--labelitem");
        var el11 = dom.createComment("");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("\n                  ");
        dom.appendChild(el9, el10);
        var el10 = dom.createElement("li");
        dom.setAttribute(el10, "class", "place--labelitem");
        var el11 = dom.createTextNode("\n                    ");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("i");
        dom.setAttribute(el11, "class", "place--add--icon fa fa-plus");
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n                  ");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("\n                ");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n              ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n              ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("main");
        dom.setAttribute(el8, "class", "place--main");
        var el9 = dom.createTextNode("\n                ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("div");
        dom.setAttribute(el9, "class", "place--info--holder align-middle collapse row");
        var el10 = dom.createTextNode("\n");
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("                  ");
        dom.appendChild(el9, el10);
        var el10 = dom.createElement("div");
        dom.setAttribute(el10, "class", "small-12 columns");
        var el11 = dom.createTextNode("\n                    ");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("div");
        dom.setAttribute(el11, "class", "row place--address");
        var el12 = dom.createTextNode("\n                      ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("div");
        dom.setAttribute(el12, "class", "small-12 medium-6 columns");
        var el13 = dom.createTextNode("\n                        ");
        dom.appendChild(el12, el13);
        var el13 = dom.createElement("a");
        dom.setAttribute(el13, "class", "button expanded");
        var el14 = dom.createElement("i");
        dom.setAttribute(el14, "class", "fa fa-street-view");
        dom.appendChild(el13, el14);
        var el14 = dom.createTextNode("Geolocate me");
        dom.appendChild(el13, el14);
        dom.appendChild(el12, el13);
        var el13 = dom.createTextNode("\n                      ");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n                      ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("div");
        dom.setAttribute(el12, "class", "small-12 medium-6 columns");
        var el13 = dom.createTextNode("\n                        ");
        dom.appendChild(el12, el13);
        var el13 = dom.createComment("");
        dom.appendChild(el12, el13);
        var el13 = dom.createTextNode("\n                      ");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n                    ");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n                  ");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("\n");
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("                ");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n\n                ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("div");
        dom.setAttribute(el9, "class", "place--info--holder row");
        var el10 = dom.createTextNode("\n                  ");
        dom.appendChild(el9, el10);
        var el10 = dom.createElement("div");
        dom.setAttribute(el10, "class", "columns small-12 medium-6");
        var el11 = dom.createTextNode("\n                    ");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("div");
        dom.setAttribute(el11, "class", "place--website align-middle row");
        var el12 = dom.createTextNode("\n                      ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("div");
        dom.setAttribute(el12, "class", "place--section-icon medium-1 columns");
        var el13 = dom.createTextNode("\n                        ");
        dom.appendChild(el12, el13);
        var el13 = dom.createElement("i");
        dom.setAttribute(el13, "class", "place--main--icon fa fa-globe");
        dom.appendChild(el12, el13);
        var el13 = dom.createTextNode("\n                      ");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n                      ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("div");
        dom.setAttribute(el12, "class", "medium-11 columns");
        var el13 = dom.createTextNode("\n                        ");
        dom.appendChild(el12, el13);
        var el13 = dom.createElement("label");
        var el14 = dom.createTextNode("Website\n                          ");
        dom.appendChild(el13, el14);
        var el14 = dom.createComment("");
        dom.appendChild(el13, el14);
        var el14 = dom.createTextNode("\n");
        dom.appendChild(el13, el14);
        var el14 = dom.createComment("");
        dom.appendChild(el13, el14);
        var el14 = dom.createTextNode("                        ");
        dom.appendChild(el13, el14);
        dom.appendChild(el12, el13);
        var el13 = dom.createTextNode("\n                      ");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n                    ");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n                  ");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("\n                  ");
        dom.appendChild(el9, el10);
        var el10 = dom.createElement("div");
        dom.setAttribute(el10, "class", "columns small-12 medium-6");
        var el11 = dom.createTextNode("\n                    ");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("div");
        dom.setAttribute(el11, "class", "place--phone align-middle row");
        var el12 = dom.createTextNode("\n                      ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("div");
        dom.setAttribute(el12, "class", "place--section-icon medium-1 columns");
        var el13 = dom.createTextNode("\n                        ");
        dom.appendChild(el12, el13);
        var el13 = dom.createElement("i");
        dom.setAttribute(el13, "class", "place--main--icon fa fa-phone");
        dom.appendChild(el12, el13);
        var el13 = dom.createTextNode("\n                      ");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n                      ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("div");
        dom.setAttribute(el12, "class", "medium-11 columns");
        var el13 = dom.createTextNode("\n                        ");
        dom.appendChild(el12, el13);
        var el13 = dom.createElement("label");
        var el14 = dom.createTextNode("Phone number\n                          ");
        dom.appendChild(el13, el14);
        var el14 = dom.createComment("");
        dom.appendChild(el13, el14);
        var el14 = dom.createTextNode("\n");
        dom.appendChild(el13, el14);
        var el14 = dom.createComment("");
        dom.appendChild(el13, el14);
        var el14 = dom.createTextNode("                        ");
        dom.appendChild(el13, el14);
        dom.appendChild(el12, el13);
        var el13 = dom.createTextNode("\n");
        dom.appendChild(el12, el13);
        var el13 = dom.createComment("");
        dom.appendChild(el12, el13);
        var el13 = dom.createTextNode("                      ");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n                    ");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n                  ");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("\n                ");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n\n                ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("div");
        dom.setAttribute(el9, "class", "place--info--holder row");
        var el10 = dom.createTextNode("\n                  ");
        dom.appendChild(el9, el10);
        var el10 = dom.createElement("div");
        dom.setAttribute(el10, "class", "columns medium-6");
        var el11 = dom.createTextNode("\n                    ");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("div");
        dom.setAttribute(el11, "class", "place--phone align-middle row");
        var el12 = dom.createTextNode("\n                      ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("div");
        dom.setAttribute(el12, "class", "place--section-icon medium-1 columns");
        var el13 = dom.createTextNode("\n                        ");
        dom.appendChild(el12, el13);
        var el13 = dom.createElement("i");
        dom.setAttribute(el13, "class", "place--main--icon fa fa-usd");
        dom.appendChild(el12, el13);
        var el13 = dom.createTextNode("\n                      ");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n                      ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("div");
        dom.setAttribute(el12, "class", "medium-11 columns");
        var el13 = dom.createTextNode("\n                        ");
        dom.appendChild(el12, el13);
        var el13 = dom.createElement("label");
        var el14 = dom.createTextNode("Price range\n                          ");
        dom.appendChild(el13, el14);
        var el14 = dom.createComment("");
        dom.appendChild(el13, el14);
        var el14 = dom.createTextNode("\n                        ");
        dom.appendChild(el13, el14);
        dom.appendChild(el12, el13);
        var el13 = dom.createTextNode("\n                      ");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n                    ");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n                  ");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("\n                ");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n\n                ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("div");
        dom.setAttribute(el9, "class", "place--info--holder row");
        var el10 = dom.createTextNode("\n                  ");
        dom.appendChild(el9, el10);
        var el10 = dom.createElement("div");
        dom.setAttribute(el10, "class", "columns");
        var el11 = dom.createTextNode("\n                    ");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("div");
        dom.setAttribute(el11, "class", "place--phone align-middle row");
        var el12 = dom.createTextNode("\n                      ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("div");
        dom.setAttribute(el12, "class", "place--section-icon medium-1 columns");
        var el13 = dom.createTextNode("\n                        ");
        dom.appendChild(el12, el13);
        var el13 = dom.createElement("i");
        dom.setAttribute(el13, "class", "place--main--icon fa fa-info");
        dom.appendChild(el12, el13);
        var el13 = dom.createTextNode("\n                      ");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n                      ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("div");
        dom.setAttribute(el12, "class", "medium-11 columns");
        var el13 = dom.createTextNode("\n                        ");
        dom.appendChild(el12, el13);
        var el13 = dom.createElement("label");
        var el14 = dom.createTextNode("Description\n                          ");
        dom.appendChild(el13, el14);
        var el14 = dom.createComment("");
        dom.appendChild(el13, el14);
        var el14 = dom.createTextNode("\n                        ");
        dom.appendChild(el13, el14);
        dom.appendChild(el12, el13);
        var el13 = dom.createTextNode("\n                      ");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n                    ");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n                  ");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("\n                ");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n\n                ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("div");
        dom.setAttribute(el9, "class", "place--info--holder row");
        var el10 = dom.createTextNode("\n                  ");
        dom.appendChild(el9, el10);
        var el10 = dom.createElement("div");
        dom.setAttribute(el10, "class", "columns");
        var el11 = dom.createTextNode("\n                    ");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("div");
        dom.setAttribute(el11, "class", "place--rating");
        var el12 = dom.createTextNode("\n");
        dom.appendChild(el11, el12);
        var el12 = dom.createComment("");
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("                    ");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n                  ");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("\n                ");
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
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "place--info--holder row");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "columns");
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("button");
        dom.setAttribute(el6, "type", "submit");
        dom.setAttribute(el6, "class", "button expanded");
        var el7 = dom.createTextNode("Add this place");
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
        var el3 = dom.createTextNode("\n");
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
        var element3 = dom.childAt(fragment, [0, 1]);
        var element4 = dom.childAt(element3, [2]);
        var element5 = dom.childAt(element4, [1]);
        var element6 = dom.childAt(element5, [1]);
        var element7 = dom.childAt(element6, [1, 1]);
        var element8 = dom.childAt(element3, [4]);
        var element9 = dom.childAt(element3, [8]);
        var element10 = dom.childAt(element9, [1, 1, 1, 1]);
        var element11 = dom.childAt(element10, [1]);
        var element12 = dom.childAt(element11, [1]);
        var element13 = dom.childAt(element11, [3]);
        var element14 = dom.childAt(element11, [7]);
        var element15 = dom.childAt(element14, [3, 1]);
        var element16 = dom.childAt(element10, [3]);
        var element17 = dom.childAt(element16, [1, 2, 1]);
        var element18 = dom.childAt(element17, [1, 1]);
        var element19 = dom.childAt(element16, [3]);
        var element20 = dom.childAt(element19, [1, 1, 3, 1]);
        var element21 = dom.childAt(element19, [3, 1, 3]);
        var element22 = dom.childAt(element21, [1]);
        var morphs = new Array(22);
        morphs[0] = dom.createAttrMorph(element4, 'class');
        morphs[1] = dom.createElementMorph(element7);
        morphs[2] = dom.createMorphAt(dom.childAt(element6, [3]), 1, 1);
        morphs[3] = dom.createMorphAt(dom.childAt(element5, [3, 1, 1]), 1, 1);
        morphs[4] = dom.createAttrMorph(element8, 'class');
        morphs[5] = dom.createElementMorph(element8);
        morphs[6] = dom.createElementMorph(element9);
        morphs[7] = dom.createElementMorph(element12);
        morphs[8] = dom.createMorphAt(element13, 1, 1);
        morphs[9] = dom.createMorphAt(element13, 3, 3);
        morphs[10] = dom.createMorphAt(dom.childAt(element14, [1]), 0, 0);
        morphs[11] = dom.createElementMorph(element15);
        morphs[12] = dom.createElementMorph(element18);
        morphs[13] = dom.createMorphAt(dom.childAt(element17, [3]), 1, 1);
        morphs[14] = dom.createMorphAt(element20, 1, 1);
        morphs[15] = dom.createMorphAt(element20, 3, 3);
        morphs[16] = dom.createMorphAt(element22, 1, 1);
        morphs[17] = dom.createMorphAt(element22, 3, 3);
        morphs[18] = dom.createMorphAt(element21, 3, 3);
        morphs[19] = dom.createMorphAt(dom.childAt(element16, [5, 1, 1, 3, 1]), 1, 1);
        morphs[20] = dom.createMorphAt(dom.childAt(element16, [7, 1, 1, 3, 1]), 1, 1);
        morphs[21] = dom.createMorphAt(dom.childAt(element16, [9, 1, 1]), 1, 1);
        return morphs;
      },
      statements: [["attribute", "class", ["concat", ["panel right ", ["get", "labelPanelDisplayed", ["loc", [null, [5, 30], [5, 49]]]]]]], ["element", "action", ["closeMenuPanel"], [], ["loc", [null, [9, 15], [9, 42]]]], ["content", "add-label", ["loc", [null, [12, 12], [12, 25]]]], ["block", "each", [["get", "user.labels", ["loc", [null, [18, 22], [18, 33]]]]], [], 0, null, ["loc", [null, [18, 14], [41, 23]]]], ["attribute", "class", ["concat", ["panel-overlay right ", ["get", "labelPanelDisplayed", ["loc", [null, [47, 36], [47, 55]]]]]]], ["element", "action", ["closeMenuPanel"], [], ["loc", [null, [47, 59], [47, 86]]]], ["element", "action", ["addPlace", ["get", "model", ["loc", [null, [51, 30], [51, 35]]]]], ["on", "submit"], ["loc", [null, [51, 10], [51, 49]]]], ["element", "bind-attr", [], ["disabled", "isInvalid"], ["loc", [null, [57, 65], [57, 99]]]], ["inline", "input", [], ["type", "text", "class", "place--input", "value", ["subexpr", "@mut", [["get", "model.name", ["loc", [null, [60, 65], [60, 75]]]]], [], []]], ["loc", [null, [60, 18], [60, 77]]]], ["block", "if", [["subexpr", "get", [["subexpr", "get", [["get", "model.validations.attrs", []], "name"], [], []], "isInvalid"], [], ["loc", [null, [61, 24], [61, 56]]]]], [], 1, null, ["loc", [null, [61, 18], [65, 25]]]], ["content", "model.label.name", ["loc", [null, [71, 47], [71, 67]]]], ["element", "action", ["showAddLabel"], ["bubbles", "false"], ["loc", [null, [73, 59], [73, 100]]]], ["element", "action", ["setAutoAddress"], [], ["loc", [null, [83, 51], [83, 78]]]], ["inline", "address-panel", [], ["place", ["subexpr", "@mut", [["get", "model", ["loc", [null, [86, 46], [86, 51]]]]], [], []], "buttonText", "Add an address"], ["loc", [null, [86, 24], [86, 81]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "model.website", ["loc", [null, [101, 40], [101, 53]]]]], [], []], "class", "place--main-input", "type", "tel"], ["loc", [null, [101, 26], [101, 92]]]], ["block", "if", [["subexpr", "get", [["subexpr", "get", [["get", "model.validations.attrs", []], "website"], [], []], "isInvalid"], [], ["loc", [null, [102, 32], [102, 67]]]]], [], 2, null, ["loc", [null, [102, 26], [106, 33]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "model.phone", ["loc", [null, [118, 40], [118, 51]]]]], [], []], "class", "place--main-input", "type", "text"], ["loc", [null, [118, 26], [118, 91]]]], ["block", "if", [["subexpr", "get", [["subexpr", "get", [["get", "model.validations.attrs", []], "phone"], [], []], "isInvalid"], [], ["loc", [null, [119, 32], [119, 65]]]]], [], 3, null, ["loc", [null, [119, 26], [123, 33]]]], ["block", "if", [["get", "errors.model.phone", ["loc", [null, [125, 30], [125, 48]]]]], [], 4, null, ["loc", [null, [125, 24], [127, 31]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "model.pricerange", ["loc", [null, [141, 40], [141, 56]]]]], [], []], "class", "place--main-input", "type", "text"], ["loc", [null, [141, 26], [141, 96]]]], ["inline", "textarea", [], ["type", "text", "cols", "60", "rows", "3", "class", "place--main-input", "value", ["subexpr", "@mut", [["get", "model.description", ["loc", [null, [156, 100], [156, 117]]]]], [], []]], ["loc", [null, [156, 26], [156, 119]]]], ["block", "star-rating-fa", [], ["item", ["subexpr", "@mut", [["get", "model", ["loc", [null, [166, 46], [166, 51]]]]], [], []], "rating", ["subexpr", "@mut", [["get", "model.rating", ["loc", [null, [166, 59], [166, 71]]]]], [], []], "on-click", ["subexpr", "action", ["setRating"], [], ["loc", [null, [166, 81], [166, 101]]]]], 5, null, ["loc", [null, [166, 22], [174, 41]]]]],
      locals: [],
      templates: [child0, child1, child2, child3, child4, child5]
    };
  })());
});
define("finndis/templates/application", ["exports"], function (exports) {
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
            "line": 8,
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
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [2, 1]), 1, 1);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "main-header", ["loc", [null, [1, 0], [1, 15]]]], ["content", "outlet", ["loc", [null, [5, 4], [5, 14]]]]],
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
            "line": 30,
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
        var el1 = dom.createElement("a");
        dom.setAttribute(el1, "class", "button expanded");
        var el2 = dom.createElement("i");
        dom.setAttribute(el2, "class", "fa fa-map-marker");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("form");
        dom.setAttribute(el2, "class", "address--form");
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
        dom.setAttribute(el6, "class", "back-button fa fa-arrow-left");
        dom.appendChild(el5, el6);
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
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "small-12 medium-11 medium-offset-1 columns");
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "row");
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7, "class", "columns");
        var el8 = dom.createTextNode("\n              ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("label");
        var el9 = dom.createTextNode("Address\n                ");
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
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(fragment, [2]);
        var element2 = dom.childAt(element1, [1]);
        var element3 = dom.childAt(element2, [1, 1, 1]);
        var element4 = dom.childAt(fragment, [4]);
        var morphs = new Array(7);
        morphs[0] = dom.createElementMorph(element0);
        morphs[1] = dom.createMorphAt(element0, 1, 1);
        morphs[2] = dom.createAttrMorph(element1, 'class');
        morphs[3] = dom.createElementMorph(element3);
        morphs[4] = dom.createMorphAt(dom.childAt(element2, [3, 1, 1, 1, 1, 1]), 1, 1);
        morphs[5] = dom.createAttrMorph(element4, 'class');
        morphs[6] = dom.createElementMorph(element4);
        return morphs;
      },
      statements: [["element", "action", ["showAddressPanel"], ["bubbles", "false"], ["loc", [null, [1, 27], [1, 72]]]], ["content", "buttonText", ["loc", [null, [1, 105], [1, 119]]]], ["attribute", "class", ["concat", ["panel right ", ["get", "addressPanelClass", ["loc", [null, [4, 26], [4, 43]]]]]]], ["element", "action", ["setAddress"], ["on", "click", "bubbles", "false"], ["loc", [null, [9, 11], [9, 61]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "place.formattedaddress", ["loc", [null, [18, 30], [18, 52]]]]], [], []], "class", "place--main-input", "type", "text"], ["loc", [null, [18, 16], [18, 93]]]], ["attribute", "class", ["concat", ["panel-overlay right ", ["get", "addressPanelClass", ["loc", [null, [28, 34], [28, 51]]]]]]], ["element", "action", ["setAddress"], ["on", "click", "bubbles", "false"], ["loc", [null, [28, 55], [28, 105]]]]],
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
              "line": 14,
              "column": 8
            },
            "end": {
              "line": 18,
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
          var el1 = dom.createTextNode("        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "columns small-4");
          var el2 = dom.createTextNode("\n            ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("a");
          dom.setAttribute(el2, "class", "button expanded");
          var el3 = dom.createComment("");
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
          var element10 = dom.childAt(fragment, [1, 1]);
          var morphs = new Array(2);
          morphs[0] = dom.createElementMorph(element10);
          morphs[1] = dom.createMorphAt(element10, 0, 0);
          return morphs;
        },
        statements: [["element", "action", ["searchPlace", ["get", "label", ["loc", [null, [16, 62], [16, 67]]]]], [], ["loc", [null, [16, 39], [16, 69]]]], ["content", "label.name", ["loc", [null, [16, 70], [16, 84]]]]],
        locals: ["label"],
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
                "line": 65,
                "column": 12
              },
              "end": {
                "line": 76,
                "column": 12
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
            var el1 = dom.createTextNode("            ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "columns small-12 medium-6");
            var el2 = dom.createTextNode("\n              ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "place--address row");
            var el3 = dom.createTextNode("\n                ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("div");
            dom.setAttribute(el3, "class", "small-1 columns");
            var el4 = dom.createTextNode("\n                  ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("i");
            dom.setAttribute(el4, "class", "place--main--icon fa fa-map-marker");
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n                ");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n                ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("div");
            dom.setAttribute(el3, "class", "small-11 columns");
            var el4 = dom.createTextNode("\n                  ");
            dom.appendChild(el3, el4);
            var el4 = dom.createComment("");
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
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 1, 3]), 1, 1);
            return morphs;
          },
          statements: [["content", "place.formattedaddress", ["loc", [null, [72, 18], [72, 44]]]]],
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
                "line": 77,
                "column": 12
              },
              "end": {
                "line": 90,
                "column": 12
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
            var el1 = dom.createTextNode("            ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "columns small-12 medium-6");
            var el2 = dom.createTextNode("\n              ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("a");
            var el3 = dom.createTextNode("\n                ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("div");
            dom.setAttribute(el3, "class", "place--phone row");
            var el4 = dom.createTextNode("\n                  ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("div");
            dom.setAttribute(el4, "class", "small-1 columns");
            var el5 = dom.createTextNode("\n                    ");
            dom.appendChild(el4, el5);
            var el5 = dom.createElement("i");
            dom.setAttribute(el5, "class", "place--main--icon fa fa-phone");
            dom.appendChild(el4, el5);
            var el5 = dom.createTextNode("\n                  ");
            dom.appendChild(el4, el5);
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n                  ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("div");
            dom.setAttribute(el4, "class", "small-11 columns");
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
            var element2 = dom.childAt(fragment, [1, 1]);
            var morphs = new Array(2);
            morphs[0] = dom.createAttrMorph(element2, 'href');
            morphs[1] = dom.createMorphAt(dom.childAt(element2, [1, 3]), 1, 1);
            return morphs;
          },
          statements: [["attribute", "href", ["concat", ["tel:", ["get", "place.phone", ["loc", [null, [79, 29], [79, 40]]]]]]], ["content", "place.phone", ["loc", [null, [85, 20], [85, 35]]]]],
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
                "line": 95,
                "column": 12
              },
              "end": {
                "line": 108,
                "column": 12
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
            var el1 = dom.createTextNode("            ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "columns medium-6");
            var el2 = dom.createTextNode("\n              ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("a");
            var el3 = dom.createTextNode("\n                ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("div");
            dom.setAttribute(el3, "class", "place--website row");
            var el4 = dom.createTextNode("\n                  ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("div");
            dom.setAttribute(el4, "class", "small-1 columns");
            var el5 = dom.createTextNode("\n                    ");
            dom.appendChild(el4, el5);
            var el5 = dom.createElement("i");
            dom.setAttribute(el5, "class", "place--main--icon fa fa-globe");
            dom.appendChild(el4, el5);
            var el5 = dom.createTextNode("\n                  ");
            dom.appendChild(el4, el5);
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n                  ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("div");
            dom.setAttribute(el4, "class", "small-11 columns");
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
            var element1 = dom.childAt(fragment, [1, 1]);
            var morphs = new Array(2);
            morphs[0] = dom.createAttrMorph(element1, 'href');
            morphs[1] = dom.createMorphAt(dom.childAt(element1, [1, 3]), 1, 1);
            return morphs;
          },
          statements: [["attribute", "href", ["concat", [["get", "place.website", ["loc", [null, [97, 25], [97, 38]]]]]]], ["content", "place.website", ["loc", [null, [103, 20], [103, 37]]]]],
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
                "line": 109,
                "column": 12
              },
              "end": {
                "line": 122,
                "column": 12
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
            var el1 = dom.createTextNode("            ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "columns medium-6");
            var el2 = dom.createTextNode("\n              ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("a");
            var el3 = dom.createTextNode("\n                ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("div");
            dom.setAttribute(el3, "class", "place--url row");
            var el4 = dom.createTextNode("\n                  ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("div");
            dom.setAttribute(el4, "class", "small-1 columns");
            var el5 = dom.createTextNode("\n                    ");
            dom.appendChild(el4, el5);
            var el5 = dom.createElement("i");
            dom.setAttribute(el5, "class", "place--main--icon fa fa-google");
            dom.appendChild(el4, el5);
            var el5 = dom.createTextNode("\n                  ");
            dom.appendChild(el4, el5);
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n                  ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("div");
            dom.setAttribute(el4, "class", "small-11 columns");
            var el5 = dom.createTextNode("\n                    Google Map\n                  ");
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
            var element0 = dom.childAt(fragment, [1, 1]);
            var morphs = new Array(1);
            morphs[0] = dom.createAttrMorph(element0, 'href');
            return morphs;
          },
          statements: [["attribute", "href", ["concat", [["get", "place.url", ["loc", [null, [111, 25], [111, 34]]]]]]]],
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
                "line": 140,
                "column": 10
              },
              "end": {
                "line": 148,
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
            dom.setAttribute(el1, "class", "place--info--holder row");
            var el2 = dom.createTextNode("\n            ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "columns");
            var el3 = dom.createTextNode("\n              ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("div");
            dom.setAttribute(el3, "class", "place--rating");
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
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 1, 1]), 1, 1);
            return morphs;
          },
          statements: [["inline", "star-rating-fa", [], ["item", ["subexpr", "@mut", [["get", "place", ["loc", [null, [144, 38], [144, 43]]]]], [], []], "rating", ["subexpr", "@mut", [["get", "place.rating", ["loc", [null, [144, 51], [144, 63]]]]], [], []]], ["loc", [null, [144, 16], [144, 65]]]]],
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
              "line": 52,
              "column": 0
            },
            "end": {
              "line": 154,
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
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "id", "place-info");
          dom.setAttribute(el1, "class", "row");
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "columns");
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "place--holder");
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("article");
          dom.setAttribute(el4, "class", "place");
          var el5 = dom.createTextNode("\n        ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("header");
          dom.setAttribute(el5, "class", "place--header");
          var el6 = dom.createTextNode("\n          ");
          dom.appendChild(el5, el6);
          var el6 = dom.createElement("a");
          dom.setAttribute(el6, "href", "#");
          dom.setAttribute(el6, "class", "button edit-button");
          var el7 = dom.createElement("i");
          dom.setAttribute(el7, "class", "place--action--icon fa fa-star");
          dom.appendChild(el6, el7);
          var el7 = dom.createTextNode("Save");
          dom.appendChild(el6, el7);
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("\n          ");
          dom.appendChild(el5, el6);
          var el6 = dom.createElement("h2");
          dom.setAttribute(el6, "class", "place--title");
          var el7 = dom.createComment("");
          dom.appendChild(el6, el7);
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("\n        ");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n\n        ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("main");
          dom.setAttribute(el5, "class", "place--main");
          var el6 = dom.createTextNode("\n          ");
          dom.appendChild(el5, el6);
          var el6 = dom.createElement("div");
          dom.setAttribute(el6, "class", "place--info--holder row");
          var el7 = dom.createTextNode("\n");
          dom.appendChild(el6, el7);
          var el7 = dom.createComment("");
          dom.appendChild(el6, el7);
          var el7 = dom.createComment("");
          dom.appendChild(el6, el7);
          var el7 = dom.createTextNode("          ");
          dom.appendChild(el6, el7);
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("\n\n\n          ");
          dom.appendChild(el5, el6);
          var el6 = dom.createElement("div");
          dom.setAttribute(el6, "class", "place--info--holder row");
          var el7 = dom.createTextNode("\n");
          dom.appendChild(el6, el7);
          var el7 = dom.createComment("");
          dom.appendChild(el6, el7);
          var el7 = dom.createComment("");
          dom.appendChild(el6, el7);
          var el7 = dom.createTextNode("          ");
          dom.appendChild(el6, el7);
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("\n\n          ");
          dom.appendChild(el5, el6);
          var el6 = dom.createElement("div");
          dom.setAttribute(el6, "class", "place--info--holder row");
          var el7 = dom.createTextNode("\n            ");
          dom.appendChild(el6, el7);
          var el7 = dom.createElement("div");
          dom.setAttribute(el7, "class", "columns medium-6");
          var el8 = dom.createTextNode("\n              ");
          dom.appendChild(el7, el8);
          var el8 = dom.createElement("a");
          dom.setAttribute(el8, "target", "_blank");
          var el9 = dom.createTextNode("\n                ");
          dom.appendChild(el8, el9);
          var el9 = dom.createElement("div");
          dom.setAttribute(el9, "class", "place--direction row");
          var el10 = dom.createTextNode("\n                  ");
          dom.appendChild(el9, el10);
          var el10 = dom.createElement("div");
          dom.setAttribute(el10, "class", "small-1 columns");
          var el11 = dom.createTextNode("\n                    ");
          dom.appendChild(el10, el11);
          var el11 = dom.createElement("i");
          dom.setAttribute(el11, "class", "place--main--icon fa fa-location-arrow");
          dom.appendChild(el10, el11);
          var el11 = dom.createTextNode("\n                  ");
          dom.appendChild(el10, el11);
          dom.appendChild(el9, el10);
          var el10 = dom.createTextNode("\n                  ");
          dom.appendChild(el9, el10);
          var el10 = dom.createElement("div");
          dom.setAttribute(el10, "class", "small-11 columns");
          var el11 = dom.createTextNode("\n                    Get direction\n                  ");
          dom.appendChild(el10, el11);
          dom.appendChild(el9, el10);
          var el10 = dom.createTextNode("\n                ");
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
          var el6 = dom.createTextNode("\n\n");
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
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element3 = dom.childAt(fragment, [1, 1, 1, 1]);
          var element4 = dom.childAt(element3, [1]);
          var element5 = dom.childAt(element4, [1]);
          var element6 = dom.childAt(element3, [3]);
          var element7 = dom.childAt(element6, [1]);
          var element8 = dom.childAt(element6, [3]);
          var element9 = dom.childAt(element6, [5, 1, 1]);
          var morphs = new Array(8);
          morphs[0] = dom.createElementMorph(element5);
          morphs[1] = dom.createMorphAt(dom.childAt(element4, [3]), 0, 0);
          morphs[2] = dom.createMorphAt(element7, 1, 1);
          morphs[3] = dom.createMorphAt(element7, 2, 2);
          morphs[4] = dom.createMorphAt(element8, 1, 1);
          morphs[5] = dom.createMorphAt(element8, 2, 2);
          morphs[6] = dom.createAttrMorph(element9, 'href');
          morphs[7] = dom.createMorphAt(element6, 7, 7);
          return morphs;
        },
        statements: [["element", "action", ["savePlace"], [], ["loc", [null, [59, 49], [59, 71]]]], ["content", "place.name", ["loc", [null, [60, 35], [60, 49]]]], ["block", "if", [["get", "place.formattedaddress", ["loc", [null, [65, 18], [65, 40]]]]], [], 0, null, ["loc", [null, [65, 12], [76, 19]]]], ["block", "if", [["get", "place.phone", ["loc", [null, [77, 18], [77, 29]]]]], [], 1, null, ["loc", [null, [77, 12], [90, 19]]]], ["block", "if", [["get", "place.website", ["loc", [null, [95, 18], [95, 31]]]]], [], 2, null, ["loc", [null, [95, 12], [108, 19]]]], ["block", "if", [["get", "place.url", ["loc", [null, [109, 18], [109, 27]]]]], [], 3, null, ["loc", [null, [109, 12], [122, 19]]]], ["attribute", "href", ["concat", ["http://maps.google.com/maps?daddr=", ["get", "place.locationlat", ["loc", [null, [127, 59], [127, 76]]]], ",", ["get", "place.locationlng", ["loc", [null, [127, 81], [127, 98]]]], "&ll="]]], ["block", "if", [["get", "place.rating", ["loc", [null, [140, 16], [140, 28]]]]], [], 4, null, ["loc", [null, [140, 10], [148, 17]]]]],
        locals: [],
        templates: [child0, child1, child2, child3, child4]
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
            "line": 155,
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
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "row");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "back-button--holder small-2 columns");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        var el5 = dom.createElement("i");
        dom.setAttribute(el5, "class", "back-button fa fa-arrow-left");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "small-10 columns");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
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
        dom.setAttribute(el3, "class", "small-12 columns");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "row");
        var el5 = dom.createTextNode("\n");
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
        var el1 = dom.createElement("a");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "columns small-12");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("form");
        dom.setAttribute(el3, "class", "form--add-label");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "row");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "columns small-4 medium-3");
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("a");
        dom.setAttribute(el6, "class", "button expanded");
        var el7 = dom.createTextNode("Labels");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "columns small-6 medium-7");
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
        dom.setAttribute(el5, "class", "columns small-2");
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("button");
        dom.setAttribute(el6, "type", "submit");
        dom.setAttribute(el6, "class", "button expanded");
        var el7 = dom.createElement("i");
        dom.setAttribute(el7, "class", "navigation--icon fa fa-search");
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
        dom.setAttribute(el2, "class", "columns small-12");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "id", "map");
        dom.setAttribute(el3, "class", "map-canvas");
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
        var element11 = dom.childAt(fragment, [0]);
        var element12 = dom.childAt(element11, [1]);
        var element13 = dom.childAt(element12, [1, 1]);
        var element14 = dom.childAt(fragment, [2]);
        var element15 = dom.childAt(fragment, [5, 1, 1]);
        var element16 = dom.childAt(element15, [1]);
        var element17 = dom.childAt(element16, [1, 1]);
        var morphs = new Array(10);
        morphs[0] = dom.createAttrMorph(element11, 'class');
        morphs[1] = dom.createElementMorph(element13);
        morphs[2] = dom.createMorphAt(dom.childAt(element12, [3]), 1, 1);
        morphs[3] = dom.createMorphAt(dom.childAt(element11, [3, 1, 1]), 1, 1);
        morphs[4] = dom.createAttrMorph(element14, 'class');
        morphs[5] = dom.createElementMorph(element14);
        morphs[6] = dom.createElementMorph(element15);
        morphs[7] = dom.createElementMorph(element17);
        morphs[8] = dom.createMorphAt(dom.childAt(element16, [3]), 1, 1);
        morphs[9] = dom.createMorphAt(fragment, 9, 9, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["attribute", "class", ["concat", ["panel label-panel right ", ["get", "labelPanelDisplayed", ["loc", [null, [2, 38], [2, 57]]]]]]], ["element", "action", ["closeMenuPanel"], [], ["loc", [null, [5, 14], [5, 41]]]], ["content", "add-label", ["loc", [null, [8, 6], [8, 19]]]], ["block", "each", [["get", "user.labels", ["loc", [null, [14, 16], [14, 27]]]]], [], 0, null, ["loc", [null, [14, 8], [18, 17]]]], ["attribute", "class", ["concat", ["panel-overlay right ", ["get", "labelPanelDisplayed", ["loc", [null, [23, 32], [23, 51]]]]]]], ["element", "action", ["closeMenuPanel"], [], ["loc", [null, [23, 55], [23, 82]]]], ["element", "action", ["searchPlace"], ["on", "submit"], ["loc", [null, [29, 34], [29, 70]]]], ["element", "action", ["showPanelLabelList"], [], ["loc", [null, [32, 37], [32, 68]]]], ["inline", "input", [], ["id", "searchKeyword", "type", "text", "value", ["subexpr", "@mut", [["get", "searchText", ["loc", [null, [35, 55], [35, 65]]]]], [], []]], ["loc", [null, [35, 10], [35, 67]]]], ["block", "if", [["get", "showPlaceDetails", ["loc", [null, [52, 6], [52, 22]]]]], [], 1, null, ["loc", [null, [52, 0], [154, 7]]]]],
      locals: [],
      templates: [child0, child1]
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
        statements: [["content", "menu-panel", ["loc", [null, [2, 2], [2, 16]]]]],
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
                "column": 84
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
            var el1 = dom.createTextNode("finndis");
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
              "line": 15,
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
          dom.setAttribute(el1, "class", "navigation--holder");
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
          dom.setAttribute(el5, "class", "navigation--title small-7 columns");
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
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 1, 1, 1, 1, 1, 0]), 0, 0);
          return morphs;
        },
        statements: [["block", "link-to", ["places"], [], 0, null, ["loc", [null, [9, 56], [9, 96]]]]],
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
            "line": 16,
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
      statements: [["block", "if", [["get", "session.isAuthenticated", ["loc", [null, [1, 6], [1, 29]]]]], [], 0, 1, ["loc", [null, [1, 0], [15, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("finndis/templates/components/menu-panel", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 6,
              "column": 54
            },
            "end": {
              "line": 6,
              "column": 82
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
          var el1 = dom.createTextNode("finndis");
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
              "line": 27,
              "column": 4
            },
            "end": {
              "line": 30,
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
          var el1 = dom.createElement("i");
          dom.setAttribute(el1, "class", "navigation--icon fa fa-user");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("span");
          dom.setAttribute(el1, "class", "user-section--name");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode(" ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element1 = dom.childAt(fragment, [3]);
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(element1, 0, 0);
          morphs[1] = dom.createMorphAt(element1, 2, 2);
          return morphs;
        },
        statements: [["content", "sessionAccount.user.firstname", ["loc", [null, [29, 39], [29, 72]]]], ["content", "sessionAccount.user.lastname", ["loc", [null, [29, 73], [29, 105]]]]],
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
              "line": 44,
              "column": 4
            },
            "end": {
              "line": 44,
              "column": 111
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
          var el1 = dom.createTextNode("Add a new place");
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
    var child3 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 51,
              "column": 4
            },
            "end": {
              "line": 51,
              "column": 101
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
          var el1 = dom.createTextNode("Search");
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
    var child4 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 59,
              "column": 4
            },
            "end": {
              "line": 59,
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
    var child5 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.2",
            "loc": {
              "source": null,
              "start": {
                "line": 64,
                "column": 10
              },
              "end": {
                "line": 73,
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
          statements: [["content", "label.name", ["loc", [null, [70, 14], [70, 28]]]]],
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
              "line": 62,
              "column": 6
            },
            "end": {
              "line": 75,
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
        statements: [["attribute", "id", ["concat", [["get", "label.labelId", ["loc", [null, [63, 18], [63, 31]]]]]]], ["block", "link-to", ["label", ["get", "label", ["loc", [null, [64, 29], [64, 34]]]]], [], 0, null, ["loc", [null, [64, 10], [73, 22]]]]],
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
            "line": 81,
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
        var el1 = dom.createElement("div");
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
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "navigation--title small-7 columns");
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("h1");
        dom.setAttribute(el6, "class", "site-title");
        var el7 = dom.createElement("strong");
        dom.setAttribute(el7, "class", "logo");
        var el8 = dom.createComment("");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "small-5 columns end navigation--button-holder");
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("ul");
        dom.setAttribute(el6, "class", "dropdown menu navigation--list");
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        dom.setAttribute(el7, "class", "navigation--listitem");
        var el8 = dom.createElement("a");
        dom.setAttribute(el8, "class", "navigation--link");
        var el9 = dom.createElement("i");
        dom.setAttribute(el9, "class", "navigation--icon fa fa-bars");
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("Menu");
        dom.appendChild(el8, el9);
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
        var el1 = dom.createTextNode("\n\n\n");
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
        var el3 = dom.createElement("a");
        dom.setAttribute(el3, "class", "button user-button left");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("i");
        dom.setAttribute(el4, "class", "fa fa-sign-out");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" Sign out\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("a");
        dom.setAttribute(el3, "class", "button user-button right");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("i");
        dom.setAttribute(el4, "class", "fa fa-cog");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" Settings\n    ");
        dom.appendChild(el3, el4);
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
        var element2 = dom.childAt(fragment, [0, 1, 1, 1]);
        var element3 = dom.childAt(element2, [3, 1, 1]);
        var element4 = dom.childAt(fragment, [2]);
        var element5 = dom.childAt(element4, [2]);
        var element6 = dom.childAt(element5, [2]);
        var element7 = dom.childAt(element5, [7]);
        var element8 = dom.childAt(element4, [6]);
        var element9 = dom.childAt(element4, [10]);
        var element10 = dom.childAt(element4, [14]);
        var element11 = dom.childAt(fragment, [4]);
        var morphs = new Array(16);
        morphs[0] = dom.createMorphAt(dom.childAt(element2, [1, 1, 0]), 0, 0);
        morphs[1] = dom.createElementMorph(element3);
        morphs[2] = dom.createAttrMorph(element4, 'class');
        morphs[3] = dom.createElementMorph(element5);
        morphs[4] = dom.createElementMorph(element6);
        morphs[5] = dom.createMorphAt(element5, 5, 5);
        morphs[6] = dom.createElementMorph(element7);
        morphs[7] = dom.createElementMorph(element8);
        morphs[8] = dom.createMorphAt(element8, 1, 1);
        morphs[9] = dom.createElementMorph(element9);
        morphs[10] = dom.createMorphAt(element9, 1, 1);
        morphs[11] = dom.createElementMorph(element10);
        morphs[12] = dom.createMorphAt(element10, 3, 3);
        morphs[13] = dom.createMorphAt(dom.childAt(element10, [5]), 1, 1);
        morphs[14] = dom.createAttrMorph(element11, 'class');
        morphs[15] = dom.createElementMorph(element11);
        return morphs;
      },
      statements: [["block", "link-to", ["places"], [], 0, null, ["loc", [null, [6, 54], [6, 94]]]], ["element", "action", ["showMenuPanel"], ["on", "click"], ["loc", [null, [10, 45], [10, 82]]]], ["attribute", "class", ["concat", ["panel-menu panel left ", ["get", "labelPanelClass", ["loc", [null, [19, 52], [19, 67]]]]]]], ["element", "action", ["closeMenuPanel"], ["on", "click"], ["loc", [null, [22, 43], [22, 81]]]], ["element", "action", ["closeMenuPanel"], [], ["loc", [null, [24, 30], [24, 57]]]], ["block", "link-to", ["users"], ["class", "navigation--user-link"], 1, null, ["loc", [null, [27, 4], [30, 16]]]], ["element", "action", ["logout"], [], ["loc", [null, [32, 39], [32, 58]]]], ["element", "action", ["closeMenuPanel"], ["on", "click"], ["loc", [null, [43, 30], [43, 68]]]], ["block", "link-to", ["add-place"], ["class", "navigation--link"], 2, null, ["loc", [null, [44, 4], [44, 123]]]], ["element", "action", ["closeMenuPanel"], ["on", "click"], ["loc", [null, [50, 30], [50, 68]]]], ["block", "link-to", ["search"], ["class", "navigation--link"], 3, null, ["loc", [null, [51, 4], [51, 113]]]], ["element", "action", ["closeMenuPanel"], ["on", "click"], ["loc", [null, [57, 44], [57, 82]]]], ["block", "link-to", ["edit-labels"], ["class", "edit-button"], 4, null, ["loc", [null, [59, 4], [59, 66]]]], ["block", "each", [["get", "sessionAccount.user.labels", ["loc", [null, [62, 14], [62, 40]]]]], [], 5, null, ["loc", [null, [62, 6], [75, 15]]]], ["attribute", "class", ["concat", ["panel-overlay left ", ["get", "labelPanelClass", ["loc", [null, [80, 31], [80, 46]]]]]]], ["element", "action", ["closeMenuPanel"], [], ["loc", [null, [80, 50], [80, 77]]]]],
      locals: [],
      templates: [child0, child1, child2, child3, child4, child5]
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
define("finndis/templates/dashboard", ["exports"], function (exports) {
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
            "line": 13,
            "column": 0
          }
        },
        "moduleName": "finndis/templates/dashboard.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Dashboard");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("ul");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("Peter Parker is Spider-Man");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("a");
        dom.setAttribute(el1, "href", "#");
        var el2 = dom.createTextNode("Logout");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2]);
        var element1 = dom.childAt(fragment, [6]);
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]), 0, 0);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [3]), 0, 0);
        morphs[2] = dom.createMorphAt(dom.childAt(element0, [5]), 0, 0);
        morphs[3] = dom.createMorphAt(dom.childAt(element0, [7]), 0, 0);
        morphs[4] = dom.createElementMorph(element1);
        return morphs;
      },
      statements: [["content", "model.user.lastname", ["loc", [null, [4, 6], [4, 29]]]], ["content", "model.user.firstname", ["loc", [null, [5, 6], [5, 30]]]], ["content", "model.user.email", ["loc", [null, [6, 6], [6, 26]]]], ["content", "model.user.id", ["loc", [null, [7, 6], [7, 23]]]], ["element", "action", ["logout"], [], ["loc", [null, [12, 12], [12, 31]]]]],
      locals: [],
      templates: []
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
                "line": 15,
                "column": 12
              },
              "end": {
                "line": 31,
                "column": 12
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
            var el1 = dom.createTextNode("              ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("li");
            dom.setAttribute(el1, "class", "label-editor--holder edition");
            var el2 = dom.createTextNode("\n                ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "label--listitem label-editor row");
            var el3 = dom.createTextNode("\n                  ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("div");
            dom.setAttribute(el3, "class", "label-editor--delete label--icon-holder medium-1 columns");
            var el4 = dom.createTextNode("\n                    ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("i");
            dom.setAttribute(el4, "class", "fa fa-trash");
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n                  ");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n                  ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("div");
            dom.setAttribute(el3, "class", "medium-10 columns");
            var el4 = dom.createTextNode("\n                    ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("form");
            var el5 = dom.createTextNode("\n                      ");
            dom.appendChild(el4, el5);
            var el5 = dom.createComment("");
            dom.appendChild(el4, el5);
            var el5 = dom.createTextNode("\n                    ");
            dom.appendChild(el4, el5);
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n                  ");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n                  ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("div");
            dom.setAttribute(el3, "class", "label-editor--save label--icon-holder medium-1 columns");
            var el4 = dom.createTextNode("\n                    ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("i");
            dom.setAttribute(el4, "class", "fa fa-check");
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
          statements: [["attribute", "id", ["concat", [["get", "label.labelId", ["loc", [null, [16, 24], [16, 37]]]]]]], ["element", "action", ["deleteLabel", ["get", "label.id", ["loc", [null, [18, 111], [18, 119]]]]], ["on", "click"], ["loc", [null, [18, 88], [18, 132]]]], ["element", "action", ["saveLabel", ["get", "label.id", ["loc", [null, [22, 47], [22, 55]]]]], ["on", "submit"], ["loc", [null, [22, 26], [22, 69]]]], ["inline", "input", [], ["type", "text", "class", "label-editor--input", "value", ["subexpr", "@mut", [["get", "labelName", ["loc", [null, [23, 76], [23, 85]]]]], [], []]], ["loc", [null, [23, 22], [23, 87]]]], ["element", "action", ["saveLabel", ["get", "label.id", ["loc", [null, [26, 107], [26, 115]]]]], ["on", "click"], ["loc", [null, [26, 86], [26, 128]]]]],
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
                "line": 31,
                "column": 12
              },
              "end": {
                "line": 45,
                "column": 12
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
            var el1 = dom.createTextNode("              ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("li");
            dom.setAttribute(el1, "class", "label-editor--holder");
            var el2 = dom.createTextNode("\n                ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "label--listitem label-editor row");
            var el3 = dom.createTextNode("\n                  ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("div");
            dom.setAttribute(el3, "class", "label--icon-holder medium-1 columns");
            var el4 = dom.createTextNode("\n                    ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("i");
            dom.setAttribute(el4, "class", "label--icon fa fa-tag");
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n                  ");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n                  ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("div");
            dom.setAttribute(el3, "class", "medium-10 columns");
            var el4 = dom.createTextNode("\n                    ");
            dom.appendChild(el3, el4);
            var el4 = dom.createComment("");
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n                  ");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n                  ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("div");
            dom.setAttribute(el3, "class", "label--icon-holder medium-1 columns");
            var el4 = dom.createTextNode("\n                    ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("i");
            dom.setAttribute(el4, "class", "fa fa-pencil");
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
            var morphs = new Array(3);
            morphs[0] = dom.createAttrMorph(element0, 'id');
            morphs[1] = dom.createElementMorph(element0);
            morphs[2] = dom.createMorphAt(dom.childAt(element0, [1, 3]), 1, 1);
            return morphs;
          },
          statements: [["attribute", "id", ["concat", [["get", "label.labelId", ["loc", [null, [32, 24], [32, 37]]]]]]], ["element", "action", ["toggleEdition", ["get", "label.id", ["loc", [null, [32, 95], [32, 103]]]]], ["on", "click"], ["loc", [null, [32, 70], [32, 116]]]], ["content", "label.name", ["loc", [null, [38, 20], [38, 34]]]]],
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
              "line": 13,
              "column": 10
            },
            "end": {
              "line": 46,
              "column": 10
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
        statements: [["block", "if", [["get", "label.isEditing", ["loc", [null, [15, 18], [15, 33]]]]], [], 0, 1, ["loc", [null, [15, 12], [45, 19]]]]],
        locals: ["label"],
        templates: [child0, child1]
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
            "line": 52,
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
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "medium-6 medium-offset-3 columns");
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "row");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "columns small-12 medium-12");
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
        var el3 = dom.createTextNode("\n\n    ");
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
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element6 = dom.childAt(fragment, [0, 1]);
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(dom.childAt(element6, [1, 1]), 1, 1);
        morphs[1] = dom.createMorphAt(dom.childAt(element6, [3, 1, 1]), 1, 1);
        return morphs;
      },
      statements: [["content", "add-label", ["loc", [null, [6, 8], [6, 21]]]], ["block", "each", [["get", "sessionAccount.user.labels", ["loc", [null, [13, 18], [13, 44]]]]], [], 0, null, ["loc", [null, [13, 10], [46, 19]]]]],
      locals: [],
      templates: [child0]
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
                    "line": 12,
                    "column": 14
                  },
                  "end": {
                    "line": 21,
                    "column": 14
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
                dom.setAttribute(el3, "class", "place--main--icon fa fa-map-marker");
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
              statements: [["content", "place.formattedaddress", ["loc", [null, [18, 20], [18, 46]]]]],
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
                    "column": 14
                  },
                  "end": {
                    "line": 32,
                    "column": 14
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
                dom.setAttribute(el3, "class", "place--main--icon fa fa-phone");
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
              statements: [["content", "place.phone", ["loc", [null, [29, 20], [29, 35]]]]],
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
                  "line": 38,
                  "column": 8
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
            statements: [["attribute", "id", ["concat", ["card_", ["get", "index", ["loc", [null, [9, 30], [9, 35]]]]]]], ["content", "place.name", ["loc", [null, [10, 36], [10, 50]]]], ["block", "if", [["get", "place.formattedaddress", ["loc", [null, [12, 20], [12, 42]]]]], [], 0, null, ["loc", [null, [12, 14], [21, 21]]]], ["block", "if", [["get", "place.phone", ["loc", [null, [23, 20], [23, 31]]]]], [], 1, null, ["loc", [null, [23, 14], [32, 21]]]], ["content", "place.label.name", ["loc", [null, [34, 52], [34, 72]]]]],
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
                "line": 7,
                "column": 6
              },
              "end": {
                "line": 39,
                "column": 6
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
          statements: [["block", "link-to", ["place", ["get", "place", ["loc", [null, [8, 27], [8, 32]]]]], [], 0, null, ["loc", [null, [8, 8], [38, 20]]]]],
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
              "line": 6,
              "column": 4
            },
            "end": {
              "line": 40,
              "column": 4
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
        statements: [["block", "masonry-item", [], ["item", ["subexpr", "@mut", [["get", "place", ["loc", [null, [7, 27], [7, 32]]]]], [], []], "grid", ["subexpr", "@mut", [["get", "grid", ["loc", [null, [7, 38], [7, 42]]]]], [], []]], 0, null, ["loc", [null, [7, 6], [39, 23]]]]],
        locals: ["place", "index", "grid"],
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
            "line": 45,
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
        var el1 = dom.createTextNode("\n\n\n");
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
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element2 = dom.childAt(fragment, [1, 1]);
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(element2, 1, 1);
        morphs[1] = dom.createMorphAt(element2, 3, 3);
        return morphs;
      },
      statements: [["block", "masonry-grid", [], ["items", ["subexpr", "@mut", [["get", "model.places", ["loc", [null, [6, 26], [6, 38]]]]], [], []], "customLayout", true], 0, null, ["loc", [null, [6, 4], [40, 21]]]], ["content", "outlet", ["loc", [null, [42, 4], [42, 14]]]]],
      locals: [],
      templates: [child0]
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
              "line": 7,
              "column": 12
            },
            "end": {
              "line": 7,
              "column": 57
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
                "line": 18,
                "column": 14
              },
              "end": {
                "line": 27,
                "column": 14
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
            var el1 = dom.createTextNode("              ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "label--listitem label-editor row");
            var el2 = dom.createTextNode("\n                ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "label--icon-holder medium-1 columns");
            var el3 = dom.createTextNode("\n                  ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("i");
            dom.setAttribute(el3, "class", "label--icon fa fa-tag");
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n                ");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n                ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "medium-11 columns");
            var el3 = dom.createTextNode("\n                  ");
            dom.appendChild(el2, el3);
            var el3 = dom.createComment("");
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
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 3]), 1, 1);
            return morphs;
          },
          statements: [["content", "label.name", ["loc", [null, [24, 18], [24, 32]]]]],
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
              "column": 10
            },
            "end": {
              "line": 29,
              "column": 10
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
          var el1 = dom.createTextNode("            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          dom.setAttribute(el1, "class", "label-editor--holder");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("            ");
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
        statements: [["attribute", "id", ["concat", [["get", "label.labelId", ["loc", [null, [17, 22], [17, 35]]]]]]], ["block", "link-to", ["label", ["get", "label", ["loc", [null, [18, 33], [18, 38]]]]], [], 0, null, ["loc", [null, [18, 14], [27, 26]]]]],
        locals: ["label"],
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
            "line": 35,
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
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "medium-6 medium-offset-3 columns");
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
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "row");
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "columns medium-12");
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
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [0, 1]);
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(dom.childAt(element1, [1, 1, 1, 1]), 1, 1);
        morphs[1] = dom.createMorphAt(dom.childAt(element1, [3, 1, 1]), 1, 1);
        return morphs;
      },
      statements: [["block", "link-to", ["edit-labels"], ["class", "button"], 0, null, ["loc", [null, [7, 12], [7, 69]]]], ["block", "each", [["get", "labelsList", ["loc", [null, [16, 18], [16, 28]]]]], [], 1, null, ["loc", [null, [16, 10], [29, 19]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("finndis/templates/login", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
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
            "line": 25,
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
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "columns");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h2");
        dom.setAttribute(el3, "class", "page-title");
        var el4 = dom.createTextNode("Welcome!");
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
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        var el2 = dom.createTextNode("test@test.com");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n  ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        var el2 = dom.createTextNode("\n    password\n  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "signup-form--holder row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "columns");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h3");
        dom.setAttribute(el3, "class", "page-title");
        var el4 = dom.createTextNode("Or create a new account");
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
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "signup-form--holder row");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2, "class", "button");
        var el3 = dom.createElement("i");
        dom.setAttribute(el3, "class", "fa fa-user-plus");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" Sign up");
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
        var element0 = dom.childAt(fragment, [10, 1]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        morphs[1] = dom.createElementMorph(element0);
        morphs[2] = dom.createMorphAt(fragment, 12, 12, contextualElement);
        return morphs;
      },
      statements: [["content", "login-form", ["loc", [null, [7, 0], [7, 14]]]], ["element", "action", ["showSignupPanel"], [], ["loc", [null, [21, 22], [21, 50]]]], ["inline", "signup-form", [], ["signupPanelClass", ["subexpr", "@mut", [["get", "signupPanelClass", ["loc", [null, [24, 31], [24, 47]]]]], [], []], "model", ["subexpr", "@mut", [["get", "model", ["loc", [null, [24, 54], [24, 59]]]]], [], []]], ["loc", [null, [24, 0], [24, 61]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("finndis/templates/place", ["exports"], function (exports) {
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
              "column": 4
            },
            "end": {
              "line": 3,
              "column": 69
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
          var el1 = dom.createElement("i");
          dom.setAttribute(el1, "class", "back-button fa fa-arrow-left");
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
              "line": 22,
              "column": 14
            },
            "end": {
              "line": 43,
              "column": 14
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
          var el1 = dom.createTextNode("                ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          dom.setAttribute(el1, "class", "label-editor--holder");
          var el2 = dom.createTextNode("\n                  ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("label");
          dom.setAttribute(el2, "class", "label--listitem--label");
          var el3 = dom.createTextNode("\n                    ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "label--listitem label-editor collapse align-middle row");
          var el4 = dom.createTextNode("\n                      ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          dom.setAttribute(el4, "class", "label--icon-holder small-1 columns");
          var el5 = dom.createTextNode("\n                        ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("i");
          dom.setAttribute(el5, "class", "label--icon fa fa-tag");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n                      ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n                      ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          dom.setAttribute(el4, "class", "small-10 columns");
          var el5 = dom.createTextNode("\n                        ");
          dom.appendChild(el4, el5);
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n                      ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n                      ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          dom.setAttribute(el4, "class", "label--icon-holder small-1 columns");
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
          var element24 = dom.childAt(fragment, [1, 1, 1]);
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(dom.childAt(element24, [3]), 1, 1);
          morphs[1] = dom.createMorphAt(dom.childAt(element24, [5]), 1, 1);
          return morphs;
        },
        statements: [["content", "label.name", ["loc", [null, [30, 24], [30, 38]]]], ["inline", "radio-button", [], ["id", ["subexpr", "@mut", [["get", "label.id", ["loc", [null, [34, 29], [34, 37]]]]], [], []], "value", ["subexpr", "@mut", [["get", "label.id", ["loc", [null, [35, 32], [35, 40]]]]], [], []], "groupValue", ["subexpr", "@mut", [["get", "labelValue", ["loc", [null, [36, 37], [36, 47]]]]], [], []], "changed", "updateLabel", "name", "label"], ["loc", [null, [33, 24], [38, 40]]]]],
        locals: ["label"],
        templates: []
      };
    })();
    var child2 = (function () {
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
                    "line": 138,
                    "column": 28
                  },
                  "end": {
                    "line": 140,
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
                var element15 = dom.childAt(fragment, [1]);
                var morphs = new Array(1);
                morphs[0] = dom.createElementMorph(element15);
                return morphs;
              },
              statements: [["element", "action", [["get", "set", ["loc", [null, [139, 73], [139, 76]]]], ["get", "star.rating", ["loc", [null, [139, 77], [139, 88]]]]], [], ["loc", [null, [139, 64], [139, 90]]]]],
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
                    "line": 140,
                    "column": 28
                  },
                  "end": {
                    "line": 142,
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
                var element14 = dom.childAt(fragment, [1]);
                var morphs = new Array(1);
                morphs[0] = dom.createElementMorph(element14);
                return morphs;
              },
              statements: [["element", "action", [["get", "set", ["loc", [null, [141, 75], [141, 78]]]], ["get", "star.rating", ["loc", [null, [141, 79], [141, 90]]]]], [], ["loc", [null, [141, 66], [141, 92]]]]],
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
                  "line": 137,
                  "column": 26
                },
                "end": {
                  "line": 143,
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
            statements: [["block", "if", [["get", "star.full", ["loc", [null, [138, 34], [138, 43]]]]], [], 0, 1, ["loc", [null, [138, 28], [142, 35]]]]],
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
                "line": 136,
                "column": 24
              },
              "end": {
                "line": 144,
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
          statements: [["block", "each", [["get", "stars", ["loc", [null, [137, 34], [137, 39]]]]], [], 0, null, ["loc", [null, [137, 26], [143, 35]]]]],
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
              "line": 51,
              "column": 4
            },
            "end": {
              "line": 162,
              "column": 4
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
          var el1 = dom.createElement("form");
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "edition row");
          var el3 = dom.createTextNode("\n          ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "columns");
          var el4 = dom.createTextNode("\n            ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          dom.setAttribute(el4, "class", "place--holder");
          var el5 = dom.createTextNode("\n              ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("article");
          dom.setAttribute(el5, "class", "place");
          var el6 = dom.createTextNode("\n                ");
          dom.appendChild(el5, el6);
          var el6 = dom.createElement("header");
          dom.setAttribute(el6, "class", "place--header");
          var el7 = dom.createTextNode("\n                  ");
          dom.appendChild(el6, el7);
          var el7 = dom.createElement("a");
          dom.setAttribute(el7, "href", "#");
          dom.setAttribute(el7, "class", "button delete-button");
          var el8 = dom.createElement("i");
          dom.setAttribute(el8, "class", "place--action--icon fa fa-trash");
          dom.appendChild(el7, el8);
          var el8 = dom.createTextNode("Delete");
          dom.appendChild(el7, el8);
          dom.appendChild(el6, el7);
          var el7 = dom.createTextNode("\n                  ");
          dom.appendChild(el6, el7);
          var el7 = dom.createElement("button");
          dom.setAttribute(el7, "type", "submit");
          dom.setAttribute(el7, "class", "button edit-button");
          var el8 = dom.createElement("i");
          dom.setAttribute(el8, "class", "place--action--icon fa fa-check");
          dom.appendChild(el7, el8);
          var el8 = dom.createTextNode("Save");
          dom.appendChild(el7, el8);
          dom.appendChild(el6, el7);
          var el7 = dom.createTextNode("\n\n                  ");
          dom.appendChild(el6, el7);
          var el7 = dom.createElement("h2");
          dom.setAttribute(el7, "class", "place--title");
          var el8 = dom.createTextNode("\n                    ");
          dom.appendChild(el7, el8);
          var el8 = dom.createComment("");
          dom.appendChild(el7, el8);
          var el8 = dom.createTextNode("\n                  ");
          dom.appendChild(el7, el8);
          dom.appendChild(el6, el7);
          var el7 = dom.createTextNode("\n                  ");
          dom.appendChild(el6, el7);
          var el7 = dom.createElement("i");
          dom.setAttribute(el7, "class", "place--labels--icon fa fa-tag");
          dom.appendChild(el6, el7);
          var el7 = dom.createTextNode("\n                  ");
          dom.appendChild(el6, el7);
          var el7 = dom.createElement("ul");
          dom.setAttribute(el7, "class", "place--labels clearfix");
          var el8 = dom.createTextNode("\n                    ");
          dom.appendChild(el7, el8);
          var el8 = dom.createElement("li");
          dom.setAttribute(el8, "class", "place--labelitem");
          var el9 = dom.createComment("");
          dom.appendChild(el8, el9);
          dom.appendChild(el7, el8);
          var el8 = dom.createTextNode("\n                    ");
          dom.appendChild(el7, el8);
          var el8 = dom.createElement("li");
          dom.setAttribute(el8, "class", "place--labelitem");
          var el9 = dom.createTextNode("\n                      ");
          dom.appendChild(el8, el9);
          var el9 = dom.createElement("i");
          dom.setAttribute(el9, "class", "place--add--icon fa fa-plus");
          dom.appendChild(el8, el9);
          var el9 = dom.createTextNode("\n                    ");
          dom.appendChild(el8, el9);
          dom.appendChild(el7, el8);
          var el8 = dom.createTextNode("\n                  ");
          dom.appendChild(el7, el8);
          dom.appendChild(el6, el7);
          var el7 = dom.createTextNode("\n                ");
          dom.appendChild(el6, el7);
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("\n                ");
          dom.appendChild(el5, el6);
          var el6 = dom.createElement("main");
          dom.setAttribute(el6, "class", "place--main");
          var el7 = dom.createTextNode("\n                  ");
          dom.appendChild(el6, el7);
          var el7 = dom.createElement("div");
          dom.setAttribute(el7, "class", "place--info--holder align-middle collapse row");
          var el8 = dom.createTextNode("\n");
          dom.appendChild(el7, el8);
          var el8 = dom.createTextNode("                    ");
          dom.appendChild(el7, el8);
          var el8 = dom.createElement("div");
          dom.setAttribute(el8, "class", "small-12 columns");
          var el9 = dom.createTextNode("\n                      ");
          dom.appendChild(el8, el9);
          var el9 = dom.createElement("div");
          dom.setAttribute(el9, "class", "row");
          var el10 = dom.createTextNode("\n                        ");
          dom.appendChild(el9, el10);
          var el10 = dom.createElement("div");
          dom.setAttribute(el10, "class", "columns");
          var el11 = dom.createTextNode("\n                          ");
          dom.appendChild(el10, el11);
          var el11 = dom.createElement("label");
          var el12 = dom.createTextNode("Address\n                            ");
          dom.appendChild(el11, el12);
          var el12 = dom.createComment("");
          dom.appendChild(el11, el12);
          var el12 = dom.createTextNode("\n                          ");
          dom.appendChild(el11, el12);
          dom.appendChild(el10, el11);
          var el11 = dom.createTextNode("\n                        ");
          dom.appendChild(el10, el11);
          dom.appendChild(el9, el10);
          var el10 = dom.createTextNode("\n                      ");
          dom.appendChild(el9, el10);
          dom.appendChild(el8, el9);
          var el9 = dom.createTextNode("\n                    ");
          dom.appendChild(el8, el9);
          dom.appendChild(el7, el8);
          var el8 = dom.createTextNode("\n");
          dom.appendChild(el7, el8);
          var el8 = dom.createTextNode("                  ");
          dom.appendChild(el7, el8);
          dom.appendChild(el6, el7);
          var el7 = dom.createTextNode("\n\n                  ");
          dom.appendChild(el6, el7);
          var el7 = dom.createElement("div");
          dom.setAttribute(el7, "class", "place--info--holder row");
          var el8 = dom.createTextNode("\n                    ");
          dom.appendChild(el7, el8);
          var el8 = dom.createElement("div");
          dom.setAttribute(el8, "class", "columns small-12 medium-6");
          var el9 = dom.createTextNode("\n                      ");
          dom.appendChild(el8, el9);
          var el9 = dom.createElement("div");
          dom.setAttribute(el9, "class", "place--website align-middle collapse row");
          var el10 = dom.createTextNode("\n                        ");
          dom.appendChild(el9, el10);
          var el10 = dom.createElement("div");
          dom.setAttribute(el10, "class", "small-12 columns");
          var el11 = dom.createTextNode("\n                          ");
          dom.appendChild(el10, el11);
          var el11 = dom.createElement("label");
          var el12 = dom.createTextNode("Website\n                            ");
          dom.appendChild(el11, el12);
          var el12 = dom.createComment("");
          dom.appendChild(el11, el12);
          var el12 = dom.createTextNode("\n                          ");
          dom.appendChild(el11, el12);
          dom.appendChild(el10, el11);
          var el11 = dom.createTextNode("\n                        ");
          dom.appendChild(el10, el11);
          dom.appendChild(el9, el10);
          var el10 = dom.createTextNode("\n                      ");
          dom.appendChild(el9, el10);
          dom.appendChild(el8, el9);
          var el9 = dom.createTextNode("\n                    ");
          dom.appendChild(el8, el9);
          dom.appendChild(el7, el8);
          var el8 = dom.createTextNode("\n                    ");
          dom.appendChild(el7, el8);
          var el8 = dom.createElement("div");
          dom.setAttribute(el8, "class", "columns small-12 medium-6");
          var el9 = dom.createTextNode("\n                      ");
          dom.appendChild(el8, el9);
          var el9 = dom.createElement("div");
          dom.setAttribute(el9, "class", "place--phone align-middle collapse row");
          var el10 = dom.createTextNode("\n                        ");
          dom.appendChild(el9, el10);
          var el10 = dom.createElement("div");
          dom.setAttribute(el10, "class", "small-12 columns");
          var el11 = dom.createTextNode("\n                          ");
          dom.appendChild(el10, el11);
          var el11 = dom.createElement("label");
          var el12 = dom.createTextNode("Phone number\n                            ");
          dom.appendChild(el11, el12);
          var el12 = dom.createComment("");
          dom.appendChild(el11, el12);
          var el12 = dom.createTextNode("\n                          ");
          dom.appendChild(el11, el12);
          dom.appendChild(el10, el11);
          var el11 = dom.createTextNode("\n                        ");
          dom.appendChild(el10, el11);
          dom.appendChild(el9, el10);
          var el10 = dom.createTextNode("\n                      ");
          dom.appendChild(el9, el10);
          dom.appendChild(el8, el9);
          var el9 = dom.createTextNode("\n                    ");
          dom.appendChild(el8, el9);
          dom.appendChild(el7, el8);
          var el8 = dom.createTextNode("\n                  ");
          dom.appendChild(el7, el8);
          dom.appendChild(el6, el7);
          var el7 = dom.createTextNode("\n\n                  ");
          dom.appendChild(el6, el7);
          var el7 = dom.createElement("div");
          dom.setAttribute(el7, "class", "place--info--holder row");
          var el8 = dom.createTextNode("\n                    ");
          dom.appendChild(el7, el8);
          var el8 = dom.createElement("div");
          dom.setAttribute(el8, "class", "columns small-12 medium-6");
          var el9 = dom.createTextNode("\n                      ");
          dom.appendChild(el8, el9);
          var el9 = dom.createElement("div");
          dom.setAttribute(el9, "class", "place--phone align-middle collapse row");
          var el10 = dom.createTextNode("\n                        ");
          dom.appendChild(el9, el10);
          var el10 = dom.createElement("div");
          dom.setAttribute(el10, "class", "small-12 columns");
          var el11 = dom.createTextNode("\n                          ");
          dom.appendChild(el10, el11);
          var el11 = dom.createElement("label");
          var el12 = dom.createTextNode("Price range\n                            ");
          dom.appendChild(el11, el12);
          var el12 = dom.createComment("");
          dom.appendChild(el11, el12);
          var el12 = dom.createTextNode("\n                          ");
          dom.appendChild(el11, el12);
          dom.appendChild(el10, el11);
          var el11 = dom.createTextNode("\n                        ");
          dom.appendChild(el10, el11);
          dom.appendChild(el9, el10);
          var el10 = dom.createTextNode("\n                      ");
          dom.appendChild(el9, el10);
          dom.appendChild(el8, el9);
          var el9 = dom.createTextNode("\n                    ");
          dom.appendChild(el8, el9);
          dom.appendChild(el7, el8);
          var el8 = dom.createTextNode("\n                  ");
          dom.appendChild(el7, el8);
          dom.appendChild(el6, el7);
          var el7 = dom.createTextNode("\n\n                  ");
          dom.appendChild(el6, el7);
          var el7 = dom.createElement("div");
          dom.setAttribute(el7, "class", "place--info--holder row");
          var el8 = dom.createTextNode("\n                    ");
          dom.appendChild(el7, el8);
          var el8 = dom.createElement("div");
          dom.setAttribute(el8, "class", "columns");
          var el9 = dom.createTextNode("\n                      ");
          dom.appendChild(el8, el9);
          var el9 = dom.createElement("div");
          dom.setAttribute(el9, "class", "place--phone align-middle collapse row");
          var el10 = dom.createTextNode("\n                        ");
          dom.appendChild(el9, el10);
          var el10 = dom.createElement("div");
          dom.setAttribute(el10, "class", "small-12 columns");
          var el11 = dom.createTextNode("\n                          ");
          dom.appendChild(el10, el11);
          var el11 = dom.createElement("label");
          var el12 = dom.createTextNode("Description\n                            ");
          dom.appendChild(el11, el12);
          var el12 = dom.createComment("");
          dom.appendChild(el11, el12);
          var el12 = dom.createTextNode("\n                          ");
          dom.appendChild(el11, el12);
          dom.appendChild(el10, el11);
          var el11 = dom.createTextNode("\n                        ");
          dom.appendChild(el10, el11);
          dom.appendChild(el9, el10);
          var el10 = dom.createTextNode("\n                      ");
          dom.appendChild(el9, el10);
          dom.appendChild(el8, el9);
          var el9 = dom.createTextNode("\n                    ");
          dom.appendChild(el8, el9);
          dom.appendChild(el7, el8);
          var el8 = dom.createTextNode("\n                  ");
          dom.appendChild(el7, el8);
          dom.appendChild(el6, el7);
          var el7 = dom.createTextNode("\n\n                  ");
          dom.appendChild(el6, el7);
          var el7 = dom.createElement("div");
          dom.setAttribute(el7, "class", "place--info--holder row");
          var el8 = dom.createTextNode("\n                    ");
          dom.appendChild(el7, el8);
          var el8 = dom.createElement("div");
          dom.setAttribute(el8, "class", "columns");
          var el9 = dom.createTextNode("\n                      ");
          dom.appendChild(el8, el9);
          var el9 = dom.createElement("div");
          dom.setAttribute(el9, "class", "place--rating");
          var el10 = dom.createTextNode("\n");
          dom.appendChild(el9, el10);
          var el10 = dom.createComment("");
          dom.appendChild(el9, el10);
          var el10 = dom.createTextNode("                      ");
          dom.appendChild(el9, el10);
          dom.appendChild(el8, el9);
          var el9 = dom.createTextNode("\n                    ");
          dom.appendChild(el8, el9);
          dom.appendChild(el7, el8);
          var el8 = dom.createTextNode("\n                  ");
          dom.appendChild(el7, el8);
          dom.appendChild(el6, el7);
          var el7 = dom.createTextNode("\n                ");
          dom.appendChild(el6, el7);
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("\n              ");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n            ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n          ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n        ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "place--info--holder row");
          var el3 = dom.createTextNode("\n          ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "columns");
          var el4 = dom.createTextNode("\n            ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("button");
          dom.setAttribute(el4, "type", "submit");
          dom.setAttribute(el4, "class", "button expanded");
          var el5 = dom.createTextNode("Save");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n          ");
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
          var el1 = dom.createTextNode("\n\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element16 = dom.childAt(fragment, [1]);
          var element17 = dom.childAt(element16, [1, 1, 1, 1]);
          var element18 = dom.childAt(element17, [1]);
          var element19 = dom.childAt(element18, [1]);
          var element20 = dom.childAt(element18, [9]);
          var element21 = dom.childAt(element20, [3, 1]);
          var element22 = dom.childAt(element17, [3]);
          var element23 = dom.childAt(element22, [3]);
          var morphs = new Array(11);
          morphs[0] = dom.createElementMorph(element16);
          morphs[1] = dom.createElementMorph(element19);
          morphs[2] = dom.createMorphAt(dom.childAt(element18, [5]), 1, 1);
          morphs[3] = dom.createMorphAt(dom.childAt(element20, [1]), 0, 0);
          morphs[4] = dom.createElementMorph(element21);
          morphs[5] = dom.createMorphAt(dom.childAt(element22, [1, 2, 1, 1, 1]), 1, 1);
          morphs[6] = dom.createMorphAt(dom.childAt(element23, [1, 1, 1, 1]), 1, 1);
          morphs[7] = dom.createMorphAt(dom.childAt(element23, [3, 1, 1, 1]), 1, 1);
          morphs[8] = dom.createMorphAt(dom.childAt(element22, [5, 1, 1, 1, 1]), 1, 1);
          morphs[9] = dom.createMorphAt(dom.childAt(element22, [7, 1, 1, 1, 1]), 1, 1);
          morphs[10] = dom.createMorphAt(dom.childAt(element22, [9, 1, 1]), 1, 1);
          return morphs;
        },
        statements: [["element", "action", ["savePlace", ["get", "model", ["loc", [null, [53, 33], [53, 38]]]]], ["on", "submit"], ["loc", [null, [53, 12], [53, 52]]]], ["element", "action", ["deletePlace", ["get", "model", ["loc", [null, [59, 82], [59, 87]]]]], ["bubbles", "false"], ["loc", [null, [59, 59], [59, 105]]]], ["inline", "input", [], ["type", "text", "class", "place--input", "value", ["subexpr", "@mut", [["get", "model.name", ["loc", [null, [63, 67], [63, 77]]]]], [], []]], ["loc", [null, [63, 20], [63, 79]]]], ["content", "model.label.name", ["loc", [null, [67, 49], [67, 69]]]], ["element", "action", ["showAddLabel"], ["bubbles", "false"], ["loc", [null, [69, 61], [69, 102]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "model.formattedaddress", ["loc", [null, [80, 42], [80, 64]]]]], [], []], "class", "place--main-input", "type", "text"], ["loc", [null, [80, 28], [80, 105]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "model.website", ["loc", [null, [93, 42], [93, 55]]]]], [], []], "class", "place--main-input", "type", "text"], ["loc", [null, [93, 28], [93, 95]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "model.phone", ["loc", [null, [102, 42], [102, 53]]]]], [], []], "class", "place--main-input", "type", "text"], ["loc", [null, [102, 28], [102, 93]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "model.pricerange", ["loc", [null, [114, 42], [114, 58]]]]], [], []], "class", "place--main-input", "type", "text"], ["loc", [null, [114, 28], [114, 98]]]], ["inline", "textarea", [], ["type", "text", "cols", "60", "rows", "3", "class", "place--main-input", "value", ["subexpr", "@mut", [["get", "model.description", ["loc", [null, [126, 102], [126, 119]]]]], [], []]], ["loc", [null, [126, 28], [126, 121]]]], ["block", "star-rating-fa", [], ["item", ["subexpr", "@mut", [["get", "model", ["loc", [null, [136, 48], [136, 53]]]]], [], []], "rating", ["subexpr", "@mut", [["get", "model.rating", ["loc", [null, [136, 61], [136, 73]]]]], [], []], "on-click", ["subexpr", "action", ["setRating"], [], ["loc", [null, [136, 83], [136, 103]]]]], 0, null, ["loc", [null, [136, 24], [144, 43]]]]],
        locals: [],
        templates: [child0]
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
                "line": 164,
                "column": 6
              },
              "end": {
                "line": 170,
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
          statements: [["inline", "google-map", [], ["longitude", ["subexpr", "@mut", [["get", "mapLng", ["loc", [null, [167, 33], [167, 39]]]]], [], []], "latitude", ["subexpr", "@mut", [["get", "mapLat", ["loc", [null, [167, 49], [167, 55]]]]], [], []]], ["loc", [null, [167, 10], [167, 57]]]]],
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
                  "line": 194,
                  "column": 18
                },
                "end": {
                  "line": 205,
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
              dom.setAttribute(el3, "class", "small-1 columns");
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
            statements: [["content", "model.formattedaddress", ["loc", [null, [201, 24], [201, 50]]]]],
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
                  "line": 206,
                  "column": 18
                },
                "end": {
                  "line": 219,
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
              dom.setAttribute(el4, "class", "small-1 columns");
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
              var element3 = dom.childAt(fragment, [1, 1]);
              var morphs = new Array(2);
              morphs[0] = dom.createAttrMorph(element3, 'href');
              morphs[1] = dom.createMorphAt(dom.childAt(element3, [1, 3]), 1, 1);
              return morphs;
            },
            statements: [["attribute", "href", ["concat", ["tel:", ["get", "model.phone", ["loc", [null, [208, 35], [208, 46]]]]]]], ["content", "model.phone", ["loc", [null, [214, 26], [214, 41]]]]],
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
                "line": 192,
                "column": 16
              },
              "end": {
                "line": 221,
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
            var element4 = dom.childAt(fragment, [1]);
            var morphs = new Array(2);
            morphs[0] = dom.createMorphAt(element4, 1, 1);
            morphs[1] = dom.createMorphAt(element4, 2, 2);
            return morphs;
          },
          statements: [["block", "if", [["get", "model.formattedaddress", ["loc", [null, [194, 24], [194, 46]]]]], [], 0, null, ["loc", [null, [194, 18], [205, 25]]]], ["block", "if", [["get", "model.phone", ["loc", [null, [206, 24], [206, 35]]]]], [], 1, null, ["loc", [null, [206, 18], [219, 25]]]]],
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
                  "line": 226,
                  "column": 18
                },
                "end": {
                  "line": 239,
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
              dom.setAttribute(el1, "class", "columns medium-6");
              var el2 = dom.createTextNode("\n                    ");
              dom.appendChild(el1, el2);
              var el2 = dom.createElement("a");
              var el3 = dom.createTextNode("\n                      ");
              dom.appendChild(el2, el3);
              var el3 = dom.createElement("div");
              dom.setAttribute(el3, "class", "place--spacing place--website row");
              var el4 = dom.createTextNode("\n                        ");
              dom.appendChild(el3, el4);
              var el4 = dom.createElement("div");
              dom.setAttribute(el4, "class", "small-1 columns");
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
              var element1 = dom.childAt(fragment, [1, 1]);
              var morphs = new Array(2);
              morphs[0] = dom.createAttrMorph(element1, 'href');
              morphs[1] = dom.createMorphAt(dom.childAt(element1, [1, 3]), 1, 1);
              return morphs;
            },
            statements: [["attribute", "href", ["concat", [["get", "model.website", ["loc", [null, [228, 31], [228, 44]]]]]]], ["content", "model.website", ["loc", [null, [234, 26], [234, 43]]]]],
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
                  "line": 240,
                  "column": 18
                },
                "end": {
                  "line": 253,
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
              dom.setAttribute(el3, "class", "place--url row");
              var el4 = dom.createTextNode("\n                        ");
              dom.appendChild(el3, el4);
              var el4 = dom.createElement("div");
              dom.setAttribute(el4, "class", "small-1 columns");
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
              var element0 = dom.childAt(fragment, [1, 1]);
              var morphs = new Array(1);
              morphs[0] = dom.createAttrMorph(element0, 'href');
              return morphs;
            },
            statements: [["attribute", "href", ["concat", [["get", "model.url", ["loc", [null, [242, 31], [242, 40]]]]]]]],
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
                "line": 224,
                "column": 16
              },
              "end": {
                "line": 255,
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
            var element2 = dom.childAt(fragment, [1]);
            var morphs = new Array(2);
            morphs[0] = dom.createMorphAt(element2, 1, 1);
            morphs[1] = dom.createMorphAt(element2, 2, 2);
            return morphs;
          },
          statements: [["block", "if", [["get", "model.website", ["loc", [null, [226, 24], [226, 37]]]]], [], 0, null, ["loc", [null, [226, 18], [239, 25]]]], ["block", "if", [["get", "model.url", ["loc", [null, [240, 24], [240, 33]]]]], [], 1, null, ["loc", [null, [240, 18], [253, 25]]]]],
          locals: [],
          templates: [child0, child1]
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
                "line": 270,
                "column": 18
              },
              "end": {
                "line": 281,
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
            dom.setAttribute(el2, "class", "place--price row");
            var el3 = dom.createTextNode("\n                      ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("div");
            dom.setAttribute(el3, "class", "small-1 columns");
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
          statements: [["content", "model.pricerange", ["loc", [null, [277, 24], [277, 44]]]]],
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
                "line": 284,
                "column": 16
              },
              "end": {
                "line": 297,
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
            dom.setAttribute(el2, "class", "columns");
            var el3 = dom.createTextNode("\n                    ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("div");
            dom.setAttribute(el3, "class", "place--description row");
            var el4 = dom.createTextNode("\n                      ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("div");
            dom.setAttribute(el4, "class", "small-1 columns");
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
          statements: [["content", "model.description", ["loc", [null, [292, 24], [292, 45]]]]],
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
              "line": 162,
              "column": 4
            },
            "end": {
              "line": 311,
              "column": 4
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
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
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
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "place--holder");
          var el4 = dom.createTextNode("\n            ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("article");
          dom.setAttribute(el4, "class", "place");
          var el5 = dom.createTextNode("\n              ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("header");
          dom.setAttribute(el5, "class", "place--header");
          var el6 = dom.createTextNode("\n                ");
          dom.appendChild(el5, el6);
          var el6 = dom.createElement("a");
          dom.setAttribute(el6, "href", "#");
          dom.setAttribute(el6, "class", "button share-button");
          var el7 = dom.createElement("i");
          dom.setAttribute(el7, "class", "place--action--icon fa fa-share-alt");
          dom.appendChild(el6, el7);
          var el7 = dom.createTextNode("Share");
          dom.appendChild(el6, el7);
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("\n                ");
          dom.appendChild(el5, el6);
          var el6 = dom.createElement("a");
          dom.setAttribute(el6, "href", "#");
          dom.setAttribute(el6, "class", "button edit-button");
          var el7 = dom.createElement("i");
          dom.setAttribute(el7, "class", "place--action--icon fa fa-pencil-square-o");
          dom.appendChild(el6, el7);
          var el7 = dom.createTextNode("Edit");
          dom.appendChild(el6, el7);
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("\n\n                ");
          dom.appendChild(el5, el6);
          var el6 = dom.createElement("h2");
          dom.setAttribute(el6, "class", "place--title");
          var el7 = dom.createComment("");
          dom.appendChild(el6, el7);
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("\n                ");
          dom.appendChild(el5, el6);
          var el6 = dom.createElement("i");
          dom.setAttribute(el6, "class", "place--labels--icon fa fa-tag");
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("\n                ");
          dom.appendChild(el5, el6);
          var el6 = dom.createElement("ul");
          dom.setAttribute(el6, "class", "place--labels clearfix");
          var el7 = dom.createTextNode("\n                  ");
          dom.appendChild(el6, el7);
          var el7 = dom.createElement("li");
          dom.setAttribute(el7, "class", "place--labelitem");
          var el8 = dom.createComment("");
          dom.appendChild(el7, el8);
          dom.appendChild(el6, el7);
          var el7 = dom.createTextNode("\n                  ");
          dom.appendChild(el6, el7);
          var el7 = dom.createElement("li");
          dom.setAttribute(el7, "class", "place--labelitem");
          var el8 = dom.createTextNode("\n                    ");
          dom.appendChild(el7, el8);
          var el8 = dom.createElement("i");
          dom.setAttribute(el8, "class", "place--add--icon fa fa-plus");
          dom.appendChild(el7, el8);
          var el8 = dom.createTextNode("\n                  ");
          dom.appendChild(el7, el8);
          dom.appendChild(el6, el7);
          var el7 = dom.createTextNode("\n                ");
          dom.appendChild(el6, el7);
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("\n              ");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n\n              ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("main");
          dom.setAttribute(el5, "class", "place--main");
          var el6 = dom.createTextNode("\n");
          dom.appendChild(el5, el6);
          var el6 = dom.createComment("");
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("\n\n");
          dom.appendChild(el5, el6);
          var el6 = dom.createComment("");
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("\n                ");
          dom.appendChild(el5, el6);
          var el6 = dom.createElement("div");
          dom.setAttribute(el6, "class", "place--info--holder row");
          var el7 = dom.createTextNode("\n                  ");
          dom.appendChild(el6, el7);
          var el7 = dom.createElement("div");
          dom.setAttribute(el7, "class", "columns small-12  medium-6");
          var el8 = dom.createTextNode("\n                    ");
          dom.appendChild(el7, el8);
          var el8 = dom.createElement("a");
          dom.setAttribute(el8, "target", "_blank");
          var el9 = dom.createTextNode("\n                      ");
          dom.appendChild(el8, el9);
          var el9 = dom.createElement("div");
          dom.setAttribute(el9, "class", "place--spacing place--direction row");
          var el10 = dom.createTextNode("\n                        ");
          dom.appendChild(el9, el10);
          var el10 = dom.createElement("div");
          dom.setAttribute(el10, "class", "small-1 columns");
          var el11 = dom.createTextNode("\n                          ");
          dom.appendChild(el10, el11);
          var el11 = dom.createElement("i");
          dom.setAttribute(el11, "class", "place--main--icon fa fa-location-arrow");
          dom.appendChild(el10, el11);
          var el11 = dom.createTextNode("\n                        ");
          dom.appendChild(el10, el11);
          dom.appendChild(el9, el10);
          var el10 = dom.createTextNode("\n                        ");
          dom.appendChild(el9, el10);
          var el10 = dom.createElement("div");
          dom.setAttribute(el10, "class", "small-11 columns");
          var el11 = dom.createTextNode("\n                          Get direction\n                        ");
          dom.appendChild(el10, el11);
          dom.appendChild(el9, el10);
          var el10 = dom.createTextNode("\n                      ");
          dom.appendChild(el9, el10);
          dom.appendChild(el8, el9);
          var el9 = dom.createTextNode("\n                    ");
          dom.appendChild(el8, el9);
          dom.appendChild(el7, el8);
          var el8 = dom.createTextNode("\n                  ");
          dom.appendChild(el7, el8);
          dom.appendChild(el6, el7);
          var el7 = dom.createTextNode("\n");
          dom.appendChild(el6, el7);
          var el7 = dom.createComment("");
          dom.appendChild(el6, el7);
          var el7 = dom.createTextNode("                ");
          dom.appendChild(el6, el7);
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("\n\n");
          dom.appendChild(el5, el6);
          var el6 = dom.createComment("");
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("                ");
          dom.appendChild(el5, el6);
          var el6 = dom.createElement("div");
          dom.setAttribute(el6, "class", "place--info--holder row");
          var el7 = dom.createTextNode("\n                  ");
          dom.appendChild(el6, el7);
          var el7 = dom.createElement("div");
          dom.setAttribute(el7, "class", "columns");
          var el8 = dom.createTextNode("\n                    ");
          dom.appendChild(el7, el8);
          var el8 = dom.createElement("div");
          dom.setAttribute(el8, "class", "place--rating");
          var el9 = dom.createTextNode("\n                      ");
          dom.appendChild(el8, el9);
          var el9 = dom.createComment("");
          dom.appendChild(el8, el9);
          var el9 = dom.createTextNode("\n                    ");
          dom.appendChild(el8, el9);
          dom.appendChild(el7, el8);
          var el8 = dom.createTextNode("\n                  ");
          dom.appendChild(el7, el8);
          dom.appendChild(el6, el7);
          var el7 = dom.createTextNode("\n                ");
          dom.appendChild(el6, el7);
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("\n              ");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n            ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n          ");
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
          var element5 = dom.childAt(fragment, [4, 1, 1, 1]);
          var element6 = dom.childAt(element5, [1]);
          var element7 = dom.childAt(element6, [1]);
          var element8 = dom.childAt(element6, [3]);
          var element9 = dom.childAt(element6, [9]);
          var element10 = dom.childAt(element9, [3, 1]);
          var element11 = dom.childAt(element5, [3]);
          var element12 = dom.childAt(element11, [5]);
          var element13 = dom.childAt(element12, [1, 1]);
          var morphs = new Array(12);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          morphs[1] = dom.createElementMorph(element7);
          morphs[2] = dom.createElementMorph(element8);
          morphs[3] = dom.createMorphAt(dom.childAt(element6, [5]), 0, 0);
          morphs[4] = dom.createMorphAt(dom.childAt(element9, [1]), 0, 0);
          morphs[5] = dom.createElementMorph(element10);
          morphs[6] = dom.createMorphAt(element11, 1, 1);
          morphs[7] = dom.createMorphAt(element11, 3, 3);
          morphs[8] = dom.createAttrMorph(element13, 'href');
          morphs[9] = dom.createMorphAt(element12, 3, 3);
          morphs[10] = dom.createMorphAt(element11, 7, 7);
          morphs[11] = dom.createMorphAt(dom.childAt(element11, [9, 1, 1]), 1, 1);
          return morphs;
        },
        statements: [["block", "if", [["get", "model.locationlat", ["loc", [null, [164, 12], [164, 29]]]]], [], 0, null, ["loc", [null, [164, 6], [170, 13]]]], ["element", "action", ["sharePlace"], [], ["loc", [null, [178, 56], [178, 79]]]], ["element", "action", ["toggleEdition"], [], ["loc", [null, [179, 55], [179, 81]]]], ["content", "model.name", ["loc", [null, [181, 41], [181, 55]]]], ["content", "model.label.name", ["loc", [null, [184, 47], [184, 67]]]], ["element", "action", ["showAddLabel"], ["bubbles", "false"], ["loc", [null, [186, 59], [186, 100]]]], ["block", "if", [["get", "hasPhoneOrAddress", ["loc", [null, [192, 22], [192, 39]]]]], [], 1, null, ["loc", [null, [192, 16], [221, 23]]]], ["block", "if", [["get", "hasUrlOrWebsite", ["loc", [null, [224, 22], [224, 37]]]]], [], 2, null, ["loc", [null, [224, 16], [255, 23]]]], ["attribute", "href", ["concat", ["http://maps.google.com/maps?daddr=", ["get", "model.locationlat", ["loc", [null, [259, 65], [259, 82]]]], ",", ["get", "model.locationlng", ["loc", [null, [259, 87], [259, 104]]]], "&ll="]]], ["block", "if", [["get", "model.pricerange", ["loc", [null, [270, 24], [270, 40]]]]], [], 3, null, ["loc", [null, [270, 18], [281, 25]]]], ["block", "if", [["get", "model.description", ["loc", [null, [284, 22], [284, 39]]]]], [], 4, null, ["loc", [null, [284, 16], [297, 23]]]], ["inline", "star-rating-fa", [], ["item", ["subexpr", "@mut", [["get", "model", ["loc", [null, [301, 44], [301, 49]]]]], [], []], "rating", ["subexpr", "@mut", [["get", "model.rating", ["loc", [null, [301, 57], [301, 69]]]]], [], []]], ["loc", [null, [301, 22], [301, 71]]]]],
        locals: [],
        templates: [child0, child1, child2, child3, child4]
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
            "line": 314,
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
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "medium-8 medium-offset-2 columns");
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
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "place--details row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "medium-8 medium-offset-2 columns");
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("form");
        dom.setAttribute(el4, "class", "add-label--form");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "row");
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "back-button--holder small-2 columns");
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("a");
        var el8 = dom.createElement("i");
        dom.setAttribute(el8, "class", "back-button fa fa-arrow-left");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n          ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
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
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
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
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("a");
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
        var element25 = dom.childAt(fragment, [2, 1]);
        var element26 = dom.childAt(element25, [1]);
        var element27 = dom.childAt(element26, [1]);
        var element28 = dom.childAt(element27, [1]);
        var element29 = dom.childAt(element28, [1, 1]);
        var element30 = dom.childAt(element25, [3]);
        var morphs = new Array(8);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0, 1]), 1, 1);
        morphs[1] = dom.createAttrMorph(element26, 'class');
        morphs[2] = dom.createElementMorph(element29);
        morphs[3] = dom.createMorphAt(dom.childAt(element28, [3]), 1, 1);
        morphs[4] = dom.createMorphAt(dom.childAt(element27, [3, 1, 1]), 1, 1);
        morphs[5] = dom.createAttrMorph(element30, 'class');
        morphs[6] = dom.createElementMorph(element30);
        morphs[7] = dom.createMorphAt(element25, 5, 5);
        return morphs;
      },
      statements: [["block", "link-to", ["places"], [], 0, null, ["loc", [null, [3, 4], [3, 81]]]], ["attribute", "class", ["concat", ["panel right ", ["get", "labelPanelDisplayed", ["loc", [null, [9, 30], [9, 49]]]]]]], ["element", "action", ["closeMenuPanel"], [], ["loc", [null, [13, 15], [13, 42]]]], ["content", "add-label", ["loc", [null, [16, 12], [16, 25]]]], ["block", "each", [["get", "labelsList.labels", ["loc", [null, [22, 22], [22, 39]]]]], [], 1, null, ["loc", [null, [22, 14], [43, 23]]]], ["attribute", "class", ["concat", ["panel-overlay right ", ["get", "labelPanelDisplayed", ["loc", [null, [49, 36], [49, 55]]]]]]], ["element", "action", ["closeMenuPanel"], [], ["loc", [null, [49, 59], [49, 86]]]], ["block", "if", [["get", "isEditing", ["loc", [null, [51, 10], [51, 19]]]]], [], 2, 3, ["loc", [null, [51, 4], [311, 11]]]]],
      locals: [],
      templates: [child0, child1, child2, child3]
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
                    "line": 10,
                    "column": 14
                  },
                  "end": {
                    "line": 19,
                    "column": 14
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
              statements: [["content", "place.formattedaddress", ["loc", [null, [16, 20], [16, 46]]]]],
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
                    "line": 21,
                    "column": 14
                  },
                  "end": {
                    "line": 30,
                    "column": 14
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
              statements: [["content", "place.phone", ["loc", [null, [27, 20], [27, 35]]]]],
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
                  "line": 36,
                  "column": 8
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
            statements: [["attribute", "id", ["concat", ["card_", ["get", "index", ["loc", [null, [7, 30], [7, 35]]]]]]], ["content", "place.name", ["loc", [null, [8, 36], [8, 50]]]], ["block", "if", [["get", "place.formattedaddress", ["loc", [null, [10, 20], [10, 42]]]]], [], 0, null, ["loc", [null, [10, 14], [19, 21]]]], ["block", "if", [["get", "place.phone", ["loc", [null, [21, 20], [21, 31]]]]], [], 1, null, ["loc", [null, [21, 14], [30, 21]]]], ["content", "place.label.name", ["loc", [null, [32, 52], [32, 72]]]]],
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
                "line": 5,
                "column": 6
              },
              "end": {
                "line": 37,
                "column": 6
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
          statements: [["block", "link-to", ["place", ["get", "place", ["loc", [null, [6, 27], [6, 32]]]]], [], 0, null, ["loc", [null, [6, 8], [36, 20]]]]],
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
              "line": 4,
              "column": 4
            },
            "end": {
              "line": 38,
              "column": 4
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
        statements: [["block", "masonry-item", [], ["item", ["subexpr", "@mut", [["get", "place", ["loc", [null, [5, 27], [5, 32]]]]], [], []], "grid", ["subexpr", "@mut", [["get", "grid", ["loc", [null, [5, 38], [5, 42]]]]], [], []]], 0, null, ["loc", [null, [5, 6], [37, 23]]]]],
        locals: ["place", "index", "grid"],
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
            "line": 43,
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
        var el1 = dom.createTextNode("\n");
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
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element2 = dom.childAt(fragment, [1, 1]);
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(element2, 1, 1);
        morphs[1] = dom.createMorphAt(element2, 3, 3);
        return morphs;
      },
      statements: [["block", "masonry-grid", [], ["items", ["subexpr", "@mut", [["get", "sessionAccount.sortedPlaces", ["loc", [null, [4, 26], [4, 53]]]]], [], []], "customLayout", true], 0, null, ["loc", [null, [4, 4], [38, 21]]]], ["content", "outlet", ["loc", [null, [40, 4], [40, 14]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("finndis/templates/search", ["exports"], function (exports) {
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
            "line": 6,
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
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "columns medium-8 medium-offset-2");
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
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0, 1]), 1, 1);
        return morphs;
      },
      statements: [["inline", "google-search", [], ["latitude", "34.851939", "longitude", "-82.399752"], ["loc", [null, [3, 4], [3, 65]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("finndis/templates/users", ["exports"], function (exports) {
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
                "line": 12,
                "column": 6
              },
              "end": {
                "line": 14,
                "column": 6
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
            var el1 = dom.createTextNode("        ");
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
          statements: [["content", "place.name", ["loc", [null, [13, 8], [13, 22]]]]],
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
              "column": 2
            },
            "end": {
              "line": 16,
              "column": 2
            }
          },
          "moduleName": "finndis/templates/users.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("    ");
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
        statements: [["block", "link-to", ["place", ["get", "place", ["loc", [null, [12, 25], [12, 30]]]]], [], 0, null, ["loc", [null, [12, 6], [14, 18]]]]],
        locals: ["place"],
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
            "line": 18,
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
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("User page");
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
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" ");
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
        var el1 = dom.createElement("ul");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2, 1]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(element0, 1, 1);
        morphs[1] = dom.createMorphAt(element0, 3, 3);
        morphs[2] = dom.createMorphAt(dom.childAt(fragment, [4]), 1, 1);
        return morphs;
      },
      statements: [["content", "model.firstname", ["loc", [null, [5, 6], [5, 25]]]], ["content", "model.lastname", ["loc", [null, [5, 26], [5, 44]]]], ["block", "each", [["get", "model.places", ["loc", [null, [10, 10], [10, 22]]]]], [], 0, null, ["loc", [null, [10, 2], [16, 11]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define('finndis/torii-providers/facebook', ['exports', 'torii/providers/facebook-oauth2'], function (exports, _toriiProvidersFacebookOauth2) {
  exports['default'] = _toriiProvidersFacebookOauth2['default'].extend({
    fetch: function fetch(data) {
      return data;
    }
  });
});
define('finndis/torii-providers/google', ['exports', 'torii/providers/google-oauth2'], function (exports, _toriiProvidersGoogleOauth2) {
  exports['default'] = _toriiProvidersGoogleOauth2['default'].extend({
    fetch: function fetch(data) {
      return data;
    }
  });
});
define('finndis/torii-providers/twitter', ['exports', 'torii/providers/google-oauth2'], function (exports, _toriiProvidersGoogleOauth2) {
  exports['default'] = _toriiProvidersGoogleOauth2['default'].extend({
    fetch: function fetch(data) {
      return data;
    }
  });
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
  require("finndis/app")["default"].create({"name":"finndis","version":"0.0.0+"});
}

/* jshint ignore:end */
//# sourceMappingURL=finndis.map