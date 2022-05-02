import React, { useCallback } from 'react';

function App(props) {
  const clickHandler = useCallback(() => {
    alert('点击事件')
  }, []);

  return (
    <div>
      <h1>hello react isomorphism</h1>
      <button onClick={clickHandler}>点我</button>
    </div>
  );
}

export default App;
