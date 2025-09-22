export function A({
  className,
  children,
  ...rest
}: React.ComponentProps<"a">): React.JSX.Element {
  return (
    <a
      className={`rounded-sm underline decoration-2 underline-offset-2 outline-offset-4 outline-neutral-700 dark:outline-neutral-300 ${className ?? ""} `}
      {...rest}
    >
      {children}
    </a>
  );
}
