"use client";

export function BackgroundGrid({
  gap = 4,
  squareSize = 240,
  maxOffset = 24,
}: {
  gap?: number;
  squareSize?: number;
  maxOffset?: number;
}) {
  const handleRef = (node: HTMLDivElement) => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

      const offsetX = x * maxOffset;
      const offsetY = y * maxOffset;

      requestAnimationFrame(() => {
        node.style.transform = `translate3d(${String(offsetX)}px, ${String(offsetY)}px, 0)`;
      });
    };

    globalThis.addEventListener("mousemove", handleMouseMove);

    return () => {
      globalThis.removeEventListener("mousemove", handleMouseMove);
    };
  };

  const maxWidth = 2560;
  const maxHeight = 1440;
  const totalSize = squareSize + gap;
  const cols = Math.ceil(maxWidth / totalSize) + 2;
  const rows = Math.ceil(maxHeight / totalSize) + 2;
  const squares = Array.from({ length: rows * cols }, (_, i) => i);

  return (
    <div
      ref={handleRef}
      className="fixed inset-0 -z-10 grid transition-transform duration-700 ease-out will-change-transform"
      style={{
        gap: `${String(gap)}px`,
        gridTemplateColumns: `repeat(${String(cols)}, ${String(squareSize)}px)`,
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
