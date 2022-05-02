import { useCallback, useState } from 'react';
import './App.css';

function App() {
  const [list, setList] = useState([{ id: 0, desc: '第0个元素' }]);
  const onClick = useCallback(() => {
    const len = list.length;
    setList([...list, { id: len, desc: `第${len}个元素` }])
  }, [list]);

  return (
    <div className="App">
      <p>列表<button onClick={onClick}>add</button></p>
      <ul>
        {
          list.map((item) => {
            return (
              <div key={item.id}>{ item.desc }</div>
            )
          })
        }
      </ul>
    </div>
  );
}

export default App;
