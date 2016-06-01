define('ember-cli-foundation-6-sass/components/zf-slider', ['exports', 'ember', 'ember-cli-foundation-6-sass/mixins/zf-widget'], function (exports, _ember, _emberCliFoundation6SassMixinsZfWidget) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend(_emberCliFoundation6SassMixinsZfWidget['default'], {

    /** @member Class names */
    classNames: ['slider'],

    /** @member Attribute bindings */
    attributeBindings: ['data-slider', 'data-initial-start:inital-start', 'data-end:end-value'],

    /** @member Makes the data attribute binding appear */
    'data-slider': ' ',

    /** @member Start value of slider */
    'initial-start': 50,

    /** @member End value of slider */
    'end-value': 200,

    /** @member Foundation type */
    'zfType': 'Slider',

    /** @member Foundation specific options */
    'zfOptions': ['start', 'end', 'step', 'initialStart', 'initialEnd', 'binding', 'clickSelect', 'vertical', 'draggable', 'disabled', 'doubleSided', 'decimal', 'moveTime', 'disabledClass']
  });
});