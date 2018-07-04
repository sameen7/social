webpackJsonp([1],{

/***/ 206:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(207);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("62224bc2", content, true, {});

/***/ }),

/***/ 207:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, ".demo-carousel[data-v-dd17aa0e]{text-align:center}.bread[data-v-dd17aa0e]{margin:20px 0}.part2[data-v-dd17aa0e]{border-top:2px solid #e8e8e8}.card[data-v-dd17aa0e]{display:flex;justify-content:space-around;flex-wrap:wrap;margin-top:10px}", ""]);

// exports


/***/ }),

/***/ 208:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_iview_src_components_base_collapse_transition__ = __webpack_require__(209);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  name: "home",
  components: { CollapseTransition: __WEBPACK_IMPORTED_MODULE_0_iview_src_components_base_collapse_transition__["a" /* default */] },
  data: function data() {
    return {
      value: 0
    };
  },

  methods: {
    goSearch: function goSearch() {
      this.$router.push("/search");
    },
    goNumber: function goNumber() {
      this.$router.push("/number");
    },
    goRoute: function goRoute() {
      this.$router.push("/route");
    },
    goUpload: function goUpload() {
      this.$router.push("/upload");
    }
  }
});

/***/ }),

/***/ 209:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_assist__ = __webpack_require__(210);
// Thanks to https://github.com/ElemeFE/element/blob/dev/src/transitions/collapse-transition.js



const Transition = {
    beforeEnter(el) {
        Object(__WEBPACK_IMPORTED_MODULE_0__utils_assist__["a" /* addClass */])(el, 'collapse-transition');
        if (!el.dataset) el.dataset = {};

        el.dataset.oldPaddingTop = el.style.paddingTop;
        el.dataset.oldPaddingBottom = el.style.paddingBottom;

        el.style.height = '0';
        el.style.paddingTop = 0;
        el.style.paddingBottom = 0;
    },

    enter(el) {
        el.dataset.oldOverflow = el.style.overflow;
        if (el.scrollHeight !== 0) {
            el.style.height = el.scrollHeight + 'px';
            el.style.paddingTop = el.dataset.oldPaddingTop;
            el.style.paddingBottom = el.dataset.oldPaddingBottom;
        } else {
            el.style.height = '';
            el.style.paddingTop = el.dataset.oldPaddingTop;
            el.style.paddingBottom = el.dataset.oldPaddingBottom;
        }

        el.style.overflow = 'hidden';
    },

    afterEnter(el) {
        // for safari: remove class then reset height is necessary
        Object(__WEBPACK_IMPORTED_MODULE_0__utils_assist__["b" /* removeClass */])(el, 'collapse-transition');
        el.style.height = '';
        el.style.overflow = el.dataset.oldOverflow;
    },

    beforeLeave(el) {
        if (!el.dataset) el.dataset = {};
        el.dataset.oldPaddingTop = el.style.paddingTop;
        el.dataset.oldPaddingBottom = el.style.paddingBottom;
        el.dataset.oldOverflow = el.style.overflow;

        el.style.height = el.scrollHeight + 'px';
        el.style.overflow = 'hidden';
    },

    leave(el) {
        if (el.scrollHeight !== 0) {
            // for safari: add class after set height, or it will jump to zero height suddenly, weired
            Object(__WEBPACK_IMPORTED_MODULE_0__utils_assist__["a" /* addClass */])(el, 'collapse-transition');
            el.style.height = 0;
            el.style.paddingTop = 0;
            el.style.paddingBottom = 0;
        }
    },

    afterLeave(el) {
        Object(__WEBPACK_IMPORTED_MODULE_0__utils_assist__["b" /* removeClass */])(el, 'collapse-transition');
        el.style.height = '';
        el.style.overflow = el.dataset.oldOverflow;
        el.style.paddingTop = el.dataset.oldPaddingTop;
        el.style.paddingBottom = el.dataset.oldPaddingBottom;
    }
};

