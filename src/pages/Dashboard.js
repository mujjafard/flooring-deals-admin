import React from "react";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import business_and_finance from "../Images/business_and_finance.png"
import expense from "../Images/expense.png"
import delivery_service from "../Images/delivery_service.png"
import lead_time from "../Images/lead_time.png"
import settings from "../Images/settings.png"
import easy_installation from "../Images/easy_installation.png"
import invoice from "../Images/invoice.png"
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Status",
    dataIndex: "staus",
  },
];
const data1 = [];
for (let i = 0; i < 46; i++) {
  data1.push({
    key: i,
    name: `Edward King ${i}`,
    product: 32,
    staus: `London, Park Lane no. ${i}`,
  });
}
const Dashboard = () => {
  const data = [
    {
      type: "Jan",
      sales: 38,
    },
    {
      type: "Feb",
      sales: 52,
    },
    {
      type: "Mar",
      sales: 61,
    },
    {
      type: "Apr",
      sales: 145,
    },
    {
      type: "May",
      sales: 48,
    },
    {
      type: "Jun",
      sales: 38,
    },
    {
      type: "July",
      sales: 38,
    },
    {
      type: "Aug",
      sales: 38,
    },
    {
      type: "Sept",
      sales: 38,
    },
    {
      type: "Oct",
      sales: 38,
    },
    {
      type: "Nov",
      sales: 38,
    },
    {
      type: "Dec",
      sales: 38,
    },
  ];
  const config = {
    data,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#e67929";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };
  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3 ">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white shadow p-3 mb-5 bg-body-tertiary rounded">
          <div className="">
            <p className="desc">Product New Order</p>
            <h4 className="mb-0 sub-title">$1100</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <img className="rotate-icon" style={{ width: "3.5rem" }} src={delivery_service} alt=""></img>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white shadow p-3 mb-5 bg-body-tertiary rounded">
          <div>
            <p className="desc">Product Completed </p>
            <h4 className="mb-0 sub-title">$1100</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <img className="rotate-icon" style={{ width: "3.5rem", }} src={lead_time} alt=""></img>
            {/* <p className="mb-0  desc">Compared To April 2022</p> */}
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white shadow p-3 mb-5 bg-body-tertiary rounded">
          <div>
            <p className="desc">Product Total</p>
            <h4 className="mb-0 sub-title">$1100</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <img className="rotate-icon" style={{ width: "3rem" }} src={business_and_finance} alt=""></img>
          </div>
        </div>
      </div>


      <div className="d-flex justify-content-between align-items-center gap-3 ">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white shadow p-3 mb-5 bg-body-tertiary rounded">
          <div className="">
            <p className="desc ">New Installations</p>
            <h4 className="mb-0 sub-title">$1100</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <img className="rotate-icon" style={{ width: "3.5rem" }} src={settings} alt=""></img>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white shadow p-3 mb-5 bg-body-tertiary rounded">
          <div>
            <p className="desc">Complete Installations</p>
            <h4 className="mb-0 sub-title">$1100</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <img className="rotate-icon" style={{ width: "3.5rem", }} src={easy_installation} alt=""></img>
            {/* <p className="mb-0  desc">Compared To April 2022</p> */}
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white shadow p-3 mb-5 bg-body-tertiary rounded">
          <div>
            <p className="desc">Installation Total</p>
            <h4 className="mb-0 sub-title">$1100</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <img className="rotate-icon" style={{ width: "3.5rem", }} src={invoice} alt=""></img>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="mb-5 title">Income Statics</h3>
        <div>
          <Column {...config} />
        </div>
      </div>
    
    </div>
  );
};

export default Dashboard;
