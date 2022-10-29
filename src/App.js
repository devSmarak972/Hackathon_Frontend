import logo from "./logo.svg";
import "./App.css";
import { Provider, useSelector, useDispatch } from "react-redux";
import {
  marketbuy,
  marketsell,
  limitbuy,
  limitsell,
  updateuser,
  addUser,
} from "./store/actions/count.actions";

import store from "./store";
import Portfolio from "./components/portfolio";
import Graph from "./components/graph";
import Book from "./components/book";
import Control from "./components/control";
import Price from "./components/price";

// function App() {
// const dispatch = useDispatch();
// const count = useSelector(state => state.count);

//   return (
//     <Provider store={store}>
//       <div className="App">
//         <p>Count is: {count}</p>

//         <div>
//           <button onClick={() => dispatch(addOne())}>Add 1</button>

//           <button onClick={() => dispatch(subOne())}>Decrease 1</button>

//           <button onClick={() => dispatch(addSome(10))}>Add 10</button>
//           <button onClick={() => dispatch(subSome(10))}>Decrease 10</button>

//           <button onClick={() => dispatch(reset())}>Reset count</button>
//         </div>
//       </div>
//     </Provider>
//   );
// }

function App() {
  const dispatch = useDispatch();
  const buy = useSelector(state => state.buy);
  const sell = useSelector(state => state.sell);

  return (
    <div className="App">
      <Portfolio />
      {/* <Graph /> */}
      <Book />
      <Control />
      <Price />
    </div>
  );
}

export default App;
