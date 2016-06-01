define('ember-cli-foundation-6-sass/mixins/zf-widget', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  /**
   * Mixin that was shamelessly ripped off from the Ember jQuery UI folks (hey, why reinvent the
   * wheel). This makes it drop dead simple to convert between Zurb Foundation land and the land
   * of Ember filled with Chocolate rivers and gumdrop rainbows. And bacon. Lot's and lots of
   * bacon.
   */
  exports['default'] = _ember['default'].Mixin.create({

    /**
     * Handle setup of this components' DOM element.
     */
    setup: _ember['default'].on('didInsertElement', function () {
      var _this = this;

      // Perform any custom handling
      if (_ember['default'].isPresent(this.handlePreRender)) {
        this.handlePreRender();
      }

      _ember['default'].run.scheduleOnce('afterRender', function () {

        // Adapt the options
        var options = _this._adaptOptions();

        // Instantiate widget. Some widgets have multiple controls so we handle this case by
        // creating an array of zfUi elements. The first element gets stuffed into the zfUi
        // member with the whole list getting stuffed into zfUiList. It's up to the control to
        // expose this as friendly properties to the user.
        var zfType = _this.get('zfType');
        var controlIds = _this.get('controlIds');
        var zfUiList = [];

        if (_ember['default'].isPresent(controlIds)) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = controlIds[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var controlId = _step.value;

              var ui = new Foundation[zfType](_this.$(controlId), options);
              zfUiList.push(ui);
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator['return']) {
                _iterator['return']();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        }

        if (0 === zfUiList.length) {
          var ui = new Foundation[zfType](_this.$(), options);
          _this.set('zfUi', ui);
          zfUiList.push(ui);
        } else {
          _this.set('zfUi', zfUiList[0]);
        }

        _this.set('zfUiList', zfUiList);

        // Perform any custom handling
        if (_ember['default'].isPresent(_this.handleInsert)) {
          _this.handleInsert();
        }
      });
    }),

    /**
     * Handle destruction of component.
     */
    shutdown: _ember['default'].on('willDestoryElement', function () {
      var ui = this.get('zfUi');
      if (_ember['default'].isPresent(ui)) {
        var observers = this._observers;

        // Nuke any observers that were created
        for (var opKey in observers) {
          if (observers.hasOwnProperty(opKey)) {
            this.removeObserver(opKey, observers[opKey]);
          }
        }
      }

      // Finally destory everything else.
      var zfUiList = this.get('zfUiList');
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = zfUiList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var zfUi = _step2.value;

          zfUi.destroy();
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2['return']) {
            _iterator2['return']();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }),

    /**
     * Translate the options from the Ember way to foundation.
     * @return {Object}  An object containing our options.
     */
    _adaptOptions: function _adaptOptions() {
      var fdnOptions = this.get('zfOptions') || [];
      var options = {};

      // We are going to be observing changes. Initialze our cached observer list
      this._observers = this._observers || {};

      var observer = function observer(sender, key) {
        // Update options dynamically. Right now this is an all or nothing for widgets with
        // multiple UI elements.
        var value = sender.get(key);
        var zfUiList = this.get('zfUiList');
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = zfUiList[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var zfUi = _step3.value;

            zfUi.options[this._getZfOpKey(key)] = value;
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3['return']) {
              _iterator3['return']();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      };

      // Each component can specify a list of options that will be exposed to an external
      // consumer. Iterate through the options and build up the options object that gets returned
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = fdnOptions[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var opKey = _step4.value;

          var zfOpKey = this._getZfOpKey(opKey);
          options[zfOpKey] = this.get(opKey);

          // We also want to observe any changes so observe each component and push any updates
          // to foundation.

          this.addObserver(opKey, observer);

          // Cache the obsever so we can be a well behaved compoent and unsubscribe later
          this._observers[opKey] = observer;
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4['return']) {
            _iterator4['return']();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      return options;
    },

    /**
     * Get a "Zurb Foundation" specific options key. In some cases, ZF overloads existing ember
     * component fields. We handle this by prefacing the options with "zf-". So layout (used by
     * Ember) becomes "zf-layout".
     * @param  {string} opKey Options key.
     * @return {string}       Zurb foundation specific options key.
     */
    _getZfOpKey: function _getZfOpKey(opKey) {
      var retVal = opKey;
      var zfPreamble = 'zf-';
      if (true === opKey.startsWith(zfPreamble)) {
        retVal = opKey.substring(zfPreamble.length);
      }

      return retVal;
    }
  });
});