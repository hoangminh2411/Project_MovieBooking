import { GROUP_ID } from '../util/setting';
import {baseService} from './baseService'

export class QuanLyPhimService extends baseService {
 
    layDanhSachBanner = () => {
        return this.get(`api/QuanLyPhim/LayDanhSachBanner`);
    }

    layDanhSachPhim = (tenPhim = '') => {
        if(tenPhim !== '') {
            return this.get(`api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}&tenPhim=${tenPhim}`)
        }
        return this.get(`api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}`)
    }

    themPhimUploadHinhAnh = (formData) => {
        return this.post(`api/QuanLyPhim/ThemPhimUploadHinh`,formData)
    }

    capNhapPhimUploadHinhAnh = (formData) => {
        return this.post(`api/QuanLyPhim/CapNhatPhimUpload`,formData)
    }

    xoaPhim = (maPhim) => {
        return this.delete(`api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`)
    }

    layThongTinPhim = (maPhim) => {
        return this.get(`api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`)
    }


}

export const quanLyPhimService = new QuanLyPhimService();

