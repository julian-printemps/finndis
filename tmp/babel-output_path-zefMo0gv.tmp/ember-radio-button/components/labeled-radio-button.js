define('ember-radio-button/components/labeled-radio-button', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  var computed = _ember['default'].computed;

  exports['default'] = _ember['default'].Component.extend({
    tagName: 'label',
    attributeBindings: ['for'],
    classNameBindings: ['checked'],
    classNames: ['ember-radio-button'],
    defaultLayout: null, // ie8 support

    checked: computed('groupValue', 'value', function () {
      return this.get('groupValue') === this.get('value');
    }).readOnly(),

    'for': computed.readOnly('radioId'),

    actions: {
      innerRadioChanged: function innerRadioChanged(value) {
        this.sendAction('changed', value);
      }
    }
  });
});