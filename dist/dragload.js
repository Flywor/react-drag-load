(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("prop-types"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["prop-types", "react"], factory);
	else if(typeof exports === 'object')
		exports["dragload"] = factory(require("prop-types"), require("react"));
	else
		root["dragload"] = factory(root["PropTypes"], root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

__webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_Component) {
  _inherits(Index, _Component);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.maxOver = 50, _this.scrollRate = 0.3, _this.tStart = 0, _this.loadFlag = false, _this.refreshFlag = false, _this.nextFlag = false, _this.scrollFlag = false, _this.isTop = false, _this.haveData = true, _this.dataLength = 0, _this.hasNext = true, _temp), _possibleConstructorReturn(_this, _ret);
  } // 触发加载操作的临界值(单位px)
  // 拉动速率
  // 起点
  // 标记加载状态 避免重复拉动加载
  // 标记是否触发下拉刷新
  // 标记是否触发上拉加载
  // 标记是在滚动中，用于判断是否滚动到底部或者顶部，为true时才能触发上拉加载/下拉刷新
  // 标记是否滚动到顶部，用于控制‘返回顶部’按钮的显示(暂无)
  // 标记列表是否为空(显示空数据提示)
  // 记录列表数据长度(是否还有下一页的判断)


  _createClass(Index, [{
    key: 'componentDidMount',
    // 标记是否还有下一页

    value: function componentDidMount() {
      var drag = this.drag,
          child = this.child,
          start = this.start,
          move = this.move,
          end = this.end,
          scroll = this.scroll;

      drag.addEventListener('touchstart', start.bind(this), { passive: false });
      drag.addEventListener('touchmove', move.bind(this), { passive: false });
      drag.addEventListener('touchend', end.bind(this), { passive: false });
      child.addEventListener('scroll', scroll.bind(this), { passive: false });
    }
  }, {
    key: 'scroll',
    value: function scroll() {
      this.scrollFlag = false;
    }
  }, {
    key: 'start',
    value: function start(e) {
      var loadFlag = this.loadFlag,
          refreshIcon = this.refreshIcon,
          loadNextIcon = this.loadNextIcon,
          drag = this.drag,
          tStart = this.tStart,
          child = this.child;

      if (loadFlag) {
        // 阻止浏览器默认事件可以使加载的时候无法滑动
        // e.preventDefault()
        return;
      }
      if (child.scrollTop === 0 || child.scrollHeight - child.offsetHeight < child.scrollTop + 5) {
        this.scrollFlag = true;
      }
      refreshIcon.className = '';
      loadNextIcon.className = '';
      this.tStart = e.touches[0].clientY;
      this.changeTransition(drag, 'none');
    }
  }, {
    key: 'move',
    value: function move(e) {
      var loadFlag = this.loadFlag,
          maxOver = this.maxOver,
          scrollRate = this.scrollRate,
          tStart = this.tStart,
          scrollFlag = this.scrollFlag,
          hasNext = this.hasNext,
          drag = this.drag,
          child = this.child,
          refreshIcon = this.refreshIcon,
          refreshTxt = this.refreshTxt,
          loadNextIcon = this.loadNextIcon,
          loadNextTxt = this.loadNextTxt;

      if (loadFlag || !this.haveData) {
        // e.preventDefault()
        return;
      }
      var tPosition = (tStart - e.touches[0].clientY) * scrollRate;
      if (child.scrollTop === 0 && scrollFlag) {
        // 顶部下拉
        if (tPosition < 0) {
          e.preventDefault(); // 阻止滚动条
          if (maxOver < Math.abs(tPosition)) {
            // 达到临界值进入下拉刷新
            this.refreshFlag = true;
            this.changeDeg(refreshIcon, 180);
            refreshTxt.innerText = '释放更新';
          } else {
            this.refreshFlag = false;
            this.changeDeg(refreshIcon, 0);
            refreshTxt.innerText = '下拉刷新';
          }
          this.changeY(drag, '' + Math.abs(tPosition));
        } else {
          this.refreshFlag = false;
        }
      } else if (child.scrollHeight - child.offsetHeight < child.scrollTop + 5 && scrollFlag) {
        // 底部上拉
        if (tPosition > 0) {
          e.preventDefault();
          if (!hasNext) {
            this.nextFlag = false;
            loadNextTxt.innerText = '已加载全部';
            loadNextIcon.className = 'nomore';
          } else if (maxOver < Math.abs(tPosition)) {
            // 达到临界值进入上拉加载
            this.nextFlag = true;
            this.changeDeg(loadNextIcon, 180);
            loadNextTxt.innerText = '释放加载';
          } else {
            this.nextFlag = false;
            this.changeDeg(loadNextIcon, 0);
            loadNextTxt.innerText = '上拉加载';
          }
          this.changeY(drag, '-' + tPosition);
        } else {
          this.nextFlag = false;
        }
      } else {
        this.refreshFlag = false;
        this.nextFlag = false;
      }
    }
  }, {
    key: 'end',
    value: function end(e) {
      var maxOver = this.maxOver,
          loadFlag = this.loadFlag,
          refreshFlag = this.refreshFlag,
          nextFlag = this.nextFlag,
          drag = this.drag,
          refreshIcon = this.refreshIcon,
          refreshTxt = this.refreshTxt,
          loadNextIcon = this.loadNextIcon,
          loadNextTxt = this.loadNextTxt;
      var _props = this.props,
          refresh = _props.refresh,
          loadNext = _props.loadNext;

      if (loadFlag) {
        e.preventDefault();
        return;
      }
      this.changeTransition(drag, '330ms');
      if (refreshFlag && typeof refresh === 'function') {
        this.refreshFlag = false;
        this.changeY(drag, '' + maxOver);
        this.doDragEnd(refreshIcon, refreshTxt, refresh, 0);
      } else if (nextFlag && typeof loadNext === 'function') {
        this.nextFlag = false;
        this.changeY(drag, '-' + maxOver);
        this.doDragEnd(loadNextIcon, loadNextTxt, loadNext, 1);
      } else {
        this.changeY(drag, 0);
      }
    }
  }, {
    key: 'doDragEnd',
    value: function doDragEnd(icon, txt, callback, dic) {
      var _this2 = this;

      var drag = this.drag;

      this.loadFlag = true;
      icon.className = 'loading';
      this.changeDeg(icon, 0);
      txt.innerText = '加载中';
      callback().then(function (rs) {
        icon.className = 'success';
        txt.innerText = '加载成功';
        if (dic == 1) {
          _this2.changeY(drag, 0);
          _this2.loadFlag = false;
          var length = _this2.props.children.props.children.length;
          _this2.hasNext = length !== _this2.dataLength;
          if (_this2.hasNext) {
            _this2.dataLength = length;
          }
          return;
        }
        _this2.hasNext = true;
        _this2.dataLength = 0;
      }).catch(function (e) {
        // 失败处理
        icon.className = 'error';
        txt.innerText = '加载失败';
      }).then(function (r) {
        setTimeout(function () {
          _this2.changeY(drag, 0);
          setTimeout(function () {
            _this2.changeTransition(drag, 'none');
            _this2.loadFlag = false;
          }, 330);
        }, 1000);
      });
    }
  }, {
    key: 'changeY',
    value: function changeY(drag, y) {
      var style = 'translate3d(0, ' + y + 'px, 0)';
      this.doTransform(drag, style);
    }
  }, {
    key: 'changeDeg',
    value: function changeDeg(icon, deg) {
      var style = 'rotate(' + deg + 'deg)';
      this.doTransform(icon, style);
    }
  }, {
    key: 'doTransform',
    value: function doTransform(ele, val) {
      ele.style.webkitTransform = val;
      ele.style.MozTransform = val;
      ele.style.msTransform = val;
      ele.style.OTransform = val;
      ele.style.transform = val;
    }
  }, {
    key: 'changeTransition',
    value: function changeTransition(e, val) {
      e.style.webkitTransition = val;
      e.style.MozTransition = val;
      e.style.msTransition = val;
      e.style.OTransition = val;
      e.style.transition = val;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props2 = this.props,
          refresh = _props2.refresh,
          loadNext = _props2.loadNext,
          children = _props2.children;

      var length = children.props ? children.props.children.length : children.length;
      this.haveData = length > 0;
      return _react2.default.createElement(
        'div',
        { styleName: 'dragload' },
        _react2.default.createElement(
          'div',
          {
            ref: function ref(e) {
              _this3.drag = e;
            },
            styleName: 'drag'
          },
          _react2.default.createElement(
            'div',
            { styleName: 'refresh', style: { display: typeof refresh === 'function' ? 'flex' : 'none' } },
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement('span', { ref: function ref(e) {
                  _this3.refreshIcon = e;
                } }),
              _react2.default.createElement('label', { ref: function ref(e) {
                  _this3.refreshTxt = e;
                } })
            )
          ),
          _react2.default.createElement(
            'div',
            { styleName: 'items', ref: function ref(e) {
                _this3.child = e;
              } },
            this.haveData ? children : _react2.default.createElement(
              'div',
              { styleName: 'noData' },
              '\u6CA1\u6709\u6570\u636E\u54E6'
            )
          ),
          _react2.default.createElement(
            'div',
            { styleName: 'loadNext', style: { display: typeof loadNext === 'function' ? 'flex' : 'none' } },
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement('span', { ref: function ref(e) {
                  _this3.loadNextIcon = e;
                } }),
              _react2.default.createElement('label', { ref: function ref(e) {
                  _this3.loadNextTxt = e;
                } })
            )
          )
        )
      );
    }
  }]);

  return Index;
}(_react.Component);

Index.propTypes = {
  refresh: _propTypes2.default.func,
  loadNext: _propTypes2.default.func
};
Index.defaultProps = {
  refresh: undefined,
  loadNext: undefined
};
exports.default = Index;

/***/ })
/******/ ]);
});