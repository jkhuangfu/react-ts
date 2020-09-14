import { observable, action } from "mobx";

export default class Demo1 {
  constructor() {
    this.val1 = Date.now() + "this is demo1";
  }

  @observable val1: string;

  @action.bound
  setVal() {
    this.val1 = +new Date() + "this is demo1";
  }
}
