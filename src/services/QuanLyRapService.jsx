import { GROUP_ID } from '../util/setting';
import {baseService} from './baseService'

export class QuanLyRapService extends baseService {
   
    layDanhSachRap = () => {
        return this.get(`api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUP_ID}`);
    }

    layThongTinLichChieuPhim = (maPhim) =>{
        return this.get(`api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`);
    }

    layThongTinHeThongRap = () => {
        return this.get(`api/QuanLyRap/LayThongTinHeThongRap`);
    }

    layThongTinCumRap = (maHeThongRap) => {
        return this.get(`api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`)
    }
}

export const quanLyRapService = new QuanLyRapService();

