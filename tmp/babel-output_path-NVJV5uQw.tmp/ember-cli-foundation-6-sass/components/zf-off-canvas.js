define('ember-cli-foundation-6-sass/components/zf-off-canvas', ['exports', 'ember', 'ember-cli-foundation-6-sass/mixins/zf-widget', 'ember-cli-foundation-6-sass/templates/components/zf-off-canvas'], function (exports, _ember, _emberCliFoundation6SassMixinsZfWidget, _emberCliFoundation6SassTemplatesComponentsZfOffCanvas) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend(_emberCliFoundation6SassMixinsZfWidget['default'], {

    /** @member Layout */
    layout: _emberCliFoundation6SassTemplatesComponentsZfOffCanvas['default'],

    /** @member Class names */
    classNames: ['off-canvas-wrapper'],

    /** @member Makes the data attribute binding appear */
    'off-canvas-wrapper': '',

    /** @member Foundation type */
    'zfType': 'OffCanvas',

    /** @member Foundation specific options */
    'zfOptions': ['closeOnClick', 'transitionTime', 'position', 'forceTop', 'isRevealed', 'revealOn', 'autoFocus', 'revealClass', 'trapFocus'],

    /** @member Off canvas control ids */
    'controlIds': null,

    /** @member Off canvas left section flags */
    offCanvasLeftContent: { isOffCanvasLeft: true },

    /** @member Off canvas right section flags */
    offCanvasRightContent: { isOffCanvasRight: true },

    /** @member Show left off canvas */
    showLeftOffCanvas: true,

    /** @member Show right off canvas */
    showRightOffCanvas: false,

    handlePreRender: function handlePreRender() {
      var controlIds = [];

      // Create control ids
      if (true === this.get('showLeftOffCanvas')) {
        controlIds.push('#zf-off-canvas-left');
      }
      if (true === this.get('showRightOffCanvas')) {
        controlIds.push('#zf-off-canvas-right');
      }

      // Set control ids
      this.set('controlIds', controlIds);
    }
  });
});