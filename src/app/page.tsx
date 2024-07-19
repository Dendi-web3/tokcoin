"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import type { TapInfo } from "framer-motion";
import Image from "next/image";
import ChatRoom from "./CharRoom";
import { useSocket } from "@/context/SocketContext";
interface Bonus {
  id: string;
  x: number;
  y: number;
}

const Home = () => {
  const [bonus, setBonus] = useState<Bonus[]>([]);
  const socket = useSocket();

  function onTap(event: Event, info: TapInfo) {
    event.preventDefault();
    console.log("posiotin on screen:", info.point.x, info.point.y);
    socket?.emit("inClick", (data: UserRankData[]) => {
      console.log("inClick", data);
    });
    if (navigator?.vibrate) {
      navigator.vibrate(200);
    } else {
      window.Telegram.WebApp.HapticFeedback.impactOccurred("heavy");
    }
    addBonus(info.point.x - 15, info.point.y - 15 - 104);
  }

  const addBonus = (x: number, y: number) => {
    const newBonus: Bonus = {
      id: uuidv4(),
      x: x,
      y: y,
    };

    setBonus([...bonus, newBonus]);

    setTimeout(() => {
      setBonus((prevBonus) =>
        prevBonus.filter((bonus) => bonus.id !== newBonus.id)
      );
    }, 2 * 1000);
  };
  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault(); // 阻止鼠标按下事件
  };

  const handleMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault(); // 阻止鼠标释放事件
  };

  return (
    <div className="relative min-h-[100vh] w-full bg-[#ffffff00]">
      <ChatRoom />
      <div
        className="noselect "
        style={{
          zIndex: 70,
          pointerEvents: "none", // 禁用圆圈响应点击事件
          position: "absolute",
          top: "104px",
          width: "100vw",
          height: "calc(100vh - 104px)",
          overflow: "hidden",
        }}
      >
        <AnimatePresence>
          {bonus.map((b) => (
            <motion.div
              key={b.id}
              initial={{
                opacity: 1,
                y: 0,
                x: 0,
                pointerEvents: "none", // 禁用圆圈响应点击事件
                userSelect: "none",
              }}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              animate={{
                rotate: [14, -6, 9],
                scale: [0, 1, 1, 0],
                y: [0, -203],
                opacity: [1, 0], // Animate opacity from 1 to 0
                pointerEvents: "none", // Prevent ripples from capturing mouse events
                userSelect: "none",
              }}
              transition={{
                duration: 2,
                repeat: 0, // No repeating, only a single animation sequence
                ease: "easeInOut",
              }}
              exit={{ opacity: 0 }}
              className="absolute noselect"
              style={{
                position: "absolute",
                left: b.x,
                top: b.y,
                pointerEvents: "none", // Prevent ripples from capturing mouse events
                zIndex: 10,
              }}
            >
              <div
                className="flex items-center justify-center noselect"
                style={{
                  pointerEvents: "none", // 禁用圆圈响应点击事件
                  userSelect: "none",
                }}
              >
                <img
                  src="/heart3.png"
                  alt="coin"
                  className="rounded-full noselect w-[40px] h-[40px]"
                  width={40}
                  height={40}
                  style={{
                    pointerEvents: "none", // 禁用圆圈响应点击事件
                    userSelect: "none",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <motion.div
        className="noselect"
        style={{
          position: "absolute",
          top: "104px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "calc(100vh - 104px)",
          zIndex: "50",
          userSelect: "none",
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTap={onTap}
      ></motion.div>
    </div>
  );
};

export default Home;
