export {};

declare global {
  interface Rank {
    _id: string;
    role: string;
    profitPerHour: number;
    threshold?: number;
    __v?: number;
  }

  interface Equipment {
    _id: string;
    userId: string;
    weaponId: string;
    subLevelId: string;
  }

  interface UserInfo {
    _id: string;
    telegramId: string;
    firstName: string;
    lastName: string;
    languageCode: string;
    gold: number;
    historicalGold: number;
    rank: Rank;
    claimAt: string;
    isVip: boolean;
    equipment: Equipment;
    createdAt: string;
    updatedAt: string;
    __v: number;
    point: number;
    follow: boolean;
  }

  interface LoginParams {
    telegramId: string;
    firstName: string;
    lastName: string;
    languageCode: string;
    isVip: boolean;
    referralCode?: string;
    init?: string;
  }

  interface AccessToken {
    accessToken: string;
  }
  interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
  }
  /**
 * {
      userRank: {
        _id: '6683c665001a0f89e9ffa056',
        role: 'Bronze',
        profitPerHour: 100,
      },
      nextProgress: 3.03,
      goldToNextRank: 24241.38888888889,
      claim: 2.72,
      gold: 758.611111111111,
      claimCountdown":{"minutes":56,"seconds":3}
    },
 */
  interface FormatTime {
    minutes: number;
    seconds: number;
  }

  interface UserRankData {
    point: number;
    rank: number;
    username: string;
    isMe: boolean;
  }

  interface UserInGameData {
    duration: number;
    initDurability: number;
    durability: number;
    gold: number;
    goldEarn: number;
    progress: number;
    gameover: boolean;
    dogs: number;
  }

  namespace UserWeaponInfo {
    export interface Weapon {
      weaponId: string;
      name: string;
      level: number;
    }

    export interface SubLevel {
      level: number;
      subLevelId: string;
      durability: number;
      subUpgradeExpend: number;
    }

    export interface WeaponItem {
      equipmentId: string;
      weapon: Weapon;
      subLevel: SubLevel;
      maxLevel: boolean;
      nextLevel: SubLevel;
    }
  }

  namespace UserNextWeapon {
    interface SubLevel {
      level: number;
      grab: number;
      durability: number;
      subUpgradeExpend: number;
      maxLevel: boolean;
      _id: string;
    }

    interface Weapon {
      _id: string;
      name: string;
      level: number;
      subLevel: SubLevel[];
      default: boolean;
      price: number;
      __v: number;
      createdAt: string;
      updatedAt: string;
    }

    interface WeaponData {
      newest: boolean;
      nextWeapon: Weapon;
    }
  }

  interface ReferralDetail {
    _id: string;
    referrerGold: number;
    userName: string;
  }

  interface ReferralData {
    totalUsers: number;
    totalReferrerGolds: number;
    details: ReferralDetail[];
  }

  interface SocialTask {
    _id: string;
    index: number;
    title: string;
    gold: number;
    type: "Telegram" | "Twitter" | "Discord" | "Calendar"; // 使用联合类型来确保类型值的安全性
    link: string;
    __v: number;
    createdAt: string;
    updatedAt: string;
    user?: {
      taskId: string;
      date: string;
      isFinish: boolean;
    };
  }
}
