import React, { useState, useEffect, useRef } from "react";
const Demo: React.FC = () => {
  const [count, setCount] = useState(0);
  const [positions, setPositions] = useState({ x: 0, y: 0 });
  let countRef = useRef(count);

  useEffect(() => {
    //useEffect会在组件每次渲染的时候，都会被调用
    document.title = `点击了${count}次`;
  });

  useEffect(() => {
    console.log(Date.now());
    // console.log("add effect", positions.x); //执行顺序2:add effect 0;//执行顺序6:add effect 102
    // const updateMouse = (e: MouseEvent) => {
    //   console.log("inner"); //执行顺序3
    //   setPositions({ x: e.clientX, y: e.clientY });
    // };
    // document.addEventListener("click", updateMouse);
    // return () => {
    //   //如果不加return函数中卸载功能，每次渲染函数组件的时候，都会执行useEffect
    //   //导致注册很多个 监听事件，
    //   console.log("remove effect", positions.x); //执行顺序5:remove effect 0
    //   document.removeEventListener("click", updateMouse);
    // };
  }, [count]);

  useEffect(() => {
    console.log(111);
  }, []);

  // const handleAlertClick = () => {
  //   setTimeout(() => {
  //     alert("you clicked on " + countRef.current);
  //   }, 3000);
  // };
  function handleAlertClick() {
    setTimeout(() => {
      alert("you clicked on " + countRef.current); //改动了这里，以current获取值
    }, 3000);
  }

  return (
    <>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        点击{count}次
      </button>
      <button onClick={handleAlertClick}>弹窗</button>
    </>
  );
};

export default Demo;
