define('finndis/components/star-rating-fa', ['exports', 'ember-cli-star-rating/components/star-rating'], function (exports, _emberCliStarRatingComponentsStarRating) {
  exports['default'] = _emberCliStarRatingComponentsStarRating['default'].extend({

    fullClassNames: 'fa fa-star',
    emptyClassNames: 'fa fa-star-o'

  });
});