import { history } from "../../App"
import { message } from 'antd';

import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDung"

import {DANG_NHAP_ACTION, LAY_DANH_SACH_NGUOI_DUNG, LAY_THONG_TIN_NGUOI_DUNG, SUA_THONG_TIN_NGUOI_DUNG } from "../types/QuanLyNguoiDungType"
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction";
import Toast from "../../components/Toast/Toast";


const handleLogin = (type, data) => {
    message[type](data, 1);
}

export const dangNhapAction = (thongtinDangNhap) => {

    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction)
            const result = await quanLyNguoiDungService.dangNhap(thongtinDangNhap)

            if (result.status === 200) {
                // successLogin(result.data.content.hoTen);
                handleLogin('success', `Mưng bạn trở lại ${result.data.content.hoTen}`)
                dispatch({
                    type: DANG_NHAP_ACTION,
                    payload: {
                        thongTinDangNhap: result.data.content,
                    }
                });
                history.goBack();

            }
            dispatch(hideLoadingAction)
        }
        catch (errors) {
            dispatch(hideLoadingAction)
            if(errors.message ==="Network Error") {
                Toast('error','ERROR',"mất kết nối với internet vui lòng kiểm tra lại")
            }else{

                const { statusCode, content } = errors?.response?.data;
                if (statusCode === 403) {
                    history.push('/maintenance')
                }
                Toast('error','ERROR',content)
            }

        }
    }
}


export const dangKyAction = (thongtinDangKy) => {

    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction)
            const result = await quanLyNguoiDungService.dangKy(thongtinDangKy)
            if (result.status === 200) {
                alert('Đăng ký thành công!');
                history.push('/login' )       
            }

            dispatch(hideLoadingAction)
        }
        catch (errors) {
            dispatch(hideLoadingAction)
            
            if(errors.message ==="Network Error") {
                Toast('error','ERROR',"mất kết nối với internet vui lòng kiểm tra lại")
            }else{

                const { statusCode, content } = errors?.response?.data;
                if (statusCode === 403) {
                    history.push('/maintenance')
                }
                Toast('error','ERROR',content)
            }

        }
    }
}

export const suaThongTinNguoiDung = (thongTinNguoiDung) => {
    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction)
            const result = await quanLyNguoiDungService.chinhSua(thongTinNguoiDung)

            if (result.status === 200) {
                await dispatch({
                    type: SUA_THONG_TIN_NGUOI_DUNG,
                    thongTinThayDoi: result.data.content
                })
                history.push('/login' )    
                Toast('success','Thành Công','Thay đổi thông tin thành công mời bạn đăng nhập lại')
            }
            dispatch(hideLoadingAction)

        }
        catch (errors) {
            dispatch(hideLoadingAction)
            if(errors.message ==="Network Error") {
                Toast('error','ERROR',"mất kết nối với internet vui lòng kiểm tra lại")
            }else{

                const { statusCode, content } = errors?.response?.data;
                if (statusCode === 403) {
                    history.push('/maintenance')
                }
                Toast('error','ERROR',content)
            }
        }
    }
}

export const layThongTinNguoiDung = () => {

    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction)
            const result = await quanLyNguoiDungService.layLichSuDatVe()
            if (result.status === 200) {
                await dispatch({
                    type: LAY_THONG_TIN_NGUOI_DUNG,
                    thongTinNguoiDung: result.data.content
                });
            }
            await dispatch(hideLoadingAction)
        }
        catch (errors) {
            dispatch(hideLoadingAction)
            if(errors.message ==="Network Error") {
                Toast('error','ERROR',"mất kết nối với internet vui lòng kiểm tra lại")
            }else{

                const { statusCode, content } = errors?.response?.data;
                if (statusCode === 403) {
                    history.push('/maintenance')
                }
                Toast('error','ERROR',content)
            }
        }
    }
}

export const layDanhSachNguoiDung = () => {

    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction)
            const result = await quanLyNguoiDungService.layDanhSachNguoiDung()

            if (result.status === 200) {
                // successLogin(result.data.content.hoTen);
                await dispatch({
                    type: LAY_DANH_SACH_NGUOI_DUNG,
                    danhSachNguoiDung: result.data.content
                });
            }
            await dispatch(hideLoadingAction)
        }
        catch (errors) {
            dispatch(hideLoadingAction)
            if(errors.message ==="Network Error") {
                Toast('error','ERROR',"mất kết nối với internet vui lòng kiểm tra lại")
            }else{

                const { statusCode, content } = errors?.response?.data;
                if (statusCode === 403) {
                    history.push('/maintenance')
                }
                Toast('error','ERROR',content)
            }
        }
    }
}

export const xoaNguoiDungAction = (taiKhoan) => {
    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction)
            await quanLyNguoiDungService.xoaNguoiDung(taiKhoan)
            Toast('success','Thành công','Xóa thông tin người dùng thành công')
            dispatch(layDanhSachNguoiDung())
            dispatch(hideLoadingAction)

        }
        catch (errors) {
            dispatch(hideLoadingAction)
            if(errors.message ==="Network Error") {
                Toast('error','ERROR',"mất kết nối với internet vui lòng kiểm tra lại")
            }else{

                const { statusCode, content } = errors?.response?.data;
                if (statusCode === 403) {
                    history.push('/maintenance')
                }
                Toast('error','ERROR',content)
            }
        }
    }
}


export const capNhatThongTinNguoiDungAction = (thongTinNguoiDung) => {
    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction)
            await quanLyNguoiDungService.capNhatThongTinNguoiDung(thongTinNguoiDung);
            Toast('success','Thành công','Cập nhật thông tin người dùng thành công')
            dispatch(layDanhSachNguoiDung())
            dispatch(hideLoadingAction)
        }
        catch (errors) {
            dispatch(hideLoadingAction)
            if(errors.message ==="Network Error") {
                Toast('error','ERROR',"mất kết nối với internet vui lòng kiểm tra lại")
            }else{

                const { statusCode, content } = errors?.response?.data;
                if (statusCode === 403) {
                    history.push('/maintenance')
                }
                Toast('error','ERROR',content)
            }
        }
    }
}