"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.tsx
var index_exports = {};
__export(index_exports, {
  SmartVirtualScroll: () => SmartVirtualScroll_default
});
module.exports = __toCommonJS(index_exports);

// src/SmartVirtualScroll.tsx
var import_react = __toESM(require("react"));
var SmartVirtualScroll = ({
  children,
  gap = 16,
  threshold = 200,
  correction = 2,
  orientation = "horizontal",
  style
}) => {
  const containerRef = (0, import_react.useRef)(null);
  const itemRef = (0, import_react.useRef)(null);
  const [itemSize, setItemSize] = (0, import_react.useState)(0);
  const [itemsPerView, setItemsPerView] = (0, import_react.useState)(10);
  const [range, setRange] = (0, import_react.useState)({ start: 0, end: 10 });
  (0, import_react.useLayoutEffect)(() => {
    const measure = () => {
      const container = containerRef.current;
      const item = itemRef.current;
      if (!container || !item) return;
      const containerSize = orientation === "horizontal" ? container.clientWidth : container.clientHeight;
      const singleItemSize = (orientation === "horizontal" ? item.clientWidth : item.clientHeight) + gap;
      const fitCount = Math.floor(containerSize / singleItemSize);
      const totalVisible = fitCount + correction;
      setItemSize(singleItemSize);
      setItemsPerView(totalVisible);
      setRange({ start: 0, end: totalVisible });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [gap, correction, orientation]);
  const handleScroll = () => {
    const container = containerRef.current;
    if (!container || !itemSize) return;
    const scrollOffset = orientation === "horizontal" ? container.scrollLeft : container.scrollTop;
    const totalScrollSize = orientation === "horizontal" ? container.scrollWidth : container.scrollHeight;
    const clientSize = orientation === "horizontal" ? container.clientWidth : container.clientHeight;
    const firstVisibleIndex = Math.floor(scrollOffset / itemSize);
    const start = Math.max(0, firstVisibleIndex - correction);
    const end = Math.min(start + itemsPerView + correction, children.length);
    setRange({ start, end });
    if (totalScrollSize - scrollOffset - clientSize < threshold) {
      setRange((prev) => __spreadProps(__spreadValues({}, prev), {
        end: Math.min(prev.end + itemsPerView, children.length)
      }));
    }
  };
  const visibleItems = children.slice(range.start, range.end);
  const totalSize = children.length * itemSize;
  const offset = range.start * itemSize;
  const isHorizontal = orientation === "horizontal";
  return /* @__PURE__ */ import_react.default.createElement(
    "div",
    {
      ref: containerRef,
      onScroll: handleScroll,
      style: __spreadValues({
        overflowX: isHorizontal ? "auto" : "hidden",
        overflowY: isHorizontal ? "hidden" : "auto",
        display: "flex",
        flexDirection: isHorizontal ? "row" : "column",
        position: "relative",
        height: isHorizontal ? "fit-content" : "80vh",
        width: "100%"
      }, style)
    },
    /* @__PURE__ */ import_react.default.createElement(
      "div",
      {
        style: {
          flex: "0 0 auto",
          [isHorizontal ? "width" : "height"]: offset
        }
      }
    ),
    /* @__PURE__ */ import_react.default.createElement(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: isHorizontal ? "row" : "column",
          gap: `${gap}px`
        }
      },
      range.start === 0 && /* @__PURE__ */ import_react.default.createElement(
        "div",
        {
          ref: itemRef,
          style: { visibility: "hidden", position: "absolute" }
        },
        children[0]
      ),
      visibleItems.map((child, i) => /* @__PURE__ */ import_react.default.createElement("div", { key: range.start + i }, child))
    ),
    /* @__PURE__ */ import_react.default.createElement(
      "div",
      {
        style: {
          flex: "0 0 auto",
          [isHorizontal ? "width" : "height"]: totalSize - offset - visibleItems.length * itemSize
        }
      }
    )
  );
};
var SmartVirtualScroll_default = SmartVirtualScroll;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SmartVirtualScroll
});
//# sourceMappingURL=index.js.map