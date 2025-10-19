import React from 'react';

interface SmartVirtualScrollProps {
    children: React.ReactNode[];
    gap?: number;
    threshold?: number;
    correction?: number;
    orientation?: "horizontal" | "vertical";
    style?: React.CSSProperties;
}
declare const SmartVirtualScroll: React.FC<SmartVirtualScrollProps>;

export { SmartVirtualScroll };
