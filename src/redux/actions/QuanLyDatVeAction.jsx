import { quanLyDatVeService } from "../../services/QuanLyDatVeService"
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { DAT_VE_THANH_CONG, SET_CHI_TIET_PHONG_VE } from "../types/QuanLyDatVeType";
import { history } from "../../App"
import {hideLoadingAction,displayLoadingAction} from "../actions/LoadingAction"

export const layChiTietPhongVe = (maLichChieu) => {
    return async dispatch => {
        try{
            dispatch(displayLoadingAction)
            const result = await quanLyDatVeService.layChiTietPhongVe(maLichChieu);
            // console.log('Resule CTPV', result);
            if(result.status === 200) {
                await dispatch({
                    type:SET_CHI_TIET_PHONG_VE,
                    chiTietPhongVe: result.data.content
                })
            }
            dispatch(hideLoadingAction)

        }
        catch(errors){
            dispatch(hideLoadingAction)
            console.log('error FE layChiTietPhongVe',errors)
            console.log('error BE layChiTietPhongVe',errors.response?.data)
        }
    }
}

export const datVe = (thongTinDatVe = new ThongTinDatVe()) => {

    return async dispatch => {
        try {
            dispatch(displayLoadingAction)
            const result = await quanLyDatVeService.datVe(thongTinDatVe)
            console.log('Thong tin dat ve',result);
            // Đạt vé thành công gọi api load lại phòng vé 
            await dispatch(layChiTietPhongVe(thongTinDatVe.maLichChieu))
            await dispatch({
                type:DAT_VE_THANH_CONG
            })
            dispatch(hideLoadingAction)
            // history.push('/profile');
        }
        catch(errors) {
            dispatch(hideLoadingAction)
            console.log('error FE  datVe',errors);
            console.log('error BE datVe',errors.response?.data)
        }     
    }
}