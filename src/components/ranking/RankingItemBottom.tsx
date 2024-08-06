// import { useState } from "react";
interface RankingItemBottomProps {
  data: StreamerRankData;
}
export default function RankingItemBottom({ data }: RankingItemBottomProps) {
  return (
    <div
      className="flex items-center justify-between p-[12px] w-full bg-white"
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
          {data.rank > 100 ? "99+" : data.rank}
        </span>
        <img
          className="w-[40px] h-[40px] rounded-full"
          src={data.streamerAvatar}
          alt="user"
        />
        <span
          className=" text-[12px]"
          style={{
            color: "black",
          }}
        >
          {data.streamerName}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <span
          className=" text-[12px]"
          style={{ fontWeight: 300, color: "black" }}
        >
          {Intl.NumberFormat().format(data.totalLike)}
        </span>
        <img alt="hearts" src="/heart3.png" className="w-[24px] h-[21px]" />
      </div>
    </div>
  );
}
