"use client";
import RankingItem from "@/components/ranking/RankingItem";
import RankingItemBottom from "@/components/ranking/RankingItemBottom";
import RankingTop from "@/components/ranking/RankingTop";
import Image from "next/image";
interface RankingProps {
  data: UserRankData[] | undefined;
}
export default function Ranking({ data }: RankingProps) {
  const me = data?.find((x) => x.isMe);
  return (
    <div
      className="bg-[#F5F3F3]"
      style={{
        height: window.innerHeight,
        overflow: "hidden",
      }}
    >
      <div className="flex items-center space-x-2 h-[64px] z-50  fixed top-0 p-4">
        <h1
          className="text-white text-[14px]"
          style={{
            fontWeight: 700,
          }}
        >
          Daily Ranking
        </h1>
      </div>
      <img
        src={"/rank_bg.png"}
        alt="rank_bg"
        style={{
          position: "relative",
          zIndex: 10,
          top: 0,
          height: (window.innerWidth / 390) * 302 - 40,
          width: window.innerWidth,
        }}
      />
      <Image
        src={"/heart4.png"}
        alt="rank_bg"
        width={210}
        height={210}
        style={{ position: "absolute", zIndex: 10, top: 0, right: 0 }}
      />
      <RankingTop
        height={(window.innerWidth / 390) * 302 - 49 - 28}
        data={data}
      />
      <div
        className="mt-[21px] bg-white rounded-tl-[32px] rounded-tr-[32px] p-[16px] overflow-y-auto scrollbar-w-0 scrollbar-width-none"
        style={{
          scrollbarWidth: "none",
          // scrollbarWidth: "none",
          height:
            window.innerHeight -
            (window.innerWidth / 390) * 302 -
            21 -
            (me ? 84 : 0),
        }}
      >
        {data?.map((x: UserRankData, i) => {
          if (i < 3) return;
          return <RankingItem key={i} {...x} />;
        })}
      </div>
      {me ? (
        <div
          className="absolute bottom-0 h-[84px] flex items-center justify-center bg-white"
          style={{
            width: "100%",
            borderTop: "0.5px solid #E1E0E0",
          }}
        >
          <div className="px-[16px] w-full">
            <RankingItemBottom {...me} />
          </div>
        </div>
      ) : undefined}
    </div>
  );
}
