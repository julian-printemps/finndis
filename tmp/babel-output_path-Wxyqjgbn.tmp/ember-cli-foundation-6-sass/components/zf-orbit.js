define('ember-cli-foundation-6-sass/components/zf-orbit', ['exports', 'ember', 'ember-cli-foundation-6-sass/mixins/zf-widget'], function (exports, _ember, _emberCliFoundation6SassMixinsZfWidget) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend(_emberCliFoundation6SassMixinsZfWidget['default'], {

    /** @member Class names */
    classNames: ['orbit'],

    /** @member Attribute bindings */
    attributeBindings: ['role', 'aria-label', 'data-orbit', 'data-use-m-u-i'],

    /** @member Component role */
    'role': 'region',

    /** @member ARIA label for accessability */
    'aria-label': '',

    /** @member Makes the data attribute binding appear */
    'data-orbit': ' ',

    /** @member Use Motion UI flag. Eventually I'm going to bridge liquid fire to Foundation  */
    'data-use-m-u-i': 'false',

    /** @member Foundation type */
    'zfType': 'Orbit',

    /** @member Foundation specific options */
    'zfOptions': ['bullets', 'navButtons', 'autoPlay', 'timerDelay', 'infiniteWrap', 'swipe', 'pauseOnHover', 'accessible', 'containerClass', 'slideClass', 'boxOfBullets', 'nextClass', 'prevClass']
  });
});