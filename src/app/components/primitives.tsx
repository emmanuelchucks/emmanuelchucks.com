export function A({ className, children, ...rest }: React.ComponentProps<"a">) {
  const baseClassName =
    "rounded-sm underline decoration-2 underline-offset-8 outline-offset-4 outline-neutral-700 dark:outline-neutral-300";
  const resolvedClassName =
    className === undefined || className === "" ? baseClassName : `${className} ${baseClassName}`;

  return (
    <a className={resolvedClassName} {...rest}>
      {children}
    </a>
  );
}
