'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".index_action-sheet-bg-m23x__2GsZt {\r\n  position: fixed;\r\n  top: 0;\r\n  left: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  background: rgba(0, 0, 0, 0.8);\r\n  transition: all 0.5s ease;\r\n  backface-visibility: hidden;\r\n}\r\n.index_action-sheet-comp-sheet-m23x__MgQTM {\r\n  overflow-x: hidden;\r\n  position: fixed;\r\n  bottom: 0;\r\n  left: 0;\r\n  width: 100%;\r\n  z-index: 999;\r\n  background-color: #fbfbfb;\r\n  border-top-left-radius: 16px;\r\n  border-top-right-radius: 16px;\r\n  transform: translate3d(0, 101%, 0);\r\n}\r\n.index_action-sheet-transition-m23x__1JEE9 {\r\n  transition: all 0.3s ease-in-out;\r\n}\r\n.index_action-sheet-transition-fix-m23x__1gT1L {\r\n  transition: all 0.05s linear;\r\n}\r\n";
styleInject(css_248z);

var ActionSheet = React.forwardRef(function (_a, ref) {
    var onHide = _a.onHide, children = _a.children, sheetStyle = _a.sheetStyle, bgStyle = _a.bgStyle, _b = _a.mouseEnable, mouseEnable = _b === void 0 ? true : _b, _c = _a.touchEnable, touchEnable = _c === void 0 ? true : _c, _d = _a.threshold, threshold = _d === void 0 ? 50 : _d, _e = _a.opacity, opacity = _e === void 0 ? 1 : _e;
    var _f = React.useState(false), show = _f[0], setShow = _f[1];
    var _g = React.useState(false), pressed = _g[0], setPressed = _g[1];
    var sheetRef = React.useRef(null);
    var animationRef = React.useRef(0);
    var masterOffset = React.useRef(0);
    var startY = React.useRef(0);
    React.useImperativeHandle(ref, function () { return ({
        show: function () {
            setShow(true);
        },
        hide: function () {
            setShow(false);
        }
    }); });
    React.useEffect(function () {
        if (show) {
            requestSheetUp();
        }
        else {
            requestSheetDown();
        }
    }, [show]);
    var BgClick = function () {
        setShow(false);
        if (onHide)
            onHide();
    };
    var requestSheetDown = function () {
        if (null !== sheetRef.current) {
            sheetRef.current.style.transform = "translate3d(0, 101%, 0)";
            return true;
        }
        return false;
    };
    var requestSheetUp = function () {
        if (null !== sheetRef.current) {
            sheetRef.current.style.transform = "translate3d(0, 0%, 0)";
            return true;
        }
        return false;
    };
    var onSwipeMove = function (event) {
        if (pressed) {
            var offset = event.touches[0].clientY - startY.current;
            move(offset);
        }
    };
    var onMouseMove = function (event) {
        if (pressed) {
            var offset = event.clientY - startY.current;
            move(offset);
        }
    };
    var move = function (offset) {
        if (offset > 0) {
            masterOffset.current = offset;
            animationRef.current = requestAnimationFrame(updatePosition);
            return true;
        }
        return false;
    };
    var updatePosition = function () {
        if (animationRef.current !== undefined) {
            if (null !== sheetRef.current) {
                sheetRef.current.style.transform = "translate3d(0, " + masterOffset.current + "px, 0)";
                return true;
            }
            return false;
        }
        return false;
    };
    var onSwipeStart = function (event) {
        startY.current = event.touches[0].clientY;
        changePressed(true);
    };
    var onMouseStart = function (event) {
        startY.current = event.clientY;
        changePressed(true);
    };
    var changePressed = function (x) {
        setPressed(x);
    };
    var onSwipeEnd = function () {
        cancelAnimationFrame(animationRef.current);
        setPressed(false);
        if (masterOffset.current > threshold) {
            setShow(false);
            if (onHide)
                onHide();
        }
        else {
            requestSheetUp();
        }
        masterOffset.current = 0;
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { onClick: BgClick, className: "action-sheet-bg-m23x", style: __assign(__assign({}, bgStyle), { opacity: show ? opacity : 0, zIndex: show ? 998 : -1 }) }),
        React.createElement("div", { ref: sheetRef, className: "action-sheet-comp-sheet-m23x " + (pressed ? 'action-sheet-transition-fix-m23x' : 'action-sheet-transition-m23x'), style: __assign({}, sheetStyle), onMouseDown: mouseEnable ? onMouseStart : undefined, onMouseMove: mouseEnable ? onMouseMove : undefined, onMouseUp: mouseEnable ? onSwipeEnd : undefined, onTouchStart: touchEnable ? onSwipeStart : undefined, onTouchMove: touchEnable ? onSwipeMove : undefined, onTouchEnd: touchEnable ? onSwipeEnd : undefined }, children ? children : React.createElement("div", { style: { height: 100 } }))));
});

exports.default = ActionSheet;
//# sourceMappingURL=index.js.map
