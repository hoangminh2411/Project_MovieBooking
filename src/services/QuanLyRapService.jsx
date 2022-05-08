import { GROUP_ID } from '../util/setting';
import {baseService} from './baseService'

export class QuanLyRapService extends baseService {
    constructor() {
        super()
    }

    layDanhSachRap = () => {
        return this.get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUP_ID}`);
    }

    
}

export const quanLyRapService = new QuanLyRapService();

