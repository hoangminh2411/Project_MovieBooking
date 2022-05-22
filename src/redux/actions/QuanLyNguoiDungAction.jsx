
import { history } from "../../App"
import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDung"
import { DANG_KY_ACTION, DANG_NHAP_ACTION, LAY_THONG_TIN_NGUOI_DUNG } from "../types/QuanLyNguoiDungType"


import { message, Button } from 'antd';
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction";



export const dangNhapAction = (thongtinDangNhap) => {

    const handleLogin = (type,data) => {
        message[type](data,1);
    }

    
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.dangNhap(thongtinDangNhap)

            if(result.status === 200) {
                // successLogin(result.data.content.hoTen);
                handleLogin('success',`Mưng bạn trở lại ${result.data.content.hoTen}`)
                dispatch({
                    type:DANG_NHAP_ACTION, 
                    thongTinDangNhap: result.data.content
                });
                history.goBack();
                
            }

            console.log('result',result);
        }
        catch(errors) {
            handleLogin('error',`Tên đăng nhập hoặc mật khẩu sai`)
            console.log('erros Dang Nhap Action:',errors)
        }
    }
}


export const dangKyAction = (thongtinDangKy) => {
    
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.dangKy(thongtinDangKy)

            if(result.status === 200) {
                alert('Đăng ký thành công!');
                history.push('/login' )       
            }

            console.log('result',result);
        }
        catch(errors) {
            console.log('erros Dang Ky Action:',errors)
        }
    }
}

export const layThongTinNguoiDung = () => {

    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction)
            const result = await quanLyNguoiDungService.layLichSuDatVe()

            if(result.status === 200) {
                // successLogin(result.data.content.hoTen);
               await dispatch({
                    type:LAY_THONG_TIN_NGUOI_DUNG, 
                    thongTinNguoiDung: result.data.content
                });   
            }
            await dispatch(hideLoadingAction)
            console.log('result',result);
        }
        catch(errors) {

            console.log('erros Lay Thong Tin User Action:',errors)
        }
    }
}