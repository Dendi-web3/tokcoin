/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { type PropsWithChildren, useEffect, useMemo } from "react";
import {
  SDKProvider,
  useLaunchParams,
  useMiniApp,
  useThemeParams,
  useViewport,
  bindMiniAppCSSVars,
  bindThemeParamsCSSVars,
  bindViewportCSSVars,
  useInitData,
  type User,
} from "@tma.js/sdk-react";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { AppRoot } from "@telegram-apps/telegram-ui";

import { ErrorBoundary } from "@/components/root/ErrorBoundary";
import { ErrorPage } from "@/components/root/ErrorPage";
import { useTelegramMock } from "@/hooks/useTelegramMock";
import { useDidMount } from "@/hooks/useDidMount";
import useGlobalStore from "@/store/useGlobalStore";
import { apiLogin } from "@/service/User";
import "./styles.css";
import { useSocket } from "@/context/SocketContext";

function App(props: PropsWithChildren) {
  const lp = useLaunchParams();
  const miniApp = useMiniApp();
  const themeParams = useThemeParams();
  const viewport = useViewport();
  const initData = useInitData();
  const socket = useSocket();
  const user = useMemo<User | undefined>(() => {
    return initData && initData.user ? initData.user : undefined;
  }, [initData]);

  const token = useGlobalStore((state) => state.token);
  const login = async () => {
    if (token.length > 0) return;
    const loginResult = await apiLogin({
      telegramId: user?.id + "",
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      languageCode: user?.languageCode ?? "",
      isVip: user?.isPremium ?? false,
      referralCode: lp.startParam,
      init: lp.initDataRaw,
    });
  };

  let prevUser: User | undefined = undefined;

  useEffect(() => {
    if (user !== prevUser) {
      if (!user) return;
      useGlobalStore.setState({ tgUser: user });
      login();
      prevUser = user; // 更新 prevUser 以记录当前的 user 值
    }
  }, [user]);

  useEffect(() => {
    const getHomeData = () => {
      socket?.emit("homeData", (data: UserSocketData) => {
        useGlobalStore.setState({ userSocketData: data });
      });
    };
    // 设置一个定时器，每秒调用一次
    const intervalId = setInterval(() => {
      getHomeData();
    }, 1000);
    getHomeData();
    return () => clearInterval(intervalId);
  }, [socket]);

  useEffect(() => {
    return bindMiniAppCSSVars(miniApp, themeParams);
  }, [miniApp, themeParams]);

  useEffect(() => {
    return bindThemeParamsCSSVars(themeParams);
  }, [themeParams]);

  useEffect(() => {
    return viewport && bindViewportCSSVars(viewport);
  }, [viewport]);

  return (
    <AppRoot
      appearance={miniApp.isDark ? "dark" : "light"}
      platform={["macos", "ios"].includes(lp.platform) ? "ios" : "base"}
    >
      {props.children}
    </AppRoot>
  );
}

function RootInner({ children }: PropsWithChildren) {
  // Mock Telegram environment in development mode if needed.
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTelegramMock();
  }

  const debug = useLaunchParams().startParam === "debug";

  const manifestUrl = useMemo(() => {
    return new URL("tonconnect-manifest.json", window.location.href).toString();
  }, []);

  // Enable debug mode to see all the methods sent and events received.
  useEffect(() => {
    if (debug) {
      import("eruda").then((lib) => lib.default.init());
    }
  }, [debug]);

  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <SDKProvider acceptCustomStyles debug={debug}>
        <App>{children}</App>
      </SDKProvider>
    </TonConnectUIProvider>
  );
}

export function Root(props: PropsWithChildren) {
  // Unfortunately, Telegram Mini Apps does not allow us to use all features of the Server Side
  // Rendering. That's why we are showing loader on the server side.
  const didMount = useDidMount();

  return didMount ? (
    <ErrorBoundary fallback={ErrorPage}>
      <RootInner {...props} />
    </ErrorBoundary>
  ) : (
    <div className="root__loading">Loading</div>
  );
}
