interface RankingTopProps {
  height: number;
  data: StreamerRankData[] | undefined;
}
export default function RankingTop({ height, data }: RankingTopProps) {
  return (
    <div
      className="absolute top-[20px] flex flex-row items-center justify-between mx-[20px] pt-[49px] z-30 space-x-[10px]"
      style={{
        height: height,
        width: window.innerWidth - 40,
      }}
    >
      <div className="w-full h-full flex-1 flex flex-col items-center relative">
        <img
          src={data?.[1]?.streamerAvatar}
          alt="Joe"
          width={77}
          height={77}
          className="rounded-full w-[77px] h-[77px] absolute bottom-[60px]"
          style={{
            borderColor: "white",
            borderWidth: "3px",
          }}
        />
        <img
          src={"/crown2.png"}
          alt="Joe"
          className="rounded-full w-[38px] h-[24px] absolute bottom-[132px]"
        />
        <div
          className="rounded-full  absolute bottom-[24px] text-center text-[14px] text-[white] pt-[1px] px-[5px]"
          style={{
            width: "100%",
            height: "20px",
            lineHeight: "20px",
            whiteSpace: "nowrap", // 文本不换行
            overflow: "hidden", // 超出部分隐藏
            textOverflow: "ellipsis",
          }}
        >
          {data?.[1]?.streamerName}
        </div>
        <div
          className="rounded-full bg-white absolute bottom-0 text-center text-[12px] text-[#FFACAC] pt-[1px]"
          style={{
            width: "100%",
            height: "20px",
            lineHeight: "20px",
          }}
        >
          {Intl.NumberFormat().format(data?.[1]?.totalLike ?? 0)}
        </div>
      </div>

      <div className="w-full h-full flex-1 flex flex-col items-center relative">
        <img
          src={data?.[0]?.streamerAvatar}
          alt="Joe"
          className="rounded-full  absolute bottom-[84px]"
          style={{
            borderColor: "white",
            borderWidth: "3px",
            width: "100%",
            height: "auto", // 高度自动调整以保持图片的宽高比
            objectFit: "cover", // 确保图片覆盖整个元素区域，同时保持宽高比
            aspectRatio: "1 / 1",
          }}
        />
        <img
          src={"/crown1.png"}
          alt="Joe"
          className="rounded-full w-[51px] h-[32px] absolute bottom-[188px]"
        />
        <div
          className="rounded-full  absolute bottom-[50px] text-center text-[16px] text-[white] pt-[1px] px-[5px]"
          style={{
            width: "100%",
            height: "20px",
            lineHeight: "20px",
            whiteSpace: "nowrap", // 文本不换行
            overflow: "hidden", // 超出部分隐藏
            textOverflow: "ellipsis",
            fontWeight: 700,
          }}
        >
          {data?.[0]?.streamerName}
        </div>
        <div
          className="rounded-full bg-white absolute bottom-[26px] text-center text-[12px] text-[#FFACAC] pt-[1px]"
          style={{
            width: "100%",
            height: "20px",
            lineHeight: "20px",
          }}
        >
          {Intl.NumberFormat().format(data?.[0]?.totalLike ?? 0)}
        </div>
      </div>
      <div className="w-full h-full flex-1 flex flex-col items-center relative">
        <img
          src={data?.[2]?.streamerAvatar}
          alt="Joe"
          width={77}
          height={77}
          className="rounded-full w-[77px] h-[77px] absolute bottom-[60px]"
          style={{
            borderColor: "white",
            borderWidth: "3px",
          }}
        />
        <img
          src={"/crown3.png"}
          alt="Joe"
          className="rounded-full w-[38px] h-[24px] absolute bottom-[132px]"
        />
        <div
          className="rounded-full  absolute bottom-[24px] text-center text-[14px] text-[white] pt-[1px] px-[5px]"
          style={{
            width: "100%",
            height: "20px",
            lineHeight: "20px",
            whiteSpace: "nowrap", // 文本不换行
            overflow: "hidden", // 超出部分隐藏
            textOverflow: "ellipsis",
          }}
        >
          {data?.[2]?.streamerName}
        </div>
        <div
          className="rounded-full bg-white absolute bottom-0 text-center text-[12px] text-[#FFACAC] pt-[1px]"
          style={{
            width: "100%",
            height: "20px",
            lineHeight: "20px",
          }}
        >
          {Intl.NumberFormat().format(data?.[2]?.totalLike ?? 0)}
        </div>
      </div>
    </div>
  );
}
