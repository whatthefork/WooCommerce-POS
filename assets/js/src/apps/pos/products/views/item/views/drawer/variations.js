var ItemView = require('lib/config/item-view');
var CollectionView = require('lib/config/collection-view');
var Variation = require('./variation');
var Radio = require('backbone.radio');
var _ = require('lodash');

var Empty = ItemView.extend({
  tagName: 'li',
  className: 'empty',
  template: '#tmpl-products-empty'
});

module.exports = CollectionView.extend({
  childView: Variation,
  emptyView: Empty,
  childViewContainer: 'ul',

  initialize: function(options){
    options = options || {};

    this.collection = Radio.request('entities', 'get', {
      type: 'variations',
      parent: this.model
    });

    this.collection.resetFilters();
    this.filterVariations(options.filter);
  },

  onShow: function() {
    this.$el.hide().slideDown(250);
  },

  filterVariations: function(filter){
    if(filter){
      filter = filter || {};
      var matchMaker = function(model){
        var attributes = model.get('attributes');
        return _.any(attributes, function(attribute){
          return attribute.slug === filter.slug &&
            attribute.label === filter.label;
        });

      };
      this.collection.filterBy('variation', matchMaker);
    }
  }

});