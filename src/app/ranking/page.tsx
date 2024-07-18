"use client";
import RankingItem from "@/components/ranking/RankingItem";
import useGlobalStore from "@/store/useGlobalStore";
import { useRouter } from "next/navigation";

export default function Widget() {
  const user = useGlobalStore((x) => x.tgUser);
  const router = useRouter();
  const data = [
    { score: 100, rank: 1, name: "Joe" },
    { score: 100, rank: 2, name: "Joe" },
  ];
  return (
    <div className="p-4">
      <div
        className="flex items-center space-x-2 h-[64px]"
        onClick={() => {
          router.push("/");
        }}
      >
        <button className="text-muted-foreground">
          <img alt="back-arrow" src="/Left.svg" />
        </button>
        <h1
          className="text-[#868486] text-[14px]"
          style={{
            fontWeight: 400,
          }}
        >
          Ranking
        </h1>
      </div>
      <div
        className="mt-[35px] w-full h-[200px] text-center relative"
        style={{
          borderRadius: "17px",
          // border: " solid #F6F6F6",
          background:
            "linear-gradient(0deg, #FFE8F6 0%, #FFCAEA 26.96%, #FFF0F9 99.76%)",
        }}
      >
        <img
          alt="hearts"
          src="/big_heart.png"
          className="absolute top-[30px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[138px] h-[138px]"
        />
        <p
          className="text-[50px] text-[#FE8DD1]"
          style={{
            lineHeight: "200px",
          }}
        >
          100,000,000
        </p>
      </div>
      <div className="mt-[16px] space-y-4">
        {data.map((x, i) => (
          <RankingItem key={i} {...x} />
        ))}
      </div>
      <div
        className="absolute bottom-0 h-[84px] flex items-center justify-center"
        style={{
          width: "100%",
          borderTop: "0.5px solid #E1E0E0",
          marginLeft: "-16px",
        }}
      >
        <div className="px-[16px] w-full">
          <RankingItem
            score={8888888888}
            rank={888}
            name={user?.firstName ?? "George"}
          />
        </div>
      </div>
    </div>
  );
}
