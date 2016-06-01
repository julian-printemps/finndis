define("finndis/templates/add-place", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.4",
          "loc": {
            "source": null,
            "start": {
              "line": 18,
              "column": 14
            },
            "end": {
              "line": 41,
              "column": 14
            }
          },
          "moduleName": "finndis/templates/add-place.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          dom.setAttribute(el1, "class", "label-editor--holder");
          var el2 = dom.createTextNode("\n                  ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("label");
          dom.setAttribute(el2, "class", "label--listitem--label");
          var el3 = dom.createTextNode("\n                    ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "label--listitem label-editor collapse align-middle row");
          var el4 = dom.createTextNode("\n                      ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          dom.setAttribute(el4, "class", "label--icon-holder small-1 columns");
          var el5 = dom.createTextNode("\n                        ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("i");
          dom.setAttribute(el5, "class", "label--icon fa fa-tag");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n                      ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n                      ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          dom.setAttribute(el4, "class", "small-10 columns");
          var el5 = dom.createTextNode("\n                        ");
          dom.appendChild(el4, el5);
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n                      ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n                      ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          dom.setAttribute(el4, "class", "label--icon-holder small-1 columns");
          var el5 = dom.createTextNode("\n");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n                        ");
          dom.appendChild(el4, el5);
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n                      ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n                    ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n                  ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n                ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element2 = dom.childAt(fragment, [1, 1, 1]);
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(dom.childAt(element2, [3]), 1, 1);
          morphs[1] = dom.createMorphAt(dom.childAt(element2, [5]), 2, 2);
          return morphs;
        },
        statements: [["content", "label.name", ["loc", [null, [26, 24], [26, 38]]]], ["inline", "radio-button", [], ["id", ["subexpr", "@mut", [["get", "label.id", ["loc", [null, [32, 29], [32, 37]]]]], [], []], "value", ["subexpr", "@mut", [["get", "label.id", ["loc", [null, [33, 32], [33, 40]]]]], [], []], "groupValue", ["subexpr", "@mut", [["get", "labelValue", ["loc", [null, [34, 37], [34, 47]]]]], [], []], "changed", "addLabel", "name", "label"], ["loc", [null, [31, 24], [36, 40]]]]],
        locals: ["label"],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.4",
          "loc": {
            "source": null,
            "start": {
              "line": 61,
              "column": 18
            },
            "end": {
              "line": 65,
              "column": 18
            }
          },
          "moduleName": "finndis/templates/add-place.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "error");
          var el2 = dom.createTextNode("\n                      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n                    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
          return morphs;
        },
        statements: [["inline", "get", [["subexpr", "get", [["get", "model.validations.attrs", []], "name"], [], []], "message"], [], ["loc", [null, [63, 22], [63, 54]]]]],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.4",
          "loc": {
            "source": null,
            "start": {
              "line": 102,
              "column": 26
            },
            "end": {
              "line": 106,
              "column": 26
            }
          },
          "moduleName": "finndis/templates/add-place.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "error");
          var el2 = dom.createTextNode("\n                              ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n                            ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
          return morphs;
        },
        statements: [["inline", "get", [["subexpr", "get", [["get", "model.validations.attrs", []], "website"], [], []], "message"], [], ["loc", [null, [104, 30], [104, 65]]]]],
        locals: [],
        templates: []
      };
    })();
    var child3 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.4",
          "loc": {
            "source": null,
            "start": {
              "line": 119,
              "column": 26
            },
            "end": {
              "line": 123,
              "column": 26
            }
          },
          "moduleName": "finndis/templates/add-place.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "error");
          var el2 = dom.createTextNode("\n                              ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n                            ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
          return morphs;
        },
        statements: [["inline", "get", [["subexpr", "get", [["get", "model.validations.attrs", []], "phone"], [], []], "message"], [], ["loc", [null, [121, 30], [121, 63]]]]],
        locals: [],
        templates: []
      };
    })();
    var child4 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.4",
          "loc": {
            "source": null,
            "start": {
              "line": 125,
              "column": 24
            },
            "end": {
              "line": 127,
              "column": 24
            }
          },
          "moduleName": "finndis/templates/add-place.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("span");
          dom.setAttribute(el1, "class", "error errorForValidation");
          var el2 = dom.createElement("i");
          dom.setAttribute(el2, "class", "fa fa-exclamation-circle");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode(" ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 2, 2);
          return morphs;
        },
        statements: [["content", "errors.newFirstname", ["loc", [null, [126, 109], [126, 132]]]]],
        locals: [],
        templates: []
      };
    })();
    var child5 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.4.4",
              "loc": {
                "source": null,
                "start": {
                  "line": 168,
                  "column": 26
                },
                "end": {
                  "line": 170,
                  "column": 26
                }
              },
              "moduleName": "finndis/templates/add-place.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("                            ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("a");
              dom.setAttribute(el1, "class", "star-rating fa fa-star");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var element1 = dom.childAt(fragment, [1]);
              var morphs = new Array(1);
              morphs[0] = dom.createElementMorph(element1);
              return morphs;
            },
            statements: [["element", "action", [["get", "set", ["loc", [null, [169, 71], [169, 74]]]], ["get", "star.rating", ["loc", [null, [169, 75], [169, 86]]]]], [], ["loc", [null, [169, 62], [169, 88]]]]],
            locals: [],
            templates: []
          };
        })();
        var child1 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.4.4",
              "loc": {
                "source": null,
                "start": {
                  "line": 170,
                  "column": 26
                },
                "end": {
                  "line": 172,
                  "column": 26
                }
              },
              "moduleName": "finndis/templates/add-place.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("                            ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("a");
              dom.setAttribute(el1, "class", "star-rating fa fa-star-o");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var element0 = dom.childAt(fragment, [1]);
              var morphs = new Array(1);
              morphs[0] = dom.createElementMorph(element0);
              return morphs;
            },
            statements: [["element", "action", [["get", "set", ["loc", [null, [171, 73], [171, 76]]]], ["get", "star.rating", ["loc", [null, [171, 77], [171, 88]]]]], [], ["loc", [null, [171, 64], [171, 90]]]]],
            locals: [],
            templates: []
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.4",
            "loc": {
              "source": null,
              "start": {
                "line": 167,
                "column": 24
              },
              "end": {
                "line": 173,
                "column": 24
              }
            },
            "moduleName": "finndis/templates/add-place.hbs"
          },
          isEmpty: false,
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["block", "if", [["get", "star.full", ["loc", [null, [168, 32], [168, 41]]]]], [], 0, 1, ["loc", [null, [168, 26], [172, 33]]]]],
          locals: ["star"],
          templates: [child0, child1]
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.4",
          "loc": {
            "source": null,
            "start": {
              "line": 166,
              "column": 22
            },
            "end": {
              "line": 174,
              "column": 22
            }
          },
          "moduleName": "finndis/templates/add-place.hbs"
        },
        isEmpty: false,
        arity: 2,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "each", [["get", "stars", ["loc", [null, [167, 32], [167, 37]]]]], [], 0, null, ["loc", [null, [167, 24], [173, 33]]]]],
        locals: ["stars", "set"],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.4.4",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 193,
            "column": 0
          }
        },
        "moduleName": "finndis/templates/add-place.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "medium-8 medium-offset-2 columns");
        var el3 = dom.createTextNode("\n\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("form");
        dom.setAttribute(el4, "class", "add-label--form");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "row");
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "back-button--holder small-2 columns");
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("a");
        var el8 = dom.createElement("i");
        dom.setAttribute(el8, "class", "back-button fa fa-arrow-left");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n          ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "small-10 columns");
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n          ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "row");
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "medium-12 columns");
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("ul");
        dom.setAttribute(el7, "class", "label--list");
        var el8 = dom.createTextNode("\n");
        dom.appendChild(el7, el8);
        var el8 = dom.createComment("");
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("            ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n          ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("a");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("form");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "edition row");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "columns");
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "place--holder");
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("article");
        dom.setAttribute(el7, "class", "place");
        var el8 = dom.createTextNode("\n              ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("header");
        dom.setAttribute(el8, "class", "place--header");
        var el9 = dom.createTextNode("\n                ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("button");
        dom.setAttribute(el9, "type", "submit");
        dom.setAttribute(el9, "class", "button edit-button");
        var el10 = dom.createElement("i");
        dom.setAttribute(el10, "class", "place--action--icon fa fa-check");
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("Save");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n\n                ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("h2");
        dom.setAttribute(el9, "class", "place--title");
        var el10 = dom.createTextNode("\n                  ");
        dom.appendChild(el9, el10);
        var el10 = dom.createComment("");
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("\n");
        dom.appendChild(el9, el10);
        var el10 = dom.createComment("");
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("\n");
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("                ");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("i");
        dom.setAttribute(el9, "class", "place--labels--icon fa fa-tag");
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("ul");
        dom.setAttribute(el9, "class", "place--labels clearfix");
        var el10 = dom.createTextNode("\n                  ");
        dom.appendChild(el9, el10);
        var el10 = dom.createElement("li");
        dom.setAttribute(el10, "class", "place--labelitem");
        var el11 = dom.createComment("");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("\n                  ");
        dom.appendChild(el9, el10);
        var el10 = dom.createElement("li");
        dom.setAttribute(el10, "class", "place--labelitem");
        var el11 = dom.createTextNode("\n                    ");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("i");
        dom.setAttribute(el11, "class", "place--add--icon fa fa-plus");
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n                  ");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("\n                ");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n              ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n              ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("main");
        dom.setAttribute(el8, "class", "place--main");
        var el9 = dom.createTextNode("\n                ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("div");
        dom.setAttribute(el9, "class", "place--info--holder align-middle collapse row");
        var el10 = dom.createTextNode("\n");
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("                  ");
        dom.appendChild(el9, el10);
        var el10 = dom.createElement("div");
        dom.setAttribute(el10, "class", "small-12 columns");
        var el11 = dom.createTextNode("\n                    ");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("div");
        dom.setAttribute(el11, "class", "row place--address");
        var el12 = dom.createTextNode("\n                      ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("div");
        dom.setAttribute(el12, "class", "small-12 medium-6 columns");
        var el13 = dom.createTextNode("\n                        ");
        dom.appendChild(el12, el13);
        var el13 = dom.createElement("a");
        dom.setAttribute(el13, "class", "button expanded");
        var el14 = dom.createElement("i");
        dom.setAttribute(el14, "class", "fa fa-street-view");
        dom.appendChild(el13, el14);
        var el14 = dom.createTextNode("Geolocate me");
        dom.appendChild(el13, el14);
        dom.appendChild(el12, el13);
        var el13 = dom.createTextNode("\n                      ");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n                      ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("div");
        dom.setAttribute(el12, "class", "small-12 medium-6 columns");
        var el13 = dom.createTextNode("\n                        ");
        dom.appendChild(el12, el13);
        var el13 = dom.createComment("");
        dom.appendChild(el12, el13);
        var el13 = dom.createTextNode("\n                      ");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n                    ");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n                  ");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("\n");
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("                ");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n\n                ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("div");
        dom.setAttribute(el9, "class", "place--info--holder row");
        var el10 = dom.createTextNode("\n                  ");
        dom.appendChild(el9, el10);
        var el10 = dom.createElement("div");
        dom.setAttribute(el10, "class", "columns small-12 medium-6");
        var el11 = dom.createTextNode("\n                    ");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("div");
        dom.setAttribute(el11, "class", "place--website align-middle row");
        var el12 = dom.createTextNode("\n                      ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("div");
        dom.setAttribute(el12, "class", "place--section-icon medium-1 columns");
        var el13 = dom.createTextNode("\n                        ");
        dom.appendChild(el12, el13);
        var el13 = dom.createElement("i");
        dom.setAttribute(el13, "class", "place--main--icon fa fa-globe");
        dom.appendChild(el12, el13);
        var el13 = dom.createTextNode("\n                      ");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n                      ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("div");
        dom.setAttribute(el12, "class", "medium-11 columns");
        var el13 = dom.createTextNode("\n                        ");
        dom.appendChild(el12, el13);
        var el13 = dom.createElement("label");
        var el14 = dom.createTextNode("Website\n                          ");
        dom.appendChild(el13, el14);
        var el14 = dom.createComment("");
        dom.appendChild(el13, el14);
        var el14 = dom.createTextNode("\n");
        dom.appendChild(el13, el14);
        var el14 = dom.createComment("");
        dom.appendChild(el13, el14);
        var el14 = dom.createTextNode("                        ");
        dom.appendChild(el13, el14);
        dom.appendChild(el12, el13);
        var el13 = dom.createTextNode("\n                      ");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n                    ");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n                  ");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("\n                  ");
        dom.appendChild(el9, el10);
        var el10 = dom.createElement("div");
        dom.setAttribute(el10, "class", "columns small-12 medium-6");
        var el11 = dom.createTextNode("\n                    ");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("div");
        dom.setAttribute(el11, "class", "place--phone align-middle row");
        var el12 = dom.createTextNode("\n                      ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("div");
        dom.setAttribute(el12, "class", "place--section-icon medium-1 columns");
        var el13 = dom.createTextNode("\n                        ");
        dom.appendChild(el12, el13);
        var el13 = dom.createElement("i");
        dom.setAttribute(el13, "class", "place--main--icon fa fa-phone");
        dom.appendChild(el12, el13);
        var el13 = dom.createTextNode("\n                      ");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n                      ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("div");
        dom.setAttribute(el12, "class", "medium-11 columns");
        var el13 = dom.createTextNode("\n                        ");
        dom.appendChild(el12, el13);
        var el13 = dom.createElement("label");
        var el14 = dom.createTextNode("Phone number\n                          ");
        dom.appendChild(el13, el14);
        var el14 = dom.createComment("");
        dom.appendChild(el13, el14);
        var el14 = dom.createTextNode("\n");
        dom.appendChild(el13, el14);
        var el14 = dom.createComment("");
        dom.appendChild(el13, el14);
        var el14 = dom.createTextNode("                        ");
        dom.appendChild(el13, el14);
        dom.appendChild(el12, el13);
        var el13 = dom.createTextNode("\n");
        dom.appendChild(el12, el13);
        var el13 = dom.createComment("");
        dom.appendChild(el12, el13);
        var el13 = dom.createTextNode("                      ");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n                    ");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n                  ");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("\n                ");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n\n                ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("div");
        dom.setAttribute(el9, "class", "place--info--holder row");
        var el10 = dom.createTextNode("\n                  ");
        dom.appendChild(el9, el10);
        var el10 = dom.createElement("div");
        dom.setAttribute(el10, "class", "columns medium-6");
        var el11 = dom.createTextNode("\n                    ");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("div");
        dom.setAttribute(el11, "class", "place--phone align-middle row");
        var el12 = dom.createTextNode("\n                      ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("div");
        dom.setAttribute(el12, "class", "place--section-icon medium-1 columns");
        var el13 = dom.createTextNode("\n                        ");
        dom.appendChild(el12, el13);
        var el13 = dom.createElement("i");
        dom.setAttribute(el13, "class", "place--main--icon fa fa-usd");
        dom.appendChild(el12, el13);
        var el13 = dom.createTextNode("\n                      ");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n                      ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("div");
        dom.setAttribute(el12, "class", "medium-11 columns");
        var el13 = dom.createTextNode("\n                        ");
        dom.appendChild(el12, el13);
        var el13 = dom.createElement("label");
        var el14 = dom.createTextNode("Price range\n                          ");
        dom.appendChild(el13, el14);
        var el14 = dom.createComment("");
        dom.appendChild(el13, el14);
        var el14 = dom.createTextNode("\n                        ");
        dom.appendChild(el13, el14);
        dom.appendChild(el12, el13);
        var el13 = dom.createTextNode("\n                      ");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n                    ");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n                  ");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("\n                ");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n\n                ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("div");
        dom.setAttribute(el9, "class", "place--info--holder row");
        var el10 = dom.createTextNode("\n                  ");
        dom.appendChild(el9, el10);
        var el10 = dom.createElement("div");
        dom.setAttribute(el10, "class", "columns");
        var el11 = dom.createTextNode("\n                    ");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("div");
        dom.setAttribute(el11, "class", "place--phone align-middle row");
        var el12 = dom.createTextNode("\n                      ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("div");
        dom.setAttribute(el12, "class", "place--section-icon medium-1 columns");
        var el13 = dom.createTextNode("\n                        ");
        dom.appendChild(el12, el13);
        var el13 = dom.createElement("i");
        dom.setAttribute(el13, "class", "place--main--icon fa fa-info");
        dom.appendChild(el12, el13);
        var el13 = dom.createTextNode("\n                      ");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n                      ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("div");
        dom.setAttribute(el12, "class", "medium-11 columns");
        var el13 = dom.createTextNode("\n                        ");
        dom.appendChild(el12, el13);
        var el13 = dom.createElement("label");
        var el14 = dom.createTextNode("Description\n                          ");
        dom.appendChild(el13, el14);
        var el14 = dom.createComment("");
        dom.appendChild(el13, el14);
        var el14 = dom.createTextNode("\n                        ");
        dom.appendChild(el13, el14);
        dom.appendChild(el12, el13);
        var el13 = dom.createTextNode("\n                      ");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n                    ");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n                  ");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("\n                ");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n\n                ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("div");
        dom.setAttribute(el9, "class", "place--info--holder row");
        var el10 = dom.createTextNode("\n                  ");
        dom.appendChild(el9, el10);
        var el10 = dom.createElement("div");
        dom.setAttribute(el10, "class", "columns");
        var el11 = dom.createTextNode("\n                    ");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("div");
        dom.setAttribute(el11, "class", "place--rating");
        var el12 = dom.createTextNode("\n");
        dom.appendChild(el11, el12);
        var el12 = dom.createComment("");
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("                    ");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n                  ");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("\n                ");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n              ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n            ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n          ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "place--info--holder row");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "columns");
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("button");
        dom.setAttribute(el6, "type", "submit");
        dom.setAttribute(el6, "class", "button expanded");
        var el7 = dom.createTextNode("Add this place");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element3 = dom.childAt(fragment, [0, 1]);
        var element4 = dom.childAt(element3, [2]);
        var element5 = dom.childAt(element4, [1]);
        var element6 = dom.childAt(element5, [1]);
        var element7 = dom.childAt(element6, [1, 1]);
        var element8 = dom.childAt(element3, [4]);
        var element9 = dom.childAt(element3, [8]);
        var element10 = dom.childAt(element9, [1, 1, 1, 1]);
        var element11 = dom.childAt(element10, [1]);
        var element12 = dom.childAt(element11, [1]);
        var element13 = dom.childAt(element11, [3]);
        var element14 = dom.childAt(element11, [7]);
        var element15 = dom.childAt(element14, [3, 1]);
        var element16 = dom.childAt(element10, [3]);
        var element17 = dom.childAt(element16, [1, 2, 1]);
        var element18 = dom.childAt(element17, [1, 1]);
        var element19 = dom.childAt(element16, [3]);
        var element20 = dom.childAt(element19, [1, 1, 3, 1]);
        var element21 = dom.childAt(element19, [3, 1, 3]);
        var element22 = dom.childAt(element21, [1]);
        var morphs = new Array(22);
        morphs[0] = dom.createAttrMorph(element4, 'class');
        morphs[1] = dom.createElementMorph(element7);
        morphs[2] = dom.createMorphAt(dom.childAt(element6, [3]), 1, 1);
        morphs[3] = dom.createMorphAt(dom.childAt(element5, [3, 1, 1]), 1, 1);
        morphs[4] = dom.createAttrMorph(element8, 'class');
        morphs[5] = dom.createElementMorph(element8);
        morphs[6] = dom.createElementMorph(element9);
        morphs[7] = dom.createElementMorph(element12);
        morphs[8] = dom.createMorphAt(element13, 1, 1);
        morphs[9] = dom.createMorphAt(element13, 3, 3);
        morphs[10] = dom.createMorphAt(dom.childAt(element14, [1]), 0, 0);
        morphs[11] = dom.createElementMorph(element15);
        morphs[12] = dom.createElementMorph(element18);
        morphs[13] = dom.createMorphAt(dom.childAt(element17, [3]), 1, 1);
        morphs[14] = dom.createMorphAt(element20, 1, 1);
        morphs[15] = dom.createMorphAt(element20, 3, 3);
        morphs[16] = dom.createMorphAt(element22, 1, 1);
        morphs[17] = dom.createMorphAt(element22, 3, 3);
        morphs[18] = dom.createMorphAt(element21, 3, 3);
        morphs[19] = dom.createMorphAt(dom.childAt(element16, [5, 1, 1, 3, 1]), 1, 1);
        morphs[20] = dom.createMorphAt(dom.childAt(element16, [7, 1, 1, 3, 1]), 1, 1);
        morphs[21] = dom.createMorphAt(dom.childAt(element16, [9, 1, 1]), 1, 1);
        return morphs;
      },
      statements: [["attribute", "class", ["concat", ["panel right ", ["get", "labelPanelDisplayed", ["loc", [null, [5, 30], [5, 49]]]]]]], ["element", "action", ["closeMenuPanel"], [], ["loc", [null, [9, 15], [9, 42]]]], ["content", "add-label", ["loc", [null, [12, 12], [12, 25]]]], ["block", "each", [["get", "user.labels", ["loc", [null, [18, 22], [18, 33]]]]], [], 0, null, ["loc", [null, [18, 14], [41, 23]]]], ["attribute", "class", ["concat", ["panel-overlay right ", ["get", "labelPanelDisplayed", ["loc", [null, [47, 36], [47, 55]]]]]]], ["element", "action", ["closeMenuPanel"], [], ["loc", [null, [47, 59], [47, 86]]]], ["element", "action", ["addPlace", ["get", "model", ["loc", [null, [51, 30], [51, 35]]]]], ["on", "submit"], ["loc", [null, [51, 10], [51, 49]]]], ["element", "bind-attr", [], ["disabled", "isInvalid"], ["loc", [null, [57, 65], [57, 99]]]], ["inline", "input", [], ["type", "text", "class", "place--input", "value", ["subexpr", "@mut", [["get", "model.name", ["loc", [null, [60, 65], [60, 75]]]]], [], []]], ["loc", [null, [60, 18], [60, 77]]]], ["block", "if", [["subexpr", "get", [["subexpr", "get", [["get", "model.validations.attrs", []], "name"], [], []], "isInvalid"], [], ["loc", [null, [61, 24], [61, 56]]]]], [], 1, null, ["loc", [null, [61, 18], [65, 25]]]], ["content", "model.label.name", ["loc", [null, [71, 47], [71, 67]]]], ["element", "action", ["showAddLabel"], ["bubbles", "false"], ["loc", [null, [73, 59], [73, 100]]]], ["element", "action", ["setAutoAddress"], [], ["loc", [null, [83, 51], [83, 78]]]], ["inline", "address-panel", [], ["place", ["subexpr", "@mut", [["get", "model", ["loc", [null, [86, 46], [86, 51]]]]], [], []], "buttonText", "Add an address"], ["loc", [null, [86, 24], [86, 81]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "model.website", ["loc", [null, [101, 40], [101, 53]]]]], [], []], "class", "place--main-input", "type", "tel"], ["loc", [null, [101, 26], [101, 92]]]], ["block", "if", [["subexpr", "get", [["subexpr", "get", [["get", "model.validations.attrs", []], "website"], [], []], "isInvalid"], [], ["loc", [null, [102, 32], [102, 67]]]]], [], 2, null, ["loc", [null, [102, 26], [106, 33]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "model.phone", ["loc", [null, [118, 40], [118, 51]]]]], [], []], "class", "place--main-input", "type", "text"], ["loc", [null, [118, 26], [118, 91]]]], ["block", "if", [["subexpr", "get", [["subexpr", "get", [["get", "model.validations.attrs", []], "phone"], [], []], "isInvalid"], [], ["loc", [null, [119, 32], [119, 65]]]]], [], 3, null, ["loc", [null, [119, 26], [123, 33]]]], ["block", "if", [["get", "errors.model.phone", ["loc", [null, [125, 30], [125, 48]]]]], [], 4, null, ["loc", [null, [125, 24], [127, 31]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "model.pricerange", ["loc", [null, [141, 40], [141, 56]]]]], [], []], "class", "place--main-input", "type", "text"], ["loc", [null, [141, 26], [141, 96]]]], ["inline", "textarea", [], ["type", "text", "cols", "60", "rows", "3", "class", "place--main-input", "value", ["subexpr", "@mut", [["get", "model.description", ["loc", [null, [156, 100], [156, 117]]]]], [], []]], ["loc", [null, [156, 26], [156, 119]]]], ["block", "star-rating-fa", [], ["item", ["subexpr", "@mut", [["get", "model", ["loc", [null, [166, 46], [166, 51]]]]], [], []], "rating", ["subexpr", "@mut", [["get", "model.rating", ["loc", [null, [166, 59], [166, 71]]]]], [], []], "on-click", ["subexpr", "action", ["setRating"], [], ["loc", [null, [166, 81], [166, 101]]]]], 5, null, ["loc", [null, [166, 22], [174, 41]]]]],
      locals: [],
      templates: [child0, child1, child2, child3, child4, child5]
    };
  })());
});