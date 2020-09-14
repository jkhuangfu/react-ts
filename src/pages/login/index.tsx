import React from "react";
import From from "@/components/login/form";
import LoginStyle from "./index.module.styl";

export default () => {
  return (
    <div className={LoginStyle["login"]}>
      <From />
    </div>
  );
};
