define('ember-cli-foundation-6-sass/components/zf-drilldown-menu', ['exports', 'ember', 'ember-cli-foundation-6-sass/mixins/zf-widget'], function (exports, _ember, _emberCliFoundation6SassMixinsZfWidget) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend(_emberCliFoundation6SassMixinsZfWidget['default'], {

    /** @member tag type */
    tagName: 'ul',

    /** @member Class names */
    classNames: ['vertical', 'menu'],

    /** @member Attribute bindings */
    attributeBindings: ['data-drilldown'],

    /** @member Makes the data attribute binding appear */
    'data-drilldown': ' ',

    /** @member Foundation type */
    'zfType': 'Drilldown',

    /** @member Foundation specific options */
    'zfOptions': ['backButton', 'wrapper', 'closeOnClick']
  });
});