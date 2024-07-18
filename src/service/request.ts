/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import useGlobalStore from '@/store/useGlobalStore';

// 请求响应参数（不包含data）
export interface Result {
  code: string | number;
  message: string;
}

// 请求响应参数（包含data）
export interface ResultData<T = any> extends Result {
  data: T;
}

export enum ResultEnum {
  SUCCESS = 200,
  ERROR = 500,
  OVERDUE = 401,
  TIMEOUT = 30000,
  TYPE = 'success',
}

const config = {
  // 默认地址请求地址，可在 .env.** 文件中修改
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL ?? 'https://tongame-service-kosvlhf7ca-ew.a.run.app'}`,
  // 设置超时时间
  timeout: ResultEnum.TIMEOUT as number,
  // 跨域时候允许携带凭证
  withCredentials: false,
};

class RequestHttp {
  showMsg: boolean;
  service: AxiosInstance;
  public constructor(config: AxiosRequestConfig<ResultData<any>>) {
    // instantiation
    this.service = axios.create(config);
    this.showMsg = true;
    /**
     * @description 请求拦截器
     * 客户端发送请求 -> [请求拦截器] -> 服务器
     * token校验(JWT) : 接受服务器返回的 token,存储到 vuex/pinia/本地储存当中
     */
    this.service.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = useGlobalStore.getState().token;
        if (config.headers && typeof config.headers.set === 'function') {
          config.headers.set('Authorization', 'Bearer ' + token);
        }
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    /**
     * @description 响应拦截器
     *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
     */
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data } = response;

        // 成功请求（在页面上除非特殊情况，否则不用处理失败逻辑）
        return data;
      },
      async (error: AxiosError) => {
        const { response } = error;
        const { data } = response as AxiosResponse;
        // 登陆失效
        if (response?.status == ResultEnum.ERROR) {
          // const r: AxiosResponse<ApiResponse<any>, any> | undefined =
          //   response as AxiosResponse<ApiResponse<any>, any>;
          if (this.showMsg) {
            this.showMsg = false;
            setTimeout(() => {
              this.showMsg = true;
            }, 3000);
          }
          return Promise.reject(data);
        }

        // 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理:可以跳转到断网页面
        return Promise.resolve(data);
      }
    );
  }

  /**
   * @description 常用请求方法封装
   */
  get<T>(url: string, params?: object, _object = {}): Promise<T> {
    return this.service.get(url, { params, ..._object });
  }
  post<T>(url: string, params?: object | string, _object = {}): Promise<T> {
    return this.service.post(url, params, _object);
  }
  put<T>(url: string, params?: object, _object = {}): Promise<T> {
    return this.service.put(url, params, _object);
  }
  delete<T>(url: string, params?: any, _object = {}): Promise<T> {
    return this.service.delete(url, { params, ..._object });
  }
  download(url: string, params?: object, _object = {}): Promise<BlobPart> {
    return this.service.post(url, params, { ..._object, responseType: 'blob' });
  }
}

export default new RequestHttp({
  ...config,
});
