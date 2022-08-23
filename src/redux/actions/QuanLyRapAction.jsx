
import { quanLyRapService } from "../../services/QuanLyRapService";
import { LAY_DANH_SAC_RAP, SET_CHI_TIET_PHIM } from "../types/QuanLyRapType";
import {hideLoadingAction,displayLoadingAction} from "../actions/LoadingAction"



export const  layDanhSachRapAction = () => {
    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction)
            const result = await quanLyRapService.layDanhSachRap();
            if(result.status === 200){
                
                await dispatch({
                    type: LAY_DANH_SAC_RAP,
                    heThongRapChieu: result.data.content
                })
                dispatch(hideLoadingAction)
            } 
        } catch (errors) {
            console.log('errors', errors)
            dispatch(hideLoadingAction)
        }
    }
}


export const layThongTinChiTietPhim = (id) => {
    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction)
            const result = await quanLyRapService.layThongTinLichChieuPhim(id);
            // Lấy được dữ liệu từ api về => reducer
            await dispatch({
                type: SET_CHI_TIET_PHIM,
                filmDetail: result.data.content
            })
            dispatch(hideLoadingAction)
        }
        catch(errors) {
            dispatch(hideLoadingAction)
            console.log('errors', errors)
        }
    }
}