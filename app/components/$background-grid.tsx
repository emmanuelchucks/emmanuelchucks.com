import { cx } from "hono/css";
import { useEffect, useRef, useState } from "hono/jsx";

export function BackgroundGrid({
	gap = 4,
	squareSize = 240,
	maxOffset = 24,
}: {
	gap?: number;
	squareSize?: number;
	maxOffset?: number;
}) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [gridSize, setGridSize] = useState({ rows: 0, cols: 0 });

	useEffect(() => {
		if (!containerRef.current) {
			return;
		}

		const resizeObserver = new ResizeObserver(() => {
			if (!containerRef.current) {
				return;
			}

			const dimensions = containerRef.current.getBoundingClientRect();
			const totalSize = squareSize + gap;
			const cols = Math.ceil(dimensions.width / totalSize) + 2;
			const rows = Math.ceil(dimensions.height / totalSize) + 2;

			setGridSize({ rows, cols });
		});

		resizeObserver.observe(containerRef.current);
		return () => resizeObserver.disconnect();
	}, [squareSize, gap]);

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (!containerRef.current) {
				return;
			}

			const rect = containerRef.current.getBoundingClientRect();
			const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
			const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

			requestAnimationFrame(() => {
				setMousePosition({ x, y });
			});
		};

		const controller = new AbortController();

		window.addEventListener("mousemove", handleMouseMove, {
			signal: controller.signal,
		});

		return () => {
			controller.abort();
		};
	}, []);

	const offsetX = mousePosition.x * maxOffset;
	const offsetY = mousePosition.y * maxOffset;

	const squares = Array.from({ length: gridSize.rows * gridSize.cols });

	return (
		<div
			ref={containerRef}
			class={cx(
				"fixed inset-0 -z-10 grid",
				"transition-transform duration-700 ease-out will-change-transform",
			)}
			style={{
				gap: `${gap}px`,
				gridTemplateColumns: `repeat(${gridSize.cols}, ${squareSize}px)`,
				transform: `translate(${offsetX}px, ${offsetY}px)`,
			}}
		>
			{squares.map((_, index) => (
				<GridSquare key={String(index)} />
			))}
		</div>
	);
}

function GridSquare() {
	return (
		<div
			class={cx(
				"aspect-square rounded-[1px]",
				"transition-colors duration-300",
				"bg-black/1 hover:bg-black/2 dark:bg-white/1 dark:hover:bg-white/2",
			)}
		/>
	);
}
