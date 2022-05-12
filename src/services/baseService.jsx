import axios from "axios";
import { ACCESS_TOKEN, DOMAIN_CYBERBUG, TOKEN_CYBERSOFT } from "../util/setting";



export class baseService {
    // put json về phía backend
    put = (url,model) =>{
        return axios({
            url: `${DOMAIN_CYBERBUG}/${url}`,
            method:'PUT',
            data:model,
            headers: {
                'TokenCyberSoft':TOKEN_CYBERSOFT,
                'Authorization': 'Bearer' + localStorage.getItem(ACCESS_TOKEN) //JWT
            }
        })
    }


    post = (url,model)=>{
        return axios({
            url: `${DOMAIN_CYBERBUG}/${url}`,
            method:'POST',
            data:model,
            headers: {
                'TokenCyberSoft':TOKEN_CYBERSOFT,
                'Authorization': 'Bearer' + localStorage.getItem(ACCESS_TOKEN) //JWT
            }
        })
    }

    get = (url) => {
        return axios({
            url: `${DOMAIN_CYBERBUG}/${url}`,
            method:'GET',
            headers: {
                'TokenCyberSoft':TOKEN_CYBERSOFT,
                'Authorization': 'Bearer' + localStorage.getItem(ACCESS_TOKEN) //TOKEN yêu cầu từ backend chứng minh tài khoản đã đăng nhập và có quyền truy cập
            }
        })
    }

    delete =(url) => {
        return axios({
            url: `${DOMAIN_CYBERBUG}/${url}`,
            method:'DELETE',
            headers: {
                'TokenCyberSoft':TOKEN_CYBERSOFT,
                'Authorization': 'Bearer' + localStorage.getItem(ACCESS_TOKEN)
            }
        })
    }

}
