import React from "react";
const { Consumer } = React.createContext(null);
interface Props {
  name: String;
  age: Number;
}
function Con() {
  return (
    <Consumer>
      {(props: any) => {
        console.log(props);
        return (
          <div>
            <span>姓名:{props?.name}</span>
            <span>年龄:{props?.age}</span>
          </div>
        );
      }}
    </Consumer>
  );
}

export default Con;
