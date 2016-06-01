export default Ember.HTMLBars.template((function() {
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
          "line": 30,
          "column": 0
        }
      },
      "moduleName": "finndis/templates/components/address-panel.hbs"
    },
    isEmpty: false,
    arity: 0,
    cachedFragment: null,
    hasRendered: false,
    buildFragment: function buildFragment(dom) {
      var el0 = dom.createDocumentFragment();
      var el1 = dom.createElement("a");
      dom.setAttribute(el1,"class","button expanded");
      var el2 = dom.createElement("i");
      dom.setAttribute(el2,"class","fa fa-map-marker");
      dom.appendChild(el1, el2);
      var el2 = dom.createComment("");
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n\n");
      dom.appendChild(el0, el1);
      var el1 = dom.createElement("div");
      var el2 = dom.createTextNode("\n\n  ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("form");
      dom.setAttribute(el2,"class","address--form");
      var el3 = dom.createTextNode("\n    ");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("div");
      dom.setAttribute(el3,"class","row");
      var el4 = dom.createTextNode("\n      ");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("div");
      dom.setAttribute(el4,"class","back-button--holder small-2 columns");
      var el5 = dom.createTextNode("\n        ");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("a");
      var el6 = dom.createElement("i");
      dom.setAttribute(el6,"class","back-button fa fa-arrow-left");
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
      var el3 = dom.createElement("div");
      dom.setAttribute(el3,"class","row");
      var el4 = dom.createTextNode("\n      ");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("div");
      dom.setAttribute(el4,"class","medium-12 columns");
      var el5 = dom.createTextNode("\n        ");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("div");
      dom.setAttribute(el5,"class","small-12 medium-11 medium-offset-1 columns");
      var el6 = dom.createTextNode("\n          ");
      dom.appendChild(el5, el6);
      var el6 = dom.createElement("div");
      dom.setAttribute(el6,"class","row");
      var el7 = dom.createTextNode("\n            ");
      dom.appendChild(el6, el7);
      var el7 = dom.createElement("div");
      dom.setAttribute(el7,"class","columns");
      var el8 = dom.createTextNode("\n              ");
      dom.appendChild(el7, el8);
      var el8 = dom.createElement("label");
      var el9 = dom.createTextNode("Address\n                ");
      dom.appendChild(el8, el9);
      var el9 = dom.createComment("");
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
      var el4 = dom.createTextNode("\n    ");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n  ");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n\n");
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n");
      dom.appendChild(el0, el1);
      var el1 = dom.createElement("div");
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n");
      dom.appendChild(el0, el1);
      return el0;
    },
    buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
      var element0 = dom.childAt(fragment, [0]);
      var element1 = dom.childAt(fragment, [2]);
      var element2 = dom.childAt(element1, [1]);
      var element3 = dom.childAt(element2, [1, 1, 1]);
      var element4 = dom.childAt(fragment, [4]);
      var morphs = new Array(7);
      morphs[0] = dom.createElementMorph(element0);
      morphs[1] = dom.createMorphAt(element0,1,1);
      morphs[2] = dom.createAttrMorph(element1, 'class');
      morphs[3] = dom.createElementMorph(element3);
      morphs[4] = dom.createMorphAt(dom.childAt(element2, [3, 1, 1, 1, 1, 1]),1,1);
      morphs[5] = dom.createAttrMorph(element4, 'class');
      morphs[6] = dom.createElementMorph(element4);
      return morphs;
    },
    statements: [
      ["element","action",["showAddressPanel"],["bubbles","false"],["loc",[null,[1,27],[1,72]]]],
      ["content","buttonText",["loc",[null,[1,105],[1,119]]]],
      ["attribute","class",["concat",["panel right ",["get","addressPanelClass",["loc",[null,[4,26],[4,43]]]]]]],
      ["element","action",["setAddress"],["on","click","bubbles","false"],["loc",[null,[9,11],[9,61]]]],
      ["inline","input",[],["value",["subexpr","@mut",[["get","place.formattedaddress",["loc",[null,[18,30],[18,52]]]]],[],[]],"class","place--main-input","type","text"],["loc",[null,[18,16],[18,93]]]],
      ["attribute","class",["concat",["panel-overlay right ",["get","addressPanelClass",["loc",[null,[28,34],[28,51]]]]]]],
      ["element","action",["setAddress"],["on","click","bubbles","false"],["loc",[null,[28,55],[28,105]]]]
    ],
    locals: [],
    templates: []
  };
}()));