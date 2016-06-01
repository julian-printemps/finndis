define('ember-cli-foundation-6-sass/components/zf-dropdown-menu', ['exports', 'ember', 'ember-cli-foundation-6-sass/mixins/zf-widget'], function (exports, _ember, _emberCliFoundation6SassMixinsZfWidget) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend(_emberCliFoundation6SassMixinsZfWidget['default'], {

    /** @member tag type */
    tagName: 'ul',

    /** @member Class names */
    classNames: ['dropdown', 'menu'],

    /** @member Attribute bindings */
    attributeBindings: ['data-dropdown-menu'],

    /** @member Makes the data attribute binding appear */
    'data-dropdown-menu': ' ',

    /** @member Foundation type */
    'zfType': 'DropdownMenu',

    /** @member Foundation specific options */
    'zfOptions': ['disableHover', 'autoclose', 'hoverDelay', 'clickOpen', 'closingTime', 'alignment', 'closeOnClick', 'verticalClass', 'rightClass', 'forceFollow']
  });
});