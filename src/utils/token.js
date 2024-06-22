const JK_TOKEN = 'jike_token'
const setToken = token => {
    localStorage.setItem(JK_TOKEN, token)
}

const getToken = () => {
    return localStorage.getItem(JK_TOKEN)
}

const removeToken = () => {
    localStorage.removeItem(JK_TOKEN)
}

export { setToken, getToken, removeToken }