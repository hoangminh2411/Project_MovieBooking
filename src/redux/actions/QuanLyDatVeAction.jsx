import { quanLyDatVeService } from "../../services/QuanLyDatVeService"
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { DAT_GHE, DAT_VE_THANH_CONG, SET_CHI_TIET_PHONG_VE } from "../types/QuanLyDatVeType";
import { history } from "../../App"
import {hideLoadingAction,displayLoadingAction} from "../actions/LoadingAction"
import { connection } from "../..";

export const layChiTietPhongVe = (maLichChieu) => {
    return async dispatch => {
        try{
            dispatch(displayLoadingAction)
            const result = await quanLyDatVeService.layChiTietPhongVe(maLichChieu);
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

    return async (dispatch,getState) => {
        try {
            dispatch(displayLoadingAction)
            const result = await quanLyDatVeService.datVe(thongTinDatVe)
            // Đạt vé thành công gọi api load lại phòng vé 
            await dispatch(layChiTietPhongVe(thongTinDatVe.maLichChieu))
            await dispatch({
                type:DAT_VE_THANH_CONG
            })
            await dispatch(hideLoadingAction)
            
            let userlogin = getState().QualyNguoiDUngReducer.userlogin;
            connection.invoke('datGheThanhCong',userlogin.taiKhoan,thongTinDatVe.maLichChieu)

            // history.push('/profile');
            
        }
        catch(errors) {
            dispatch(hideLoadingAction)
            console.log('error FE  datVe',errors);
            console.log('error BE datVe',errors.response?.data)
        }     
    }
}


export const datGheAction = (ghe,maLichChieu) => {

    return async (dispatch,getState) => {
        await dispatch({
            type: DAT_GHE,
            gheDuocChon:ghe
        })

        // call api về backend
        let danhSachgheDangDat = getState().QuanLyDatVeReducer.danhSachGheDangDat;
        let taiKhoan = getState().QuanLyNguoiDungReducer.userLogin.taiKhoan;
        danhSachgheDangDat = JSON.stringify(danhSachgheDangDat)
        console.log('danhSachGheDnagDat',danhSachgheDangDat)
        console.log('taiKhoan',taiKhoan);
        console.log('maLichChieu',maLichChieu);


        // callAPI 
        connection.invoke('datGhe',taiKhoan,danhSachgheDangDat,maLichChieu);

    }
}