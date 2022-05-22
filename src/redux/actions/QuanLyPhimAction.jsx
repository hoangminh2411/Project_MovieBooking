import { quanLyPhimService } from '../../services/QuanLyPhimService';
import { SET_DANH_SACH_FILM } from '../types/QuanLyPhimType';

import {hideLoadingAction,displayLoadingAction} from "../actions/LoadingAction"
export const  layDanhSachPhimAction = () => {
    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction)
            const result = await quanLyPhimService.layDanhSachPhim();
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