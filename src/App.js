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
import History from "./components/history";
import Notifications from "./components/notifications";
import Profile from "./components/profile";

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
      <div className="d-flex">
        <div style={{width: 1500, marginLeft: 10}}>
          <Graph />
        </div>
        <div style={{width: 1500, options: {maintainAspectRatio: false}, height: 400}}>
          <Book />
        </div>
        <Notifications />
      </div>
      <div className="d-flex">
        <div style={{width: 550, marginLeft: 30, marginTop: 160}}>
          <Portfolio />
        </div>
        <div style={{marginLeft: 60, marginRight: 60, marginTop: 160}}>
          <Price />
        </div>
        <div style={{marginRight: 20}}>
          <Control />
        </div>
      </div>
      <div>
        <div style={{width: 1000, marginLeft: 220, marginBottom: 20}}>
          <History />
        </div>
        <div style={{width: 700, marginBottom: 20, marginLeft: 350}}>
          <Profile/>
        </div>
      </div>
    </div>
  );
}

export default App;
