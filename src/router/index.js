import { createBrowserRouter } from "react-router-dom";
import GeekLayout from "@/pages/Layout";
import P404 from "@/pages/404";
import Login from "@/pages/Login";
import AuthRoute from "@/components/AuthRoute";
//import Home from "@/pages/Home";
//import Article from "@/pages/Article";
//import Publish from "@/pages/Publish";
import { Suspense, lazy } from "react";

//路由懒加载
const Home = lazy(() => { return import('@/pages/Home') })
const Article = lazy(() => { return import('@/pages/Article') })
const Publish = lazy(() => { return import('@/pages/Publish') })

const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthRoute>
            <GeekLayout />
        </AuthRoute>,
        children: [
            {
                path: '/home',//如果首页展示请用index
                element: <Suspense fallback={'加载中'}><Home /></Suspense>

            },
            {
                path: '/article',
                element: <Suspense fallback={'加载中'} ><Article /></Suspense>
            },
            {
                path: '/publish',
                element: <Suspense fallback={'加载中'}><Publish /></Suspense>
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