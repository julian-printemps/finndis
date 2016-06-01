define('ember-masonry-grid/components/masonry-item/component', ['exports', 'ember', 'ember-masonry-grid/components/masonry-item/template'], function (exports, _ember, _emberMasonryGridComponentsMasonryItemTemplate) {
  'use strict';

  var Component = _ember['default'].Component;
  var computed = _ember['default'].computed;
  var get = _ember['default'].get;
  var htmlSafe = _ember['default'].String.htmlSafe;

  exports['default'] = Component.extend({
    layout: _emberMasonryGridComponentsMasonryItemTemplate['default'],
    classNameBindings: ['itemClass'],
    attributeBindings: ['masonryItemStyle:style'],

    masonryItemStyle: htmlSafe('position: absolute'),

    itemClass: computed.oneWay('grid.itemClass'),

    click: function click(ev) {
      var onItemClick = get(this, 'onItemClick');
      var item = get(this, 'item');

      if (onItemClick && typeof onItemClick === 'function') {
        onItemClick(ev, item);
      }
    }
  });
});