/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'CollapseTransition',
    functional: true,
    render(h, { children }) {
        const data = {
            on: Transition
        };

        return h('transition', data, children);
    }
});


/***/ }),

/***/ 210:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export oneOf */
/* unused harmony export camelcaseToHyphen */
/* unused harmony export getScrollBarSize */
/* unused harmony export getStyle */
/* unused harmony export firstUpperCase */
/* unused harmony export warnProp */
/* unused harmony export deepCopy */
/* unused harmony export scrollTop */
/* unused harmony export findComponentUpward */
/* unused harmony export findComponentDownward */
/* unused harmony export findComponentsDownward */
/* unused harmony export findComponentsUpward */
/* unused harmony export findBrothersComponents */
/* unused harmony export hasClass */
/* harmony export (immutable) */ __webpack_exports__["a"] = addClass;
/* harmony export (immutable) */ __webpack_exports__["b"] = removeClass;
/* unused harmony export setMatchMedia */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);

const isServer = __WEBPACK_IMPORTED_MODULE_0_vue__["default"].prototype.$isServer;
// 判断参数是否是其中之一
function oneOf (value, validList) {
    for (let i = 0; i < validList.length; i++) {
        if (value === validList[i]) {
            return true;
        }
    }
    return false;
}

function camelcaseToHyphen (str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

// For Modal scrollBar hidden
let cached;
function getScrollBarSize (fresh) {
    if (isServer) return 0;
    if (fresh || cached === undefined) {
        const inner = document.createElement('div');
        inner.style.width = '100%';
        inner.style.height = '200px';

        const outer = document.createElement('div');
        const outerStyle = outer.style;

        outerStyle.position = 'absolute';
        outerStyle.top = 0;
        outerStyle.left = 0;
        outerStyle.pointerEvents = 'none';
        outerStyle.visibility = 'hidden';
        outerStyle.width = '200px';
        outerStyle.height = '150px';
        outerStyle.overflow = 'hidden';

        outer.appendChild(inner);

        document.body.appendChild(outer);

        const widthContained = inner.offsetWidth;
        outer.style.overflow = 'scroll';
        let widthScroll = inner.offsetWidth;

        if (widthContained === widthScroll) {
            widthScroll = outer.clientWidth;
        }

        document.body.removeChild(outer);

        cached = widthContained - widthScroll;
    }
    return cached;
}

// watch DOM change
const MutationObserver = isServer ? false : window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || false;
/* unused harmony export MutationObserver */


const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;

function camelCase(name) {
    return name.replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
        return offset ? letter.toUpperCase() : letter;
    }).replace(MOZ_HACK_REGEXP, 'Moz$1');
}
// getStyle
function getStyle (element, styleName) {
    if (!element || !styleName) return null;
    styleName = camelCase(styleName);
    if (styleName === 'float') {
        styleName = 'cssFloat';
    }
    try {
        const computed = document.defaultView.getComputedStyle(element, '');
        return element.style[styleName] || computed ? computed[styleName] : null;
    } catch(e) {
        return element.style[styleName];
    }
}

// firstUpperCase
function firstUpperCase(str) {
    return str.toString()[0].toUpperCase() + str.toString().slice(1);
}


// Warn
function warnProp(component, prop, correctType, wrongType) {
    correctType = firstUpperCase(correctType);
    wrongType = firstUpperCase(wrongType);
    console.error(`[iView warn]: Invalid prop: type check failed for prop ${prop}. Expected ${correctType}, got ${wrongType}. (found in component: ${component})`);    // eslint-disable-line
}

function typeOf(obj) {
    const toString = Object.prototype.toString;
    const map = {
        '[object Boolean]'  : 'boolean',
        '[object Number]'   : 'number',
        '[object String]'   : 'string',
        '[object Function]' : 'function',
        '[object Array]'    : 'array',
        '[object Date]'     : 'date',
        '[object RegExp]'   : 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]'     : 'null',
        '[object Object]'   : 'object'
    };
    return map[toString.call(obj)];
}

