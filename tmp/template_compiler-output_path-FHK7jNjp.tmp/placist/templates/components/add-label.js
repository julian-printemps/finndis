export default Ember.HTMLBars.template((function() {
  return {
    meta: {
      "fragmentReason": {
        "name": "modifiers",
        "modifiers": [
          "action"
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
          "line": 9,
          "column": 0
        }
      },
      "moduleName": "finndis/templates/components/add-label.hbs"
    },
    isEmpty: false,
    arity: 0,
    cachedFragment: null,
    hasRendered: false,
    buildFragment: function buildFragment(dom) {
      var el0 = dom.createDocumentFragment();
      var el1 = dom.createElement("form");
      dom.setAttribute(el1,"class","label-add--holder row");
      var el2 = dom.createTextNode("\n  ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("div");
      dom.setAttribute(el2,"class","columns small-10 small-offset-1");
      var el3 = dom.createTextNode("\n    ");
      dom.appendChild(el2, el3);
      var el3 = dom.createComment("");
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n  ");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n  ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("div");
      dom.setAttribute(el2,"class","columns small-1 label-add--button--holder");
      var el3 = dom.createTextNode("\n    ");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("button");
      dom.setAttribute(el3,"type","submit");
      dom.setAttribute(el3,"class","label-add--icon--holder");
      var el4 = dom.createElement("i");
      dom.setAttribute(el4,"class","label-add--icon fa fa-plus");
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
      return el0;
    },
    buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
      var element0 = dom.childAt(fragment, [0]);
      var element1 = dom.childAt(element0, [3]);
      var morphs = new Array(3);
      morphs[0] = dom.createElementMorph(element0);
      morphs[1] = dom.createMorphAt(dom.childAt(element0, [1]),1,1);
      morphs[2] = dom.createElementMorph(element1);
      return morphs;
    },
    statements: [
      ["element","action",["addLabel"],["bubbles",false,"on","submit"],["loc",[null,[1,36],[1,83]]]],
      ["inline","input",[],["type","text","class","label-editor--input","placeholder","Add a new label","value",["subexpr","@mut",[["get","newLabel",["loc",[null,[3,88],[3,96]]]]],[],[]]],["loc",[null,[3,4],[3,98]]]],
      ["element","action",["addLabel"],["bubbles",false,"on","click"],["loc",[null,[5,57],[5,103]]]]
    ],
    locals: [],
    templates: []
  };
}()));