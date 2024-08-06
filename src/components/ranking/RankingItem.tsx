// import { useState } from "react";
interface RankingItemProps {
  data: StreamerRankData;
  isMe: boolean;
}
export default function RankingItem({ data, isMe }: RankingItemProps) {
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
          {data.rank}
        </span>
        <img
          className="w-[32px] h-[32px] rounded-full"
          src={data.streamerAvatar}
          alt="user"
        />
        <span
          className=" text-[12px]"
          style={{
            color: isMe ? "black" : "#4F4F4F",
          }}
        >
          {isMe ? "You" : data.streamerName}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <span
          className=" text-[12px]"
          style={{ fontWeight: 300, color: isMe ? "black" : "#FFACAC" }}
        >
          {Intl.NumberFormat().format(data.totalLike)}
        </span>
        <img alt="hearts" src="/heart3.png" className="w-[24px] h-[21px]" />
      </div>
    </div>
  );
}
