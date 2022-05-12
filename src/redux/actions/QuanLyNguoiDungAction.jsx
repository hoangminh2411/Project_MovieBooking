
import { history } from "../../App"
import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDung"
import { DANG_NHAP_ACTION } from "../types/QuanLyNguoiDungType"





export const dangNhapAction = (thongtinDangNhap) => {
    
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.dangNhap(thongtinDangNhap)

            if(result.status === 200) {
                history.push('/home')
                dispatch({
                    type:DANG_NHAP_ACTION, 
                    thongTinDangNhap: result.data.content
                })          
            }

            console.log('result',result);
        }
        catch(errors) {
            console.log('erros Dang Nhap Action:',errors)
        }
    }
}