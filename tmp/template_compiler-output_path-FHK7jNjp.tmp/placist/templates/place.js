export default Ember.HTMLBars.template((function() {
  var child0 = (function() {
    return {
      meta: {
        "fragmentReason": false,
        "revision": "Ember@2.3.2",
        "loc": {
          "source": null,
          "start": {
            "line": 3,
            "column": 4
          },
          "end": {
            "line": 3,
            "column": 69
          }
        },
        "moduleName": "finndis/templates/place.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("i");
        dom.setAttribute(el1,"class","back-button fa fa-arrow-left");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }());
  var child1 = (function() {
    return {
      meta: {
        "fragmentReason": false,
        "revision": "Ember@2.3.2",
        "loc": {
          "source": null,
          "start": {
            "line": 22,
            "column": 14
          },
          "end": {
            "line": 43,
            "column": 14
          }
        },
        "moduleName": "finndis/templates/place.hbs"
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
        dom.setAttribute(el1,"class","label-editor--holder");
        var el2 = dom.createTextNode("\n                  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("label");
        dom.setAttribute(el2,"class","label--listitem--label");
        var el3 = dom.createTextNode("\n                    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","label--listitem label-editor collapse align-middle row");
        var el4 = dom.createTextNode("\n                      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","label--icon-holder small-1 columns");
        var el5 = dom.createTextNode("\n                        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("i");
        dom.setAttribute(el5,"class","label--icon fa fa-tag");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n                      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n                      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","small-10 columns");
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
        dom.setAttribute(el4,"class","label--icon-holder small-1 columns");
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
        var element26 = dom.childAt(fragment, [1, 1, 1]);
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(dom.childAt(element26, [3]),1,1);
        morphs[1] = dom.createMorphAt(dom.childAt(element26, [5]),1,1);
        return morphs;
      },
      statements: [
        ["content","label.name",["loc",[null,[30,24],[30,38]]]],
        ["inline","radio-button",[],["id",["subexpr","@mut",[["get","label.id",["loc",[null,[34,29],[34,37]]]]],[],[]],"value",["subexpr","@mut",[["get","label.id",["loc",[null,[35,32],[35,40]]]]],[],[]],"groupValue",["subexpr","@mut",[["get","labelValue",["loc",[null,[36,37],[36,47]]]]],[],[]],"changed","updateLabel","name","label"],["loc",[null,[33,24],[38,40]]]]
      ],
      locals: ["label"],
      templates: []
    };
  }());
  var child2 = (function() {
    var child0 = (function() {
      var child0 = (function() {
        var child0 = (function() {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.3.2",
              "loc": {
                "source": null,
                "start": {
                  "line": 138,
                  "column": 28
                },
                "end": {
                  "line": 140,
                  "column": 28
                }
              },
              "moduleName": "finndis/templates/place.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("                              ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("a");
              dom.setAttribute(el1,"class","star-rating fa fa-star");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var element17 = dom.childAt(fragment, [1]);
              var morphs = new Array(1);
              morphs[0] = dom.createElementMorph(element17);
              return morphs;
            },
            statements: [
              ["element","action",[["get","set",["loc",[null,[139,73],[139,76]]]],["get","star.rating",["loc",[null,[139,77],[139,88]]]]],[],["loc",[null,[139,64],[139,90]]]]
            ],
            locals: [],
            templates: []
          };
        }());
        var child1 = (function() {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.3.2",
              "loc": {
                "source": null,
                "start": {
                  "line": 140,
                  "column": 28
                },
                "end": {
                  "line": 142,
                  "column": 28
                }
              },
              "moduleName": "finndis/templates/place.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("                              ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("a");
              dom.setAttribute(el1,"class","star-rating fa fa-star-o");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var element16 = dom.childAt(fragment, [1]);
              var morphs = new Array(1);
              morphs[0] = dom.createElementMorph(element16);
              return morphs;
            },
            statements: [
              ["element","action",[["get","set",["loc",[null,[141,75],[141,78]]]],["get","star.rating",["loc",[null,[141,79],[141,90]]]]],[],["loc",[null,[141,66],[141,92]]]]
            ],
            locals: [],
            templates: []
          };
        }());
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.2",
            "loc": {
              "source": null,
              "start": {
                "line": 137,
                "column": 26
              },
              "end": {
                "line": 143,
                "column": 26
              }
            },
            "moduleName": "finndis/templates/place.hbs"
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
            morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [
            ["block","if",[["get","star.full",["loc",[null,[138,34],[138,43]]]]],[],0,1,["loc",[null,[138,28],[142,35]]]]
          ],
          locals: ["star"],
          templates: [child0, child1]
        };
      }());
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 136,
              "column": 24
            },
            "end": {
              "line": 144,
              "column": 24
            }
          },
          "moduleName": "finndis/templates/place.hbs"
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
          morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [
          ["block","each",[["get","stars",["loc",[null,[137,34],[137,39]]]]],[],0,null,["loc",[null,[137,26],[143,35]]]]
        ],
        locals: ["stars","set"],
        templates: [child0]
      };
    }());
    return {
      meta: {
        "fragmentReason": false,
        "revision": "Ember@2.3.2",
        "loc": {
          "source": null,
          "start": {
            "line": 51,
            "column": 4
          },
          "end": {
            "line": 162,
            "column": 4
          }
        },
        "moduleName": "finndis/templates/place.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("      ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("form");
        var el2 = dom.createTextNode("\n        ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","edition row");
        var el3 = dom.createTextNode("\n          ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","columns");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","place--holder");
        var el5 = dom.createTextNode("\n              ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("article");
        dom.setAttribute(el5,"class","place");
        var el6 = dom.createTextNode("\n                ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("header");
        dom.setAttribute(el6,"class","place--header");
        var el7 = dom.createTextNode("\n                  ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("a");
        dom.setAttribute(el7,"href","#");
        dom.setAttribute(el7,"class","button delete-button");
        var el8 = dom.createElement("i");
        dom.setAttribute(el8,"class","place--action--icon fa fa-trash");
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("Delete");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n                  ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("button");
        dom.setAttribute(el7,"type","submit");
        dom.setAttribute(el7,"class","button edit-button");
        var el8 = dom.createElement("i");
        dom.setAttribute(el8,"class","place--action--icon fa fa-check");
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("Save");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n\n                  ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("h2");
        dom.setAttribute(el7,"class","place--title");
        var el8 = dom.createTextNode("\n                    ");
        dom.appendChild(el7, el8);
        var el8 = dom.createComment("");
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                  ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n                  ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("i");
        dom.setAttribute(el7,"class","place--labels--icon fa fa-tag");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n                  ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("ul");
        dom.setAttribute(el7,"class","place--labels clearfix");
        var el8 = dom.createTextNode("\n                    ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("li");
        dom.setAttribute(el8,"class","place--labelitem");
        var el9 = dom.createComment("");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                    ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("li");
        dom.setAttribute(el8,"class","place--labelitem");
        var el9 = dom.createTextNode("\n                      ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("i");
        dom.setAttribute(el9,"class","place--add--icon fa fa-plus");
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                    ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                  ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n                ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("main");
        dom.setAttribute(el6,"class","place--main");
        var el7 = dom.createTextNode("\n                  ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7,"class","place--info--holder align-middle row");
        var el8 = dom.createTextNode("\n");
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("                    ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("div");
        dom.setAttribute(el8,"class","small-12 columns");
        var el9 = dom.createTextNode("\n                      ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("div");
        dom.setAttribute(el9,"class","row");
        var el10 = dom.createTextNode("\n                        ");
        dom.appendChild(el9, el10);
        var el10 = dom.createElement("div");
        dom.setAttribute(el10,"class","columns");
        var el11 = dom.createTextNode("\n                          ");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("label");
        var el12 = dom.createTextNode("Address\n                            ");
        dom.appendChild(el11, el12);
        var el12 = dom.createComment("");
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n                          ");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n                        ");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("\n                      ");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                    ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n");
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("                  ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n\n                  ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7,"class","place--info--holder row");
        var el8 = dom.createTextNode("\n                    ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("div");
        dom.setAttribute(el8,"class","columns small-12 medium-6");
        var el9 = dom.createTextNode("\n                      ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("div");
        dom.setAttribute(el9,"class","place--website align-middle row");
        var el10 = dom.createTextNode("\n                        ");
        dom.appendChild(el9, el10);
        var el10 = dom.createElement("div");
        dom.setAttribute(el10,"class","small-12 columns");
        var el11 = dom.createTextNode("\n                          ");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("label");
        var el12 = dom.createTextNode("Website\n                            ");
        dom.appendChild(el11, el12);
        var el12 = dom.createComment("");
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n                          ");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n                        ");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("\n                      ");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                    ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                    ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("div");
        dom.setAttribute(el8,"class","columns small-12 medium-6");
        var el9 = dom.createTextNode("\n                      ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("div");
        dom.setAttribute(el9,"class","place--phone align-middle row");
        var el10 = dom.createTextNode("\n                        ");
        dom.appendChild(el9, el10);
        var el10 = dom.createElement("div");
        dom.setAttribute(el10,"class","small-12 columns");
        var el11 = dom.createTextNode("\n                          ");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("label");
        var el12 = dom.createTextNode("Phone number\n                            ");
        dom.appendChild(el11, el12);
        var el12 = dom.createComment("");
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n                          ");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n                        ");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("\n                      ");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                    ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                  ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n\n                  ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7,"class","place--info--holder row");
        var el8 = dom.createTextNode("\n                    ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("div");
        dom.setAttribute(el8,"class","columns small-12 medium-6");
        var el9 = dom.createTextNode("\n                      ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("div");
        dom.setAttribute(el9,"class","place--phone align-middle row");
        var el10 = dom.createTextNode("\n                        ");
        dom.appendChild(el9, el10);
        var el10 = dom.createElement("div");
        dom.setAttribute(el10,"class","small-12 columns");
        var el11 = dom.createTextNode("\n                          ");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("label");
        var el12 = dom.createTextNode("Price range\n                            ");
        dom.appendChild(el11, el12);
        var el12 = dom.createComment("");
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n                          ");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n                        ");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("\n                      ");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                    ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                  ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n\n                  ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7,"class","place--info--holder row");
        var el8 = dom.createTextNode("\n                    ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("div");
        dom.setAttribute(el8,"class","columns");
        var el9 = dom.createTextNode("\n                      ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("div");
        dom.setAttribute(el9,"class","place--phone align-middle row");
        var el10 = dom.createTextNode("\n                        ");
        dom.appendChild(el9, el10);
        var el10 = dom.createElement("div");
        dom.setAttribute(el10,"class","small-12 columns");
        var el11 = dom.createTextNode("\n                          ");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("label");
        var el12 = dom.createTextNode("Description\n                            ");
        dom.appendChild(el11, el12);
        var el12 = dom.createComment("");
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n                          ");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n                        ");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("\n                      ");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                    ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                  ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n\n                  ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7,"class","place--info--holder row");
        var el8 = dom.createTextNode("\n                    ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("div");
        dom.setAttribute(el8,"class","columns");
        var el9 = dom.createTextNode("\n                      ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("div");
        dom.setAttribute(el9,"class","place--rating");
        var el10 = dom.createTextNode("\n");
        dom.appendChild(el9, el10);
        var el10 = dom.createComment("");
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("                      ");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                    ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                  ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n                ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n              ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n          ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n        ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","place--info--holder row");
        var el3 = dom.createTextNode("\n          ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","columns");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4,"type","submit");
        dom.setAttribute(el4,"class","button expanded");
        var el5 = dom.createTextNode("Save");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n          ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n      ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element18 = dom.childAt(fragment, [1]);
        var element19 = dom.childAt(element18, [1, 1, 1, 1]);
        var element20 = dom.childAt(element19, [1]);
        var element21 = dom.childAt(element20, [1]);
        var element22 = dom.childAt(element20, [9]);
        var element23 = dom.childAt(element22, [3, 1]);
        var element24 = dom.childAt(element19, [3]);
        var element25 = dom.childAt(element24, [3]);
        var morphs = new Array(11);
        morphs[0] = dom.createElementMorph(element18);
        morphs[1] = dom.createElementMorph(element21);
        morphs[2] = dom.createMorphAt(dom.childAt(element20, [5]),1,1);
        morphs[3] = dom.createMorphAt(dom.childAt(element22, [1]),0,0);
        morphs[4] = dom.createElementMorph(element23);
        morphs[5] = dom.createMorphAt(dom.childAt(element24, [1, 2, 1, 1, 1]),1,1);
        morphs[6] = dom.createMorphAt(dom.childAt(element25, [1, 1, 1, 1]),1,1);
        morphs[7] = dom.createMorphAt(dom.childAt(element25, [3, 1, 1, 1]),1,1);
        morphs[8] = dom.createMorphAt(dom.childAt(element24, [5, 1, 1, 1, 1]),1,1);
        morphs[9] = dom.createMorphAt(dom.childAt(element24, [7, 1, 1, 1, 1]),1,1);
        morphs[10] = dom.createMorphAt(dom.childAt(element24, [9, 1, 1]),1,1);
        return morphs;
      },
      statements: [
        ["element","action",["savePlace",["get","model",["loc",[null,[53,33],[53,38]]]]],["on","submit"],["loc",[null,[53,12],[53,52]]]],
        ["element","action",["deletePlace",["get","model",["loc",[null,[59,82],[59,87]]]]],["bubbles","false"],["loc",[null,[59,59],[59,105]]]],
        ["inline","input",[],["type","text","class","place--input","value",["subexpr","@mut",[["get","model.name",["loc",[null,[63,67],[63,77]]]]],[],[]]],["loc",[null,[63,20],[63,79]]]],
        ["content","model.label.name",["loc",[null,[67,49],[67,69]]]],
        ["element","action",["showAddLabel"],["bubbles","false"],["loc",[null,[69,61],[69,102]]]],
        ["inline","input",[],["value",["subexpr","@mut",[["get","model.formattedaddress",["loc",[null,[80,42],[80,64]]]]],[],[]],"class","place--main-input","type","text"],["loc",[null,[80,28],[80,105]]]],
        ["inline","input",[],["value",["subexpr","@mut",[["get","model.website",["loc",[null,[93,42],[93,55]]]]],[],[]],"class","place--main-input","type","text"],["loc",[null,[93,28],[93,95]]]],
        ["inline","input",[],["value",["subexpr","@mut",[["get","model.phone",["loc",[null,[102,42],[102,53]]]]],[],[]],"class","place--main-input","type","text"],["loc",[null,[102,28],[102,93]]]],
        ["inline","input",[],["value",["subexpr","@mut",[["get","model.pricerange",["loc",[null,[114,42],[114,58]]]]],[],[]],"class","place--main-input","type","text"],["loc",[null,[114,28],[114,98]]]],
        ["inline","textarea",[],["type","text","cols","60","rows","3","class","place--main-input","value",["subexpr","@mut",[["get","model.description",["loc",[null,[126,102],[126,119]]]]],[],[]]],["loc",[null,[126,28],[126,121]]]],
        ["block","star-rating-fa",[],["item",["subexpr","@mut",[["get","model",["loc",[null,[136,48],[136,53]]]]],[],[]],"rating",["subexpr","@mut",[["get","model.rating",["loc",[null,[136,61],[136,73]]]]],[],[]],"on-click",["subexpr","action",["setRating"],[],["loc",[null,[136,83],[136,103]]]]],0,null,["loc",[null,[136,24],[144,43]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }());
  var child3 = (function() {
    var child0 = (function() {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 164,
              "column": 6
            },
            "end": {
              "line": 170,
              "column": 6
            }
          },
          "moduleName": "finndis/templates/place.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","row");
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2,"class","columns");
          var el3 = dom.createTextNode("\n          ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n        ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 1]),1,1);
          return morphs;
        },
        statements: [
          ["inline","google-map",[],["longitude",["subexpr","@mut",[["get","mapLng",["loc",[null,[167,33],[167,39]]]]],[],[]],"latitude",["subexpr","@mut",[["get","mapLat",["loc",[null,[167,49],[167,55]]]]],[],[]]],["loc",[null,[167,10],[167,57]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    var child1 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.2",
            "loc": {
              "source": null,
              "start": {
                "line": 194,
                "column": 18
              },
              "end": {
                "line": 205,
                "column": 18
              }
            },
            "moduleName": "finndis/templates/place.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("                  ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1,"class","columns small-12 medium-6");
            var el2 = dom.createTextNode("\n                    ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2,"class","place--spacing place--address row");
            var el3 = dom.createTextNode("\n                      ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("div");
            dom.setAttribute(el3,"class","small-1 columns");
            var el4 = dom.createTextNode("\n                        ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("i");
            dom.setAttribute(el4,"class","place--main--icon fa fa-map-marker");
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n                      ");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n                      ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("div");
            dom.setAttribute(el3,"class","small-11 columns");
            var el4 = dom.createTextNode("\n                        ");
            dom.appendChild(el3, el4);
            var el4 = dom.createComment("");
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n                      ");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n                    ");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n                  ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 1, 3]),1,1);
            return morphs;
          },
          statements: [
            ["content","model.formattedaddress",["loc",[null,[201,24],[201,50]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      var child1 = (function() {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.2",
            "loc": {
              "source": null,
              "start": {
                "line": 206,
                "column": 18
              },
              "end": {
                "line": 219,
                "column": 18
              }
            },
            "moduleName": "finndis/templates/place.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("                  ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1,"class","columns small-12 medium-6");
            var el2 = dom.createTextNode("\n                    ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("a");
            var el3 = dom.createTextNode("\n                      ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("div");
            dom.setAttribute(el3,"class","place--phone row");
            var el4 = dom.createTextNode("\n                        ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("div");
            dom.setAttribute(el4,"class","small-1 columns");
            var el5 = dom.createTextNode("\n                          ");
            dom.appendChild(el4, el5);
            var el5 = dom.createElement("i");
            dom.setAttribute(el5,"class","place--main--icon fa fa-phone");
            dom.appendChild(el4, el5);
            var el5 = dom.createTextNode("\n                        ");
            dom.appendChild(el4, el5);
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n                        ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("div");
            dom.setAttribute(el4,"class","small-11 columns");
            var el5 = dom.createTextNode("\n                          ");
            dom.appendChild(el4, el5);
            var el5 = dom.createComment("");
            dom.appendChild(el4, el5);
            var el5 = dom.createTextNode("\n                        ");
            dom.appendChild(el4, el5);
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n                      ");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n                    ");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n                  ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element5 = dom.childAt(fragment, [1, 1]);
            var morphs = new Array(2);
            morphs[0] = dom.createAttrMorph(element5, 'href');
            morphs[1] = dom.createMorphAt(dom.childAt(element5, [1, 3]),1,1);
            return morphs;
          },
          statements: [
            ["attribute","href",["concat",["tel:",["get","model.phone",["loc",[null,[208,35],[208,46]]]]]]],
            ["content","model.phone",["loc",[null,[214,26],[214,41]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 192,
              "column": 16
            },
            "end": {
              "line": 221,
              "column": 16
            }
          },
          "moduleName": "finndis/templates/place.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","place--info--holder row");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("                ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element6 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(element6,1,1);
          morphs[1] = dom.createMorphAt(element6,2,2);
          return morphs;
        },
        statements: [
          ["block","if",[["get","model.formattedaddress",["loc",[null,[194,24],[194,46]]]]],[],0,null,["loc",[null,[194,18],[205,25]]]],
          ["block","if",[["get","model.phone",["loc",[null,[206,24],[206,35]]]]],[],1,null,["loc",[null,[206,18],[219,25]]]]
        ],
        locals: [],
        templates: [child0, child1]
      };
    }());
    var child2 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.2",
            "loc": {
              "source": null,
              "start": {
                "line": 226,
                "column": 18
              },
              "end": {
                "line": 239,
                "column": 18
              }
            },
            "moduleName": "finndis/templates/place.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("                  ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1,"class","columns medium-6");
            var el2 = dom.createTextNode("\n                    ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("a");
            var el3 = dom.createTextNode("\n                      ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("div");
            dom.setAttribute(el3,"class","place--spacing place--website row");
            var el4 = dom.createTextNode("\n                        ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("div");
            dom.setAttribute(el4,"class","small-1 columns");
            var el5 = dom.createTextNode("\n                          ");
            dom.appendChild(el4, el5);
            var el5 = dom.createElement("i");
            dom.setAttribute(el5,"class","place--main--icon fa fa-globe");
            dom.appendChild(el4, el5);
            var el5 = dom.createTextNode("\n                        ");
            dom.appendChild(el4, el5);
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n                        ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("div");
            dom.setAttribute(el4,"class","small-11 columns");
            var el5 = dom.createTextNode("\n                          ");
            dom.appendChild(el4, el5);
            var el5 = dom.createComment("");
            dom.appendChild(el4, el5);
            var el5 = dom.createTextNode("\n                        ");
            dom.appendChild(el4, el5);
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n                      ");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n                    ");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n                  ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element3 = dom.childAt(fragment, [1, 1]);
            var morphs = new Array(2);
            morphs[0] = dom.createAttrMorph(element3, 'href');
            morphs[1] = dom.createMorphAt(dom.childAt(element3, [1, 3]),1,1);
            return morphs;
          },
          statements: [
            ["attribute","href",["concat",[["get","model.website",["loc",[null,[228,31],[228,44]]]]]]],
            ["content","model.website",["loc",[null,[234,26],[234,43]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      var child1 = (function() {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.2",
            "loc": {
              "source": null,
              "start": {
                "line": 240,
                "column": 18
              },
              "end": {
                "line": 253,
                "column": 18
              }
            },
            "moduleName": "finndis/templates/place.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("                  ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1,"class","columns small-12 medium-6");
            var el2 = dom.createTextNode("\n                    ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("a");
            var el3 = dom.createTextNode("\n                      ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("div");
            dom.setAttribute(el3,"class","place--url row");
            var el4 = dom.createTextNode("\n                        ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("div");
            dom.setAttribute(el4,"class","small-1 columns");
            var el5 = dom.createTextNode("\n                          ");
            dom.appendChild(el4, el5);
            var el5 = dom.createElement("i");
            dom.setAttribute(el5,"class","place--main--icon fa fa-google");
            dom.appendChild(el4, el5);
            var el5 = dom.createTextNode("\n                        ");
            dom.appendChild(el4, el5);
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n                        ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("div");
            dom.setAttribute(el4,"class","small-11 columns");
            var el5 = dom.createTextNode("\n                          Google Map\n                        ");
            dom.appendChild(el4, el5);
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n                      ");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n                    ");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n                  ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element2 = dom.childAt(fragment, [1, 1]);
            var morphs = new Array(1);
            morphs[0] = dom.createAttrMorph(element2, 'href');
            return morphs;
          },
          statements: [
            ["attribute","href",["concat",[["get","model.url",["loc",[null,[242,31],[242,40]]]]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 224,
              "column": 16
            },
            "end": {
              "line": 255,
              "column": 16
            }
          },
          "moduleName": "finndis/templates/place.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","place--info--holder row");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("                ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element4 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(element4,1,1);
          morphs[1] = dom.createMorphAt(element4,2,2);
          return morphs;
        },
        statements: [
          ["block","if",[["get","model.website",["loc",[null,[226,24],[226,37]]]]],[],0,null,["loc",[null,[226,18],[239,25]]]],
          ["block","if",[["get","model.url",["loc",[null,[240,24],[240,33]]]]],[],1,null,["loc",[null,[240,18],[253,25]]]]
        ],
        locals: [],
        templates: [child0, child1]
      };
    }());
    var child3 = (function() {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 270,
              "column": 18
            },
            "end": {
              "line": 281,
              "column": 18
            }
          },
          "moduleName": "finndis/templates/place.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","columns small-12 medium-6");
          var el2 = dom.createTextNode("\n                    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2,"class","place--price row");
          var el3 = dom.createTextNode("\n                      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3,"class","small-1 columns");
          var el4 = dom.createTextNode("\n                        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("i");
          dom.setAttribute(el4,"class","place--main--icon fa fa-usd");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n                      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n                      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3,"class","small-11 columns");
          var el4 = dom.createTextNode("\n                        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n                      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n                    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n                  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 1, 3]),1,1);
          return morphs;
        },
        statements: [
          ["content","model.pricerange",["loc",[null,[277,24],[277,44]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    var child4 = (function() {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 284,
              "column": 16
            },
            "end": {
              "line": 297,
              "column": 16
            }
          },
          "moduleName": "finndis/templates/place.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","place--info--holder row");
          var el2 = dom.createTextNode("\n                  ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2,"class","columns");
          var el3 = dom.createTextNode("\n                    ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3,"class","place--description row");
          var el4 = dom.createTextNode("\n                      ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          dom.setAttribute(el4,"class","small-1 columns");
          var el5 = dom.createTextNode("\n                        ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("i");
          dom.setAttribute(el5,"class","place--main--icon fa fa-info");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n                      ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n                      ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          dom.setAttribute(el4,"class","small-11 columns");
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
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 1, 1, 3]),1,1);
          return morphs;
        },
        statements: [
          ["content","model.description",["loc",[null,[292,24],[292,45]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    var child5 = (function() {
      var child0 = (function() {
        var child0 = (function() {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.3.2",
              "loc": {
                "source": null,
                "start": {
                  "line": 303,
                  "column": 26
                },
                "end": {
                  "line": 305,
                  "column": 26
                }
              },
              "moduleName": "finndis/templates/place.hbs"
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
              dom.setAttribute(el1,"class","star-rating fa fa-star");
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
            statements: [
              ["element","action",[["get","set",["loc",[null,[304,71],[304,74]]]],["get","star.rating",["loc",[null,[304,75],[304,86]]]]],[],["loc",[null,[304,62],[304,88]]]]
            ],
            locals: [],
            templates: []
          };
        }());
        var child1 = (function() {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.3.2",
              "loc": {
                "source": null,
                "start": {
                  "line": 305,
                  "column": 26
                },
                "end": {
                  "line": 307,
                  "column": 26
                }
              },
              "moduleName": "finndis/templates/place.hbs"
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
              dom.setAttribute(el1,"class","star-rating fa fa-star-o");
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
            statements: [
              ["element","action",[["get","set",["loc",[null,[306,73],[306,76]]]],["get","star.rating",["loc",[null,[306,77],[306,88]]]]],[],["loc",[null,[306,64],[306,90]]]]
            ],
            locals: [],
            templates: []
          };
        }());
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.2",
            "loc": {
              "source": null,
              "start": {
                "line": 302,
                "column": 24
              },
              "end": {
                "line": 308,
                "column": 24
              }
            },
            "moduleName": "finndis/templates/place.hbs"
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
            morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [
            ["block","if",[["get","star.full",["loc",[null,[303,32],[303,41]]]]],[],0,1,["loc",[null,[303,26],[307,33]]]]
          ],
          locals: ["star"],
          templates: [child0, child1]
        };
      }());
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 301,
              "column": 22
            },
            "end": {
              "line": 309,
              "column": 22
            }
          },
          "moduleName": "finndis/templates/place.hbs"
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
          morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [
          ["block","each",[["get","stars",["loc",[null,[302,32],[302,37]]]]],[],0,null,["loc",[null,[302,24],[308,33]]]]
        ],
        locals: ["stars","set"],
        templates: [child0]
      };
    }());
    return {
      meta: {
        "fragmentReason": false,
        "revision": "Ember@2.3.2",
        "loc": {
          "source": null,
          "start": {
            "line": 162,
            "column": 4
          },
          "end": {
            "line": 319,
            "column": 4
          }
        },
        "moduleName": "finndis/templates/place.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("      ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","row");
        var el2 = dom.createTextNode("\n        ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","columns");
        var el3 = dom.createTextNode("\n          ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","place--holder");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("article");
        dom.setAttribute(el4,"class","place");
        var el5 = dom.createTextNode("\n              ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("header");
        dom.setAttribute(el5,"class","place--header");
        var el6 = dom.createTextNode("\n                ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("a");
        dom.setAttribute(el6,"href","#");
        dom.setAttribute(el6,"class","button share-button");
        var el7 = dom.createElement("i");
        dom.setAttribute(el7,"class","place--action--icon fa fa-share-alt");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("Share");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("a");
        dom.setAttribute(el6,"href","#");
        dom.setAttribute(el6,"class","button edit-button");
        var el7 = dom.createElement("i");
        dom.setAttribute(el7,"class","place--action--icon fa fa-pencil-square-o");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("Edit");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n\n                ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("h2");
        dom.setAttribute(el6,"class","place--title");
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("i");
        dom.setAttribute(el6,"class","place--labels--icon fa fa-tag");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("ul");
        dom.setAttribute(el6,"class","place--labels clearfix");
        var el7 = dom.createTextNode("\n                  ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        dom.setAttribute(el7,"class","place--labelitem");
        var el8 = dom.createComment("");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n                  ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        dom.setAttribute(el7,"class","place--labelitem");
        var el8 = dom.createTextNode("\n                    ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("i");
        dom.setAttribute(el8,"class","place--add--icon fa fa-plus");
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                  ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n                ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n              ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n              ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("main");
        dom.setAttribute(el5,"class","place--main");
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6,"class","place--info--holder row");
        var el7 = dom.createTextNode("\n                  ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7,"class","columns small-12  medium-6");
        var el8 = dom.createTextNode("\n                    ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("a");
        dom.setAttribute(el8,"target","_blank");
        var el9 = dom.createTextNode("\n                      ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("div");
        dom.setAttribute(el9,"class","place--spacing place--direction row");
        var el10 = dom.createTextNode("\n                        ");
        dom.appendChild(el9, el10);
        var el10 = dom.createElement("div");
        dom.setAttribute(el10,"class","small-1 columns");
        var el11 = dom.createTextNode("\n                          ");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("i");
        dom.setAttribute(el11,"class","place--main--icon fa fa-location-arrow");
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n                        ");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("\n                        ");
        dom.appendChild(el9, el10);
        var el10 = dom.createElement("div");
        dom.setAttribute(el10,"class","small-11 columns");
        var el11 = dom.createTextNode("\n                          Get direction\n                        ");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("\n                      ");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                    ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                  ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n");
        dom.appendChild(el6, el7);
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("                ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("                ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6,"class","place--info--holder row");
        var el7 = dom.createTextNode("\n                  ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7,"class","columns");
        var el8 = dom.createTextNode("\n                    ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("div");
        dom.setAttribute(el8,"class","place--rating");
        var el9 = dom.createTextNode("\n");
        dom.appendChild(el8, el9);
        var el9 = dom.createComment("");
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("                    ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                  ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n                ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n              ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n          ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n      ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element7 = dom.childAt(fragment, [4, 1, 1, 1]);
        var element8 = dom.childAt(element7, [1]);
        var element9 = dom.childAt(element8, [1]);
        var element10 = dom.childAt(element8, [3]);
        var element11 = dom.childAt(element8, [9]);
        var element12 = dom.childAt(element11, [3, 1]);
        var element13 = dom.childAt(element7, [3]);
        var element14 = dom.childAt(element13, [5]);
        var element15 = dom.childAt(element14, [1, 1]);
        var morphs = new Array(12);
        morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
        morphs[1] = dom.createElementMorph(element9);
        morphs[2] = dom.createElementMorph(element10);
        morphs[3] = dom.createMorphAt(dom.childAt(element8, [5]),0,0);
        morphs[4] = dom.createMorphAt(dom.childAt(element11, [1]),0,0);
        morphs[5] = dom.createElementMorph(element12);
        morphs[6] = dom.createMorphAt(element13,1,1);
        morphs[7] = dom.createMorphAt(element13,3,3);
        morphs[8] = dom.createAttrMorph(element15, 'href');
        morphs[9] = dom.createMorphAt(element14,3,3);
        morphs[10] = dom.createMorphAt(element13,7,7);
        morphs[11] = dom.createMorphAt(dom.childAt(element13, [9, 1, 1]),1,1);
        return morphs;
      },
      statements: [
        ["block","if",[["get","model.locationlat",["loc",[null,[164,12],[164,29]]]]],[],0,null,["loc",[null,[164,6],[170,13]]]],
        ["element","action",["sharePlace"],[],["loc",[null,[178,56],[178,79]]]],
        ["element","action",["toggleEdition"],[],["loc",[null,[179,55],[179,81]]]],
        ["content","model.name",["loc",[null,[181,41],[181,55]]]],
        ["content","model.label.name",["loc",[null,[184,47],[184,67]]]],
        ["element","action",["showAddLabel"],["bubbles","false"],["loc",[null,[186,59],[186,100]]]],
        ["block","if",[["get","hasPhoneOrAddress",["loc",[null,[192,22],[192,39]]]]],[],1,null,["loc",[null,[192,16],[221,23]]]],
        ["block","if",[["get","hasUrlOrWebsite",["loc",[null,[224,22],[224,37]]]]],[],2,null,["loc",[null,[224,16],[255,23]]]],
        ["attribute","href",["concat",["http://maps.google.com/maps?daddr=",["get","model.locationlat",["loc",[null,[259,65],[259,82]]]],",",["get","model.locationlng",["loc",[null,[259,87],[259,104]]]],"&ll="]]],
        ["block","if",[["get","model.pricerange",["loc",[null,[270,24],[270,40]]]]],[],3,null,["loc",[null,[270,18],[281,25]]]],
        ["block","if",[["get","model.description",["loc",[null,[284,22],[284,39]]]]],[],4,null,["loc",[null,[284,16],[297,23]]]],
        ["block","star-rating-fa",[],["item",["subexpr","@mut",[["get","model",["loc",[null,[301,46],[301,51]]]]],[],[]],"rating",["subexpr","@mut",[["get","model.rating",["loc",[null,[301,59],[301,71]]]]],[],[]],"on-click",["subexpr","action",["setRating"],[],["loc",[null,[301,81],[301,101]]]]],5,null,["loc",[null,[301,22],[309,41]]]]
      ],
      locals: [],
      templates: [child0, child1, child2, child3, child4, child5]
    };
  }());
  return {
    meta: {
      "fragmentReason": {
        "name": "missing-wrapper",
        "problems": [
          "multiple-nodes"
        ]
      },
      "revision": "Ember@2.3.2",
      "loc": {
        "source": null,
        "start": {
          "line": 1,
          "column": 0
        },
        "end": {
          "line": 322,
          "column": 0
        }
      },
      "moduleName": "finndis/templates/place.hbs"
    },
    isEmpty: false,
    arity: 0,
    cachedFragment: null,
    hasRendered: false,
    buildFragment: function buildFragment(dom) {
      var el0 = dom.createDocumentFragment();
      var el1 = dom.createElement("div");
      dom.setAttribute(el1,"class","row");
      var el2 = dom.createTextNode("\n  ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("div");
      dom.setAttribute(el2,"class","medium-8 medium-offset-2 columns");
      var el3 = dom.createTextNode("\n    ");
      dom.appendChild(el2, el3);
      var el3 = dom.createComment("");
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n  ");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n");
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n");
      dom.appendChild(el0, el1);
      var el1 = dom.createElement("div");
      dom.setAttribute(el1,"class","place--details row");
      var el2 = dom.createTextNode("\n  ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("div");
      dom.setAttribute(el2,"class","medium-8 medium-offset-2 columns");
      var el3 = dom.createTextNode("\n\n    ");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("div");
      var el4 = dom.createTextNode("\n      ");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("form");
      dom.setAttribute(el4,"class","add-label--form");
      var el5 = dom.createTextNode("\n        ");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("div");
      dom.setAttribute(el5,"class","row");
      var el6 = dom.createTextNode("\n          ");
      dom.appendChild(el5, el6);
      var el6 = dom.createElement("div");
      dom.setAttribute(el6,"class","back-button--holder small-2 columns");
      var el7 = dom.createTextNode("\n            ");
      dom.appendChild(el6, el7);
      var el7 = dom.createElement("a");
      var el8 = dom.createElement("i");
      dom.setAttribute(el8,"class","back-button fa fa-arrow-left");
      dom.appendChild(el7, el8);
      dom.appendChild(el6, el7);
      var el7 = dom.createTextNode("\n          ");
      dom.appendChild(el6, el7);
      dom.appendChild(el5, el6);
      var el6 = dom.createTextNode("\n          ");
      dom.appendChild(el5, el6);
      var el6 = dom.createElement("div");
      dom.setAttribute(el6,"class","small-10 columns");
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
      dom.setAttribute(el5,"class","row");
      var el6 = dom.createTextNode("\n          ");
      dom.appendChild(el5, el6);
      var el6 = dom.createElement("div");
      dom.setAttribute(el6,"class","medium-12 columns");
      var el7 = dom.createTextNode("\n            ");
      dom.appendChild(el6, el7);
      var el7 = dom.createElement("ul");
      dom.setAttribute(el7,"class","label--list");
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
      var el3 = dom.createTextNode("\n\n");
      dom.appendChild(el2, el3);
      var el3 = dom.createComment("");
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("  ");
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
      var element27 = dom.childAt(fragment, [2, 1]);
      var element28 = dom.childAt(element27, [1]);
      var element29 = dom.childAt(element28, [1]);
      var element30 = dom.childAt(element29, [1]);
      var element31 = dom.childAt(element30, [1, 1]);
      var element32 = dom.childAt(element27, [3]);
      var morphs = new Array(8);
      morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0, 1]),1,1);
      morphs[1] = dom.createAttrMorph(element28, 'class');
      morphs[2] = dom.createElementMorph(element31);
      morphs[3] = dom.createMorphAt(dom.childAt(element30, [3]),1,1);
      morphs[4] = dom.createMorphAt(dom.childAt(element29, [3, 1, 1]),1,1);
      morphs[5] = dom.createAttrMorph(element32, 'class');
      morphs[6] = dom.createElementMorph(element32);
      morphs[7] = dom.createMorphAt(element27,5,5);
      return morphs;
    },
    statements: [
      ["block","link-to",["places"],[],0,null,["loc",[null,[3,4],[3,81]]]],
      ["attribute","class",["concat",["panel right ",["get","labelPanelDisplayed",["loc",[null,[9,30],[9,49]]]]]]],
      ["element","action",["closeMenuPanel"],[],["loc",[null,[13,15],[13,42]]]],
      ["content","add-label",["loc",[null,[16,12],[16,25]]]],
      ["block","each",[["get","userLabels",["loc",[null,[22,22],[22,32]]]]],[],1,null,["loc",[null,[22,14],[43,23]]]],
      ["attribute","class",["concat",["panel-overlay right ",["get","labelPanelDisplayed",["loc",[null,[49,36],[49,55]]]]]]],
      ["element","action",["closeMenuPanel"],[],["loc",[null,[49,59],[49,86]]]],
      ["block","if",[["get","isEditing",["loc",[null,[51,10],[51,19]]]]],[],2,3,["loc",[null,[51,4],[319,11]]]]
    ],
    locals: [],
    templates: [child0, child1, child2, child3]
  };
}()));