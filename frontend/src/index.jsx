import { createBrowserRouter} from "react-router-dom";
import App from "./app";
import Login from "./pages/login";
import Register from "./pages/register";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";  
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
        {
            index:true, 
            element:<App/>
        },
        {
            path:"/login",
            element:<Login/>
        },
        {
            path:"/register",
            element:<Register/>
        }
    ]
}
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode>
    <RouterProvider router={router} />
</React.StrictMode>);