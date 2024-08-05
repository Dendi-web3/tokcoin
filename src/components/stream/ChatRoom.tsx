// import { useState } from "react";
import { useSocket } from "@/context/SocketContext";
import useGlobalStore from "@/store/useGlobalStore";
import { useEffect, useState, useRef, useMemo } from "react";
import { formatNumberKMB } from "../../tools/tools";
import { Swiper, SwiperSlide, SwiperClass } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { usePopup } from "@telegram-apps/sdk-react";
import BottomSheet, { BottomSheetRefs } from "@/components/common/BottomSheet";
import LikeIcon from "@/assets/like.svg";
import ShareIcon from "@/assets/share.svg";

interface ChatRoomProps {
  data: StreamerData;
  children: React.ReactNode;
}

/* eslint-disable react/no-unescaped-entities */
const ChatRoom: React.FC<ChatRoomProps> = ({ children, data }) => {
  const [follow, setFollow] = useState(false);
  const socket = useSocket();
  const playedOnce = useGlobalStore((x) => x.playedOnce);
  const spining = useGlobalStore((x) => x.spining);
  const userRankData = useGlobalStore((x) => x.userRankData);
  const tgUser = useGlobalStore((x) => x.tgUser);
  const viewHistories = useGlobalStore((x) => x.viewHistories);
  const [swiperRef, setSwiperRef] = useState<SwiperClass | null>(null);
  const popup = usePopup();
  const viewersRef = useRef<BottomSheetRefs>(null);
  const viewHistoriesRef = useRef<BottomSheetRefs>(null);
  const streamerId = data._id;
  const me = useMemo(() => userRankData?.find((x) => x.isMe), [userRankData]);

  const getViewHistory = () => {
    socket?.emit("viewerHistory", { streamerId }, (data: ViewHistory[]) => {
      useGlobalStore.setState({ viewHistories: data });
    });
  };
  const getViewRanks = () => {
    socket?.emit("ranks", { streamerId }, (data: UserRankData[]) => {
      useGlobalStore.setState({ userRankData: data });
    });
  };

  const followStreamer = () => {
    socket?.emit("follow", { streamerId: data._id });
  };

  const getUserInfoAndFollowStatus = () => {
    socket?.emit(
      "user",
      { streamerId: data._id },
      (data: { follow: boolean }) => {
        setFollow(data.follow);
      }
    );
  };

  useEffect(() => {
    // 设置一个定时器，每秒调用一次
    const intervalId = setInterval(() => {
      getViewHistory();
      getViewRanks();
      getUserInfoAndFollowStatus();
    }, 1000);
    return () => clearInterval(intervalId);
  }, [socket, streamerId]);

  useEffect(() => {
    const swipe = () => {
      swiperRef?.slideNext();
    };
    const interval = setInterval(swipe, 2000);
    return () => clearInterval(interval);
  }, [swiperRef]);

  return (
    <div
      className="w-full bg-cover bg-center z-10"
      style={{
        backgroundImage: `url('${data.coverPicture}')`,
        height: window.innerHeight,
      }}
      onClick={() => {
        if (playedOnce) return;
        useGlobalStore.setState({ playedOnce: true });
        const audio: HTMLMediaElement = document.getElementById(
          "myAudio"
        ) as HTMLMediaElement;
        audio?.play();
      }}
    >
      {children}
      <div
        className="w-full h-[104px] flex flex-col items-center justify-between p-[24px]  text-white relative"
        style={{
          background:
            "linear-gradient(180deg, #0F0F0F -27.91%, rgba(15, 15, 15, 0.00) 100%)",
          gap: "10px",
        }}
      >
        <div className="w-full flex items-center justify-between">
          <div
            className="flex items-center space-x-2 h-[32px] rounded-full px-[4px]"
            style={{ background: "rgba(8, 8, 8, 0.20)" }}
          >
            <img
              src={data.avatar}
              alt="Ava profile picture"
              className="w-6 h-6 rounded-full"
            />
            <span
              className="font-bold"
              style={{
                fontSize: 10,
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "12px",
                letterSpacing: "-0.14px",
                whiteSpace: "nowrap", // 文本不换行
                overflow: "hidden", // 超出部分隐藏
                maxWidth: "60px", // 这里可以根据需要调整，确保文本最多显示10个字符
                textOverflow: "ellipsis",
              }}
            >
              {data.name}
            </span>

            <button
              className=" text-white px-2 py-1 rounded-full h-[20px] w-[40px]"
              style={{
                background:
                  "linear-gradient(109deg, #FFA244 14.81%, #FB2A7E 94.2%)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 999,
              }}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                if (follow) {
                  popup
                    .open({
                      message: "Confirm to unfollow?",
                      buttons: [
                        { id: "Confirm", type: "default", text: "Confirm" },
                        { id: "Cancel", type: "destructive", text: "Cancel" },
                      ],
                    })
                    .then((x) => {
                      if (x === "Confirm") {
                        followStreamer();
                      }
                    });
                } else {
                  followStreamer();
                }
              }}
            >
              {follow ? (
                <img
                  src="/done.svg"
                  alt="user1"
                  className="w-[12px] h-[12px]"
                />
              ) : (
                <p
                  style={{
                    fontSize: "8px",
                    fontWeight: 500,
                    lineHeight: "20px",
                  }}
                >
                  Follow
                </p>
              )}
            </button>
          </div>
          <div
            className="flex flex-row items-center"
            style={{
              zIndex: 999,
            }}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              viewersRef.current?.open();
            }}
          >
            <div className=" flex items-center space-x-[-8px]">
              <img
                src="/m1.png"
                alt="user1"
                className="w-6 h-6 rounded-full "
              />
              <img
                src="/m2.png"
                alt="user2"
                className="w-6 h-6 rounded-full "
              />
              <img
                src="/m3.png"
                alt="user3"
                className="w-6 h-6 rounded-full "
              />
            </div>
            <span
              className="text-[10px] text-white h-[20px] ml-[4px] mr-[8px] px-[5px] rounded-full"
              style={{
                fontWeight: 400,
                lineHeight: "20px",
                background: "rgba(8, 8, 8, 0.20)",
              }}
            >
              {formatNumberKMB(100000, 0)}
            </span>
            <img src="/close.svg" alt="user1" className="w-[16px] h-[16px]" />
          </div>
        </div>
        <BottomSheet className="overflow-hidden" ref={viewersRef}>
          <div className="text-[#939393] text-sm leading-none px-8 py-4">
            Top Viewers
          </div>
          <div className="flex-1 bg-white rounded-t-[32px] p-4 overflow-y-auto overflow-x-hidden">
            {(userRankData ?? []).map((item) => (
              <div
                key={item.username}
                className="h-[56px] flex items-center p-3 rounded-xl gap-3 text-xs font-medium"
                style={{
                  background: item.isMe
                    ? "linear-gradient(114deg, #FFACAC 2.47%, rgba(255, 196, 196, 0.50) 92.92%)"
                    : "transparent",
                  color: item.isMe ? "#000" : "inherit",
                }}
              >
                <div className="h-4 w-4 text-center">{item.rank}</div>
                <img
                  src="/default_avatar.png"
                  alt={item.username}
                  className="w-8 h-8 rounded-full"
                />
                <div>{item.isMe ? "You" : item.username}</div>
                <div
                  className="flex items-center flex-1 justify-end font-light"
                  style={{ color: item.isMe ? "#000" : "#FFACAC" }}
                >
                  {Intl.NumberFormat().format(item.point * 1000 ?? 0)}
                  <LikeIcon className="w-6 h-6" />
                </div>
              </div>
            ))}
          </div>
          {!!me && (
            <div className="bg-white p-6 border-t-[#E1E0E0] border-t-solid border-[1px] flex items-center gap-4">
              <div className="h-4 w-4 text-center text-[10px]">
                {me.rank > 99 ? "99+" : me.rank}
              </div>
              <img
                src="/default_avatar.png"
                alt={me.username}
                className="w-10 h-10 rounded-full"
              />
              <div className="text-[#352D35] font-semibold text-[14px]">
                {me.username}
              </div>
              <div className="flex items-center flex-1 gap-2 justify-end text-[12px] font-medium text-[#17142E]">
                {Intl.NumberFormat().format(me.point * 1000 ?? 0)}
                <LikeIcon className="w-6 h-6" />
              </div>
            </div>
          )}
        </BottomSheet>
        <div className="w-full flex items-center justify-end">
          <div
            className=" h-[42px]  w-[52px] relative"
            style={{
              opacity: " var(--sds-size-stroke-border)",
              zIndex: 999,
            }}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              const audio: HTMLMediaElement = document.getElementById(
                "myAudio"
              ) as HTMLMediaElement;
              if (audio.paused) {
                audio?.play();
              } else {
                audio?.pause();
              }
            }}
          >
            <img
              src="/Disc.png"
              alt="Ava profile picture"
              className={`w-[30px] h-[30px] rounded-full absolute right-0 bottom-0 ${spining ? "spin" : ""}`}
            />
            <img
              src="/floating.png"
              alt="Ava profile picture"
              className="w-[40px] h-[40px]  absolute top-0 left-0"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full absolute bottom-[104px] gap-[8px]">
        <div className=" mr-auto">
          <Swiper
            direction={"vertical"}
            loop={true}
            onSwiper={setSwiperRef}
            slidesPerView={1}
            className="h-[20px] "
            // onActiveIndexChange={(swiper) => console.log(swiper.activeIndex)}
          >
            <SwiperSlide>
              <div
                className=" text-[12px] left-4  text-white px-[8px] h-[20px] rounded-full flex flex-row items-center ml-[16px] mr-auto"
                style={{
                  background:
                    "linear-gradient(91deg, rgba(255, 113, 198, 0.79) 0.44%, rgba(251, 167, 217, 0.79) 100%)",
                }}
              >
                <img
                  src="/Joe.png"
                  alt="Ava profile picture"
                  className="w-[16px] h-[16px] rounded-full"
                />
                <span className=" text-[#2094FF] mx-[4px]">Joe</span> just
                joined the room
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className=" text-[12px] left-4  text-white px-[8px] h-[20px] rounded-full flex flex-row items-center ml-[16px] mr-auto"
                style={{
                  background:
                    "linear-gradient(91deg, rgba(255, 113, 198, 0.79) 0.44%, rgba(251, 167, 217, 0.79) 100%)",
                }}
              >
                <img
                  src="/Joe.png"
                  alt="Ava profile picture"
                  className="w-[16px] h-[16px] rounded-full"
                />
                <span className=" text-[#2094FF] mx-[4px]">George</span> just
                joined the room
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className=" text-[12px] left-4  text-white px-[8px] h-[20px] rounded-full flex flex-row items-center ml-[16px] mr-auto"
                style={{
                  background:
                    "linear-gradient(91deg, rgba(255, 113, 198, 0.79) 0.44%, rgba(251, 167, 217, 0.79) 100%)",
                }}
              >
                <img
                  src="/Joe.png"
                  alt="Ava profile picture"
                  className="w-[16px] h-[16px] rounded-full"
                />
                <span className=" text-[#2094FF] mx-[4px]">Dendi</span> just
                joined the room
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className=" text-[12px] left-4  text-white px-[8px] h-[20px] rounded-full flex flex-row items-center ml-[16px] mr-auto"
                style={{
                  background:
                    "linear-gradient(91deg, rgba(255, 113, 198, 0.79) 0.44%, rgba(251, 167, 217, 0.79) 100%)",
                }}
              >
                <img
                  src="/Joe.png"
                  alt="Ava profile picture"
                  className="w-[16px] h-[16px] rounded-full"
                />
                <span className=" text-[#2094FF] mx-[4px]">Wind</span> just
                joined the room
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        <div
          className=" left-0 text-[14px] p-[12px] text-white mx-[16px]"
          style={{
            borderRadius: "10px",
            opacity: " var(--sds-size-stroke-border)",
            background: "rgba(8, 8, 8, 0.20)",
          }}
        >
          <div className=" items-start  mb-2">
            <div className="flex items-center  space-x-2">
              <img
                src={data.avatar}
                alt="Ava profile picture"
                className="w-6 h-6 rounded-full"
              />
              <div
                style={{
                  display: "flex",
                  padding: "8px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                  borderRadius: "3px",
                  background:
                    "var(--Control-Secondary-SecondaryHover, rgba(255, 255, 255, 0.10))",
                }}
              >
                <span
                  className="font-bold"
                  style={{
                    fontSize: 14,
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "12px",
                    letterSpacing: "-0.14px",
                  }}
                >
                  {data.name}
                </span>
              </div>
            </div>
            <div style={{ fontSize: 12, marginTop: "4px" }}>
              {data.description}
            </div>
          </div>
        </div>
      </div>

      <div
        className="flex items-center  space-x-2 absolute bottom-[24px] left-0 mx-[16px] z-[90]"
        style={{
          width: "calc(100vw - 32px)",
        }}
      >
        <div
          className="relative flex-1 px-4 py-2 rounded-full text-white w-[215px] text-[12px] flex flex-row"
          style={{
            background: "rgba(0, 0, 0, 0.20)",
            opacity: "var(--sds-size-stroke-border)",
          }}
        >
          <div
            style={{
              color: "rgba(255, 255, 255, 0.70)",
            }}
          >
            {" "}
            Coming soon
          </div>
          <img
            src="/mood.png"
            alt="Ava profile picture"
            className="w-[24px] h-[24px] rounded-full absolute right-[10px] top-[5px]"
          />
        </div>
        <img
          src="/gift.png"
          alt="Ava profile picture"
          className="w-[40px] h-[40px] rounded-full"
        />
        <img
          src="/default_avatar.png"
          alt="User avatar"
          className="w-[40px] h-[40px] rounded-full"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            viewHistoriesRef.current?.open();
          }}
        />
      </div>
      <BottomSheet
        ref={viewHistoriesRef}
        className="mt-[26px]"
        header={
          <div className="flex flex-col items-center absolute top-0 w-full">
            <img
              src="/default_avatar.png"
              alt="User avatar"
              className="w-16 h-16 rounded-full"
            />
            <span className="text-[10px] font-medium leading-[12px] text-[#000] tracking-[-0.1px]">
              @{tgUser?.firstName}
            </span>
          </div>
        }
      >
        <div className="flex flex-col flex-1 mt-[59px] overflow-auto">
          <div className="text-[14px] flex flex-col leading-[12px] tracking-[-0.14px] px-8 mb-[9px]">
            Watch History
          </div>
          <div className="bg-white rounded-[32px] overflow-y-scroll flex-1 flex flex-col p-4">
            {viewHistories ? (
              viewHistories.map((item) => (
                <div
                  key={item.streamerId}
                  className="flex items-center p-3 gap-3"
                >
                  <img
                    src={item.streamerCoverPicture}
                    alt={item.streamerName}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1 text-[12px] text-[#4F4F4F] font-medium">
                    {item.streamerName}
                  </div>
                  <a href={`https://t.me/share/url?url=https://t.me/test`}>
                    <ShareIcon />
                  </a>
                </div>
              ))
            ) : (
              <div className="items-center justify-center">Loading...</div>
            )}
          </div>
        </div>
      </BottomSheet>
    </div>
  );
};

export default ChatRoom;
