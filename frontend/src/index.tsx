import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";

// pages
import  Login  from "./pages/Login";
import Register from "./pages/Register";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";

// components
import ProductDetail from "./components/products/ProductDetail";
import SearchProducts from "./components/products/SearchProduct";
import  StoryPage  from "./components/otherpage/StoryPage";
import { CartProvider } from "./components/cart/CartContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <ProductsPage /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "product/:id", element: <ProductDetail /> },
      { path: "product/search/:keyword", element: <SearchProducts /> },
      { path: "cart", element: <CartPage /> },
      { path: "story", element: <StoryPage /> },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </React.StrictMode>
);
