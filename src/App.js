import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Resetpassword from "./pages/Resetpassword";
import Forgotpassword from "./pages/Forgotpassword";
import MainLayout from "./components/MainLayout";
import Brand from "./pages/Brand";
import Category from "./pages/Category";
import ProductList from "./pages/ProductList";
import Products from "./pages/Products";
import CostEstimation from "./pages/CostEstimation";
import Order from "./pages/Order";
import ProductViewPage from "./pages/ProductViewPage";
import OrderViewPage from "./pages/OrderViewPage";
import CostEstimationList from "./pages/CostEstimationList";
import CostEstimationOrder from "./pages/CostEstimationOrder";
import CostEstiOrderView from "./pages/CostEstiOrderView";
import BrandList from "./pages/BrandList";
import InstallationOrder from "./pages/InstallationOrder";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<Resetpassword />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/admin/Products" element={<Products />} />
          <Route path="/admin/Products/:id" element={<Products />} />
          <Route path="/admin/ProductViewPage" element={<ProductViewPage />} />
          <Route path="/admin/OrderViewPage/:id" element={<OrderViewPage />} />
          <Route path="/admin/ProductViewPage/:id" element={<ProductViewPage />} />
          <Route path="/admin/ProductList" element={<ProductList />} />
          <Route path="/admin/category" element={<Category />} />
          <Route path="/admin/brand" element={<Brand />} />
          <Route path="/admin/BrandList" element={<BrandList />} />
          <Route path="/admin/BrandList/:id" element={<BrandList />} />
          <Route path="/admin/brand/:id" element={<Brand />} />
          <Route path="/admin/costEstimation" element={<CostEstimation />} />
          <Route path="/admin/CostEstimationList" element={<CostEstimationList />} />
          <Route path="/admin/CostEstimationList/:id" element={<CostEstimationList />} />
          <Route path="/admin/CostEstimationOrder" element={<CostEstimationOrder />} />
          <Route path="/admin/CostEstimationOrder" element={<CostEstimationOrder />} />
          <Route path="/admin/CostEstiOrderView/:id" element={<CostEstiOrderView />} />
          <Route path="/admin/order" element={<Order />} />
          <Route path="/admin/order/:id" element={<Order />} />
          <Route path="/admin/installationOrder" element={<InstallationOrder />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
