export default Ember.HTMLBars.template((function() {
  var child0 = (function() {
    return {
      meta: {
        "fragmentReason": false,
        "revision": "Ember@2.3.2",
        "loc": {
          "source": null,
          "start": {
            "line": 7,
            "column": 54
          },
          "end": {
            "line": 7,
            "column": 82
          }
        },
        "moduleName": "finndis/templates/components/menu-panel.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("finndis");
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
            "line": 28,
            "column": 4
          },
          "end": {
            "line": 37,
            "column": 4
          }
        },
        "moduleName": "finndis/templates/components/menu-panel.hbs"
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
        dom.setAttribute(el1,"class","row align-middle");
        var el2 = dom.createTextNode("\n        ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","small-3 columns");
        var el3 = dom.createTextNode("\n          ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("img");
        dom.setAttribute(el3,"class","user-section--image");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n        ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","small-9 columns");
        var el3 = dom.createTextNode("\n          ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("span");
        dom.setAttribute(el3,"class","user-section--name");
        var el4 = dom.createComment("");
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
        var element1 = dom.childAt(fragment, [1]);
        var element2 = dom.childAt(element1, [1, 1]);
        var morphs = new Array(2);
        morphs[0] = dom.createAttrMorph(element2, 'src');
        morphs[1] = dom.createMorphAt(dom.childAt(element1, [3, 1]),0,0);
        return morphs;
      },
      statements: [
        ["attribute","src",["concat",[["get","session.data.authenticated.profile.picture",["loc",[null,[31,50],[31,92]]]]]]],
        ["content","session.data.authenticated.profile.given_name",["loc",[null,[34,43],[34,92]]]]
      ],
      locals: [],
      templates: []
    };
  }());
  var child2 = (function() {
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
            "line": 51,
            "column": 103
          }
        },
        "moduleName": "finndis/templates/components/menu-panel.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("i");
        dom.setAttribute(el1,"class","navigation--icon fa fa-plus");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("Add new");
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
  var child3 = (function() {
    return {
      meta: {
        "fragmentReason": false,
        "revision": "Ember@2.3.2",
        "loc": {
          "source": null,
          "start": {
            "line": 58,
            "column": 4
          },
          "end": {
            "line": 58,
            "column": 109
          }
        },
        "moduleName": "finndis/templates/components/menu-panel.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("i");
        dom.setAttribute(el1,"class","navigation--icon fa fa-map-marker");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("Add with Maps");
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
  var child4 = (function() {
    return {
      meta: {
        "fragmentReason": false,
        "revision": "Ember@2.3.2",
        "loc": {
          "source": null,
          "start": {
            "line": 65,
            "column": 4
          },
          "end": {
            "line": 65,
            "column": 112
          }
        },
        "moduleName": "finndis/templates/components/menu-panel.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("i");
        dom.setAttribute(el1,"class","navigation--icon fa fa-search");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("Search in finndis");
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
  var child5 = (function() {
    return {
      meta: {
        "fragmentReason": false,
        "revision": "Ember@2.3.2",
        "loc": {
          "source": null,
          "start": {
            "line": 73,
            "column": 4
          },
          "end": {
            "line": 73,
            "column": 54
          }
        },
        "moduleName": "finndis/templates/components/menu-panel.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("Edit");
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
  var child6 = (function() {
    var child0 = (function() {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 78,
              "column": 10
            },
            "end": {
              "line": 87,
              "column": 10
            }
          },
          "moduleName": "finndis/templates/components/menu-panel.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("          ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","label--listitem label-editor row");
          var el2 = dom.createTextNode("\n            ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2,"class","label--icon-holder small-2 columns");
          var el3 = dom.createTextNode("\n              ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("i");
          dom.setAttribute(el3,"class","label--icon fa fa-tag");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n            ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n            ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2,"class","small-10 columns");
          var el3 = dom.createTextNode("\n              ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n            ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 3]),1,1);
          return morphs;
        },
        statements: [
          ["content","label.name",["loc",[null,[84,14],[84,28]]]]
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
            "line": 76,
            "column": 6
          },
          "end": {
            "line": 89,
            "column": 6
          }
        },
        "moduleName": "finndis/templates/components/menu-panel.hbs"
      },
      isEmpty: false,
      arity: 1,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("        ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("li");
        dom.setAttribute(el1,"class","label-editor--holder");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("        ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [1]);
        var morphs = new Array(2);
        morphs[0] = dom.createAttrMorph(element0, 'id');
        morphs[1] = dom.createMorphAt(element0,1,1);
        return morphs;
      },
      statements: [
        ["attribute","id",["concat",[["get","label.labelId",["loc",[null,[77,18],[77,31]]]]]]],
        ["block","link-to",["label",["get","label",["loc",[null,[78,29],[78,34]]]]],[],0,null,["loc",[null,[78,10],[87,22]]]]
      ],
      locals: ["label"],
      templates: [child0]
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
          "line": 95,
          "column": 0
        }
      },
      "moduleName": "finndis/templates/components/menu-panel.hbs"
    },
    isEmpty: false,
    arity: 0,
    cachedFragment: null,
    hasRendered: false,
    buildFragment: function buildFragment(dom) {
      var el0 = dom.createDocumentFragment();
      var el1 = dom.createTextNode("\n");
      dom.appendChild(el0, el1);
      var el1 = dom.createElement("div");
      dom.setAttribute(el1,"class","navigation--holder");
      var el2 = dom.createTextNode("\n  ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("div");
      dom.setAttribute(el2,"class","row");
      var el3 = dom.createTextNode("\n    ");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("div");
      dom.setAttribute(el3,"class","columns small-12");
      var el4 = dom.createTextNode("\n      ");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("nav");
      dom.setAttribute(el4,"class","row navigation");
      var el5 = dom.createTextNode("\n        ");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("div");
      dom.setAttribute(el5,"class","navigation--title small-7 columns");
      var el6 = dom.createTextNode("\n          ");
      dom.appendChild(el5, el6);
      var el6 = dom.createElement("h1");
      dom.setAttribute(el6,"class","site-title");
      var el7 = dom.createElement("strong");
      dom.setAttribute(el7,"class","logo");
      var el8 = dom.createComment("");
      dom.appendChild(el7, el8);
      dom.appendChild(el6, el7);
      dom.appendChild(el5, el6);
      var el6 = dom.createTextNode("\n        ");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n        ");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("div");
      dom.setAttribute(el5,"class","small-5 columns end navigation--button-holder");
      var el6 = dom.createTextNode("\n          ");
      dom.appendChild(el5, el6);
      var el6 = dom.createElement("ul");
      dom.setAttribute(el6,"class","dropdown menu navigation--list");
      var el7 = dom.createTextNode("\n            ");
      dom.appendChild(el6, el7);
      var el7 = dom.createElement("li");
      dom.setAttribute(el7,"class","navigation--listitem");
      var el8 = dom.createElement("a");
      dom.setAttribute(el8,"class","navigation--link");
      var el9 = dom.createElement("i");
      dom.setAttribute(el9,"class","navigation--icon fa fa-bars");
      dom.appendChild(el8, el9);
      var el9 = dom.createTextNode("Menu");
      dom.appendChild(el8, el9);
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
      var el3 = dom.createTextNode("\n  ");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n");
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n\n\n");
      dom.appendChild(el0, el1);
      var el1 = dom.createElement("nav");
      dom.setAttribute(el1,"id","panel-menu");
      var el2 = dom.createTextNode("\n\n");
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("  ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("div");
      dom.setAttribute(el2,"class","panel--section user-section");
      var el3 = dom.createTextNode("\n");
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("      ");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("a");
      dom.setAttribute(el3,"class","close-button");
      var el4 = dom.createElement("i");
      dom.setAttribute(el4,"class","fa fa-times");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n");
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n");
      dom.appendChild(el2, el3);
      var el3 = dom.createComment("");
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n    ");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("a");
      dom.setAttribute(el3,"class","button user-button left");
      var el4 = dom.createTextNode("\n      ");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("i");
      dom.setAttribute(el4,"class","fa fa-sign-out");
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode(" Sign out\n    ");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n    ");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("a");
      dom.setAttribute(el3,"class","button user-button right");
      var el4 = dom.createTextNode("\n      ");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("i");
      dom.setAttribute(el4,"class","fa fa-cog");
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode(" Settings\n    ");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n  ");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n");
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n\n");
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("  ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("div");
      dom.setAttribute(el2,"class","panel--section");
      var el3 = dom.createTextNode("\n    ");
      dom.appendChild(el2, el3);
      var el3 = dom.createComment("");
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n  ");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n");
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n\n");
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("  ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("div");
      dom.setAttribute(el2,"class","panel--section");
      var el3 = dom.createTextNode("\n    ");
      dom.appendChild(el2, el3);
      var el3 = dom.createComment("");
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n  ");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n");
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n\n");
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("  ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("div");
      dom.setAttribute(el2,"class","panel--section");
      var el3 = dom.createTextNode("\n    ");
      dom.appendChild(el2, el3);
      var el3 = dom.createComment("");
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n  ");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n");
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n\n");
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("  ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("div");
      dom.setAttribute(el2,"class","panel--section label-section");
      var el3 = dom.createTextNode("\n    ");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("h3");
      dom.setAttribute(el3,"class","panel--section--title");
      var el4 = dom.createTextNode("Labels");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n    ");
      dom.appendChild(el2, el3);
      var el3 = dom.createComment("");
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n\n    ");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("ul");
      dom.setAttribute(el3,"class","label--list");
      var el4 = dom.createTextNode("\n");
      dom.appendChild(el3, el4);
      var el4 = dom.createComment("");
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("    ");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n  ");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n");
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n");
      dom.appendChild(el0, el1);
      var el1 = dom.createElement("a");
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n");
      dom.appendChild(el0, el1);
      return el0;
    },
    buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
      var element3 = dom.childAt(fragment, [1, 1, 1, 1]);
      var element4 = dom.childAt(element3, [3, 1, 1]);
      var element5 = dom.childAt(fragment, [3]);
      var element6 = dom.childAt(element5, [2]);
      var element7 = dom.childAt(element6, [2]);
      var element8 = dom.childAt(element6, [7]);
      var element9 = dom.childAt(element5, [6]);
      var element10 = dom.childAt(element5, [10]);
      var element11 = dom.childAt(element5, [14]);
      var element12 = dom.childAt(element5, [18]);
      var element13 = dom.childAt(fragment, [5]);
      var morphs = new Array(18);
      morphs[0] = dom.createMorphAt(dom.childAt(element3, [1, 1, 0]),0,0);
      morphs[1] = dom.createElementMorph(element4);
      morphs[2] = dom.createAttrMorph(element5, 'class');
      morphs[3] = dom.createElementMorph(element6);
      morphs[4] = dom.createElementMorph(element7);
      morphs[5] = dom.createMorphAt(element6,5,5);
      morphs[6] = dom.createElementMorph(element8);
      morphs[7] = dom.createElementMorph(element9);
      morphs[8] = dom.createMorphAt(element9,1,1);
      morphs[9] = dom.createElementMorph(element10);
      morphs[10] = dom.createMorphAt(element10,1,1);
      morphs[11] = dom.createElementMorph(element11);
      morphs[12] = dom.createMorphAt(element11,1,1);
      morphs[13] = dom.createElementMorph(element12);
      morphs[14] = dom.createMorphAt(element12,3,3);
      morphs[15] = dom.createMorphAt(dom.childAt(element12, [5]),1,1);
      morphs[16] = dom.createAttrMorph(element13, 'class');
      morphs[17] = dom.createElementMorph(element13);
      return morphs;
    },
    statements: [
      ["block","link-to",["places"],[],0,null,["loc",[null,[7,54],[7,94]]]],
      ["element","action",["showMenuPanel"],["on","click"],["loc",[null,[11,45],[11,82]]]],
      ["attribute","class",["concat",["panel-menu panel left ",["get","labelPanelClass",["loc",[null,[20,52],[20,67]]]]]]],
      ["element","action",["closeMenuPanel"],["on","click"],["loc",[null,[23,43],[23,81]]]],
      ["element","action",["closeMenuPanel"],[],["loc",[null,[25,30],[25,57]]]],
      ["block","link-to",["users"],["class","navigation--user-link"],1,null,["loc",[null,[28,4],[37,16]]]],
      ["element","action",["logout"],[],["loc",[null,[39,39],[39,58]]]],
      ["element","action",["closeMenuPanel"],["on","click"],["loc",[null,[50,30],[50,68]]]],
      ["block","link-to",["add-place"],["class","navigation--link"],2,null,["loc",[null,[51,4],[51,115]]]],
      ["element","action",["closeMenuPanel"],["on","click"],["loc",[null,[57,30],[57,68]]]],
      ["block","link-to",["map"],["class","navigation--link"],3,null,["loc",[null,[58,4],[58,121]]]],
      ["element","action",["closeMenuPanel"],["on","click"],["loc",[null,[64,30],[64,68]]]],
      ["block","link-to",["search"],["class","navigation--link"],4,null,["loc",[null,[65,4],[65,124]]]],
      ["element","action",["closeMenuPanel"],["on","click"],["loc",[null,[71,44],[71,82]]]],
      ["block","link-to",["edit-labels"],["class","edit-button"],5,null,["loc",[null,[73,4],[73,66]]]],
      ["block","each",[["get","userLabels",["loc",[null,[76,14],[76,24]]]]],[],6,null,["loc",[null,[76,6],[89,15]]]],
      ["attribute","class",["concat",["panel-overlay left ",["get","labelPanelClass",["loc",[null,[94,31],[94,46]]]]]]],
      ["element","action",["closeMenuPanel"],[],["loc",[null,[94,50],[94,77]]]]
    ],
    locals: [],
    templates: [child0, child1, child2, child3, child4, child5, child6]
  };
}()));