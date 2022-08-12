import "../../stylesheet/DashboardMain.scss";

import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router";
import axios from 'axios';







export default function PortfolioList(props) {
  const { stockList } = props

  //console.log (stockList)

  let list;

  if (stockList !== null) {

    list = stockList.map((stock, index) => {
      return (
        <tr key={index}>
          <td>{stock.stock}</td>
          <td>${stock.totalAmount}</td>
          <td>{stock.shares}</td>
        </tr>
      );
    });
  }



  return (

    list

  )

}
