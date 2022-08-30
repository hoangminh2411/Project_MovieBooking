
import { quanLyRapService } from "../../services/QuanLyRapService";
import { LAY_DANH_SAC_RAP, SET_CHI_TIET_PHIM } from "../types/QuanLyRapType";
import {hideLoadingAction,displayLoadingAction} from "../actions/LoadingAction"
import {history} from '../../App'
import Toast from "../../components/Toast/Toast";

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
            dispatch(hideLoadingAction)
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