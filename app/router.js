import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('places', {path: '/home'});
  this.route('place', {path: '/:place_id'});
  this.route('add-place', {path: '/add'});
  this.route('labels');
  this.route('label', {path: 'labels/:label_id'});
  this.route('users', {path: '/profile'});
  this.route('search');
  this.route('edit-labels', {path: 'labels/edit'});
  this.route('login', {path: '/'});
  this.route('map');
  this.route('help');
});

export default Router;
