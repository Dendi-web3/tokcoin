// import { useState } from "react";
interface RankingItemBottomProps {
  rank: number;
  username: string;
  point: number;
  isMe: boolean;
}
export default function RankingItemBottom(props: RankingItemBottomProps) {
  const { rank, point, username } = props;
  return (
    <div
      className="flex items-center justify-between p-[12px] w-full"
      style={{
        borderRadius: "12px",
      }}
    >
      <div className="flex items-center space-x-4">
        <span
          className=" text-[12px]"
          style={{
            color: "#868486",
          }}
        >
          {rank > 100 ? "99+" : rank}
        </span>
        <img
          className="w-[40px] h-[40px] rounded-full"
          src="/Joe.png"
          alt="user"
        />
        <span
          className=" text-[12px]"
          style={{
            color: "black",
          }}
        >
          {username}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <span
          className=" text-[12px]"
          style={{ fontWeight: 300, color: "black" }}
        >
          {Intl.NumberFormat().format(point)}
        </span>
        <img alt="hearts" src="/heart3.png" className="w-[24px] h-[21px]" />
      </div>
    </div>
  );
}
