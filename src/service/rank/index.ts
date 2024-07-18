/* eslint-disable @typescript-eslint/no-explicit-any */
import RequestHttp from '../request';

export const apiRankList = async (
  rankId?: string
): Promise<ApiResponse<RankData>> => {
  const res: ApiResponse<RankData> = await RequestHttp.get(
    '/api/user/rank/list',
    { rankId }
  );

  return res;
};
