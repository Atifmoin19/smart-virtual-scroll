# \# 🪄 SmartVirtualScroll

A high-performance, virtualized React scroll component for rendering large lists efficiently. Supports horizontal and vertical orientation, dynamic item sizing, and smooth scrolling without jitter. Perfect for lists, feeds, carousels, or grids.

---

## 🚀 Features

- 🌟 Virtualized Rendering – Only renders visible items + buffer for ultra-fast performance.
- ↔️ Horizontal & Vertical – Controlled via orientation prop.
- 📏 Dynamic Sizing – Calculates how many items fit in the viewport automatically.
- 🪄 Smooth Scroll – Maintains scroll position while removing offscreen items.
- ⚡ Resizable – Adjusts automatically on window resize.
- 🛠 Fully Customizable – Supports gap, buffer (correction), threshold, and style overrides.

## 📦 Installation

```bash
npm install smart-virtual-scroll
```

## 💻 Usage

Basic Example (Vertical List)

```typescript
import React from "react";
import { SmartVirtualScroll } from "smart-virtual-scroll";
import { Box, Text } from "@chakra-ui/react";

const items = Array.from({ length: 500 }, (_, i) => (
  <Box
    key={i}
    w="100%"
    h="80px"
    bg={i % 2 ? "blue.100" : "blue.200"}
    borderRadius="md"
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    <Text fontWeight="bold">Item {i + 1}</Text>
  </Box>
));

export const Example = () => (
  <SmartVirtualScroll
    orientation="vertical"
    gap={10}
    correction={3}
    threshold={250}
  >
    {items}
  </SmartVirtualScroll>
);
```

Horizontal Scroll Example

```typescript
<SmartVirtualScroll orientation="horizontal" gap={12} correction={2}>
  {items}
</SmartVirtualScroll>
```

## ⚙️ Props

| Prop          | Type                  | Default     | Description                                                         |                   |
| ------------- | --------------------- | ----------- | ------------------------------------------------------------------- | ----------------- |
| `children`    | `React.ReactNode[]`   | `[]`        | Array of elements to render.                                        |                   |
| `orientation` | `"horizontal"         | "vertical"` | `"horizontal"`                                                      | Scroll direction. |
| `gap`         | `number`              | `16`        | Space between items in pixels.                                      |                   |
| `correction`  | `number`              | `2`         | Extra items rendered before/after visible window for smooth scroll. |                   |
| `threshold`   | `number`              | `200`       | Distance in px from the end to trigger pre-load.                    |                   |
| `style`       | `React.CSSProperties` | `{}`        | Optional style overrides for the container.                         |                   |

## 🛠 How it Works

- Measures child element size and container size.
- Calculates how many items fit in the viewport + correction buffer.
- Only renders visible items and uses spacers to maintain scrollbar.
- Adjusts automatically on window resize or orientation change.

## 🎨 Styling

You can pass style prop to customize the scroll container:

```typescript
<SmartVirtualScroll
  orientation="vertical"
  style={{ border: "1px solid #ddd", borderRadius: 8 }}
>
  {items}
</SmartVirtualScroll>
```

## ⚡ Tips

- Best for large lists (>500 items).
- Works well with Chakra UI, Tailwind, or plain CSS.
- Use correction buffer for smoother scrolling when rendering many items.

[![Open in CodeSandbox](https://img.shields.io/badge/Open%20in-CodeSandbox-blue?logo=codesandbox)](https://codesandbox.io/p/devbox/react-typescript-forked-vpv2ts?workspaceId=ws_GLzXiGXYtnVTg5vXTiP71L)
[![GitHub](https://img.shields.io/badge/View%20on-GitHub-black?logo=github)](https://github.com/Atifmoin19/smart-virtual-scroll.git)
