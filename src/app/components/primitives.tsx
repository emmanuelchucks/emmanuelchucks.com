export function A({ className, children, ...rest }: React.ComponentProps<"a">) {
  return (
    <a
      className={`${className ? `${className} ` : ""}rounded-sm underline decoration-2 underline-offset-8 outline-offset-4 outline-neutral-700 dark:outline-neutral-300`}
      {...rest}
    >
      {children}
    </a>
  );
}
