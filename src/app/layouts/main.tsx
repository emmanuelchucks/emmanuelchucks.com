import { BackgroundGrid } from "#components/background-grid";

export function MainLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <div className="my-24 grid grid-cols-[1fr_min(100%-var(--page-padding),70ch)_1fr] overflow-clip [--page-padding:calc(var(--spacing)*10)]">
        {children}
      </div>
      <BackgroundGrid />
    </>
  );
}
