define('ember-masonry-grid/components/masonry-grid/component', ['exports', 'ember', 'ember-masonry-grid/components/masonry-grid/template'], function (exports, _ember, _emberMasonryGridComponentsMasonryGridTemplate) {
  'use strict';

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];return arr2;
    } else {
      return Array.from(arr);
    }
  }

  /* global imagesLoaded, Masonry */

  var Component = _ember['default'].Component;
  var computed = _ember['default'].computed;
  var defineProperty = _ember['default'].defineProperty;
  var getProperties = _ember['default'].getProperties;
  var get = _ember['default'].get;
  var set = _ember['default'].set;
  var htmlSafe = _ember['default'].String.htmlSafe;

  var MASONRY_OPTION_KEYS = _ember['default'].A(['containerStyle', 'columnWidth', 'gutter', 'hiddenStyle', 'isFitWidth', 'isInitLayout', 'isOriginLeft', 'isOriginTop', 'isResizeBound', 'itemSelector', 'stamp', 'transitionDuration', 'visibleStyle']);

  exports['default'] = Component.extend({
    layout: _emberMasonryGridComponentsMasonryGridTemplate['default'],
    classNames: ['masonry-grid'],

    // masonry default options
    // overriding the default `isInitLayout` value allows us to attach an event for
    // `layoutComplete` before the first render
    isInitLayout: false,
    itemSelector: '.masonry-item',
    attributeBindings: ['masonryGridStyle:style'],

    masonryGridStyle: htmlSafe('position: relative'),

    customLayout: false,
    masonry: null,

    itemClass: computed('itemSelector', function () {
      return get(this, 'itemSelector').replace('.', '');
    }),

    init: function init() {
      this._super.apply(this, arguments);
      defineProperty(this, 'options', computed.apply(this, [].concat(_toConsumableArray(MASONRY_OPTION_KEYS), [this._computeOptions])));
    },

    didUpdateAttrs: function didUpdateAttrs(attrsObj) {
      this._super.apply(this, arguments);

      var shouldRebuild = MASONRY_OPTION_KEYS.any(function (option) {
        return attrsObj.newAttrs[option] !== attrsObj.oldAttrs[option];
      });

      if (shouldRebuild) {
        this._destroyMasonry();
      }
    },

    willDestroyElement: function willDestroyElement() {
      this._super.apply(this, arguments);
      this._destroyMasonry();
    },

    didRender: function didRender() {
      var _this = this;

      this._super.apply(this, arguments);

      var masonry = get(this, 'masonry');

      _ember['default'].run.scheduleOnce('afterRender', this, function () {
        imagesLoaded(get(_this, 'element'), function () {
          if (masonry) {
            masonry.reloadItems();
          } else {
            var options = get(_this, 'options');
            masonry = set(_this, 'masonry', new Masonry(get(_this, 'element'), options));

            masonry.on('layoutComplete', function (layout) {
              _this.sendAction('onLayoutComplete', layout);
            });
          }

          masonry.layout();
        });
      });
    },

    _computeOptions: function _computeOptions() {
      var options = getProperties(this, MASONRY_OPTION_KEYS);

      Object.keys(options).forEach(function (key) {
        if (options[key] === 'null') {
          options[key] = null;
        }

        if (options[key] === undefined) {
          delete options[key];
        }
      });

      return options;
    },

    _destroyMasonry: function _destroyMasonry() {
      var masonry = get(this, 'masonry');

      if (masonry) {
        masonry.destroy();
      }

      set(this, 'masonry', undefined);
    }
  });
});