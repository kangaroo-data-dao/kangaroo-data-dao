import { FC, ReactElement } from "react";

export type CardType = {
  icon: ReactElement;
  heading: string;
  subHeading: string;
};

type Props = {
  data: CardType;
  active: boolean;
  checked: boolean;
};
const Card: FC<Props> = ({ data, checked, active }) => {
  const activeClasses = active
    ? "ring-2 ring-indigo-500 dark:ring-indigo-600 dark:ring-offset-gray-700 ring-offset-1"
    : "";

  return (
    <div
      className={`flex flex-col justify-between h-full gap-6 p-4 md:p-6 border rounded-lg cursor-pointer ${
        checked ? "border-indigo-600" : "border-gray-300 dark:border-gray-500"
      } ${activeClasses}`}>
      <div
        className={`w-8 h-8 ${
          checked ? "text-indigo-600" : "text-gray-700 dark:text-gray-500"
        }`}>
        {data.icon}
      </div>
      <div className="flex flex-col justify-between gap-2">
        <p className="font-bold text-gray-700 dark:text-gray-200 md:text-lg">
          {data.heading}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 md:text-md">
          {data.subHeading}
        </p>
      </div>
    </div>
  );
};

export default Card;
