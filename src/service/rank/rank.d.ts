export {};

declare global {
  interface RankListItem {
    _id: string;
    username: string;
    gold: number;
    rank: number;
    isMe: boolean;
  }

  interface RankData {
    previousRankId: string | null;
    nextRankId: string | null;
    currentRank: Rank;
    list: RankListItem[];
  }
}
