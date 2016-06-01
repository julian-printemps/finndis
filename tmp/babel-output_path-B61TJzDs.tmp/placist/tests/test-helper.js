define('finndis/tests/test-helper', ['exports', 'finndis/tests/helpers/resolver', 'ember-qunit'], function (exports, _finndisestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_finndisestsHelpersResolver['default']);
});