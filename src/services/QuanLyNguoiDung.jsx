import { GROUP_ID } from '../util/setting';
import {baseService} from './baseService'

export class QuanLyNguoiDungService extends baseService {
    constructor() {
        super()
    }
    
    dangNhap = (thongtinDangNhap) =>{ //{taiKhoan: '',matKhau:''}
        return this.post(`api/QuanLyNguoiDung/DangNhap`,thongtinDangNhap);
    }

}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();

