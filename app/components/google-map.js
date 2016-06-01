import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),

  didInsertElement() {
    this._super(...arguments);
    var self = this;
    var map = '';
    var finndis = "assets/images/finndis-icon.svg";

    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: {lat: parseFloat(self.get('latitude')), lng: parseFloat(self.get('longitude'))},
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
      position: {lat: parseFloat(self.get('latitude')), lng: parseFloat(self.get('longitude'))},
      icon: finndis
    });
  },

  didUpdate(){
    this._super(...arguments);
    var self = this;
    var map = '';

    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: {lat: parseFloat(self.get('latitude')), lng: parseFloat(self.get('longitude'))}
    });
    var marker = new google.maps.Marker({
      map: map,
      position: {lat: parseFloat(self.get('latitude')), lng: parseFloat(self.get('longitude'))}
    });
  }
});
