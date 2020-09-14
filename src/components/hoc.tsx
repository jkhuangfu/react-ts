import React from "react";

export default (props: String) => (Component: React.ComponentType): any =>
  class extends React.Component {
    render() {
      return (
        <React.Fragment>
          <div>{props}</div>
          <Component {...this.props} />
        </React.Fragment>
      );
    }
  };
