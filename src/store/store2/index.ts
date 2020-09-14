import { observable, action, computed } from "mobx";

export default class Demo2 {
  constructor() {
    this.val2 = Date.now() + "this is demo2---";
  }
  @observable val2: string;
  @computed
  get test() {
    return Date.now();
  }

  @action
  setVal() {
    this.val2 = +new Date() + "this is demo2";
  }
}
