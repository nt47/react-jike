//redux切片模板
import { createSlice } from "@reduxjs/toolkit";
import { removeToken, request } from "@/utils";
import { setToken as _setToken, getToken } from "@/utils";
import { LoginAPI, getProfileAPI } from "@/apis/user";

const userSlice = createSlice({
    name: "user",
    initialState: {
        token: (() => {
            // if (localStorage.getItem('jike_token')) {
            //     return localStorage.getItem('jike_token')
            // }
            if (getToken())
                return getToken()
            return ''
        })(),
        userInfo: {}
    },
    reducers: {
        setToken(state, action) {
            state.token = action.payload
            //localStorage.setItem('jike_token', action.payload)
            _setToken(action.payload)
        },
        setUserInfo(state, action) {
            state.userInfo = action.payload
        },
        clearUserInfo(state, action) {
            state.token = ''
            state.userInfo = {}
            removeToken()
        }
    }
});

//action creator
const { setToken, setUserInfo, clearUserInfo } = userSlice.actions
export { setToken, setUserInfo, clearUserInfo };

const userReducer = userSlice.reducer
export default userReducer;

//异步action
const asyncLogin = (values) => {
    return async (dispatch) => {
        //code=246810
        //const res = await request.post("/authorizations", values)// await 一定要加否则没数据
        const res = await LoginAPI(values)
        dispatch(setToken(res.data.token))
    }

}

const fetchUserInfo = () => {
    return async (dispatch) => {
        //const res = await request.get("/user/profile")
        const res = await getProfileAPI()
        dispatch(setUserInfo(res.data))
    }
}

export { asyncLogin, fetchUserInfo }