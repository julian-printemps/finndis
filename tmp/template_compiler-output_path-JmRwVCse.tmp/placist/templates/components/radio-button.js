export default Ember.HTMLBars.template((function() {
  var child0 = (function() {
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
            "line": 15,
            "column": 0
          }
        },
        "moduleName": "finndis/templates/components/radio-button.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("  ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("label");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [1]);
        var morphs = new Array(4);
        morphs[0] = dom.createAttrMorph(element0, 'class');
        morphs[1] = dom.createAttrMorph(element0, 'for');
        morphs[2] = dom.createMorphAt(element0,1,1);
        morphs[3] = dom.createMorphAt(element0,3,3);
        return morphs;
      },
      statements: [
        ["attribute","class",["concat",["ember-radio-button ",["subexpr","if",[["get","checked",["loc",[null,[2,40],[2,47]]]],"checked"],[],["loc",[null,[2,35],[2,59]]]]," ",["get","joinedClassNames",["loc",[null,[2,62],[2,78]]]]]]],
        ["attribute","for",["get","radioId",["loc",[null,[2,88],[2,95]]]]],
        ["inline","radio-button-input",[],["class",["subexpr","@mut",[["get","radioClass",["loc",[null,[4,14],[4,24]]]]],[],[]],"id",["subexpr","@mut",[["get","radioId",["loc",[null,[5,11],[5,18]]]]],[],[]],"disabled",["subexpr","@mut",[["get","disabled",["loc",[null,[6,17],[6,25]]]]],[],[]],"name",["subexpr","@mut",[["get","name",["loc",[null,[7,13],[7,17]]]]],[],[]],"required",["subexpr","@mut",[["get","required",["loc",[null,[8,17],[8,25]]]]],[],[]],"groupValue",["subexpr","@mut",[["get","groupValue",["loc",[null,[9,19],[9,29]]]]],[],[]],"value",["subexpr","@mut",[["get","value",["loc",[null,[10,14],[10,19]]]]],[],[]],"changed","changed"],["loc",[null,[3,4],[11,27]]]],
        ["content","yield",["loc",[null,[13,4],[13,13]]]]
      ],
      locals: [],
      templates: []
    };
  }());
  var child1 = (function() {
    return {
      meta: {
        "fragmentReason": false,
        "revision": "Ember@2.4.4",
        "loc": {
          "source": null,
          "start": {
            "line": 15,
            "column": 0
          },
          "end": {
            "line": 25,
            "column": 0
          }
        },
        "moduleName": "finndis/templates/components/radio-button.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("  ");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
        return morphs;
      },
      statements: [
        ["inline","radio-button-input",[],["class",["subexpr","@mut",[["get","radioClass",["loc",[null,[17,12],[17,22]]]]],[],[]],"id",["subexpr","@mut",[["get","radioId",["loc",[null,[18,9],[18,16]]]]],[],[]],"disabled",["subexpr","@mut",[["get","disabled",["loc",[null,[19,15],[19,23]]]]],[],[]],"name",["subexpr","@mut",[["get","name",["loc",[null,[20,11],[20,15]]]]],[],[]],"required",["subexpr","@mut",[["get","required",["loc",[null,[21,15],[21,23]]]]],[],[]],"groupValue",["subexpr","@mut",[["get","groupValue",["loc",[null,[22,17],[22,27]]]]],[],[]],"value",["subexpr","@mut",[["get","value",["loc",[null,[23,12],[23,17]]]]],[],[]],"changed","changed"],["loc",[null,[16,2],[24,25]]]]
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
          "wrong-type"
        ]
      },
      "revision": "Ember@2.4.4",
      "loc": {
        "source": null,
        "start": {
          "line": 1,
          "column": 0
        },
        "end": {
          "line": 26,
          "column": 0
        }
      },
      "moduleName": "finndis/templates/components/radio-button.hbs"
    },
    isEmpty: false,
    arity: 0,
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
      ["block","if",[["get","hasBlock",["loc",[null,[1,6],[1,14]]]]],[],0,1,["loc",[null,[1,0],[25,7]]]]
    ],
    locals: [],
    templates: [child0, child1]
  };
}()));