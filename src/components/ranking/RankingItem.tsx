// import { useState } from "react";
interface RankingItemProps {
  rank: number;
  username: string;
  point: number;
  isMe: boolean;
}
export default function RankingItem(props: RankingItemProps) {
  const { rank, point, username, isMe } = props;
  return (
    <div
      className="flex items-center justify-between p-[12px] w-full"
      style={{
        background: isMe
          ? "linear-gradient(114.33deg, #FFACAC 2.47%, rgba(255, 196, 196, 0.5) 92.92%)"
          : "white",
        borderRadius: "12px",
      }}
    >
      <div className="flex items-center space-x-4">
        <span
          className=" text-[12px]"
          style={{
            color: isMe ? "black" : "#4F4F4F",
          }}
        >
          {rank}
        </span>
        <img
          className="w-[32px] h-[32px] rounded-full"
          src="/Joe.png"
          alt="user"
        />
        <span
          className=" text-[12px]"
          style={{
            color: isMe ? "black" : "#4F4F4F",
          }}
        >
          {isMe ? "You" : username}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <span
          className=" text-[12px]"
          style={{ fontWeight: 300, color: isMe ? "black" : "#FFACAC" }}
        >
          {Intl.NumberFormat().format(point)}
        </span>
        <img alt="hearts" src="/heart3.png" className="w-[24px] h-[21px]" />
      </div>
    </div>
  );
}
