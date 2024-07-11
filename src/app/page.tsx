"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import type { TapInfo } from "framer-motion";
import Image from "next/image";
interface Bonus {
  id: string;
  x: number;
  y: number;
}

const Home = () => {
  const [bonus, setBonus] = useState<Bonus[]>([]);
  const [ripples, setRipples] = useState<Bonus[]>([]);
  const [backBubbles, setBackBubbles] = useState<Bonus[]>([]);

  function onTap(event: Event, info: TapInfo) {
    console.log("posiotin on screen:", info.point.x, info.point.y);
    if (navigator?.vibrate) {
      navigator.vibrate(200);
    } else {
      // window.Telegram.WebApp.HapticFeedback.impactOccurred("heavy");
    }
    addBonus();
    addRipples(info.point.x - 15, info.point.y - 15);
  }

  const addRipples = (x: number, y: number) => {
    const newRipple = {
      x: x,
      y: y,
      id: uuidv4(),
    };
    setRipples((oldRipples) => [...oldRipples, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((oldRipples) =>
        oldRipples.filter((ripple) => ripple.id !== newRipple.id)
      );
    }, 600); // Duration should match the animation duration
  };

  const addBonus = () => {
    const newBonus: Bonus = {
      id: uuidv4(),
      x: 280,
      y: 60,
    };

    setBonus([...bonus, newBonus]);

    setTimeout(() => {
      setBonus((prevBonus) =>
        prevBonus.filter((bonus) => bonus.id !== newBonus.id)
      );
    }, 1.5 * 1000);
  };

  useEffect(() => {
    // Function to generate a new ripple
    const addBubble = () => {
      // Fixed coordinates (center of the container)
      const x = window.innerWidth / 2;
      const y = window.innerHeight / 2;

      const newBubble = { x, y, id: uuidv4() };

      // Add the new ripple to the state
      setBackBubbles((prevBubbles) => [...prevBubbles, newBubble]);

      // Remove the ripple after 2400ms (duration * 2)
      setTimeout(() => {
        setBackBubbles((prevBubbles) =>
          prevBubbles.filter((bubble) => bubble.id !== newBubble.id)
        );
      }, 2400);
    };

    // Create an interval to add ripples every 1200ms
    const interval = setInterval(addBubble, 1200);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-full w-full bg-[#ffffff00] pt-[40px]">
      <div
        style={{
          position: "absolute",
          overflow: "hidden",
          width: "100vw",
          height: "100vh",
          zIndex: 40,
          pointerEvents: "none", // 禁用圆圈响应点击事件
        }}
      >
        {backBubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            initial={{ opacity: 1, scale: 0 }}
            animate={{ opacity: 0, scale: 1.6 }} // Increase scale to expand radius
            transition={{ duration: 1.6, ease: "linear" }} // Increase duration for a larger ripple
            style={{
              position: "absolute",
              width: "200px", // Increase initial size for larger ripples
              height: "200px", // Increase initial size for larger ripples
              top: bubble.y - 100, // Adjust the ripple position for larger size
              left: bubble.x - 100, // Adjust the ripple position for larger size
              background: "rgba(255, 255, 255, 0.3)",
              borderRadius: "50%",
              pointerEvents: "none", // Prevent ripples from capturing mouse events
            }}
          />
        ))}
      </div>

      <div
        className="noselect absolute left-1/2 top-[248px] h-[85px] w-[343px] -translate-x-1/2 transform"
        style={{
          zIndex: 70,
          pointerEvents: "none", // 禁用圆圈响应点击事件
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

      <div className="noselect absolute mt-[200px] flex w-full items-center justify-center">
        <motion.div
          className="noselect"
          whileTap={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          style={{
            // backgroundImage: `url("/catch/enemy${round + 1}.png")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: "red",
            width: "256px",
            height: "256px",
            zIndex: "50",
          }}
          onTap={onTap}
        ></motion.div>
      </div>

      <div
        style={{
          position: "fixed",
          top: "0px",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          zIndex: 100,
          pointerEvents: "none",
        }}
      >
        <AnimatePresence>
          {ripples.map((ripple) => (
            <React.Fragment key={ripple.id}>
              <motion.div
                key={ripple.id}
                initial={{ opacity: 1, scale: 0 }}
                animate={{ opacity: 0, scale: 5 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  left: ripple.x,
                  top: ripple.y,
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  transform: "translate(-50%, -50%)",
                  border: "0.1px solid white",
                  pointerEvents: "none", // 禁用圆圈响应点击事件
                }}
              />
            </React.Fragment>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Home;
