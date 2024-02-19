import { ComponentPropsWithoutRef, PropsWithChildren } from "react";

type EditorTask = {
  title: string;
} & PropsWithChildren &
  ComponentPropsWithoutRef<"div">;

export function EditorTask({ title, children, ...props }: EditorTask) {
  return (
    <div>
      <h2 {...props}>
        {title}
      </h2>
      <div>{children}</div>
    </div>
  );
}
