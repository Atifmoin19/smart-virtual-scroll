var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
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

// src/SmartVirtualScroll.tsx
import React, { useLayoutEffect, useRef, useState } from "react";
var SmartVirtualScroll = ({
  children,
  gap = 16,
  threshold = 200,
  correction = 2,
  orientation = "horizontal",
  style
}) => {
  const containerRef = useRef(null);
  const itemRef = useRef(null);
  const [itemSize, setItemSize] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(10);
  const [range, setRange] = useState({ start: 0, end: 10 });
  useLayoutEffect(() => {
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
  return /* @__PURE__ */ React.createElement(
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
    /* @__PURE__ */ React.createElement(
      "div",
      {
        style: {
          flex: "0 0 auto",
          [isHorizontal ? "width" : "height"]: offset
        }
      }
    ),
    /* @__PURE__ */ React.createElement(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: isHorizontal ? "row" : "column",
          gap: `${gap}px`
        }
      },
      range.start === 0 && /* @__PURE__ */ React.createElement(
        "div",
        {
          ref: itemRef,
          style: { visibility: "hidden", position: "absolute" }
        },
        children[0]
      ),
      visibleItems.map((child, i) => /* @__PURE__ */ React.createElement("div", { key: range.start + i }, child))
    ),
    /* @__PURE__ */ React.createElement(
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
export {
  SmartVirtualScroll_default as SmartVirtualScroll
};
//# sourceMappingURL=index.mjs.map