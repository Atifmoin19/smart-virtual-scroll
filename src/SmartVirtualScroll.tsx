import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

interface SmartVirtualScrollProps {
  children: React.ReactNode[];
  gap?: number; // space between items
  threshold?: number; // distance before end to pre-load more
  correction?: number; // extra items before/after
  orientation?: "horizontal" | "vertical"; // scroll direction
  style?: React.CSSProperties;
}

const SmartVirtualScroll: React.FC<SmartVirtualScrollProps> = ({
  children,
  gap = 16,
  threshold = 200,
  correction = 2,
  orientation = "horizontal",
  style,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  const [itemSize, setItemSize] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(10);
  const [range, setRange] = useState({ start: 0, end: 10 });

  // Measure size (width or height) of one child and calculate fit
  useLayoutEffect(() => {
    const measure = () => {
      const container = containerRef.current;
      const item = itemRef.current;
      if (!container || !item) return;

      const containerSize =
        orientation === "horizontal"
          ? container.clientWidth
          : container.clientHeight;

      const singleItemSize =
        (orientation === "horizontal" ? item.clientWidth : item.clientHeight) +
        gap;

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

    const scrollOffset =
      orientation === "horizontal" ? container.scrollLeft : container.scrollTop;
    const totalScrollSize =
      orientation === "horizontal"
        ? container.scrollWidth
        : container.scrollHeight;
    const clientSize =
      orientation === "horizontal"
        ? container.clientWidth
        : container.clientHeight;

    const firstVisibleIndex = Math.floor(scrollOffset / itemSize);
    const start = Math.max(0, firstVisibleIndex - correction);
    const end = Math.min(start + itemsPerView + correction, children.length);

    setRange({ start, end });

    // Optional pre-load near end
    if (totalScrollSize - scrollOffset - clientSize < threshold) {
      setRange((prev) => ({
        ...prev,
        end: Math.min(prev.end + itemsPerView, children.length),
      }));
    }
  };

  const visibleItems = children.slice(range.start, range.end);
  const totalSize = children.length * itemSize;
  const offset = range.start * itemSize;

  // dynamic flex direction
  const isHorizontal = orientation === "horizontal";

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      style={{
        overflowX: isHorizontal ? "auto" : "hidden",
        overflowY: isHorizontal ? "hidden" : "auto",
        display: "flex",
        flexDirection: isHorizontal ? "row" : "column",
        position: "relative",
        height: isHorizontal ? "fit-content" : "80vh",
        width: "100%",
        ...style,
      }}
    >
      {/* Spacer before */}
      <div
        style={{
          flex: "0 0 auto",
          [isHorizontal ? "width" : "height"]: offset,
        }}
      />

      {/* Visible items */}
      <div
        style={{
          display: "flex",
          flexDirection: isHorizontal ? "row" : "column",
          gap: `${gap}px`,
        }}
      >
        {/* Hidden reference item */}
        {range.start === 0 && (
          <div
            ref={itemRef}
            style={{ visibility: "hidden", position: "absolute" }}
          >
            {children[0]}
          </div>
        )}

        {visibleItems.map((child, i) => (
          <div key={range.start + i}>{child}</div>
        ))}
      </div>

      {/* Spacer after */}
      <div
        style={{
          flex: "0 0 auto",
          [isHorizontal ? "width" : "height"]:
            totalSize - offset - visibleItems.length * itemSize,
        }}
      />
    </div>
  );
};

export default SmartVirtualScroll;
