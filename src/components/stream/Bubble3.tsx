import { ComponentType } from 'react';
import { motion } from 'framer-motion';

// 👇 These are你的控制 👇

const repeat = Infinity; // repeat amount, "Infinity" or a number value

export function Bubble3({ children, ...props }: any): JSX.Element {
  return (
    <motion.div
      {...props}
      style={{
        display: 'flex', // 使用 Flexbox 布局
        flexDirection: 'row', // 子元素水平排列
        alignItems: 'center', // 子元素垂直居中
        overflow: 'visible',
        gap: '5px',
        ...props.style, // 允许传入其他样式
      }}
      animate={{
        x: ["100%", "-100%"], // Horizontal movement to 0% (left) and hold
        opacity: [0, 1, 1, 0, 0], // Opacity transitions with hold and fade out
      }}
      transition={{
          duration: 4.5, // Total duration of the animation cycle
          repeat: repeat,
          ease: "easeOut", // Easing for the entire animation
          times: [0, 0.044, 0.667, 0.711, 1], // Keyframe timings
      }}
    >
      {children}
    </motion.div>
  );
}