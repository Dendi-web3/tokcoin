// import { useState } from "react";
interface RankingItemProps {
  rank: number;
  name: string;
  score: number;
}
export default function RankingItem(props: RankingItemProps) {
  const { rank, name, score } = props;
  return (
    <div className="flex items-center justify-between px-[2px] w-full">
      <div className="flex items-center space-x-4">
        <span className="text-[#868486] text-[10px]">{rank}</span>
        <img
          className="w-[40px] h-[40px] rounded-full"
          src="/Joe.png"
          alt="user"
        />
        <span className="font-semibold text-[#352D35] text-[14px]">{name}</span>
      </div>
      <div className="flex items-center space-x-2">
        <img alt="hearts" src="/heart.png" className="w-[24px] h-[24px]" />
        <span className="text-[#868486] text-[12px]">
          {Intl.NumberFormat().format(score)}
        </span>
      </div>
    </div>
  );
}
