import React, { useState } from "react";
import logo_s from '../Images/logo_s.jpg'
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineBgColors,
} from "react-icons/ai";
import { MdListAlt } from "react-icons/md";
import { RiCouponLine } from "react-icons/ri";
import { MdOutlineBorderColor } from "react-icons/md";
import { MdProductionQuantityLimits } from 'react-icons/md'
import { BsFillCalculatorFill } from 'react-icons/bs'
// import { BsActivity } from 'react-icons/bs'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { ImBlog } from "react-icons/im";
import { HiPencilSquare } from "react-icons/hi2";
import { RiFileList2Line } from "react-icons/ri";
import { IoIosNotifications } from "react-icons/io";
import { FaClipboardList, FaBloggerB } from "react-icons/fa";
import { SiBrandfolder } from "react-icons/si";
import { BiCategoryAlt } from "react-icons/bi";
import { RiFileListLine } from "react-icons/ri";
import { TbListDetails } from "react-icons/tb";
import { HiOutlinePencilSquare } from "react-icons/hi2";import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <img className="flooring-logo img-fluid" src={logo_s} />
          </h2>
        </div>
        <Menu
          mode="inline"
          style={{ backgroundColor: "#f7f6ed" }}
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key == "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <AiOutlineDashboard className="fs-4" />,
              label: "Dashboard",
            },
            {
              key: "Products",
              // icon: <AiOutlineUser className="fs-4" />,
              icon: <MdProductionQuantityLimits className="fs-4" />,
              label: "Products",
            },
            {
              key: "ProductList",
              icon: <RiFileListLine className="fs-4" />,
              label: "Product List",
            },
            {
              key: "Order",
              icon: <HiPencilSquare className="fs-4" />,
              label: "Product Order",
            },
            {
              key: "category",
              icon: <BiCategoryAlt className="fs-4" />,
              label: "Category",
            },
            {
              key: "brand",
              icon: <SiBrandfolder className="fs-4" />,
              label: "Brand",
            },
            {
              key: "BrandList",
              icon: <RiFileList2Line className="fs-4" />,
              label: "Brand List",
            },
            {
              key: "costEstimation",
              icon: <BsFillCalculatorFill className="fs-4" />,
              label: "Cost Estimation",
            },
            {
              key: "CostEstimationList",
              icon: <TbListDetails className="fs-4" />,
              label: "Cost Estimation List",
            },
            {
              key: "installationOrder",
              icon: <HiOutlinePencilSquare className="fs-4" />,
              label: "Installation Order",
            },
        
          
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{
            padding: 0,
            background: "#e67929",
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className="d-flex gap-4 align-items-center">
            <div className="d-flex gap-3 align-items-center dropdown">
              <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className="mb-0" style={{ color: "white" }}>Flooring Deals</h5>
                {/* <p className="mb-0" style={{ color: "white" }}>flooringdeals@gmail.com</p> */}
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink"
              >
                <li  >
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px", }}
                    to="/"
                  >
                    View Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    Signout
                  </Link>
                </li>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
