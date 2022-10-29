import React from "react";
import Table from "react-bootstrap/Table";
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
import { useState, useEffect } from "react";
// axios.defaults.baseURL = "http://localhost";
// axios.defaults.port = 8000;
const Book = () => {
  const buy = useSelector(state => state.buy);
  const sell = useSelector(state => state.sell);
  const dispatch = useDispatch();

  function getOrders() {
    axios({
      method: "GET",
      url: "http://127.0.0.1:8000/api/order",
    })
      .then(response => {
        const data = response.data;
        // console.log("success order data", data);
        data.forEach(order => {
          if (order.buy)
            dispatch(limitbuy(order.quantity, order.price, order.user));
          else dispatch(limitsell(order.quantity, order.price, order.user));
        });
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  useEffect(() => {
    getOrders();
  }, []);

  // console.log("buy", buy, "sell", sell);
  const buy1 = [
    {
      name: "user1",
      quantity: 10,
      price: 1000,
    },
    {
      name: "user2",
      quantity: 12,
      price: 1100,
    },
    {
      name: "user1",
      quantity: 15,
      price: 1200,
    },
    {
      name: "user1",
      quantity: 15,
      price: 1200,
    },
  ];

  const sell1 = [
    {
      name: "user1",
      quantity: 10,
      price: 1000,
    },
    {
      name: "user2",
      quantity: 12,
      price: 1100,
    },
    {
      name: "user1",
      quantity: 15,
      price: 1200,
    },
    {
      name: "user1",
      quantity: 15,
      price: 1200,
    },
    {
      name: "user1",
      quantity: 15,
      price: 1200,
    },
  ];
  function table() {
    var list = [];
    var nbuys = buy.length;
    var nsells = sell.length;
    var j;

    for (j = 0; j < Math.max(nbuys, nsells); j++) {
      list.push(
        <tr key={j + "book"}>
          <th scope="row" colSpan="2">
            {j < nbuys ? buy[j].quantity : ""}
          </th>
          <td>{j < nbuys ? buy[j].price : ""}</td>
          <th scope="row" colSpan="2">
            {j < nsells ? sell[j].price : ""}
          </th>
          <td>{j < nsells ? sell[j].quantity : ""}</td>
        </tr>
      );
    }
    // console.log(list);
    return list;
  }
  return (
    <div>
      <Table responsive striped bordered hover variant="dark" size="sm">
        <thead>
          <tr>
            <th scope="col" colSpan="4">
              Buy
            </th>
            <th scope="col" colSpan="4">
              Sell
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row" colSpan="2">
              Quantity
            </th>
            <td>Price</td>
            <th scope="row" colSpan="2">
              Price
            </th>
            <td>Quantity</td>
          </tr>
          {table()}
        </tbody>
      </Table>
    </div>
  );
};

export default Book;
