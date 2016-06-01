define('ember-cli-foundation-6-sass/components/zf-tabs', ['exports', 'ember', 'ember-cli-foundation-6-sass/mixins/zf-widget'], function (exports, _ember, _emberCliFoundation6SassMixinsZfWidget) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend(_emberCliFoundation6SassMixinsZfWidget['default'], {

    /** @member tag type */
    tagName: 'ul',

    /** @member Class names */
    classNames: ['tabs'],

    /** @member Attribute bindings */
    attributeBindings: ['data-tabs'],

    /** @member Makes the data attribute binding appear */
    'data-tabs': ' ',

    /** @member Foundation type */
    'zfType': 'Tabs',

    /** @member Foundation specific options */
    'zfOptions': ['autoFocus', 'wrapOnKeys', 'matchHeight', 'linkClass', 'panelClass']
  });
});