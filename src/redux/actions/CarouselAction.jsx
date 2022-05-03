import axios from 'axios';
import { baseService } from '../../services/baseService';
import {http } from '../../util/setting';
import { SET_CAROUSEL } from '../types/CarouselType';
import { quanLyPhimService } from '../../services/QuanLyPhimService';


export const getCarouselAction = (thamSo)=> {

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
            console.log('errors', errors)
        }
    }
}

