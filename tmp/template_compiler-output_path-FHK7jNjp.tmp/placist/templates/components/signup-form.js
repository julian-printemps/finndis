export default Ember.HTMLBars.template((function() {
  var child0 = (function() {
    return {
      meta: {
        "fragmentReason": false,
        "revision": "Ember@2.3.2",
        "loc": {
          "source": null,
          "start": {
            "line": 9,
            "column": 4
          },
          "end": {
            "line": 11,
            "column": 4
          }
        },
        "moduleName": "finndis/templates/components/signup-form.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("      ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("span");
        dom.setAttribute(el1,"class","user-section--name");
        var el2 = dom.createTextNode("Have fun :)");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
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
            "line": 32,
            "column": 10
          },
          "end": {
            "line": 36,
            "column": 10
          }
        },
        "moduleName": "finndis/templates/components/signup-form.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("            ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("small");
        dom.setAttribute(el1,"class","legend");
        var el2 = dom.createTextNode("\n              ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n            ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),1,1);
        return morphs;
      },
      statements: [
        ["inline","get",[["subexpr","get",[["get","model.validations.attrs",[]],"email"],[],[]],"message"],[],["loc",[null,[34,14],[34,47]]]]
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
            "line": 42,
            "column": 10
          },
          "end": {
            "line": 46,
            "column": 10
          }
        },
        "moduleName": "finndis/templates/components/signup-form.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("            ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("small");
        dom.setAttribute(el1,"class","legend");
        var el2 = dom.createTextNode("\n              ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n            ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),1,1);
        return morphs;
      },
      statements: [
        ["inline","get",[["subexpr","get",[["get","model.validations.attrs",[]],"password"],[],[]],"message"],[],["loc",[null,[44,14],[44,50]]]]
      ],
      locals: [],
      templates: []
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
          "line": 61,
          "column": 0
        }
      },
      "moduleName": "finndis/templates/components/signup-form.hbs"
    },
    isEmpty: false,
    arity: 0,
    cachedFragment: null,
    hasRendered: false,
    buildFragment: function buildFragment(dom) {
      var el0 = dom.createDocumentFragment();
      var el1 = dom.createElement("nav");
      dom.setAttribute(el1,"id","panel-sigup");
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
      var el3 = dom.createTextNode("  ");
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
      var el3 = dom.createElement("form");
      dom.setAttribute(el3,"class","signup-form");
      var el4 = dom.createTextNode("\n      ");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("div");
      dom.setAttribute(el4,"class","input-holder row");
      var el5 = dom.createTextNode("\n        ");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("div");
      dom.setAttribute(el5,"class","small-12 medium-6 columns");
      var el6 = dom.createTextNode("\n          ");
      dom.appendChild(el5, el6);
      var el6 = dom.createComment("");
      dom.appendChild(el5, el6);
      var el6 = dom.createTextNode("\n          ");
      dom.appendChild(el5, el6);
      var el6 = dom.createElement("small");
      dom.setAttribute(el6,"class","legend");
      var el7 = dom.createTextNode("(optional)");
      dom.appendChild(el6, el7);
      dom.appendChild(el5, el6);
      var el6 = dom.createTextNode("\n        ");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n        ");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("div");
      dom.setAttribute(el5,"class","small-12 medium-6 columns");
      var el6 = dom.createTextNode("\n          ");
      dom.appendChild(el5, el6);
      var el6 = dom.createComment("");
      dom.appendChild(el5, el6);
      var el6 = dom.createTextNode("\n          ");
      dom.appendChild(el5, el6);
      var el6 = dom.createElement("small");
      dom.setAttribute(el6,"class","legend");
      var el7 = dom.createTextNode("(optional)");
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
      dom.setAttribute(el4,"class","input-holder row");
      var el5 = dom.createTextNode("\n        ");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("div");
      dom.setAttribute(el5,"class","small-12 columns");
      var el6 = dom.createTextNode("\n          ");
      dom.appendChild(el5, el6);
      var el6 = dom.createComment("");
      dom.appendChild(el5, el6);
      var el6 = dom.createTextNode("\n");
      dom.appendChild(el5, el6);
      var el6 = dom.createComment("");
      dom.appendChild(el5, el6);
      var el6 = dom.createTextNode("        ");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n      ");
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n      ");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("div");
      dom.setAttribute(el4,"class","input-holder row");
      var el5 = dom.createTextNode("\n        ");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("div");
      dom.setAttribute(el5,"class","small-12 medium-12 columns");
      var el6 = dom.createTextNode("\n          ");
      dom.appendChild(el5, el6);
      var el6 = dom.createComment("");
      dom.appendChild(el5, el6);
      var el6 = dom.createTextNode("\n");
      dom.appendChild(el5, el6);
      var el6 = dom.createComment("");
      dom.appendChild(el5, el6);
      var el6 = dom.createTextNode("        ");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n      ");
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n      ");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("div");
      dom.setAttribute(el4,"class","login-form--button-holder row");
      var el5 = dom.createTextNode("\n        ");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("div");
      dom.setAttribute(el5,"class","small-12 columns");
      var el6 = dom.createTextNode("\n          ");
      dom.appendChild(el5, el6);
      var el6 = dom.createElement("button");
      dom.setAttribute(el6,"type","submit");
      dom.setAttribute(el6,"class","button expanded");
      var el7 = dom.createElement("i");
      dom.setAttribute(el7,"class","fa fa-user-plus");
      dom.appendChild(el6, el7);
      var el7 = dom.createTextNode(" Sign up");
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
      var el2 = dom.createTextNode("\n\n");
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
      var element0 = dom.childAt(fragment, [0]);
      var element1 = dom.childAt(element0, [2]);
      var element2 = dom.childAt(element1, [2]);
      var element3 = dom.childAt(element0, [6, 1]);
      var element4 = dom.childAt(element3, [1]);
      var element5 = dom.childAt(element3, [3, 1]);
      var element6 = dom.childAt(element3, [5, 1]);
      var element7 = dom.childAt(fragment, [2]);
      var morphs = new Array(13);
      morphs[0] = dom.createAttrMorph(element0, 'class');
      morphs[1] = dom.createElementMorph(element1);
      morphs[2] = dom.createElementMorph(element2);
      morphs[3] = dom.createMorphAt(element1,5,5);
      morphs[4] = dom.createElementMorph(element3);
      morphs[5] = dom.createMorphAt(dom.childAt(element4, [1]),1,1);
      morphs[6] = dom.createMorphAt(dom.childAt(element4, [3]),1,1);
      morphs[7] = dom.createMorphAt(element5,1,1);
      morphs[8] = dom.createMorphAt(element5,3,3);
      morphs[9] = dom.createMorphAt(element6,1,1);
      morphs[10] = dom.createMorphAt(element6,3,3);
      morphs[11] = dom.createAttrMorph(element7, 'class');
      morphs[12] = dom.createElementMorph(element7);
      return morphs;
    },
    statements: [
      ["attribute","class",["concat",["panel-menu panel left ",["get","signupPanelClass",["loc",[null,[1,53],[1,69]]]]]]],
      ["element","action",["closeMenuPanel"],["on","click"],["loc",[null,[4,43],[4,81]]]],
      ["element","action",["closeMenuPanel"],[],["loc",[null,[6,30],[6,57]]]],
      ["block","link-to",["users"],["class","navigation--user-link"],0,null,["loc",[null,[9,4],[11,16]]]],
      ["element","action",["signup"],["on","submit"],["loc",[null,[18,10],[18,41]]]],
      ["inline","input",[],["value",["subexpr","@mut",[["get","model.firstname",["loc",[null,[21,24],[21,39]]]]],[],[]],"type","text","placeholder","Your first name"],["loc",[null,[21,10],[21,83]]]],
      ["inline","input",[],["value",["subexpr","@mut",[["get","model.lastname",["loc",[null,[25,24],[25,38]]]]],[],[]],"type","text","placeholder","Your last name"],["loc",[null,[25,10],[25,81]]]],
      ["inline","input",[],["value",["subexpr","@mut",[["get","model.email",["loc",[null,[31,24],[31,35]]]]],[],[]],"type","email","placeholder","e-mail address"],["loc",[null,[31,10],[31,79]]]],
      ["block","if",[["subexpr","get",[["subexpr","get",[["get","model.validations.attrs",[]],"email"],[],[]],"isInvalid"],[],["loc",[null,[32,16],[32,49]]]]],[],1,null,["loc",[null,[32,10],[36,17]]]],
      ["inline","input",[],["value",["subexpr","@mut",[["get","model.password",["loc",[null,[41,24],[41,38]]]]],[],[]],"type","password","placeholder","Password"],["loc",[null,[41,10],[41,79]]]],
      ["block","if",[["subexpr","get",[["subexpr","get",[["get","model.validations.attrs",[]],"password"],[],[]],"isInvalid"],[],["loc",[null,[42,16],[42,52]]]]],[],2,null,["loc",[null,[42,10],[46,17]]]],
      ["attribute","class",["concat",["panel-overlay left ",["get","signupPanelClass",["loc",[null,[60,31],[60,47]]]]]]],
      ["element","action",["closeMenuPanel"],[],["loc",[null,[60,51],[60,78]]]]
    ],
    locals: [],
    templates: [child0, child1, child2]
  };
}()));