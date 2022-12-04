import React, { FC, ReactNode } from "react";

type TextDefaultProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>;

type TextProps = {
  children: ReactNode;
  type: "primary" | "secondary";
} & TextDefaultProps;

const Text: FC<TextProps> = ({ type, children, ...defaultProps }) => {
  const getTypeClasses = () => {
    switch (type) {
      case "primary": {
        return "text-gray-800 font-semibold text-xl md:text-3xl dark:text-gray-200";
      }
      case "secondary": {
        return "text-sm font-medium text-gray-400 dark:text-gray-400";
      }
      default: {
        return "";
      }
    }
  };

  return (
    <p
      {...defaultProps}
      className={`${getTypeClasses()} ${defaultProps.className}`}>
      {children}
    </p>
  );
};

export default Text;
