import logo from './logo.svg';
import './App.css';
import React from "react";
import ErrorB from "./ErrorB"
const TodoList = React.lazy(()=> import("./TodoList"));


function App() {
  // const contextType = contextBgc;
  return (
    <div className="App">
      <h1>Todo List</h1>
      <React.Suspense fallback = {<p>Loading...</p>}>
        <ErrorB>
          {/* <contextBgc.Provider> */}
            <TodoList />
          {/* </contextBgc.Provider> */}
        </ErrorB>
      </React.Suspense>
      <footer>
        <b>Copy Right</b>
      </footer>
    </div>
  );
}

export default App;
