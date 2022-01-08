function Container({ as, className: clasname, children }: ContainerProps) {
  const Component = as ?? "div";

  return (
    <Component
      className={`container px-4 md:px-7 lg:px-0 py-24 mx-auto lg:max-w-4xl ${clasname}`}
    >
      {children}
    </Component>
  );
}

type ContainerProps = {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
};

export default Container;
