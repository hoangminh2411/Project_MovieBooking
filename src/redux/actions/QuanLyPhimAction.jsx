import { quanLyPhimService } from '../../services/QuanLyPhimService';
import { LAY_THONG_TIN_PHIM, SET_DANH_SACH_FILM } from '../types/QuanLyPhimType';

import {hideLoadingAction,displayLoadingAction} from "../actions/LoadingAction"
import {history} from '../../App'
export const  layDanhSachPhimAction = (tenPhim) => {
    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction)
            const result = await quanLyPhimService.layDanhSachPhim(tenPhim);
            await dispatch({
                type: SET_DANH_SACH_FILM,
                arrFilm: result.data.content
            })
             dispatch(hideLoadingAction)
        } catch (errors) {
             dispatch(hideLoadingAction)
            console.log('errors', errors)
        }
    }
}

export const themPhimUploadHinhAction = (formData) => {
    return async (dispatch) => {
        try {
            let result = await quanLyPhimService.themPhimUploadHinhAnh(formData);
            alert('Thêm thành công')
            console.log('result',result.data.content);

        }
        catch(errors) {
            console.log(errors)
        }
    }
}


export const capNhapPhimUploadHinhAnhAction = (formData) => {
    return async (dispatch) => {
        try {
            let result = await quanLyPhimService.capNhapPhimUploadHinhAnh(formData);
            alert('cập nhập thành công')
            console.log('result',result.data.content);
            dispatch(layDanhSachPhimAction());
            history.push('/admin/films');

        }
        catch(errors) {
            console.log(errors)
        }
    }
}



export const layThongTinPhimAction =  (maPhim) => {
    return async (dispatch) => {
        try {
            let result = await quanLyPhimService.layThongTinPhim(maPhim); 
            console.log('result',result.data.content);
            await dispatch({
                type: LAY_THONG_TIN_PHIM,
                thongTinPhim: result.data.content
            })
        }
        catch(errors) {
            console.log(errors)
        }
    }
}

export const xoaPhimAction = (maPhim) => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.xoaPhim(maPhim);
            alert('Xóa phim thành công');
            // sau khi xóa load lại danh sách phim mới
            await dispatch(layDanhSachPhimAction());     
        }
        catch(errors) {
            dispatch(hideLoadingAction)
            console.log('errors',errors)
        }
    }
}