import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  routing: Ember.inject.service('-routing'),
  session: Ember.inject.service('session'),

  userLabels: Ember.computed(function() {
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

  didInsertElement() {
    this._super(...arguments);
    var self = this;
    $(document).keyup(function(e) {
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
    showAddLabel() {
      this.set('labelPanelDisplayed', 'show');
    },

    searchMaps(param){
      var self = this;
      var map = '';
      var input = document.getElementById('searchKeyword');
      input.value = '';
      var finndis = "assets/images/finndis-icon.svg";

      // For search around
      if( param === undefined ){
        var keyword = null;
      }
      else {
        var keyword = param.get('name');
        self.set('queryType', keyword);
      }

      this.send('closeMenuPanel');
      self.set('searchPanelDisplayed', '');


      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
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
          if( keyword === null ){
            map.addListener('bounds_changed', function() {
              searchBox.setBounds(map.getBounds());
            });
          }
          else {
            map.addListener('idle', performSearch);
          }



          /*
          ** POI click
          */
          var set = google.maps.InfoWindow.prototype.set;
          google.maps.InfoWindow.prototype.set = function (key, val) {
            if (key === 'map' && ! this.get('noSuppress')) {
              var geocoder = new google.maps.Geocoder();
              var location = this.getPosition();
              placeMarker(location);
              return;
            }
            set.apply(this, arguments);
          }


          /*
          ** Add marker on click & save new custon place
          */
          google.maps.event.addListener(map, 'click', function(event) {
            placeMarker(event.latLng);
          });

          function placeMarker(location) {
            markerUser.setPosition(location);

            loadPlace(location);
            google.maps.event.addListener(markerUser, 'click', function() {
              self.set('placePanelDisplayed', 'show');
              loadPlace(event.latLng);
            });

            google.maps.event.addListener(markerUser, 'dragend', function(event) {
              markerUser.setPosition(event.latLng);
              loadPlace(event.latLng);
            });
          }

          function loadPlace(location){
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({'location': location }, function(result, status) {
              if (status === google.maps.GeocoderStatus.OK) {
                // Set info
                var service = new google.maps.places.PlacesService(map);
                service.getDetails({
                  placeId: result[0].place_id
                }, function(place, status) {
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
          searchBox.addListener('places_changed', function() {
            var places = searchBox.getPlaces();
            if (places.length == 0) {
              return;
            }
            // Clear out the old markers.
            markers.forEach(function(marker) {
              marker.setMap(null);
            });
            markers = [];
            // For each place, get the icon, name and location.
            var bounds = new google.maps.LatLngBounds();
            places.forEach(function(place) {
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

            google.maps.event.addListener(marker, 'click', function() {
              service.getDetails(place, function(result, status) {
                if (status !== google.maps.places.PlacesServiceStatus.OK) {
                  console.error(status);
                  return;
                }
                self.set('placePanelDisplayed', 'show');
                infoWindow.setContent('<div><strong id="placeName">' + result.name + '</strong></div>' +
                  '<div>' +
                  result.formatted_address + '</div>');
                infoWindow.open(map, marker);

                // Set current place
                self.send('setPlaceMaps', result);
              });
            });
          }

        },
        function (error) {
          if (error.code == error.PERMISSION_DENIED){
            $('#load_overlay').hide();
            self.set('showErrorLocation', true);
          }
        });
      }
    },
    // End of searchMaps

    setPlaceMaps(result) {
      var self = this;

      self.get('store').query('place', { filter: { uid: self.get('session.uid'), mapid: result.place_id } }).then(function(currentPlace) {
        var placeCount = 0;
        currentPlace.forEach(function(elem) {
          placeCount++;
        });

        if(placeCount === 0){
          self.set('placeExist', false);
        }
        else {
          self.set('placeExist', true);
        }
      });

      self.send('loadPlaceMaps', result);
    },


    loadPlaceMaps(result) {
      var self = this;

      if(result.place_id){
        self.set('place.mapid', result.place_id);
      }
      if(result.name){
        self.set('place.name', result.name);
      }
      if(result.geometry.location){
        self.set('place.locationlat', result.geometry.location.lat());
        self.set('place.locationlng', result.geometry.location.lng());
      }
      if(result.international_phone_number){
        self.set('place.phone', result.international_phone_number);
      }
      if(result.opening_hours !== undefined){
        self.set('place.openinghours', result.opening_hours.periods);
      }
      if(result.permanently_closed){
        self.set('place.permanentlyclosed', result.permanently_closed);
      }
      if(result.rating){
        self.set('place.rating', result.rating);
      }
      if(result.url){
        self.set('place.url', result.url);
      }
      if(result.website){
        self.set('place.website', result.website);
      }
      self.set('place.formattedaddress', result.formatted_address);

      // Set current address
      self.send('setAddress', result.address_components);
    },


    setAddress(addressComponents) {
      var self = this;
      addressComponents.forEach(function(component){
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


    showSearchPanel() {
      this.set('searchPanelDisplayed', 'show');
      $('body').toggleClass('__noscroll');
      this.set('placePanelDisplayed', '');
      this.set('searchPanelIsDisplayed', true);
    },

    closeMenuPanel() {
      this.set('searchPanelDisplayed', '');
      this.set('searchPanelIsDisplayed', false);
      this.set('placePanelDisplayed', '');
      if( $('body').hasClass('__noscroll') ){
        $('body').removeClass('__noscroll');
      }
    },

    showLabelAdd() {
      this.set('labelAdd', '__edition');
      this.set('labelAddButton', '__hidden');

      $(document).keyup(function(e) {
        if (e.keyCode === 27) {
          self.set('searchPanelIsDisplayed', false);
          self.set('placePanelDisplayed', '');
        }
      });
    },

    hideLabelAdd() {
      this.set('labelAdd', '');
      this.set('labelAddButton', '');
    },


    savePlace() {
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

      newPlace.save().then(function() {
        self.get('routing').transitionTo('places');
      });
    }
  }
});
