// Cấu hình interceptor cho axios (Tất cả request đều gọi = axios đều được cấu hình)
import  Axios  from "axios";


export const TOKEN_CYBERSOFT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiIgSmF2YSAxNyIsIkhldEhhblN0cmluZyI6IjI4LzEyLzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY3MjE4NTYwMDAwMCIsIm5iZiI6MTY0ODY1OTYwMCwiZXhwIjoxNjcyMzMzMjAwfQ.ZPHRieXZ4lo1gS8n_8hr2L2t6c5fI4vZaAbSKADsCH0"

export const GROUP_ID='GP13'
export const USER_LOGIN ='userLogin';
export const ACCESS_TOKEN ='accessToken';
export const DOMAIN_CYBERBUG = 'https://movienew.cybersoft.edu.vn'


export const http = Axios.create({
    baseURL: 'https://movienew.cybersoft.edu.vn',
    timeout:30000,
})

http.interceptors.request.use((config)=>{
    config.headers = {
        ...config.headers,
        'TokenCyberSoft':TOKEN_CYBERSOFT,
        Authorization: localStorage.getItem(ACCESS_TOKEN)//Token người dùng đăng nhập
    }

    return config
},(errors)=>{
    return Promise.reject(errors)
})