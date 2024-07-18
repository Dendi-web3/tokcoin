/* eslint-disable @typescript-eslint/no-explicit-any */
import RequestHttp from '../request';
import useGlobalStore from '@/store/useGlobalStore';
export const apiLogin = async (
  params: LoginParams
): Promise<ApiResponse<AccessToken>> => {
  const res: ApiResponse<AccessToken> = await RequestHttp.post(
    '/api/user/login',
    { ...params }
  );
  if (res.success) {
    useGlobalStore.setState({ token: res.data.accessToken });
  } else {
    useGlobalStore.setState({ token: '' });
  }
  return res;
};

// export const apiGetUserInfo = async (): Promise<ApiResponse<UserInfo>> => {
//   const res: ApiResponse<UserInfo> = await RequestHttp.get('/api/user');
//   if (res.success) {
//     useGlobalStore.setState({ userInfo: res.data });
//   } else {
//     message.error(res.message);
//   }
//   return res;
// };

export const apiGetUserWeaponList = async (): Promise<
  ApiResponse<UserWeaponInfo.WeaponItem[]>
> => {
  const res: ApiResponse<UserWeaponInfo.WeaponItem[]> = await RequestHttp.get(
    '/api/user/weapon/list'
  );
  if (res.success) {
    useGlobalStore.setState({ userWeapons: res.data });
  }
  return res;
};

export const apiUserUpgradeWeapon = async (
  equipmentId: string
): Promise<ApiResponse<any>> => {
  const res: ApiResponse<any> = await RequestHttp.put(
    `/api/user/upgrade/weapon/${equipmentId}/sublevel`,
    { equipmentId }
  );

  return res;
};

export const apiUserNextWeapon = async (): Promise<
  ApiResponse<UserNextWeapon.WeaponData>
> => {
  const res: ApiResponse<UserNextWeapon.WeaponData> = await RequestHttp.get(
    `/api/user/next/weapon`
  );

  return res;
};

export const apiUserBuyNewWeapon = async (): Promise<ApiResponse<any>> => {
  const res: ApiResponse<any> = await RequestHttp.post(
    `/api/user/buy/new/weapon`
  );

  return res;
};

export const apiUserChangeWeapon = async (
  equipmentId: string
): Promise<ApiResponse<any>> => {
  const res: ApiResponse<any> = await RequestHttp.put(
    `/api/user/change/weapon/${equipmentId}`
  );

  return res;
};

export const apiUserReferralList = async (): Promise<
  ApiResponse<ReferralData>
> => {
  const res: ApiResponse<ReferralData> = await RequestHttp.get(
    '/api/user/referral/list'
  );
  if (res.success) {
    useGlobalStore.setState({
      referralData: res.data,
    });
  }
  return res;
};

export const apiUserTaskList = async (): Promise<ApiResponse<SocialTask[]>> => {
  const res: ApiResponse<SocialTask[]> = await RequestHttp.get(
    '/api/user/task/list'
  );
  if (res.success) {
    useGlobalStore.setState({
      taskList: res.data,
    });
  }
  return res;
};

export const apiClaimGold = async (): Promise<ApiResponse<UserInfo>> => {
  const res: ApiResponse<UserInfo> = await RequestHttp.post(
    '/api/user/withdraw/claim'
  );

  return res;
};

export const apiUpdateUserTaskState = async (
  taskId: string
): Promise<ApiResponse<any>> => {
  const res: ApiResponse<any> = await RequestHttp.put(
    `/api/user/task/${taskId}`
  );

  return res;
};

export const apiCheckUserTaskState = async (
  taskId: string
): Promise<ApiResponse<any>> => {
  const res: ApiResponse<any> = await RequestHttp.put(
    `/api/user/task/${taskId}/check`
  );

  return res;
};
