define('ember-cli-foundation-6-sass/components/zf-magellan', ['exports', 'ember', 'ember-cli-foundation-6-sass/mixins/zf-widget'], function (exports, _ember, _emberCliFoundation6SassMixinsZfWidget) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend(_emberCliFoundation6SassMixinsZfWidget['default'], {

    /** @member tag type */
    tagName: 'ul',

    /** @member Class names */
    classNames: ['horizontal', 'menu'],

    /** @member Attribute bindings */
    attributeBindings: ['data-magellan'],

    /** @member Makes the data attribute binding appear */
    'data-magellan': ' ',

    /** @member Foundation type */
    'zfType': 'Magellan',

    /** @member Foundation specific options */
    'zfOptions': ['animationDuration', 'animationEasing', 'threshold', 'threshold', 'deepLinking', 'barOffset']
  });
});