import { createBrowserRouter } from "react-router-dom";
import GeekLayout from "@/pages/Layout";
import P404 from "@/pages/404";
import Login from "@/pages/Login";
import AuthRoute from "@/components/AuthRoute";
import Home from "@/pages/Home";
import Article from "@/pages/Article";
import Publish from "@/pages/Publish";

const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthRoute>
            <GeekLayout />
        </AuthRoute>,
        children: [
            {
                path: '/home',//如果首页展示请用index
                element: <Home />

            },
            {
                path: '/article',
                element: <Article />
            },
            {
                path: '/publish',
                element: <Publish />
            }
        ]
    },
    {
        path: "/login",
        element: <Login />

    },
    {
        path: "/*",
        element: <P404 />
    },
])

export default router;