// deepCopy
function deepCopy(data) {
    const t = typeOf(data);
    let o;

    if (t === 'array') {
        o = [];
    } else if ( t === 'object') {
        o = {};
    } else {
        return data;
    }

    if (t === 'array') {
        for (let i = 0; i < data.length; i++) {
            o.push(deepCopy(data[i]));
        }
    } else if ( t === 'object') {
        for (let i in data) {
            o[i] = deepCopy(data[i]);
        }
    }
    return o;
}



// scrollTop animation
function scrollTop(el, from = 0, to, duration = 500) {
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = (
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                return window.setTimeout(callback, 1000/60);
            }
        );
    }
    const difference = Math.abs(from - to);
    const step = Math.ceil(difference / duration * 50);

    function scroll(start, end, step) {
        if (start === end) return;

        let d = (start + step > end) ? end : start + step;
        if (start > end) {
            d = (start - step < end) ? end : start - step;
        }

        if (el === window) {
            window.scrollTo(d, d);
        } else {
            el.scrollTop = d;
        }
        window.requestAnimationFrame(() => scroll(d, end, step));
    }
    scroll(from, to, step);
}

// Find components upward
function findComponentUpward (context, componentName, componentNames) {
    if (typeof componentName === 'string') {
        componentNames = [componentName];
    } else {
        componentNames = componentName;
    }

    let parent = context.$parent;
    let name = parent.$options.name;
    while (parent && (!name || componentNames.indexOf(name) < 0)) {
        parent = parent.$parent;
        if (parent) name = parent.$options.name;
    }
    return parent;
}


// Find component downward
function findComponentDownward (context, componentName) {
    const childrens = context.$children;
    let children = null;

    if (childrens.length) {
        for (const child of childrens) {
            const name = child.$options.name;
            if (name === componentName) {
                children = child;
                break;
            } else {
                children = findComponentDownward(child, componentName);
                if (children) break;
            }
        }
    }
    return children;
}

// Find components downward
function findComponentsDownward (context, componentName) {
    return context.$children.reduce((components, child) => {
        if (child.$options.name === componentName) components.push(child);
        const foundChilds = findComponentsDownward(child, componentName);
        return components.concat(foundChilds);
    }, []);
}

// Find components upward
function findComponentsUpward (context, componentName) {
    let parents = [];
    const parent = context.$parent;
    if (parent) {
        if (parent.$options.name === componentName) parents.push(parent);
        return parents.concat(findComponentsUpward(parent, componentName));
    } else {
        return [];
    }
}

// Find brothers components
function findBrothersComponents (context, componentName, exceptMe = true) {
    let res = context.$parent.$children.filter(item => {
        return item.$options.name === componentName;
    });
    let index = res.findIndex(item => item._uid === context._uid);
    if (exceptMe) res.splice(index, 1);
    return res;
}

/* istanbul ignore next */
const trim = function(string) {
    return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
};

/* istanbul ignore next */
function hasClass(el, cls) {
    if (!el || !cls) return false;
    if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
    if (el.classList) {
        return el.classList.contains(cls);
    } else {
        return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }
}

/* istanbul ignore next */
function addClass(el, cls) {
    if (!el) return;
    let curClass = el.className;
    const classes = (cls || '').split(' ');

    for (let i = 0, j = classes.length; i < j; i++) {
        const clsName = classes[i];
        if (!clsName) continue;

        if (el.classList) {
            el.classList.add(clsName);
        } else {
            if (!hasClass(el, clsName)) {
                curClass += ' ' + clsName;
            }
        }
    }
    if (!el.classList) {
        el.className = curClass;
    }
}

/* istanbul ignore next */
function removeClass(el, cls) {
    if (!el || !cls) return;
    const classes = cls.split(' ');
    let curClass = ' ' + el.className + ' ';

    for (let i = 0, j = classes.length; i < j; i++) {
        const clsName = classes[i];
        if (!clsName) continue;

        if (el.classList) {
            el.classList.remove(clsName);
        } else {
            if (hasClass(el, clsName)) {
                curClass = curClass.replace(' ' + clsName + ' ', ' ');
            }
        }
    }
    if (!el.classList) {
        el.className = trim(curClass);
    }
}

