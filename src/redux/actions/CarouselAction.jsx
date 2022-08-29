
import { SET_CAROUSEL } from '../types/CarouselType';
import { quanLyPhimService } from '../../services/QuanLyPhimService';
import {history} from '../../App'

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
                arrImg: result.data.content
            })
        } catch (errors) {

            const {statusCode,content} =  errors?.response?.data;
            if(statusCode===403){
                history.push('/maintenance')
            }
            console.log(content)
        }
    }
}

