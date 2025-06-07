import clsx from "clsx";
import { BackgroundGrid } from "~/app/components/background-grid";

export function MainLayout({ children }: React.PropsWithChildren) {
  return (
    <div
      className={clsx(
        "mx-auto my-24",
        "w-[min(100%-var(--spacing)*8,_var(--container-2xl))]",
        "sm:w-[min(100%-var(--spacing)*24,_var(--container-2xl))]",
      )}
    >
      {children}
      <BackgroundGrid />
    </div>
  );
}
