/* eslint-disable @typescript-eslint/no-explicit-any */
import RequestHttp from '../request';
import useGlobalStore from '@/store/useGlobalStore';
export const apiSigninList = async (): Promise<ApiResponse<SigninData>> => {
  const res: ApiResponse<SigninData> =
    await RequestHttp.get('/api/signin/list');
  if (res.success) {
    useGlobalStore.setState({
      signinData: res.data,
    });
  }
  return res;
};

export const apiSignin = async (): Promise<ApiResponse<any>> => {
  const res: ApiResponse<any> = await RequestHttp.post('/api/signin');

  return res;
};
