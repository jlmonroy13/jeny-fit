"use client";

import { useId, type InputHTMLAttributes } from "react";

type InputType = "text" | "email" | "password";

export type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "id"
> & {
  label: string;
  type?: InputType;
  id?: string;
};

export function Input({
  label,
  type = "text",
  id: idProp,
  className = "",
  ...props
}: InputProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;

  return (
    <div className="flex w-full flex-col gap-1.5">
      <label
        htmlFor={id}
        className="block text-xs font-semibold text-text-muted"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        className={[
          "w-full rounded-sm border border-border-default bg-surface-page px-3.5 py-[11px]",
          "font-sans text-sm text-text-primary",
          "placeholder:text-text-muted",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    </div>
  );
}
