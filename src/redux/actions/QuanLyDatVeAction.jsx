import { quanLyDatVeService } from "../../services/QuanLyDatVeService"
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { DAT_GHE, DAT_VE_THANH_CONG, SET_CHI_TIET_PHONG_VE } from "../types/QuanLyDatVeType";
import { history } from "../../App"
import {hideLoadingAction,displayLoadingAction} from "../actions/LoadingAction"
// import { connection } from "../..";
import Toast from "../../components/Toast/Toast";

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
            if(errors.message ==="Network Error") {
                Toast('error','ERROR',"mất kết nối với internet vui lòng kiểm tra lại")
            }else{

                const {status,data} =  errors?.response;
                if(status===403){
                    history.push('/maintenance')
                }
                if(status===400){
                    history.push('/home')
                }
                Toast('error','ERROR',data.MaLichChieu)
            }
            
        }
    }
}

export const datVe = (thongTinDatVe = new ThongTinDatVe()) => {

    return async (dispatch,getState) => {
        try {
            dispatch(displayLoadingAction)
            await quanLyDatVeService.datVe(thongTinDatVe)
            Toast('success','success',"Đặt vé thành công")
            // Đạt vé thành công gọi api load lại phòng vé 
            await dispatch(layChiTietPhongVe(thongTinDatVe.maLichChieu))
            await dispatch({
                type:DAT_VE_THANH_CONG
            })
            await dispatch(hideLoadingAction)
            
            // let userlogin = getState().QualyNguoiDUngReducer?.userlogin;
            // connection.invoke('datGheThanhCong',userlogin?.taiKhoan,thongTinDatVe.maLichChieu)

            
        }
        catch(errors) {
            dispatch(hideLoadingAction)
            if(errors.message ==="Network Error") {
                Toast('error','ERROR',"mất kết nối với internet vui lòng kiểm tra lại")
            }else{
                const {status,data} =  errors?.response;
                if(status===403){
                    history.push('/maintenance')
                }
                  Toast('error','ERROR',data[""])
            }
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
        // let danhSachgheDangDat = getState().QuanLyDatVeReducer.danhSachGheDangDat;
        // let taiKhoan = getState().QuanLyNguoiDungReducer.userLogin.taiKhoan;
        // danhSachgheDangDat = JSON.stringify(danhSachgheDangDat)
        


        // callAPI 
        // connection.invoke('datGhe',taiKhoan,danhSachgheDangDat,maLichChieu);

    }
}