
import { history } from "../../App"
import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDung"
import { DANG_KY_ACTION, DANG_NHAP_ACTION, LAY_DANH_SACH_NGUOI_DUNG, LAY_THONG_TIN_NGUOI_DUNG, SUA_THONG_TIN_NGUOI_DUNG } from "../types/QuanLyNguoiDungType"


import { message, Button } from 'antd';
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction";
import { USER_LOGIN } from "../../util/setting";

const handleLogin = (type,data) => {
    message[type](data,1);
}

export const dangNhapAction = (thongtinDangNhap) => {

    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction)
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
            dispatch(hideLoadingAction)
        }
        catch(errors) {
            dispatch(hideLoadingAction)
            dispatch(hideLoadingAction)
            const {statusCode,content} =  errors.response.data;
            if(statusCode===403){
                history.push('/maintenance')
            }
            handleLogin('error',`${errors.response.data.content}`)
            
        }
    }
}


export const dangKyAction = (thongtinDangKy) => {
    
    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction)
            const result = await quanLyNguoiDungService.dangKy(thongtinDangKy)
            if(result.status === 200) {
                alert('Đăng ký thành công!');
                // history.push('/login' )       
            }

            dispatch(hideLoadingAction)
        }
        catch(errors) {
            dispatch(hideLoadingAction)
            dispatch(hideLoadingAction)
            const {statusCode,content} =  errors.response.data;
            if(statusCode===403){
                history.push('/maintenance')
            }
            console.log(content)
            
        }
    }
}

export const suaThongTinNguoiDung = (thongTinNguoiDung)=>{
    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction)
            const result = await quanLyNguoiDungService.chinhSua(thongTinNguoiDung)

            if(result.status === 200) {
              await  dispatch({
                    type: SUA_THONG_TIN_NGUOI_DUNG,
                    thongTinThayDoi: result.data.content
                })
            
                handleLogin('success',`Thay đổi thành công`)  
            }
            dispatch(hideLoadingAction)
         
        }
        catch(errors) {
            dispatch(hideLoadingAction)
            const {statusCode,content} =  errors.response.data;
            if(statusCode===403){
                history.push('/maintenance')
            }
            handleLogin('error',content)
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
        }
        catch(errors) {
            dispatch(hideLoadingAction)
            const {statusCode,content} =  errors.response.data;
            if(statusCode===403){
                history.push('/maintenance')
            }
            console.log(content)
        }
    }
}

export const layDanhSachNguoiDung = () => {

    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction)
            const result = await quanLyNguoiDungService.layDanhSachNguoiDung()

            if(result.status === 200) {
                // successLogin(result.data.content.hoTen);
               await dispatch({
                    type:LAY_DANH_SACH_NGUOI_DUNG, 
                    danhSachNguoiDung: result.data.content
                });   
            }
            await dispatch(hideLoadingAction)
        }
        catch(errors) {
            dispatch(hideLoadingAction)
            const {statusCode,content} =  errors.response.data;
            if(statusCode===403){
                history.push('/maintenance')
            }
            console.log(content)
        }
    }
}

export const xoaNguoiDungAction = (taiKhoan) => {
    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction)
            const result = await quanLyNguoiDungService.xoaNguoiDung(taiKhoan)
            alert('xóa người dùng thành công')
            dispatch(layDanhSachNguoiDung())
            dispatch(hideLoadingAction)

        }
        catch(errors) {
            dispatch(hideLoadingAction)
            const {statusCode,content} =  errors.response.data;
            if(statusCode===403){
                history.push('/maintenance')
            }
            console.log(content)
        }
    }
}


export const capNhatThongTinNguoiDungAction  = (thongTinNguoiDung) => {
    return async (dispatch) => {
        try{
            dispatch(displayLoadingAction)
            const result = await quanLyNguoiDungService.capNhatThongTinNguoiDung(thongTinNguoiDung);
            alert('cập nhật người dùng thành công')
            dispatch(layDanhSachNguoiDung())
            dispatch(hideLoadingAction)
        }
        catch(errors) {
            dispatch(hideLoadingAction)
            const {statusCode,content} =  errors.response.data;
            if(statusCode===403){
                history.push('/maintenance')
            }
            console.log(content)
        }
    }
}