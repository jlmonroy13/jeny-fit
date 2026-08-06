import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-primary text-text-on-brand hover:bg-brand-primary-hover active:bg-brand-primary-active",
  secondary:
    "bg-surface-wash text-purple-900 hover:opacity-90 active:opacity-80",
};

export function Button({
  variant = "primary",
  type = "button",
  className = "",
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={[
        "inline-flex items-center justify-center rounded-pill border-none px-[18px] py-[11px]",
        "font-sans text-sm font-semibold cursor-pointer",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
        "disabled:cursor-not-allowed disabled:opacity-50",
        variantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
