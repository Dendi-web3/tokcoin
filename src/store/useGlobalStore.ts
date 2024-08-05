/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @file 全局状态，自动同步到 storage
 */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@telegram-apps/sdk-react";
export interface GlobalStoreProps {
  token: string;
  tgUser: User | undefined;
  userInfo: UserInfo | undefined;
  userWeapons: UserWeaponInfo.WeaponItem[] | undefined;
  userCurrentWeaponIndex: number;
  userStreamerData: StreamerData[] | undefined;
  signinData: SigninData | undefined;
  referralData: ReferralData | undefined;
  taskList: SocialTask[] | undefined;
  playedOnce: boolean;
  spining: boolean;
  viewHistories: ViewHistory[] | undefined;
  currentIndex: number;
}

const useGlobalStore = create<GlobalStoreProps>()((set, get) => ({
  token: "",
  tgUser: undefined,
  userInfo: undefined,
  userWeapons: undefined,
  userCurrentWeaponIndex: 0,
  userSocketData: undefined,
  userStreamerData: undefined,
  signinData: undefined,
  referralData: undefined,
  taskList: undefined,
  playedOnce: false,
  spining: false,
  viewHistories: undefined,
  currentIndex: 0,
}));

export default useGlobalStore;
