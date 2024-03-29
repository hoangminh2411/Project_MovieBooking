import { quanLyPhimService } from '../../services/QuanLyPhimService';
import { LAY_THONG_TIN_PHIM, SET_DANH_SACH_FILM } from '../types/QuanLyPhimType';

import {hideLoadingAction,displayLoadingAction} from "../actions/LoadingAction"
import {history} from '../../App'
import Toast from '../../components/Toast/Toast';
export const  layDanhSachPhimAction = (tenPhim) => {
    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction)
            const result = await quanLyPhimService.layDanhSachPhim(tenPhim);
            await dispatch({
                type: SET_DANH_SACH_FILM,
                movieList: result.data.content
            })
             dispatch(hideLoadingAction)
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

export const themPhimUploadHinhAction = (formData) => {
    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction)
            await quanLyPhimService.themPhimUploadHinhAnh(formData);
            alert('Thêm thành công')
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


export const capNhapPhimUploadHinhAnhAction = (formData) => {
    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction)
            await quanLyPhimService.capNhapPhimUploadHinhAnh(formData);
            alert('cập nhập thành công')
            dispatch(layDanhSachPhimAction());
            dispatch(hideLoadingAction)
            history.push('/admin/films');

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



export const layThongTinPhimAction =  (maPhim) => {
    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction)
            let result = await quanLyPhimService.layThongTinPhim(maPhim); 
            await dispatch({
                type: LAY_THONG_TIN_PHIM,
                thongTinPhim: result.data.content
            })
            dispatch(hideLoadingAction)
        }
        catch(errors) {
            dispatch(hideLoadingAction)
            const {statusCode,content} =  errors?.response?.data;
            if(statusCode===403){
                history.push('/maintenance')
            }
            Toast('error','ERROR',content)
        }
    }
}

export const xoaPhimAction = (maPhim) => {
    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction)
            await quanLyPhimService.xoaPhim(maPhim);
            alert('Xóa phim thành công');
            // sau khi xóa load lại danh sách phim mới
            await dispatch(layDanhSachPhimAction());     
            dispatch(hideLoadingAction)
        }
        catch(errors) {
            dispatch(hideLoadingAction)
            const {statusCode,content} =  errors?.response?.data;
            if(statusCode===403){
                history.push('/maintenance')
            }
            Toast('error','ERROR',content)
        }
    }
}