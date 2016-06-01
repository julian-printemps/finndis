define('ember-cli-foundation-6-sass/components/zf-reveal', ['exports', 'ember', 'ember-cli-foundation-6-sass/mixins/zf-widget'], function (exports, _ember, _emberCliFoundation6SassMixinsZfWidget) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend(_emberCliFoundation6SassMixinsZfWidget['default'], {

    /** @member Class names */
    classNames: ['reveal'],

    /** @member Attribute bindings */
    attributeBindings: ['data-reveal'],

    /** @member Makes the data attribute binding appear */
    'data-reveal': ' ',

    /** @member Foundation type */
    'zfType': 'Reveal',

    /** @member Foundation specific options */
    'zfOptions': ['showDelay', 'showDelay', 'closeOnClick', 'closeOnEsc', 'multipleOpened', 'vOffset', 'hOffset', 'fullScreen', 'btmOffsetPct', 'overlay', 'resetOnClose', 'deepLink'],

    /**
     * Handle any configuration after the widget has been inserted.
     */
    handleInsert: function handleInsert() {
      this.$().css("outline", "none");
    }
  });
});