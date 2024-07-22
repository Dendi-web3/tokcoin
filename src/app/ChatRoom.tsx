// import { useState } from "react";
import { useSocket } from "@/context/SocketContext";
import useGlobalStore from "@/store/useGlobalStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { formatNumberKMB } from "../tools/tools";

interface ChatRoomProps {
  children: React.ReactNode;
}

/* eslint-disable react/no-unescaped-entities */
const ChatRoom: React.FC<ChatRoomProps> = ({ children }) => {
  const [audioPlayed, setAudioPlayed] = useState(false);
  const userinfo = useGlobalStore((x) => x.userInfo);
  const follow: boolean = userinfo?.follow ?? false;
  const router = useRouter();
  const socket = useSocket();

  useEffect(() => {
    const audio: HTMLMediaElement = document.getElementById(
      "myAudio"
    ) as HTMLMediaElement;
    const handleAudioPlay = () => {
      console.log("audio play");
      setAudioPlayed(true);
    };
    const handleAudioPause = () => {
      console.log("audio pause");
      setAudioPlayed(false);
    };
    // 监听播放事件
    audio?.addEventListener("play", handleAudioPlay);
    audio?.addEventListener("pause", handleAudioPause);
    return () => {
      audio?.removeEventListener("play", handleAudioPlay);
      audio?.removeEventListener("pause", handleAudioPlay);
    };
  }, []);
  return (
    <div
      className="fixed w-full h-screen bg-cover bg-center z-10"
      style={{
        backgroundImage: "url('/background2.png')",
      }}
      onClick={() => {
        const audio: HTMLMediaElement = document.getElementById(
          "myAudio"
        ) as HTMLMediaElement;
        audio?.play();
      }}
    >
      {children}
      <video
        controls={true}
        autoPlay={true}
        loop={true}
        id="myAudio"
        style={{ display: "none" }}
      >
        <source
          src="https://96.f.1ting.com/local_to_cube_202004121813/96kmp3/2022/02/18/18a_hbx/01.mp3"
          type="audio/mpeg"
        />
      </video>
      <div
        className="w-full h-[104px] flex flex-col items-center justify-between p-[24px]  text-white relative"
        style={{
          background:
            "linear-gradient(180deg, #0F0F0F -27.91%, rgba(15, 15, 15, 0.00) 100%)",
          gap: "10px",
        }}
      >
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center space-x-2">
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
                // background:
                //   "var(--Control-Secondary-SecondaryHover, rgba(255, 255, 255, 0.10))",
              }}
            >
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
                Ava
              </span>
            </div>

            <button
              className=" text-white px-2 py-1 rounded-full h-[28px]"
              style={{
                background:
                  "linear-gradient(109deg, #FFA244 14.81%, #FB2A7E 94.2%)",
                display: "flex",
                padding: "8px 12px",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                zIndex: 999,
              }}
              onClick={() => {
                // window.Telegram.WebApp.showPopup(
                //   {
                //     title: "title",
                //     message: "Confirm to unfollow?",
                //     buttons: [
                //       { id: "Confirm", type: "default", text: "Confirm" },
                //       { id: "Cancel", type: "destructive", text: "Cancel" },
                //     ],
                //   },
                //   function (buttonId: any) {
                //     console.log("x", buttonId);
                //   }
                // );
                socket?.emit("follow", (data: UserInfo) => {
                  console.log("follow", data);
                  useGlobalStore.setState({ userInfo: data });
                });
              }}
            >
              {follow ? (
                <img
                  src="/done.svg"
                  alt="user1"
                  className="w-[24px] h-[24px]"
                />
              ) : (
                <p
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    lineHeight: "12px",
                  }}
                >
                  Follow
                </p>
              )}
            </button>
            <button
              className=" text-white px-2 py-1 rounded-full h-[28px]"
              style={{
                background:
                  "linear-gradient(109deg, #FFA244 14.81%, #FB2A7E 94.2%)",
                display: "flex",
                padding: "8px 12px",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                zIndex: 999,
              }}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                if (audioPlayed) {
                  const audio: HTMLMediaElement = document.getElementById(
                    "myAudio"
                  ) as HTMLMediaElement;
                  audio?.pause();
                } else {
                  const audio: HTMLMediaElement = document.getElementById(
                    "myAudio"
                  ) as HTMLMediaElement;
                  audio?.play();
                }
              }}
            >
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  lineHeight: "12px",
                }}
              >
                {!audioPlayed ? "Play Sound" : "Stop Sound"}
              </p>
            </button>
          </div>
          <img src="/close.svg" alt="user1" className="w-6 h-6" />
        </div>
        <div className="w-full flex items-center justify-between">
          <div
            className=" h-[24px]  text-white px-2 py-1 rounded-full flex flex-row items-center "
            style={{
              opacity: " var(--sds-size-stroke-border)",
              background: "rgba(8, 8, 8, 0.20)",
            }}
          >
            <img
              src="/music_note.png"
              alt="Ava profile picture"
              className="w-[16px] h-[16px] rounded-full mr-[4px]"
            />
            <span className="text-[12px]"> Physical</span>
          </div>

          <div
            className=" flex items-center space-x-1"
            style={{
              zIndex: 999,
            }}
            onClick={() => {
              router.push("/ranking");
            }}
          >
            <img src="/m1.png" alt="user1" className="w-6 h-6 rounded-full " />
            <img src="/m2.png" alt="user2" className="w-6 h-6 rounded-full " />
            <img src="/m3.png" alt="user3" className="w-6 h-6 rounded-full " />
            <span
              className="text-[14px] text-white"
              style={{
                fontWeight: 400,
              }}
            >
              {formatNumberKMB(100000, 0)}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full absolute bottom-[104px] gap-[8px]">
        <div
          className="text-[14px]  text-white p-[12px] rounded-lg mx-[16px]"
          style={{
            borderRadius: "10px",
            opacity: " var(--sds-size-stroke-border)",
            background: "rgba(8, 8, 8, 0.20)",
            width: "calc(100vw - 32px)",
          }}
        >
          <div className="flex items-center space-x-2">
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
                Ava
              </span>
            </div>
          </div>
          <p className="text-[#FF71C6] flex flex-row items-between">
            <span className="text-[#FF71C6] flex-grow"> ID: </span>
            <span className="text-[#FF71C6] ml-auto">Ava</span>
          </p>
          <p className="text-[#FF71C6] flex flex-row items-between">
            <span className="text-[#FF71C6] flex-grow"> Service: </span>
            <span className="text-[#FF71C6] ml-auto">STEAM Chatting Dance</span>
          </p>
          <p className="text-[#FF71C6] flex flex-row items-between">
            <span className="text-[#FF71C6] flex-grow">Height: </span>
            <span className="text-[#FF71C6] ml-auto">170</span>
          </p>
          <p className="text-[#FF71C6] flex flex-row items-between">
            <span className="text-[#FF71C6] flex-grow"> Introduce: </span>
            <span className="text-[#FF71C6] ml-auto">
              I'm Ava a small girl with big attributes
            </span>
          </p>
        </div>

        <div
          className=" text-[12px] left-4  text-white px-[8px] py-[4px] rounded-full flex flex-row items-center ml-[16px] mr-auto"
          style={{
            background:
              "linear-gradient(91deg, rgba(255, 113, 198, 0.79) 0.44%, rgba(251, 167, 217, 0.79) 100%)",
          }}
        >
          <img
            src="/Joe.png"
            alt="Ava profile picture"
            className="w-[24px] h-[24px] rounded-full"
          />
          <span className=" text-[#2094FF] mx-[4px]">Joe</span> just joined the
          room
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
                  Ava
                </span>
              </div>
            </div>
            <div style={{ fontSize: 14, marginTop: "4px" }}>
              Welcome to the live stream. If you can't sleep, stay here and
              listen for five minutes to help you fall asleep. Thank you for
              following and liking.
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
