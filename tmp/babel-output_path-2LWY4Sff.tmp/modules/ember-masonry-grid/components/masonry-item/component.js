import Ember from 'ember';
import layout from './template';

var Component = Ember.Component;
var computed = Ember.computed;
var get = Ember.get;
var htmlSafe = Ember.String.htmlSafe;

export default Component.extend({
  layout: layout,
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