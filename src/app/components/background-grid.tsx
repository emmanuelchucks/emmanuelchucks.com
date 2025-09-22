"use client";

import { useState } from "react";

export function BackgroundGrid({
  gap = 4,
  squareSize = 240,
  maxOffset = 24,
}: {
  gap?: number;
  squareSize?: number;
  maxOffset?: number;
}): React.JSX.Element {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [gridSize, setGridSize] = useState({ rows: 0, cols: 0 });

  const handleRef = (node: HTMLDivElement) => {
    const resizeObserver = new ResizeObserver(() => {
      const dimensions = node.getBoundingClientRect();
      const totalSize = squareSize + gap;
      const cols = Math.ceil(dimensions.width / totalSize) + 2;
      const rows = Math.ceil(dimensions.height / totalSize) + 2;

      setGridSize({ rows, cols });
    });

    resizeObserver.observe(node);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

      requestAnimationFrame(() => {
        setMousePosition({ x, y });
      });
    };

    globalThis.addEventListener("mousemove", handleMouseMove);

    return () => {
      resizeObserver.disconnect();
      globalThis.removeEventListener("mousemove", handleMouseMove);
    };
  };

  const offsetX = mousePosition.x * maxOffset;
  const offsetY = mousePosition.y * maxOffset;

  const squares = Array.from({ length: gridSize.rows * gridSize.cols }, () =>
    crypto.randomUUID(),
  );

  return (
    <div
      ref={handleRef}
      className="fixed inset-0 -z-10 grid transition-transform duration-700 ease-out will-change-transform"
      style={{
        gap: `${String(gap)}px`,
        gridTemplateColumns: `repeat(${String(gridSize.cols)}, ${String(squareSize)}px)`,
        transform: `translate3d(${String(offsetX)}px, ${String(offsetY)}px, 0)`,
      }}
    >
      {squares.map((id) => (
        <div
          key={id}
          className="aspect-square rounded-[1px] bg-black/1 transition-colors duration-300 hover:bg-black/2 dark:bg-white/1 dark:hover:bg-white/2"
        />
      ))}
    </div>
  );
}
