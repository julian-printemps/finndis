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


  didInsertElement() {
    this._super(...arguments);
    var self = this;
    $(document).keyup(function(e) {
      if (e.keyCode === 27) {
        if( self.get('labelPanelDisplayed') === 'show' ){
          self.set('labelPanelDisplayed', '');
        } else{
          self.set('placePanelDisplayed', '');
        }
      }
    });
    $('#navigation').addClass('__fixed');
    this.send('displayMap');
  },


  actions: {
    showAddLabel() {
      this.set('labelPanelDisplayed', 'show');
    },

    displayMap(){
      var self = this;
      var map = '';
      var model = this.get('model');
      var finndis = "assets/images/finndis-icon.svg";
      this.send('closeMenuPanel');

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

          // Add marker for all place
          model.forEach(function(place) {
            addMarker(place);
          });


          /*
          ** Add marker
          */
          function addMarker(place) {
            var marker = new google.maps.Marker({
              map: map,
              position: {lat: parseFloat(place.get('locationlat')), lng: parseFloat(place.get('locationlng'))},
              icon: finndis
            });

            google.maps.event.addListener(marker, 'click', function() {
              self.set('place', place);
              self.set('placePanelDisplayed', 'show');
            });
          }

        });
        // End geolocation

      }
    },
    // End of searchMaps


    closeMenuPanel() {
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

    setRating(params){
      var place = this.get('model');
      const { item: model, rating } = params;
      place.set('rating', rating);
      place.save();
    },

    hideLabelAdd() {
      this.set('labelAdd', '');
      this.set('labelAddButton', '');
    }

  }
});
