import React from "react";
import { Chart as ChartJS } from 'chart.js/auto'
import { Line } from "react-chartjs-2";
// import { Provider, useSelector, useDispatch } from "react-redux";
// import {
//   marketbuy,
//   marketsell,
//   limitbuy,
//   limitsell,
//   updateuser,
//   addUser,
// } from "../store/actions/count.actions";
// import store from "../store";

const Graph = () => {
  return (
    <>
    <h1 style={{marginTop: 30}}>Graph</h1>
    <Line
      datasetIdKey="id"
      height={"200%"}
      data={{
        labels: ["Jun", "Jul", "Aug"],
        datasets: [
          {
            id: 1,
            label: "",
            data: [5, 6, 7],
          },
        ],
      }}
    />
    </>
  );
};

export default Graph;
