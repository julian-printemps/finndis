import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  isEditing: false,
  labelPanelDisplayed: '',
  mapLat: Ember.computed('model', function() {
    return this.get('model.locationlat');
  }),
  mapLng: Ember.computed('model', function() {
    return this.get('model.locationlng');
  }),

  hasUrlOrWebsite: Ember.computed(function() {
    if( (this.get('model.url') !== '' && this.get('model.url') !== null) || (this.get('model.website') !== '' && this.get('model.website') !== null) ){
      return true;
    }
    else { return false; }
  }),

  hasPhoneOrAddress: Ember.computed(function() {
    if( (this.get('model.longaddress') !== '' && this.get('model.longaddress') !== null) || (this.get('model.phone') !== '' && this.get('model.phone') !== null) ){
      return true;
    } else { return false; }
  }),

  userLabels: Ember.computed(function() {
    var labels = this.get('store').peekAll('label');
    return labels;
  }),


  actions: {

    showAddLabel() {
      this.set('labelPanelDisplayed', 'show');
    },

    closeMenuPanel() {
      this.set('labelPanelDisplayed', '');
    },


    toggleEdition() {
      var self = this;
      this.set('isEditing', true);

      $(document).keyup(function(e) {
        if (e.keyCode === 27) {
          self.set('isEditing', false);
        }
      });
    },

    updateLabel(labelValue) {
      var self = this;
      this.get('store').findRecord('label', labelValue ).then( function(label){
        self.set('model.label', label);
        self.get('model').save();
      });
    },


    setRating(params){
      var place = this.get('model');
      const { item: model, rating } = params;
      place.set('rating', rating);
      place.save();
    },

    setPrice(params){
      var place = this.get('model');
      const { item: model, rating } = params;
      place.set('pricerange', rating);
      place.save();
    },

    savePlace(model){
      var self = this;

      var isAddressSet = function(elem){
        if( elem !== '' ){ return true; }
        else { return false; }
      };

      if( isAddressSet(model.get('formattedaddress')) ){
        var geocoder = new google.maps.Geocoder();

        geocoder.geocode({'address': model.get('formattedaddress') }, function(results, status) {

          if (status === google.maps.GeocoderStatus.OK) {
            model.set('locationlat', results[0].geometry.location.lat());
            model.set('locationlng', results[0].geometry.location.lng());
            self.set('mapLat', results[0].geometry.location.lat());
            self.set('mapLng', results[0].geometry.location.lng());

            model.set('formattedaddress', results[0].formatted_address);

            var addressComponents = results[0].address_components;
            addressComponents.forEach(function(component){
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

    cancelPlace() {
      var self = this;
      var model = this.get('model');
      this.get('store').findRecord('place', model.get('id')).then( function(place){
        place.reload();
        self.set('model', place);
        self.set('isEditing', false);
      });
    },

    deletePlace(model) {
      var self = this;
      model.deleteRecord();
      model.get('isDeleted');
      model.save().then(function(){
        self.set('isEditing', false);
        self.transitionToRoute('places');
      });

    },

  }
});
