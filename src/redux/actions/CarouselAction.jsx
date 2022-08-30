
import { SET_CAROUSEL } from '../types/CarouselType';
import { quanLyPhimService } from '../../services/QuanLyPhimService';
import {history} from '../../App'
import Toast from '../../components/Toast/Toast';

export const getCarouselAction = ()=> {

    return async (dispatch) => {
        try {
            // Sử dụng tham số
            // const result = await axios({
            //     url: 'https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachBanner',
            //     method: 'GET',
            //     headers: {
            //         "TokenCybersoft": TOKEN_CYBERSOFT
            //     }
            // })
            
            // const result = await http.get('/api/QuanLyPhim/LayDanhSachBanner')
            
            // const result = baseService.get('/api/QuanLyPhim/LayDanhSachBanne')
            // console.log('result',result);
            const result = await quanLyPhimService.layDanhSachBanner();
            dispatch({
                type: SET_CAROUSEL,
                payload:{
                    imageList: result.data.content
                }
            })
        } catch (errors) {

            if(errors.message ==="Network Error") {
                Toast('error','ERROR',"mất kết nối với internet vui lòng kiểm tra lại")
            }
            else{
                const {statusCode,content} =  errors?.response?.data;
                Toast('error','ERROR',content)
                if(statusCode===403){
                    history.push('/maintenance')
                }
                if(statusCode===400){
                    history.push('/home')
                }
               
            }
        }
    }
}

