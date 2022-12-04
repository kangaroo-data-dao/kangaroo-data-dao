import React from "react";

const Logo = () => {
  return (
    <div className="flex flex-col select-none">
      <p className="text-xl font-bold ">
        <span className="text-brand-900 dark:text-brand-100">t</span>
        <span className="text-brand-800 dark:text-brand-200">h</span>
        <span className="text-brand-700 dark:text-brand-300">u</span>
        <span className="text-brand-600 dark:text-brand-400">n</span>
        <span className="text-brand-500 dark:text-brand-500">d</span>
        <span className="text-brand-400 dark:text-brand-600">e</span>
        <span className="text-brand-300 dark:text-brand-700">r</span>
      </p>
      <p className="text-xl font-bold">
        <span className="text-brand-500 dark:text-brand-600">r</span>
        <span className="text-brand-600 dark:text-brand-500">o</span>
        <span className="text-brand-700 dark:text-brand-400">c</span>
        <span className="text-brand-800 dark:text-brand-300">k</span>
        <span className="text-brand-900 dark:text-brand-200">s</span>
      </p>
    </div>
  );
};

export default Logo;
