"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/survey-builder/[id]/page",{

/***/ "(app-pages-browser)/./src/app/survey-builder/[id]/page.tsx":
/*!**********************************************!*\
  !*** ./src/app/survey-builder/[id]/page.tsx ***!
  \**********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ SurveyBuilderPage; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/navigation.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _hooks_useAuth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/hooks/useAuth */ \"(app-pages-browser)/./src/hooks/useAuth.tsx\");\n/* harmony import */ var _components_dashboard_shell__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/dashboard-shell */ \"(app-pages-browser)/./src/components/dashboard-shell.tsx\");\n/* harmony import */ var _components_dashboard_header__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/components/dashboard-header */ \"(app-pages-browser)/./src/components/dashboard-header.tsx\");\n/* harmony import */ var _components_survey_builder__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/components/survey-builder */ \"(app-pages-browser)/./src/components/survey-builder.tsx\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\n\nfunction SurveyBuilderPage() {\n    var _params;\n    _s();\n    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    const params = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useParams)();\n    const { user, loading } = (0,_hooks_useAuth__WEBPACK_IMPORTED_MODULE_3__.useAuth)();\n    const surveyId = (_params = params) === null || _params === void 0 ? void 0 : _params.id;\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        if (!loading && !user) {\n            router.push(\"/login\");\n        }\n    }, [\n        user,\n        loading,\n        router\n    ]);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        if (!loading && !surveyId) {\n            router.push(\"/dashboard\");\n        }\n    }, [\n        loading,\n        surveyId,\n        router\n    ]);\n    if (loading || !surveyId) {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"min-h-screen flex items-center justify-center\",\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Avik Halder\\\\my_dev\\\\Surveytool\\\\client\\\\src\\\\app\\\\survey-builder\\\\[id]\\\\page.tsx\",\n                lineNumber: 31,\n                columnNumber: 9\n            }, this)\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\Avik Halder\\\\my_dev\\\\Surveytool\\\\client\\\\src\\\\app\\\\survey-builder\\\\[id]\\\\page.tsx\",\n            lineNumber: 30,\n            columnNumber: 7\n        }, this);\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_dashboard_shell__WEBPACK_IMPORTED_MODULE_4__.DashboardShell, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"space-y-8\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_dashboard_header__WEBPACK_IMPORTED_MODULE_5__.DashboardHeader, {\n                    heading: \"Survey Builder\",\n                    text: \"Create and customize your survey\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\Avik Halder\\\\my_dev\\\\Surveytool\\\\client\\\\src\\\\app\\\\survey-builder\\\\[id]\\\\page.tsx\",\n                    lineNumber: 39,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"h-[calc(100vh-12rem)]\",\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_survey_builder__WEBPACK_IMPORTED_MODULE_6__.SurveyBuilder, {\n                        surveyId: surveyId\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Avik Halder\\\\my_dev\\\\Surveytool\\\\client\\\\src\\\\app\\\\survey-builder\\\\[id]\\\\page.tsx\",\n                        lineNumber: 44,\n                        columnNumber: 11\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\Avik Halder\\\\my_dev\\\\Surveytool\\\\client\\\\src\\\\app\\\\survey-builder\\\\[id]\\\\page.tsx\",\n                    lineNumber: 43,\n                    columnNumber: 9\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"C:\\\\Users\\\\Avik Halder\\\\my_dev\\\\Surveytool\\\\client\\\\src\\\\app\\\\survey-builder\\\\[id]\\\\page.tsx\",\n            lineNumber: 38,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\Avik Halder\\\\my_dev\\\\Surveytool\\\\client\\\\src\\\\app\\\\survey-builder\\\\[id]\\\\page.tsx\",\n        lineNumber: 37,\n        columnNumber: 5\n    }, this);\n}\n_s(SurveyBuilderPage, \"9nYo2q+D8LueD38yA3ZdzfISIZY=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter,\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.useParams,\n        _hooks_useAuth__WEBPACK_IMPORTED_MODULE_3__.useAuth\n    ];\n});\n_c = SurveyBuilderPage;\nvar _c;\n$RefreshReg$(_c, \"SurveyBuilderPage\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvc3VydmV5LWJ1aWxkZXIvW2lkXS9wYWdlLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFFa0M7QUFDcUI7QUFDYjtBQUNvQjtBQUNFO0FBQ0o7QUFFN0MsU0FBU087UUFJTEM7O0lBSGpCLE1BQU1DLFNBQVNSLDBEQUFTQTtJQUN4QixNQUFNTyxTQUFTTiwwREFBU0E7SUFDeEIsTUFBTSxFQUFFUSxJQUFJLEVBQUVDLE9BQU8sRUFBRSxHQUFHUix1REFBT0E7SUFDakMsTUFBTVMsWUFBV0osVUFBQUEsb0JBQUFBLDhCQUFBQSxRQUFRSyxFQUFFO0lBRTNCYixnREFBU0EsQ0FBQztRQUNSLElBQUksQ0FBQ1csV0FBVyxDQUFDRCxNQUFNO1lBQ3JCRCxPQUFPSyxJQUFJLENBQUM7UUFDZDtJQUNGLEdBQUc7UUFBQ0o7UUFBTUM7UUFBU0Y7S0FBTztJQUUxQlQsZ0RBQVNBLENBQUM7UUFDUixJQUFJLENBQUNXLFdBQVcsQ0FBQ0MsVUFBVTtZQUN6QkgsT0FBT0ssSUFBSSxDQUFDO1FBQ2Q7SUFDRixHQUFHO1FBQUNIO1FBQVNDO1FBQVVIO0tBQU87SUFFOUIsSUFBSUUsV0FBVyxDQUFDQyxVQUFVO1FBQ3hCLHFCQUNFLDhEQUFDRztZQUFJQyxXQUFVO3NCQUNiLDRFQUFDRDtnQkFBSUMsV0FBVTs7Ozs7Ozs7Ozs7SUFHckI7SUFFQSxxQkFDRSw4REFBQ1osdUVBQWNBO2tCQUNiLDRFQUFDVztZQUFJQyxXQUFVOzs4QkFDYiw4REFBQ1gseUVBQWVBO29CQUNkWSxTQUFRO29CQUNSQyxNQUFLOzs7Ozs7OEJBRVAsOERBQUNIO29CQUFJQyxXQUFVOzhCQUNiLDRFQUFDVixxRUFBYUE7d0JBQUNNLFVBQVVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS25DO0dBdkN3Qkw7O1FBQ1BOLHNEQUFTQTtRQUNUQyxzREFBU0E7UUFDRUMsbURBQU9BOzs7S0FIWEkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2FwcC9zdXJ2ZXktYnVpbGRlci9baWRdL3BhZ2UudHN4P2ZlYjciXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBjbGllbnQnO1xyXG5cclxuaW1wb3J0IHsgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyB1c2VSb3V0ZXIsIHVzZVBhcmFtcyB9IGZyb20gJ25leHQvbmF2aWdhdGlvbic7XHJcbmltcG9ydCB7IHVzZUF1dGggfSBmcm9tICdAL2hvb2tzL3VzZUF1dGgnO1xyXG5pbXBvcnQgeyBEYXNoYm9hcmRTaGVsbCB9IGZyb20gJ0AvY29tcG9uZW50cy9kYXNoYm9hcmQtc2hlbGwnO1xyXG5pbXBvcnQgeyBEYXNoYm9hcmRIZWFkZXIgfSBmcm9tICdAL2NvbXBvbmVudHMvZGFzaGJvYXJkLWhlYWRlcic7XHJcbmltcG9ydCB7IFN1cnZleUJ1aWxkZXIgfSBmcm9tICdAL2NvbXBvbmVudHMvc3VydmV5LWJ1aWxkZXInO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU3VydmV5QnVpbGRlclBhZ2UoKSB7XHJcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XHJcbiAgY29uc3QgcGFyYW1zID0gdXNlUGFyYW1zKCk7XHJcbiAgY29uc3QgeyB1c2VyLCBsb2FkaW5nIH0gPSB1c2VBdXRoKCk7XHJcbiAgY29uc3Qgc3VydmV5SWQgPSBwYXJhbXM/LmlkO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFsb2FkaW5nICYmICF1c2VyKSB7XHJcbiAgICAgIHJvdXRlci5wdXNoKCcvbG9naW4nKTtcclxuICAgIH1cclxuICB9LCBbdXNlciwgbG9hZGluZywgcm91dGVyXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIWxvYWRpbmcgJiYgIXN1cnZleUlkKSB7XHJcbiAgICAgIHJvdXRlci5wdXNoKCcvZGFzaGJvYXJkJyk7XHJcbiAgICB9XHJcbiAgfSwgW2xvYWRpbmcsIHN1cnZleUlkLCByb3V0ZXJdKTtcclxuXHJcbiAgaWYgKGxvYWRpbmcgfHwgIXN1cnZleUlkKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pbi1oLXNjcmVlbiBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYW5pbWF0ZS1zcGluIHJvdW5kZWQtZnVsbCBoLTEyIHctMTIgYm9yZGVyLXQtMiBib3JkZXItYi0yIGJvcmRlci1pbmRpZ28tNTAwXCI+PC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8RGFzaGJvYXJkU2hlbGw+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS04XCI+XHJcbiAgICAgICAgPERhc2hib2FyZEhlYWRlclxyXG4gICAgICAgICAgaGVhZGluZz1cIlN1cnZleSBCdWlsZGVyXCJcclxuICAgICAgICAgIHRleHQ9XCJDcmVhdGUgYW5kIGN1c3RvbWl6ZSB5b3VyIHN1cnZleVwiXHJcbiAgICAgICAgLz5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImgtW2NhbGMoMTAwdmgtMTJyZW0pXVwiPlxyXG4gICAgICAgICAgPFN1cnZleUJ1aWxkZXIgc3VydmV5SWQ9e3N1cnZleUlkfSAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvRGFzaGJvYXJkU2hlbGw+XHJcbiAgKTtcclxufSAiXSwibmFtZXMiOlsidXNlRWZmZWN0IiwidXNlUm91dGVyIiwidXNlUGFyYW1zIiwidXNlQXV0aCIsIkRhc2hib2FyZFNoZWxsIiwiRGFzaGJvYXJkSGVhZGVyIiwiU3VydmV5QnVpbGRlciIsIlN1cnZleUJ1aWxkZXJQYWdlIiwicGFyYW1zIiwicm91dGVyIiwidXNlciIsImxvYWRpbmciLCJzdXJ2ZXlJZCIsImlkIiwicHVzaCIsImRpdiIsImNsYXNzTmFtZSIsImhlYWRpbmciLCJ0ZXh0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/survey-builder/[id]/page.tsx\n"));

/***/ })

});