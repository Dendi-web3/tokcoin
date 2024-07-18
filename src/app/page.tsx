"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import type { TapInfo } from "framer-motion";
import Image from "next/image";
import ChatRoom from "./CharRoom";
interface Bonus {
  id: string;
  x: number;
  y: number;
}

const Home = () => {
  const [bonus, setBonus] = useState<Bonus[]>([]);

  function onTap(event: Event, info: TapInfo) {
    console.log("posiotin on screen:", info.point.x, info.point.y);
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
    }, 1.5 * 1000);
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
              initial={{ opacity: 1, y: 0, x: 0 }}
              animate={{
                opacity: 0,
                y: -88,
                x: -25,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute text-3xl font-bold"
              style={{
                position: "absolute",
                left: b.x,
                top: b.y,
                pointerEvents: "none", // Prevent ripples from capturing mouse events
              }}
            >
              <div className="flex items-center justify-center">
                <Image
                  src="/heart.png"
                  alt="coin"
                  className="mr-2 rounded-full"
                  width={20}
                  height={20}
                />
                <span className="text-sm text-white">+{1}</span>
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
          // backgroundColor: "red",
          width: "100%",
          height: "calc(100vh - 104px)",
          zIndex: "50",
        }}
        onTap={onTap}
      ></motion.div>
    </div>
  );
};

export default Home;
