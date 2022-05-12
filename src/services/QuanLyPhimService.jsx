import { GROUP_ID } from '../util/setting';
import {baseService} from './baseService'

export class QuanLyPhimService extends baseService {
    constructor() {
        super()
    }

    layDanhSachBanner = () => {
        return this.get(`api/QuanLyPhim/LayDanhSachBanner`);
    }

    layDanhSachPhim = () => {
        return this.get(`api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}`)
    }
}

export const quanLyPhimService = new QuanLyPhimService();

