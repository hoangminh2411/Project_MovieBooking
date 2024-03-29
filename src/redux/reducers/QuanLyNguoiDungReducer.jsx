import { ACCESS_TOKEN, USER_LOGIN } from "../../util/setting";
import { DANG_NHAP_ACTION, LAY_DANH_SACH_NGUOI_DUNG, LAY_THONG_TIN_NGUOI_DUNG, SUA_THONG_TIN_NGUOI_DUNG, THOAT_ACTION } from "../types/QuanLyNguoiDungType"


let user = null;
if(localStorage.getItem(USER_LOGIN)){
    user = JSON.parse(localStorage.getItem(USER_LOGIN));
}


const stateDefault = {
    userLogin: user,
    thongTinNguoiDung:"",
    danhSachNguoiDung: [],

   
    // [{thongTinNguoiDung},{thongTinNguoiDung}]
}

export const QuanLyNguoiDungReducer = (state = stateDefault,action) =>{
    switch(action.type) {

        case DANG_NHAP_ACTION : {
            const {thongTinDangNhap} = action.payload;
            localStorage.setItem(USER_LOGIN,JSON.stringify(thongTinDangNhap));
            localStorage.setItem(ACCESS_TOKEN,JSON.stringify(thongTinDangNhap.accessToken));
            return {
                ...state,
                userLogin:thongTinDangNhap,
            }
        } 
        case THOAT_ACTION :{
            localStorage.clear();
            state.userLogin = null;
            return {...state}
        }

        case LAY_THONG_TIN_NGUOI_DUNG :{
            state.thongTinNguoiDung = action.thongTinNguoiDung
            return {...state}
        }
        case SUA_THONG_TIN_NGUOI_DUNG : {
            
            const {thongTinThayDoi} = action
            localStorage.setItem(USER_LOGIN,JSON.stringify(thongTinThayDoi));
            return {...state, userLogin:thongTinThayDoi}
        }
        case LAY_DANH_SACH_NGUOI_DUNG: {
            const {danhSachNguoiDung} = action
            state.danhSachNguoiDung = danhSachNguoiDung
            return {...state}
        }
        default:
            return {...state}
    }
}