import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { RouterProvider } from 'react-router-dom';//路由注入器
import router from './router';//自定义路由
import { Provider } from 'react-redux';//全局状态注入器
import store from './store';//自定义状态容器
import 'normalize.css'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>

);

