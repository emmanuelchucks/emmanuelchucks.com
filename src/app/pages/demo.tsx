import { requestInfo } from "rwsdk/worker";

export function DemoPage(): React.JSX.Element {
  const Demo = requestInfo.ctx.post.demoContent;

  return (
    <div className="@container-[size] h-dvh">
      <Demo />
    </div>
  );
}
