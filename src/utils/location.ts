import { createHashHistory } from 'history';
// 路由跳转方法
export default (pathName: string, isReplace?: boolean) => {
  const history = createHashHistory();
  if (isReplace) {
    history.replace(pathName);
  } else {
    history.push(pathName);
  }
  // 不写go页面内容不变换？？？
  history.go(0);
};
