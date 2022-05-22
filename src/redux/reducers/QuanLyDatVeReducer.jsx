import { ThongTinLichChieu } from "../../_core/models/ThongTinPhongVe";
import { DAT_GHE, DAT_VE_THANH_CONG, SET_CHI_TIET_PHONG_VE } from "../types/QuanLyDatVeType"

export const soGheKhongVuotQua = 5;

const stateDefault = {
    chiTietPhongVe: new ThongTinLichChieu,
    danhSachGheDangDat: [],
    backUpDanhSachGheDangDat: [],
    danhSachgheKhachDat:[],
    //:[{maGhe:50921},{maGhe:50922}]
    soGheChoPhep: false,
    datVeThanhCong: false
    
}


export const QuanLyDatVeReducer = (state= stateDefault,action) => {

    switch(action.type) {

        case SET_CHI_TIET_PHONG_VE : {
            state.chiTietPhongVe = action.chiTietPhongVe;
            return {...state}
        }

        case DAT_GHE : {
            //Cập nhật danh sách ghế đang đặt
            let danhSachGheCapNhat =  [...state.danhSachGheDangDat];

            let index = danhSachGheCapNhat.findIndex(gheDD => gheDD.maGhe === action.gheDuocChon.maGhe);
            
            if(index != -1) {
                // Nếu tìm thấy ghế được chọn trong mảng có nghĩa là trước đó đã có click vào => xóa đi
                danhSachGheCapNhat.splice(index,1);
                
            }
            else if(danhSachGheCapNhat.length< soGheKhongVuotQua) {
                danhSachGheCapNhat.push(action.gheDuocChon);
                state.soGheChoPhep = false;
            }
            else{
                state.soGheChoPhep = true;
            }
            return {...state , danhSachGheDangDat:danhSachGheCapNhat}
        }
        
        case 'VUOT_QUA_SO_GHE_CHO_PHEP' :{
            state.soGheChoPhep = false;
            return {...state}
        }

        case DAT_VE_THANH_CONG : {
            state.backUpDanhSachGheDangDat =  state.danhSachGheDangDat;
            state.danhSachGheDangDat=[];
            state.datVeThanhCong = true;
            return {...state}
        }

        case 'DAT_GHE_SOCKET':{
            state.danhSachgheKhachDat = action.arrGheKhachDat;
            return {...state}
        }
        

        default: return {...state}
    }
}