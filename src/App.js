import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./layout";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import Sales from "./pages/Sales";
import SalesHistory from "./pages/SalesHistory";
import ProductDetail from "./pages/ProductDetail";

const App = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark" // Load theme from localStorage
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <Router>
      <div
        className={
          darkMode ? "dark bg-black text-white" : "bg-white text-black"
        }
      >
        <Routes>
          <Route
            path="/"
            element={
              <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
                <Dashboard />
              </Layout>
            }
          />

          <Route
            path="/dashboard"
            element={
              <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
                <Dashboard />
              </Layout>
            }
          />

          <Route
            path="/products"
            element={
              <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
                <Products />
              </Layout>
            }
          />
          <Route
            path="/product/:id"
            element={
              <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
                <ProductDetail />
              </Layout>
            }
          />
          <Route
            path="/addProduct"
            element={
              <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
                <AddProduct />
              </Layout>
            }
          />
          <Route
            path="/Sales"
            element={
              <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
                <Sales />
              </Layout>
            }
          />
          <Route
            path="/SalesHistory"
            element={
              <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
                <SalesHistory />
              </Layout>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
