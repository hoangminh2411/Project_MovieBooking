
import { quanLyRapService } from "../../services/QuanLyRapService";
import { LAY_DANH_SAC_RAP } from "../types/QuanLyRapType";




export const  layDanhSachRapAction = () => {
    return async (dispatch) => {
        try {
            
            const result = await quanLyRapService.layDanhSachRap();
            console.log(result);
            if(result.status === 200){
                
                dispatch({
                    type: LAY_DANH_SAC_RAP,
                    heThongRapChieu: result.data.content
                })
            } 
        } catch (errors) {
            console.log('errors', errors)
        }
    }
}