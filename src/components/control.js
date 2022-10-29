import React from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Provider, useSelector, useDispatch } from "react-redux";
import {
  marketbuy,
  marketsell,
  limitbuy,
  limitsell,
  updateuser,
  addUser,
} from "../store/actions/count.actions";
import store from "../store";
import axios from "axios";
const Control = () => {
  const dispatch = useDispatch();
  const buy = useSelector(state => state.buy);
  const sell = useSelector(state => state.sell);
  const users = useSelector(state => state.users);

  function createOrder({ buy, user_id, market, quantity, price }) {
    var body = {
      // user,quantity,buy,market,price
      user: parseInt(user_id),
      quantity: quantity,
      buy: buy,
      market: market,
      price: price,
    };
    // console.log(body.user, typeof body.user);

    axios({
      method: "POST",
      url: "http://127.0.0.1:8000/api/order",
      data: body,
    })
      .then(response => {
        const order = response.data;
        console.log("success in control", order);
        if (order.market) {
          if (order.buy) dispatch(marketbuy(order.quantity, order.user));
          else dispatch(marketsell(order.quantity, order.user));
        } else {
          if (order.buy)
            dispatch(limitbuy(order.quantity, order.price, order.user));
          else dispatch(limitsell(order.quantity, order.price, order.user));
        }
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const data = {
      buy: event.target[0].value === "buy" ? true : false,
      user_id: event.target[1].value,
      market: event.target[2].value == "market" ? true : false,
      quantity: event.target[3].value,
      price: event.target[4].value == "" ? -1 : event.target[4].value,
    };
    createOrder(data);
  }
  console.log("users in control", users);
  console.log(buy, sell, "in buy sell");
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Header>Control Pane</Card.Header>
      <form onSubmit={e => handleSubmit(e)}>
        <label>
          BUY/SELL
          <select>
            <option value="buy">BUY</option>
            <option value="sell">SELL</option>
          </select>
        </label>
        <label>
          Select User
          <select>
            {users
              ? users.map(function (user) {
                  var list = [];
                  list.push(
                    <option key={user.user_id} value={user.user_id}>
                      {user.name}
                    </option>
                  );
                  return list;
                })
              : [
                  <option key="0" value="0">
                    No Users Present!
                  </option>,
                ]}
            {/* <option value="buy">User1</option>
            <option value="sell">User2</option> */}
          </select>
        </label>
        <label>
          Order Type
          <select>
            <option value="limit">Limit Order</option>
            <option value="market">Market Order</option>
          </select>
        </label>

        <label>
          Stock Amount:
          <input type="number" name="amount" />
        </label>
        <label>
          At price:
          <input type="number" name="price" />
        </label>
        <input type="submit" value="Place Order" />
      </form>
    </Card>
  );
};

export default Control;
