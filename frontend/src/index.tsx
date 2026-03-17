import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.tsx";

// pages - THÊM .tsx vào tất cả
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import ProductsPage from "./pages/ProductsPage.tsx";
import CartPage from "./pages/CartPage.tsx";

// components - ĐÃ CÓ .tsx
import ProductDetail from "./components/products/ProductDetail.tsx";
import SearchProducts from "./components/products/SearchProduct.tsx";
import StoryPage from "./components/otherpage/StoryPage.tsx";  // THÊM .tsx
import { CartProvider } from "./components/cart/CartContext.tsx";  // THÊM .tsx
import { UserProvider } from "./components/UserContext.tsx";
import HomePage from "./pages/HomePage.tsx";
import AdminPage from "./pages/AdminPage.tsx";
import FormInfor from "./components/order/FormInfor.tsx";
import CheckoutPage from "./pages/CheckoutPage.tsx";
import OrderHistory from "./pages/OrderHistory.tsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      { index: true, element: <ProductsPage /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "product/:id", element: <ProductDetail /> },
      { path: "product/search/:keyword", element: <SearchProducts /> },
      { path: "cart", element: <CartPage /> },
      { path: "story", element: <StoryPage /> },
      {path: "home", element:<HomePage/> },
      {path: "admin", element: <AdminPage/>},
      {path: "updateinforuser", element: <FormInfor/>} ,
      { path: "checkout", element: <CheckoutPage /> },
      { path: "orders", element: <OrderHistory /> },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <UserProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </UserProvider>
  </React.StrictMode>
);