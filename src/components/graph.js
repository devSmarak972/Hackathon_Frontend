import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";

import { useState, useEffect } from "react";
// import Table from "react-bootstrap/Table";
import { Provider, useSelector, useDispatch } from "react-redux";
import {
  marketbuy,
  marketsell,
  limitbuy,
  limitsell,
  updateuser,
  addUser,
  setprice,
} from "../store/actions/count.actions";
import store from "../store";
import axios from "axios";

const Graph = () => {
  const dispatch = useDispatch();

  function getPrice() {
    axios({
      method: "GET",
      url: "http://127.0.0.1:8000/api/price",
    })
      .then(response => {
        const data = response.data;
        // console.log("success", data);
        data.forEach(el => {
          dispatch(setprice(el.curr_price, el.step));
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
    getPrice();
  }, []);

  const prices = useSelector(state => state.marketprice);
  var labels = [...prices.keys()];
  var data = prices.map(el => el.curr_price);
  return (
    <>
      <h1 style={{ marginTop: 30 }}>Graph</h1>
      <Line
        datasetIdKey="id"
        height={"200%"}
        data={{
          labels: labels,
          datasets: [
            {
              id: 1,
              label: "",
              data: data,
            },
          ],
        }}
      />
    </>
  );
};

export default Graph;