const dimensionMap = {
    xs: '480px',
    sm: '768px',
    md: '992px',
    lg: '1200px',
    xl: '1600px',
};
/* unused harmony export dimensionMap */


function setMatchMedia () {
    if (typeof window !== 'undefined') {
        const matchMediaPolyfill = mediaQuery => {
            return {
                media: mediaQuery,
                matches: false,
                on() {},
                off() {},
            };
        };
        window.matchMedia = window.matchMedia || matchMediaPolyfill;
    }
}


/***/ }),

/***/ 211:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('Breadcrumb',{staticClass:"bread"},[_c('BreadcrumbItem',[_vm._v("首页")])],1),_vm._v(" "),_c('Card',{attrs:{"dis-hover":""}},[_c('Row',[_c('Carousel',{attrs:{"autoplay":"","loop":""},model:{value:(_vm.value),callback:function ($$v) {_vm.value=$$v},expression:"value"}},[_c('CarouselItem',[_c('div',{staticClass:"demo-carousel"},[_c('img',{attrs:{"src":__webpack_require__(212)}})])]),_vm._v(" "),_c('CarouselItem',[_c('div',{staticClass:"demo-carousel"},[_c('img',{attrs:{"src":__webpack_require__(213)}})])]),_vm._v(" "),_c('CarouselItem',[_c('div',{staticClass:"demo-carousel"},[_c('img',{attrs:{"src":__webpack_require__(214)}})])])],1)],1),_vm._v(" "),_c('br'),_vm._v(" "),_c('Row',{staticClass:"part2"},[_c('div',{staticClass:"card"},[_c('Card',{staticClass:"search",nativeOn:{"click":function($event){return _vm.goSearch($event)}}},[_c('img',{attrs:{"src":__webpack_require__(215)}})]),_vm._v(" "),_c('Card',{staticClass:"number",nativeOn:{"click":function($event){return _vm.goNumber($event)}}},[_c('img',{attrs:{"src":__webpack_require__(216)}})]),_vm._v(" "),_c('Card',{staticClass:"route",nativeOn:{"click":function($event){return _vm.goRoute($event)}}},[_c('img',{attrs:{"src":__webpack_require__(217)}})]),_vm._v(" "),_c('Card',{staticClass:"upload",nativeOn:{"click":function($event){return _vm.goUpload($event)}}},[_c('img',{attrs:{"src":__webpack_require__(218)}})])],1)])],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ 212:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "1.jpg?99b01febbb73fd60a5f32fb69a7a2bfa";

/***/ }),

/***/ 213:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "2.jpg?8bca13ab3274c53beee2bc314f251073";

/***/ }),

/***/ 214:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "3.jpg?0a4e1d77b77bbe29ae43ab8f548f1b4c";

/***/ }),

/***/ 215:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "search.png?437febbb3c5434b2f8d45196b6266c48";

/***/ }),

/***/ 216:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "number.png?dbad8dfc38ed395ebd59d47f4c972209";

/***/ }),

/***/ 217:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "route.png?39d57ce66c4d6359ba0d68117c2fc4c8";

/***/ }),

/***/ 218:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "upload.png?ffede38da2faf25328eeb5ead187a4fa";

/***/ }),

/***/ 5:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_home_vue__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_dd17aa0e_hasScoped_true_node_modules_vue_loader_lib_selector_type_template_index_0_home_vue__ = __webpack_require__(211);
function injectStyle (ssrContext) {
  __webpack_require__(206)
}
var normalizeComponent = __webpack_require__(4)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-dd17aa0e"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_home_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_dd17aa0e_hasScoped_true_node_modules_vue_loader_lib_selector_type_template_index_0_home_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ })

});
//# sourceMappingURL=1.build.js.map