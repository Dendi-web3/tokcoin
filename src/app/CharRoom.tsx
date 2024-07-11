/* eslint-disable react/no-unescaped-entities */
export default function ChatRoom() {
  return (
    <div
      className="fixed w-full h-screen bg-cover bg-center z-10"
      style={{
        backgroundImage: "url('/background.jpg')",
      }}
    >
      <div
        className="absolute top-0 left-0 w-full flex items-center justify-between p-4  text-white"
        style={{ background: "linear-gradient(to bottom, black, transparent)" }}
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

          <button
            className=" text-white px-2 py-1 rounded-full"
            style={{
              background:
                "linear-gradient(109deg, #FFA244 14.81%, #FB2A7E 94.2%)",
              display: "flex",
              padding: "8px 12px",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <p
              style={{
                fontSize: 14,
                fontWeight: 600,
                lineHeight: "12px",
              }}
            >
              Follow
            </p>
          </button>
        </div>
        <div className="flex items-center space-x-1">
          <img src="/m1.png" alt="user1" className="w-6 h-6 rounded-full " />
          <img src="/m2.png" alt="user2" className="w-6 h-6 rounded-full " />
          <img src="/m3.png" alt="user3" className="w-6 h-6 rounded-full " />
          <span className="text-[12px]">25</span>
          <img src="/close.svg" alt="user1" className="w-6 h-6  " />
        </div>
      </div>

      <div className="absolute top-16 left-4 bg-zinc-800 bg-opacity-50 text-white px-2 py-1 rounded-full">
        <span>🎵 Physical</span>
      </div>

      <div className="absolute text-[14px] bottom-1/2 left-4 bg-black bg-opacity-50 text-white p-4 rounded-lg">
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
          </div>{" "}
        </div>
        <p>
          ID: <span className="text-pink-500">Ava</span>
        </p>
        <p>
          Service: <span className="text-pink-500">STEAM Chatting Dance</span>
        </p>
        <p>
          Height: <span className="text-pink-500">170</span>
        </p>
        <p>
          Introduce:{" "}
          <span className="text-pink-500">
            I'm Ava a small girl with big attributes
          </span>
        </p>
      </div>

      <div
        className="absolute bottom-[240px] text-[12px] left-4  text-white px-[8px] py-[4px] rounded-full flex flex-row items-center"
        style={{
          background:
            "linear-gradient(91deg, rgba(255, 113, 198, 0.79) 0.44%, rgba(251, 167, 217, 0.79) 100%)",
        }}
      >
        <img
          src="/avatar.png"
          alt="Ava profile picture"
          className="w-[24px] h-[24px] rounded-full"
        />
        <span className="font-bold text-[#2094FF] mx-[4px]">Joe</span> just
        joined the room
      </div>

      <div
        className="absolute bottom-[82px] left-0 text-[14px] p-[12px] text-white mx-[16px]"
        style={{
          borderRadius: "10px",
          opacity: " var(--sds-size-stroke-border)",
          background: "rgba(8, 8, 8, 0.20)",
        }}
      >
        <div className=" items-start  mb-2">
          <div className="flex items-center ">
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
          <div style={{ fontSize: 14 }}>
            Welcome to the live stream. If you can't sleep, stay here and listen
            for five minutes to help you fall asleep. Thank you for following
            and liking.
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
        className="absolute bottom-[24px] left-0 mx-[16px]"
      >
        <div className="flex items-center  space-x-2 ">
          <div
            className="flex-1 px-4 py-2 rounded-full text-white w-[215px]"
            style={{
              background: "rgba(0, 0, 0, 0.20)",
              opacity: "var(--sds-size-stroke-border)",
            }}
          >
            Say something
          </div>
          <button className="text-white">😊</button>
          <button className="text-white">🎁</button>
          <button className="text-white">💖</button>
        </div>
      </div>
    </div>
  );
}
