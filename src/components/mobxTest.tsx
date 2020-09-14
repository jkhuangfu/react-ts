import React from 'react';
import { observer, inject } from 'mobx-react';
import HOC from './hoc';
import Con from './createContext';

// import { button } from "antd";
import './test.styl';
import DEMO1 from './demo1';

interface Greeting {
  [key: string]: any;
}

@HOC('111')
@inject(...['demo1', 'demo2'])
@observer
class Hello extends React.Component<Greeting> {
  state = {
    count: 0,
    text: 111
  };
  private setCount() {
    this.setState({
      count: this.state.count + 1
    });
  }

  private test() {
    this.props.demo1.setVal();
  }

  private test2() {
    this.props.demo2.setVal();
  }

  public componentDidMount() {
    console.log(111, this.props);
  }

  public render() {
    const { Provider } = React.createContext({ name: 'name1', age: 'age1' });
    console.log(Provider);
    return (
      <>
        <h1>{this.props.demo1.val1}</h1>
        <h1>{this.props.demo2.val2}</h1>
        <p>
          你点击了Hooks {this.state.count} 次 {this.state.text}
        </p>
        <h3>{this.props.demo2.test}</h3>
        <button
          onClick={() => {
            this.setCount();
          }}
        >
          {this.props.name}
        </button>
        <button
          onClick={() => {
            this.test();
          }}
        >
          mobx测试1
        </button>
        <button
          onClick={() => {
            this.test2();
          }}
        >
          mobx测试2
        </button>
        <hr />
        <DEMO1 />

        <Provider value={{ name: 'name', age: 'age' }}>
          <Con />
        </Provider>
      </>
    );
  }
}

// const HelloHooks = (props: Greeting) => {
//   const [count, setCount] = useState(0); // 设了初值，所以不用定义类型
//   const [text, setText] = useState<string | null>(null);

//   useEffect(() => {
//     count > 5 && setText("休息一下");
//   }, [count]); // 第二个参数的作用是，只有当count改变的时候，函数内的逻辑才会执行。

//   return (
//     <>
//       <p>
//         你点击了Hooks {count} 次 {text}
//       </p>
//       <button
//         onClick={() => {
//           setCount(count + 1);
//         }}
//       >
//         {props.name}
//       </button>
//     </>
//   );
// };

// export default HelloHooks;

export default Hello;
