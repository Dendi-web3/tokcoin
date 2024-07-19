// src/context/SocketContext.tsx
"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import useGlobalStore from "@/store/useGlobalStore";

// 创建一个 Context 来存储 Socket 实例
const SocketContext = createContext<Socket | null>(null);

// 创建一个自定义 Hook 来访问 Socket Context
export const useSocket = () => {
  return useContext(SocketContext);
};

// 创建一个 Provider 组件来初始化 Socket.IO 连接，并将 Socket 实例提供给应用中的其他组件
export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const token = useGlobalStore((state) => state.token);

  useEffect(() => {
    if (token.length <= 0) return;
    const socketInstance = io(
      `${process.env.NEXT_PUBLIC_SERVER_URL ?? "https://livegame-service-kosvlhf7ca-ew.a.run.app"}`,
      {
        transports: ["websocket"],
        autoConnect: false,
        auth: {
          token: "Bearer " + token,
        },
      }
    );

    socketInstance.connect();
    socketInstance.on("connect", () => {
      console.log("socket connect", socketInstance);
      setSocket(socketInstance);
    });

    socketInstance.on("disconnect", () => {
      console.error("socket disconnect");
      setSocket(null);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [token]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
