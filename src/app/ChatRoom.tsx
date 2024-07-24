// import { useState } from "react";
import { useSocket } from "@/context/SocketContext";
import useGlobalStore from "@/store/useGlobalStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { formatNumberKMB } from "../tools/tools";
import { Swiper, SwiperSlide, SwiperClass } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";

interface ChatRoomProps {
  children: React.ReactNode;
}

/* eslint-disable react/no-unescaped-entities */
const ChatRoom: React.FC<ChatRoomProps> = ({ children }) => {
  const userinfo = useGlobalStore((x) => x.userInfo);
  const follow: boolean = userinfo?.follow ?? false;
  const router = useRouter();
  const socket = useSocket();
  const playedOnce = useGlobalStore((x) => x.playedOnce);
  const spining = useGlobalStore((x) => x.spining);
  const [swiperRef, setSwiperRef] = useState<SwiperClass | null>(null);
  useEffect(() => {
    const audio: HTMLMediaElement = document.getElementById(
      "myAudio"
    ) as HTMLMediaElement;
    const handleAudioPlay = () => {
      console.log("audio play");
      useGlobalStore.setState({ spining: true });
    };
    const handleAudioPause = () => {
      console.log("audio pause");
      useGlobalStore.setState({ spining: false });
    };
    // 监听播放事件
    audio?.addEventListener("play", handleAudioPlay);
    audio?.addEventListener("pause", handleAudioPause);
    return () => {
      audio?.removeEventListener("play", handleAudioPlay);
      audio?.removeEventListener("pause", handleAudioPlay);
    };
  }, []);

  useEffect(() => {
    const swipe = () => {
      swiperRef?.slideNext();
    };
    const interval = setInterval(swipe, 2000);
    return () => clearInterval(interval);
  }, [swiperRef]);

  return (
    <div
      className="fixed w-full bg-cover bg-center z-10"
      style={{
        backgroundImage: "url('/background2.png')",
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
              src="/avatar.png"
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
              dark_queen
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
                // window.Telegram.WebApp.showPopup(
                //   {
                //     title: "title",
                //     message: "Confirm to unfollow?",
                //     buttons: [
                //       { id: "Confirm", type: "default", text: "Confirm" },
                //       { id: "Cancel", type: "destructive", text: "Cancel" },
                //     ],
                //   },
                //   function (buttonId: string) {
                //     console.log("x", buttonId);
                //   }
                // );
                socket?.emit("follow", (data: UserInfo) => {
                  // console.log("follow", data);
                  useGlobalStore.setState({ userInfo: data });
                });
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
                    fontSize: 8,
                    fontWeight: 500,
                    lineHeight: "20px",
                    marginTop: "2px",
                  }}
                >
                  Follow
                </p>
              )}
            </button>
          </div>
          <div className="flex flex-row items-center">
            <div
              className=" flex items-center space-x-[-8px]"
              style={{
                zIndex: 999,
              }}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                router.push("/ranking");
              }}
            >
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
              className="text-[10px] text-white h-[20px] ml-[-4px] px-[5px] rounded-full"
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
                src="/avatar.png"
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
                  dark_queen
                </span>
              </div>
            </div>
            <div style={{ fontSize: 12, marginTop: "4px" }}>
              Hello everyone! I'm DarkQueen, a girl who loves chatting. Standing
              at 166 cm, I enjoy sharing the little moments of my life with you
              and listening to your stories. Whether you've had a happy event or
              a small worry, feel free to come and talk to me!
            </div>
          </div>
        </div>
      </div>

      <div
        className="flex items-center  space-x-2 absolute bottom-[24px] left-0 mx-[16px]"
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
          src="/heart2.png"
          alt="Ava profile picture"
          className="w-[40px] h-[40px] rounded-full"
        />
      </div>
    </div>
  );
};

export default ChatRoom;
