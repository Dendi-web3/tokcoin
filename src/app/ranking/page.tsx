"use client";
import RankingItem from "@/components/ranking/RankingItem";
import RankingItemBottom from "@/components/ranking/RankingItemBottom";
import useGlobalStore from "@/store/useGlobalStore";
import RankingTop from "@/components/ranking/RankingTop";
import { useRouter } from "next/navigation";
import Image from "next/image";
export default function Widget() {
  const router = useRouter();
  const data: UserRankData[] | undefined = useGlobalStore(
    (x) => x.userRankData
  );
  const data2 = data?.concat(data);

  const me = data?.find((x) => x.isMe);
  return (
    <div className="bg-[#F5F3F3]">
      <div
        className="flex items-center space-x-2 h-[64px] z-50  fixed top-0 p-4"
        onClick={() => {
          router.push("/");
        }}
      >
        <button className="text-white" style={{ color: "white" }}>
          <img alt="back-arrow" src="/Left_white.svg" />
        </button>
        <h1
          className="text-white text-[14px]"
          style={{
            fontWeight: 400,
          }}
        >
          Ranking
        </h1>
      </div>
      <Image
        src={"/rank_bg.png"}
        alt="rank_bg"
        width={window.innerWidth}
        height={(window.innerWidth / 390) * 302}
        style={{ position: "relative", zIndex: 10, top: 0 }}
      />
      <Image
        src={"/heart4.png"}
        alt="rank_bg"
        width={210}
        height={210}
        style={{ position: "absolute", zIndex: 10, top: 0, right: 0 }}
      />
      <RankingTop height={(window.innerWidth / 390) * 302 - 49 - 28} />
      <div
        className="mt-[21px] bg-white rounded-tl-[32px] rounded-tr-[32px] p-[16px]"
        style={{
          height:
            window.innerHeight - (window.innerWidth / 390) * 302 - 21 - 84,
        }}
      >
        {data2?.map((x: UserRankData, i) => {
          if (i < 3) return;
          return <RankingItem key={i} {...x} />;
        })}
      </div>
      {me ? (
        <div
          className="absolute bottom-0 h-[84px] flex items-center justify-center"
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
