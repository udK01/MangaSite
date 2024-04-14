import React from "react";

export default function Feedback({ color, text, handleTransition }) {
  return (
    <div>
      <div
        className={`flex justify-center w-[826px] ${color} py-1 text-white font-poppins transform -translate-y-3`}
        onClick={handleTransition}
      >
        {text}
      </div>
    </div>
  );
}
