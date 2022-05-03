// Cấu hình interceptor cho axios (Tất cả request đều gọi = axios đều được cấu hình)
import  Axios  from "axios";


export const TOKEN_CYBERSOFT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAyNiIsIkhldEhhblN0cmluZyI6IjEzLzEwLzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY2NTYxOTIwMDAwMCIsIm5iZiI6MTYzMzE5NDAwMCwiZXhwIjoxNjY1NzY2ODAwfQ.TMg-RWGpT6_kH-eG3Pbw5j_8yWUP84LrkWZAFj-Drfk"

export const GROUP_ID='GP02'
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