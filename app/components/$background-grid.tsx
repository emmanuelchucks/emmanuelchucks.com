import { cx } from "hono/css";
import { useCallback, useEffect, useRef, useState } from "hono/jsx";

interface BackgroundGridProps {
	className?: string;
	squareSize?: number;
	gap?: number;
	maxOffset?: number;
}

export function BackgroundGrid({
	className = "",
	squareSize = 16,
	gap = 4,
	maxOffset = 24,
}: BackgroundGridProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [squares, setSquares] = useState<{ x: number; y: number }[]>([]);

	const calculateSquares = useCallback(
		(width: number, height: number) => {
			const totalSize = squareSize + gap;
			const cols = Math.ceil(width / totalSize) + 2;
			const rows = Math.ceil(height / totalSize) + 2;

			const newSquares = [];
			for (let y = -1; y < rows; y++) {
				for (let x = -1; x < cols; x++) {
					newSquares.push({
						x: x * totalSize,
						y: y * totalSize,
					});
				}
			}
			return newSquares;
		},
		[squareSize, gap],
	);

	useEffect(() => {
		if (!containerRef.current) return;

		const updateDimensions = () => {
			const { width, height } =
				containerRef.current?.getBoundingClientRect() ?? {
					width: 0,
					height: 0,
				};
			setSquares(calculateSquares(width, height));
		};

		const resizeObserver = new ResizeObserver(updateDimensions);
		resizeObserver.observe(containerRef.current);
		updateDimensions();

		return () => resizeObserver.disconnect();
	}, [calculateSquares]);

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (!containerRef.current) return;

			const rect = containerRef.current.getBoundingClientRect();
			const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
			const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

			requestAnimationFrame(() => {
				setMousePosition({ x, y });
			});
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	const offsetX = mousePosition.x * maxOffset;
	const offsetY = mousePosition.y * maxOffset;

	return (
		<div
			ref={containerRef}
			className={cx("absolute inset-0 overflow-hidden", className)}
		>
			<div
				className={cx(
					"absolute inset-0",
					"transition-transform duration-700 ease-out will-change-transform",
				)}
				style={{
					transform: `translate(${offsetX}px, ${offsetY}px)`,
				}}
			>
				{squares.map((square, index) => (
					<GridSquare
						key={String(index)}
						x={square.x}
						y={square.y}
						size={squareSize}
					/>
				))}
			</div>
		</div>
	);
}

interface GridSquareProps {
	x: number;
	y: number;
	size: number;
}

function GridSquare({ x, y, size }: GridSquareProps) {
	return (
		<div
			className={cx(
				"absolute rounded-[1px]",
				"transition-colors duration-300",
				"bg-black/1 hover:bg-black/2 dark:bg-white/1 dark:hover:bg-white/2",
			)}
			style={{
				transform: `translate(${x}px, ${y}px)`,
				width: `${size}px`,
				height: `${size}px`,
			}}
		/>
	);
}
