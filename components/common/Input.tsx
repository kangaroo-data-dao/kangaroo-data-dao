import React, { FC } from "react";

type InputDefaultProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type InputProps = {
  label: string;
  startText?: string;
  subLabel?: string;
  fullWidth?: boolean;
} & InputDefaultProps;

const Input: FC<InputProps> = ({
  label,
  startText,
  subLabel,
  fullWidth = false,
  className,
  ...inputProps
}) => {
  const fullWidthStyle = fullWidth ? "w-full" : "";
  // const fullWidthStyle = "";

  const renderCustomInput = () => (
    <div className="flex flex-row w-full">
      <div className="flex items-center justify-center p-2 text-xs text-gray-400 bg-gray-100 border border-r-0 border-gray-200 rounded-l-lg md:text-md md:p-3 dark:text-gray-400 dark:border-gray-800 dark:bg-gray-600">
        {startText}
      </div>
      <input
        {...inputProps}
        className={`flex grow p-2 min-w-[10px] md:p-3 text-sm border dark:text-white dark:bg-gray-500 border-gray-200 dark:border-gray-800 placeholder:text-gray-400 rounded-r-lg focus:ring-1 focus:ring-indigo-600 dark:focus:ring-indigo-400 focus:outline-none ${fullWidthStyle} ${className}`}
      />
    </div>
  );

  const renderLabel = () => (
    <label htmlFor={inputProps.id ?? ""} className="font-normal text-white">
      {label} {subLabel && <span className="text-white">({subLabel})</span>}
    </label>
  );

  return (
    <div className={`flex flex-col gap-2 text-base gap ${fullWidthStyle}`}>
      {renderLabel()}
      {startText ? (
        renderCustomInput()
      ) : (
        <input
          {...inputProps}
          className={`py-2 text-sm border-b text-white bg-black focus:border-b-gray-100 border-b-kggrey-200 placeholder:text-kggrey-200 focus:outline-none ${fullWidthStyle} ${className}`}
        />
      )}
    </div>
  );
};

export default Input;
