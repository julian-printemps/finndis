define('ember-cli-foundation-6-sass/components/zf-dropdown', ['exports', 'ember', 'ember-cli-foundation-6-sass/mixins/zf-widget'], function (exports, _ember, _emberCliFoundation6SassMixinsZfWidget) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend(_emberCliFoundation6SassMixinsZfWidget['default'], {
    /** @member Class names */
    classNames: ['dropdown-pane'],

    /** @member Attribute bindings */
    attributeBindings: ['data-dropdown', 'data-auto-focus'],

    /** @member Makes the data attribute binding appear */
    'data-dropdown': ' ',

    'data-auto-focus': true,

    /** @member Foundation type */
    'zfType': 'Dropdown',

    /** @member Foundation specific options */
    'zfOptions': ['hoverDelay', 'hover', 'hoverPane', 'vOffset', 'hOffset', 'positionClass', 'trapFocus', 'autoFocus', 'closeOnClick']
  });
});