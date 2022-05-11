
import { quanLyRapService } from "../../services/QuanLyRapService";
import { LAY_DANH_SAC_RAP, SET_CHI_TIET_PHIM } from "../types/QuanLyRapType";




export const  layDanhSachRapAction = () => {
    return async (dispatch) => {
        try {
            
            const result = await quanLyRapService.layDanhSachRap();
            console.log(result);
            if(result.status === 200){
                
                dispatch({
                    type: LAY_DANH_SAC_RAP,
                    heThongRapChieu: result.data.content
                })
            } 
        } catch (errors) {
            console.log('errors', errors)
        }
    }
}


export const layThongTinChiTietPhim = (id) => {
    return async (dispatch) => {
        try {
            const result = await quanLyRapService.layThongTinLichChieuPhim(id);
            // Lấy được dữ liệu từ api về => reducer
            dispatch({
                type: SET_CHI_TIET_PHIM,
                filmDetail: result.data.content
            })
            console.log('result:',result);
        }
        catch(errors) {
            console.log('errors', errors)
        }
    }
}