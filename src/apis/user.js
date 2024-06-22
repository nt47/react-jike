import { request } from "@/utils";

export const LoginAPI = (data) => {
    return request({
        url: '/authorizations',
        method: 'POST',
        data: data
    })
}

export const getProfileAPI = () => {
    return request({
        url: '/user/profile',
        method: 'GET'
    })
}