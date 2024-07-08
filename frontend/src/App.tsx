import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ProductPage from "./pages/user/ProductsPage";
import AdminRoute from "./routes/AdminRoute";
import UserRoute from "./routes/UserRoute";
import CartPage from "./pages/user/CartPage";
import OrdersPage from "./pages/user/OrdersPage";
import ErrorPage from "./pages/ErrorPage";
import IsAdminRoute from "./routes/IsAdminRoute";
import IsAuth from "./routes/IsAuth";
import CheckOutPage from "./pages/user/CheckOutPage";
import UserOrderInfo from "./components/userComponent/UserOrderInfo";
import Dashboard from "./components/adminComponent/Dashboard";
import AdminProducts from "./components/adminComponent/AdminProducts";
import AdminOrders from "./components/adminComponent/AdminOrders";
import AdminUsers from "./components/adminComponent/AdminUsers";

const router = createBrowserRouter([
    {
        path: "/",
        element: <IsAdminRoute />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
        ],
    },
    {
        path: "/auth",
        element: <IsAuth />,
        children: [
            {
                path: "/auth/register",
                element: <Register />,
            },
            {
                path: "/auth/login",
                element: <Login />,
            },
        ],
    },

    {
        path: "/user",
        element: <UserRoute />,
        children: [
            {
                path: "/user/products",
                element: <ProductPage />,
            },
            {
                path: "/user/cart",
                element: <CartPage />,
            },
            {
                path: "/user/checkout",
                element: <CheckOutPage />,
            },
            {
                path: "/user/orders",
                element: <OrdersPage />,
            },
            {
                path: "/user/orders/:id",
                element: <UserOrderInfo />,
            },
        ],
    },

    {
        path: "/admin",
        element: <AdminRoute />,
        children: [
            {
                path: "/admin",
                element: <Dashboard />,
            },
            {
                path: "/admin/products",
                element: <AdminProducts />,
            },
            {
                path: "/admin/orders",
                element: <AdminOrders />,
            },
            {
                path: "/admin/users",
                element: <AdminUsers />,
            },
        ],
    },
    {
        path: "*",
        element: <ErrorPage />,
    },
]);

function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
