import { Diagram, DiagramProps } from "./diagram";

export default function Page({
  title,
  children,
}: DiagramProps & { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center">
      <div className="rounded-xl border bg-slate-50 p-4 m-4 space-y-4">
        <div className="prose max-w-full">
          <h2>{title}</h2>
        </div>
        <div className="flex flex-row gap-10">
          <div className="prose">{children}</div>
          <div className="flex flex-col not-prose">
            <Diagram />
          </div>
        </div>
      </div>
    </div>
  );
}
