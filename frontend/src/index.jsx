import { createBrowserRouter} from "react-router-dom";
import App from "./app";
import Login from "./pages/login";
import Register from "./pages/register";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";  
import ProductsPage from "./pages/productsPage";
import ProductDetail from "./components/products/productdetail";
import CartPage from "./pages/cartpage";
import { CartProvider } from "./components/cart/cartcontext";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
        {
            index:true, 
            element:<ProductsPage/>
        },
        {
            path:"/login",
            element:<Login/>
        },

        {
            path:"/register",
            element:<Register/>
        }
        ,

        // {
        //     path:"/products",
        //     element:<ProductsPage/>
        // },
        {
            path:"/product/:id",
            element:<ProductDetail/>
        },

        {
            path:"/cart",
            element:<CartPage/>
        }
    ]
}
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartProvider> {/* ⬅️ BỌC TẠI ĐÂY */}
      <RouterProvider router={router} />
    </CartProvider>
  </React.StrictMode>
);