import type { ButtonHTMLAttributes, } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
};

export function Button({
  children,
  className = "",
  onClick,
  variant = "primary",
  type = "button",
  disabled = false,
  ...props
}: ButtonProps) {
  const variantClasses = {
    primary: "bg-indigo-500 text-white hover:bg-indigo-600",
    secondary:
      "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <button
      {...props}
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
