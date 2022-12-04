import React, { FC, ReactNode } from "react";

type DefaultButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type ButtonProps = {
  children: ReactNode;
  fullWidth?: boolean;
  variant?: "primary" | "secondary";
} & DefaultButtonProps;

const Button: FC<ButtonProps> = ({
  fullWidth = false,
  children,
  className,
  variant = "primary",
  ...buttonProps
}) => {
  const fullWidthStyle = fullWidth ? "w-full" : "";
  const getVariant = () => {
    switch (variant) {
      case "primary": {
        return "text-black bg-brand-500 hover:bg-brand-400 active:bg-brand-500";
      }
      case "secondary": {
        return "text-white bg-kggrey-200 hover:bg-kggrey-300 active:bg-kggrey-200";
      }
      default: {
        return "text-black bg-brand-500 hover:bg-brand-400 active:bg-brand-500";
      }
    }
  };

  return (
    <button
      {...buttonProps}
      className={`py-2 px-4 md:px-8 select-none focus:outline-none text-sm font-medium rounded-md ${fullWidthStyle} border border-transparent focus:border-white disabled:bg-zinc-600 ${getVariant()} ${className}`}>
      {children}
    </button>
  );
};

export default Button;
