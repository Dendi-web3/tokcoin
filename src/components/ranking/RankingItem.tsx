// import { useState } from "react";

/* eslint-disable react/no-unescaped-entities */
export default function RankingItem() {
  return (
    <div className="flex items-center justify-between px-[2px] w-full">
      <div className="flex items-center space-x-4">
        <span className="text-[#868486] text-[10px]">5</span>
        <img
          className="w-10 h-10 rounded-full"
          src="/Joe.png"
          alt="User profile picture"
        />
        <span className="font-semibold text-[#352D35] text-[14px]">Joe</span>
      </div>
      <div className="flex items-center space-x-2">
        <img alt="hearts" src="/heart.png" className="w-[24px] h-[24px]" />
        <span className="text-[#868486] text-[12px]">999,999,999,999</span>
      </div>
    </div>
  );
}
