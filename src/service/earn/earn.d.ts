export {};

declare global {
  interface SigninItem {
    _id: string;
    day: number;
    rewardGold: number;
    __v: number;
    createdAt: string;
    updatedAt: string;
    isSignin: boolean;
    isToday: boolean;
  }

  interface SigninData {
    list: SigninItem[];
  }
}
