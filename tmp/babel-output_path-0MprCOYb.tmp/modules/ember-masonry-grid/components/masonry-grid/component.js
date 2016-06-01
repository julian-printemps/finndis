function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

/* global imagesLoaded, Masonry */
import Ember from 'ember';
import layout from './template';

var Component = Ember.Component;
var computed = Ember.computed;
var defineProperty = Ember.defineProperty;
var getProperties = Ember.getProperties;
var get = Ember.get;
var set = Ember.set;
var htmlSafe = Ember.String.htmlSafe;

var MASONRY_OPTION_KEYS = Ember.A(['containerStyle', 'columnWidth', 'gutter', 'hiddenStyle', 'isFitWidth', 'isInitLayout', 'isOriginLeft', 'isOriginTop', 'isResizeBound', 'itemSelector', 'stamp', 'transitionDuration', 'visibleStyle']);

export default Component.extend({
  layout: layout,
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

    Ember.run.scheduleOnce('afterRender', this, function () {
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