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
    chinhSua = (thongTinNguoiDung) => {
        return this.put(`api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,thongTinNguoiDung);
    }
    

    layLichSuDatVe = () => {
        return this.post(`api/QuanLyNguoiDung/ThongTinTaiKhoan`)
    }
    
    layDanhSachNguoiDung = ()=>{
        return this.get(`api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP_ID}`)
    }

    xoaNguoiDung = (taiKhoan) => {
        return this.delete(`api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`)
    }

    capNhatThongTinNguoiDung =  (thongTinNguoiDung) => {
        return this.post(`api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,thongTinNguoiDung);
    }
}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();

