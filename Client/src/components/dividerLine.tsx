import React from "react";

type DividerWithTextProps = {
  text?: string;
};

const DividerLine: React.FC<DividerWithTextProps> = ({ text }) => {
  return (
    <div className="flex w-full items-center rounded-full">
      <div className="flex-1 border-b border-gray-300"></div>
      {text && (
        <span className="text-black text-2xl font-semibold leading-8 px-8 py-3">
          {text}
        </span>
      )}
      <div className="flex-1 border-b border-gray-300"></div>
    </div>
  );
};

export default DividerLine;
