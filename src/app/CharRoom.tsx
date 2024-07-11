/* eslint-disable react/no-unescaped-entities */
export default function ChatRoom() {
  return (
    <div
      className="fixed w-full h-screen bg-cover bg-center z-10"
      style={{
        backgroundImage: "url('/background.png')",
      }}
    >
      <div
        className="absolute top-0 left-0 w-full flex items-center justify-between p-4  text-white"
        style={{ background: "linear-gradient(to bottom, black, transparent)" }}
      >
        <div className="flex items-center space-x-2">
          <img
            src="/avatar.png"
            alt="dark_queen profile picture"
            className="w-6 h-6 rounded-full"
          />
          <span className="font-bold">dark_queen</span>
          <button className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-2 py-1 rounded-full">
            Follow
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex -space-x-2">
            <img
              src="/m1.png"
              alt="user1"
              className="w-6 h-6 rounded-full border-2 border-white"
            />
            <img
              src="/m2.png"
              alt="user2"
              className="w-6 h-6 rounded-full border-2 border-white"
            />
            <img
              src="/m3.png"
              alt="user3"
              className="w-6 h-6 rounded-full border-2 border-white"
            />
          </div>
          <span>25</span>
          <button className="text-white">✖️</button>
        </div>
      </div>

      <div className="absolute top-16 left-4 bg-zinc-800 bg-opacity-50 text-white px-2 py-1 rounded-full">
        <span>🎵 Physical</span>
      </div>

      <div className="absolute text-[14px] bottom-1/2 left-4 bg-black bg-opacity-50 text-white p-4 rounded-lg">
        <div className="flex items-center space-x-2">
          <img
            src="/avatar.png"
            alt="dark_queen profile picture"
            className="w-6 h-6 rounded-full"
          />
          <span className="font-bold">dark_queen</span>
        </div>
        <p>
          ID: <span className="text-pink-500">dark_queen</span>
        </p>
        <p>
          Service: <span className="text-pink-500">Chatting</span>
        </p>
        <p>
          Height: <span className="text-pink-500">166</span>
        </p>
        <p>
          Introduce: <span className="text-pink-500">Just chatting</span>
        </p>
      </div>

      <div
        className="absolute bottom-1/3 text-[12px] left-4 bg-pink-500 bg-opacity-75 text-white px-4 py-2 rounded-full"
        style={{
          background:
            "linear-gradient(91deg, rgba(255, 113, 198, 0.79) 0.44%, rgba(251, 167, 217, 0.79) 100%)",
        }}
      >
        <span className="font-bold text-[#2094FF] ">Joe</span> just joined the
        room
      </div>

      <div className="absolute bottom-0 left-0 w-full text-[14px] p-4 bg-black bg-opacity-50 text-white">
        <div className="flex items-start space-x-2 mb-2">
          <img
            src="/avatar.png"
            alt="dark_queen profile picture"
            className="w-6 h-6 rounded-full"
          />
          <div>
            <p className="font-bold">dark_queen</p>
            <p>
              Welcome to the live stream. If you can't sleep, stay here and
              listen for five minutes to help you fall asleep. Thank you for
              following and liking.
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Say something"
            className="flex-1 px-4 py-2 rounded-full bg-zinc-800 text-white"
          />
          <button className="text-white">😊</button>
          <button className="text-white">🎁</button>
          <button className="text-white">💖</button>
        </div>
      </div>
    </div>
  );
}
