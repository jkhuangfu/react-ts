import React, { Component } from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import stores from '@/store';
import routers from '@/routes';
import 'antd/dist/antd.css';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';

import { configure } from 'mobx';
configure({ enforceActions: 'observed' }); // 开启严格模式

class App extends Component {
  state = {
    route: []
  };

  public componentWillMount() {
    const res = routers.filter(i => i.role === 1);
    this.setState(state => ({ route: res }));
  }
  render() {
    return (
      <Provider {...stores}>
        <ConfigProvider locale={zhCN}>
          <HashRouter>
            <Switch>
              {this.state.route.map((route: any, index) => (
                <Route key={index} path={route.path} exact={route.exact} component={route.render} />
              ))}
            </Switch>
          </HashRouter>
        </ConfigProvider>
      </Provider>
    );
  }
}

export default App;
