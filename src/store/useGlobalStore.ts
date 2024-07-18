/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @file 全局状态，自动同步到 storage
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@tma.js/sdk-react';

export interface GlobalStoreProps {
  token: string;
  tgUser: User | undefined;
  // userInfo: UserInfo | undefined;
  userWeapons: UserWeaponInfo.WeaponItem[] | undefined;
  userCurrentWeaponIndex: number;
  userSocketData: UserSocketData | undefined;
  signinData: SigninData | undefined;
  referralData: ReferralData | undefined;
  taskList: SocialTask[] | undefined;
  hideNav: boolean;
}
const useGlobalStore = create<GlobalStoreProps>()((set, get) => ({
  token: '',
  tgUser: undefined,
  // userInfo: undefined,
  userWeapons: undefined,
  userCurrentWeaponIndex: 0,
  userSocketData: undefined,
  signinData: undefined,
  referralData: undefined,
  taskList: undefined,
  hideNav: false,
}));

export default useGlobalStore;
