export function A({ className, ...rest }: React.ComponentProps<"a">) {
  return (
    <a
      className={`
        rounded-sm underline decoration-2 underline-offset-2 outline-offset-4
        outline-neutral-700
        dark:outline-neutral-300
        ${className}
      `}
      {...rest}
    />
  );
}
