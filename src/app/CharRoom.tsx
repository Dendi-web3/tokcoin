export default function ChatRoom() {
  return (
    <div
      className="fixed w-full h-screen bg-cover bg-center z-10"
      style={{
        backgroundImage: "url('https://placehold.co/1024x575')",
      }}
    >
      <div className="absolute top-0 left-0 w-full flex items-center justify-between p-4 bg-black bg-opacity-50 text-white">
        <div className="flex items-center space-x-2">
          <img
            src="https://placehold.co/40x40"
            alt="dark_queen profile picture"
            className="w-10 h-10 rounded-full"
          />
          <span className="font-bold">dark_queen</span>
          <button className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-2 py-1 rounded-full">
            Follow
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex -space-x-2">
            <img
              src="https://placehold.co/30x30"
              alt="user1"
              className="w-8 h-8 rounded-full border-2 border-white"
            />
            <img
              src="https://placehold.co/30x30"
              alt="user2"
              className="w-8 h-8 rounded-full border-2 border-white"
            />
            <img
              src="https://placehold.co/30x30"
              alt="user3"
              className="w-8 h-8 rounded-full border-2 border-white"
            />
          </div>
          <span>25</span>
          <button className="text-white">✖️</button>
        </div>
      </div>

      <div className="absolute top-16 left-4 bg-zinc-800 bg-opacity-50 text-white px-2 py-1 rounded-full">
        <span>🎵 Physical</span>
      </div>

      <div className="absolute bottom-1/2 left-4 bg-black bg-opacity-50 text-white p-4 rounded-lg">
        <p>
          <span className="font-bold">dark_queen</span>
        </p>
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

      <div className="absolute bottom-1/3 left-4 bg-pink-500 bg-opacity-75 text-white px-4 py-2 rounded-full">
        <span className="font-bold">Joe</span> just joined the room
      </div>

      <div className="absolute bottom-0 left-0 w-full p-4 bg-black bg-opacity-50 text-white">
        <div className="flex items-start space-x-2 mb-2">
          <img
            src="https://placehold.co/40x40"
            alt="dark_queen profile picture"
            className="w-10 h-10 rounded-full"
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
