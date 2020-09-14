import React from 'react';
import { Redirect } from 'react-router-dom';
export default () => {
  function test() {
    console.log(1111);
  }

  function r() {
    window.location.href = '/';
  }

  return (
    <div>
      <button onClick={test}>111111</button>
      <button onClick={r}>回去</button>
    </div>
  );
};
