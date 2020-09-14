import Loadable from 'react-loadable';
import Loading from '@/components/loading/index';
const Home = Loadable({
  loader: () => import(/* webpackChunkName: "test" */ '@/pages/login/index'),
  loading: Loading
});
const Tu = Loadable({
  loader: () => import(/* webpackChunkName: "tes5t" */ '@/pages/test'),
  loading: Loading
});

const Store = Loadable({
  loader: () => import(/* webpackChunkName: "tes5t" */ '@/components/mobxTest'),
  loading: Loading
});

export default [
  {
    path: '/',
    exact: true,
    render: Home,
    role: 1
  },
  {
    path: '/l',
    exact: true,
    render: Store,
    role: 1
  },
  {
    path: '/test',
    exact: true,
    render: Tu,
    role: 1
  }
];
