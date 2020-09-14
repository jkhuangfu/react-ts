import React from "react";
import { Spin } from "antd";
import Loading from "./loading.module.styl";
function LoadingComponent() {
  return (
    <React.Fragment>
      <div className={Loading["box"]}>
        <div className={Loading["box_spin"]}>
          <Spin tip="Loading..." size="large" />
        </div>
      </div>
    </React.Fragment>
  );
}
export default LoadingComponent;
