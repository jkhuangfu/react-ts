import axios, { AxiosRequestConfig, AxiosResponse, AxiosError, Canceler } from 'axios';
import qs from 'qs';
import { message } from 'antd';
interface requestMap {
  [x: string]: Canceler;
}

// 存放请求实例
let requestMap: requestMap[] = [];

/**
 * 创建xhr实例
 * 路径前缀
 * 超时失败时间
 */
const service = axios.create({
  timeout: 3000,
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true
});

/**
 * @desc 设置服务请求拦截器
 * 定义token请求设置
 */
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 请求头添加权限验证
    config.headers.authorization = localStorage.getItem('auth') || '';
    // post请求时转为formdata格式参数
    if (config.method === 'post') {
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

/**
 * @desc 设置服务响应拦截器
 * 截取返回状态 统一定义成功失败
 */
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const data = response.data;
    const code = data.code;
    if (code !== 200) {
      // 非正常结果
      message.warn(data.msg);
      return false;
    } else {
      // 正常结果
      return data.result;
    }
  },
  (error: AxiosError) => {
    window?.console.log(error.message);
    message.warn('服务器异常');
  }
);

/**
 * @desc 取消进行中的请求
 * @param {string} url 请求标记(此处以请求的url为例) 传递字符串`all`代表取消进行中的所有请求
 * @param {requestMap[]} requestMap 现存的所有的请求中实例
 * @returns
 */
export function stopRepeatRequest(url: string, requestMap: requestMap[]) {
  return new Promise(res => {
    requestMap.map((ele: requestMap, index: number) => {
      const key = Object.keys(ele)[0];
      if (url && url === key) {
        // 根据url进行定向取消请求
        ele[url](`取消了 ${url} 请求`);
        delete requestMap[index];
      } else if (url === 'all') {
        // 取消全部请求
        ele[key](`取消了 ${key} 请求`);
        delete requestMap[index];
      }
      return ele;
    });
    res();
  });
}

/**
 * @desc 删除已完成的请求标记
 * @param {string} url 请求标记(此处以请求的url为例)
 * @param {requestMap[]} requestMap 所有的请求实例
 */
export function deleteCompleteRequest(url: string, requestMap: requestMap[]) {
  requestMap.map((ele: requestMap, index: number) => {
    const key = Object.keys(ele)[0];
    if (url && url === key) {
      delete requestMap[index];
    } else if (url === 'all') {
      delete requestMap[index];
    }
    return ele;
  });
}

/**
 * @desc post请求方法的封装
 * @param {string} url 请求链接
 * @param {*} data 传参
 * @returns
 */
export async function POST(url: string, data: any) {
  await stopRepeatRequest(url, requestMap);
  const result = await service.post(url, data, {
    cancelToken: new axios.CancelToken(c => {
      requestMap.push({ [url]: c });
      requestMap = requestMap.filter(v => v);
    })
  });
  result && deleteCompleteRequest(url, requestMap);
  return result;
}
