
import { ThongTinDatVe } from '../_core/models/ThongTinDatVe';
import {baseService} from './baseService'

export class QuanLyDatVeService extends baseService {
    
    layChiTietPhongVe = (maLichChieu) =>{ //mã lịch chiếu lấy từ url
        return this.get(`api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`);
    }

    datVe = (thongTinDatVe = (new ThongTinDatVe())) => { 
        return this.post(`api/QuanLyDatVe/DatVe`,thongTinDatVe)
    }
    
    taoLichChieu = (thongTinLichChieu) => {
        return this.post(`api/QuanLyDatVe/TaoLichChieu`,thongTinLichChieu)
    }

}

export const quanLyDatVeService = new QuanLyDatVeService();

