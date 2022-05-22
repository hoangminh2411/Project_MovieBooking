import { GROUP_ID } from '../util/setting';
import {baseService} from './baseService'

export class QuanLyNguoiDungService extends baseService {
    constructor() {
        super()
    }
    
    dangNhap = (thongtinDangNhap) =>{ //{taiKhoan: '',matKhau:''}
        return this.post(`api/QuanLyNguoiDung/DangNhap`,thongtinDangNhap);
    }

    dangKy = (thongtinDangKy) => {
        return this.post(`api/QuanLyNguoiDung/DangKy`,thongtinDangKy);
    }

    layLichSuDatVe = () => {
        return this.post(`api/QuanLyNguoiDung/ThongTinTaiKhoan`)
    }
}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();

