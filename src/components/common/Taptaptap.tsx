import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { useSocket } from "@/context/SocketContext";
interface Bonus {
  id: string;
  x: number;
  y: number;
}
// interface TaptaptapProps {
//   height?: number;
// }
export default function Taptaptap() {
  const bubbleW = 60;
  const [bonus, setBonus] = useState<Bonus[]>([]);
  const socket = useSocket();
  const onTap: React.MouseEventHandler<HTMLDivElement> = (event) => {
    addBonus(event.clientX - bubbleW / 2, event.clientY - bubbleW / 2);
    socket?.emit("inClick");
    if (navigator?.vibrate) {
      navigator.vibrate(200);
    } else {
      window.Telegram.WebApp.HapticFeedback.impactOccurred("heavy");
    }
  };

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

  return (
    <div
      className="noselect bg-[#ffffff00]"
      style={{
        zIndex: 70,
        position: "absolute",
        width: "100vw",
        height: window.innerHeight,
        overflow: "hidden",
      }}
      onClick={onTap}
    >
      <AnimatePresence>
        {bonus.map((b) => (
          <motion.div
            key={b.id}
            initial={{
              opacity: 1,
              y: 0,
              x: 0,
            }}
            animate={{
              rotate: [14, -6, 9],
              scale: [0, 1, 1, 0],
              y: [0, -203],
              opacity: [1, 0], // Animate opacity from 1 to 0
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
            }}
          >
            <div
              className="flex items-center justify-center noselect"
              style={{
                pointerEvents: "none", // 禁用圆圈响应点击事件
              }}
            >
              <Image
                src="/heart3.png"
                alt="coin"
                className="rounded-full noselect"
                width={bubbleW}
                height={bubbleW}
                style={{
                  pointerEvents: "none", // 禁用圆圈响应点击事件
                }}
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
