//redux配置模板
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./modules/userSlice";//自定义状态管理器

const store = configureStore({
    reducer: {
        user: userReducer
    }
});

export default store