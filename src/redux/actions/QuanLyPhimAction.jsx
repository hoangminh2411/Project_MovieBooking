import { quanLyPhimService } from '../../services/QuanLyPhimService';
import { SET_DANH_SACH_FILM } from '../types/QuanLyPhimType';


export const  layDanhSachPhimAction = () => {
    return async (dispatch) => {
        try {
            
            const result = await quanLyPhimService.layDanhSachPhim();
            dispatch({
                type: SET_DANH_SACH_FILM,
                arrFilm: result.data.content
            })
        } catch (errors) {
            console.log('errors', errors)
        }
    }
}