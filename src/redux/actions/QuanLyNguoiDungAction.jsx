
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
                // history.push('/login' )       
            }

            console.log('result',result);
        }
        catch(errors) {
            console.log('erros Dang Ky Action:',errors.response.data)
        }
    }
}

export const suaThongTinNguoiDung = (thongTinNguoiDung)=>{
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.chinhSua(thongTinNguoiDung)

            if(result.status === 200) {
              await  dispatch({
                    type: SUA_THONG_TIN_NGUOI_DUNG,
                    thongTinThayDoi: result.data.content
                })
            
                handleLogin('success',`Thay đổi thành công`)  
            }
         
            console.log('result',result);
        }
        catch(errors) {
            console.log(errors)
            handleLogin('error',`Thay đổi thất bại`)
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
            console.log('result Danh Sach Nguoi Dung',result);
        }
        catch(errors) {

            console.log('erros Lay Danh Sach User Action:',errors)
        }
    }
}

export const xoaNguoiDungAction = (taiKhoan) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.xoaNguoiDung(taiKhoan)
            alert('xóa người dùng thành công')
            dispatch(layDanhSachNguoiDung())
            

        }
        catch(errors) {
            console.log('errors xóa người dùng',errors)
        }
    }
}


export const capNhatThongTinNguoiDungAction  = (thongTinNguoiDung) => {
    return async (dispatch) => {
        try{
            const result = await quanLyNguoiDungService.capNhatThongTinNguoiDung(thongTinNguoiDung);
            alert('cập nhật người dùng thành công')
            dispatch(layDanhSachNguoiDung())
        }
        catch(errors) {
            console.log('errors',errors)
        }
    }
}