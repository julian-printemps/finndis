import Ember from 'ember';
import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import JSONAPIAdapter from 'ember-data/adapters/json-api';
import config from '../config/environment';
const { String: { pluralize, underscore } } = Ember;

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:application',
  host: config.host,
  coalesceFindRequests: true,

  pathForType(type) {
    return pluralize(underscore(type));
  }
});


// import Ember from 'ember';
// import JSONAPIAdapter from 'ember-data/adapters/json-api';
//
// const { String: { pluralize, underscore } } = Ember;
//
// export default JSONAPIAdapter.extend({
//
//   pathForType(type) {
//     return pluralize(underscore(type));
//   }
//
// });
