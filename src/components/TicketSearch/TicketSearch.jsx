import React, { useEffect, useState, memo } from 'react'

import { Select } from 'antd';

import moment from 'moment'

import styles from './TicketSearch.module.scss'

import { quanLyPhimService } from '../../services/QuanLyPhimService';
import { quanLyRapService } from '../../services/QuanLyRapService';

import _, { conforms } from 'lodash';

import { history } from '../../App'

function TicketSearch() {
    const { Option } = Select;

    const [state, setState] = useState({
        phim: undefined,
        maPhim: undefined,
        
        heThongRapChieu: undefined,
        cumRapChieu: undefined,
        tenRapChieu: undefined,

        ngayChieu: undefined,
        day: undefined,
        gioChieu: undefined,

        maLichChieu: null,

        checkP: false,
        checkR: false,
        checkD: false,

       
    })
    useEffect(() => {
        async function fechData() {
            try {
                let result = await quanLyPhimService.layDanhSachPhim();
                setState({
                    ...state,
                    phim: result.data.content
                })

            }
            catch (error) {
                console.log(error)
            }
        }
        fechData()
    }, [])
    const handleChangeFilm = async (value) => {
        if (value !== undefined) {
            if (value !== state.maPhim) {
                
                document.querySelectorAll('.ant-select-selection-item').forEach((item, index) => {
                    if (index > 0) {
                        item.innerHTML = "...."
                    }
                })
            }
            try {
                let result = await quanLyRapService.layThongTinLichChieuPhim(value);
                setState({
                    ...state,
                    maPhim: value,
                    maLichChieu: null,
                    checkP: true,
                    heThongRapChieu: result.data.content.heThongRapChieu,
                    ngayChieu: undefined,
                    gioChieu: undefined,
                    maLichChieu: null,

                })
            }
            catch (errors) {
                console.log('errors', errors)
            }
        }
        else {

            document.querySelectorAll('.ant-select-selection-item').forEach((item) => {
                item.innerHTML = "...."
            })

            setState({
                ...state,
                heThongRapChieu: undefined,
                cumRapChieu: undefined,
                ngayChieu: undefined,
                gioChieu: undefined,
                maLichChieu: null,

            })
        }
    }
    const handleChangeRap = (value) => {
        if (value !== undefined) {
            if (value !== state.tenRapChieu) {
                document.querySelectorAll('.ant-select-selection-item').forEach((item, index) => {
                    if (index > 1) {
                        item.innerHTML = "...."
                    }
                })
            }

            let cumRap = state.heThongRapChieu?.map((heThongRap, index) => {
                return heThongRap.cumRapChieu?.filter((item, index) => {
                    return item.tenCumRap === value
                })
            })
            let cumRapSelect = cumRap.filter((item, index) => {
                return item.length > 0
            })

            let ngayChieu = cumRapSelect.map((cumRap, index) => {

                return cumRap.map((rap, index) => {
                    return rap.lichChieuPhim.map((film, index) => {

                        return film.ngayChieuGioChieu.slice(0, 10)
                    })
                })
            })
            let ngayChieuSelect = _.uniq(...ngayChieu[0])
            setState({
                ...state,
                checkP: false,
                checkR: true,
                maLichChieu: null,
                cumRapChieu: cumRapSelect,
                tenRapChieu: value,
                ngayChieu: ngayChieuSelect,
                gioChieu: undefined,
                maLichChieu: null,
            })
        }


    }

    const handleChangeNgayXem = (value) => {
        
        if (value !== undefined) {
            if (value !== state.day) {
                document.querySelectorAll('.ant-select-selection-item').forEach((item, index) => {
                    if (index > 2) {
                        item.innerHTML = "...."
                    }
                   
                })
            }
            else{
                document.querySelectorAll('.ant-select-selection-item').forEach((item, index) => {
                    if (index === 2) {
                        item.innerHTML = value
                    }
                })
            }
            let gioChieu
            state.cumRapChieu.forEach((cumRap, index) => {

                cumRap.forEach((rap, index) => {
                    let result = rap.lichChieuPhim.filter((film, index) => {

                        return film.ngayChieuGioChieu.slice(0, 10) === value
                    })
                    gioChieu = result
                })
            })
            let gioChieuSelect = gioChieu;
            setState({
                ...state,
                checkR: false,
                checkD: true,
                day: value,
                maLichChieu: null,
                gioChieu: gioChieuSelect
            })
        }


    }

    const handleChangeGioXem = (value) => {

        if (value !== undefined) {
            document.querySelectorAll('.ant-select-selection-item').forEach((item, index) => {
                if (index === 3) {
                    item.innerHTML = value
                }
            })
            let maLichChieu;
            state.cumRapChieu.forEach((cumRap, index) => {
                cumRap.forEach((rap, index) => {
                    let result = rap.lichChieuPhim.filter((film, index) => {
                        let ngayGioConvert = moment(film.ngayChieuGioChieu).format('h:mm A');
                        return ngayGioConvert === value
                    })
                    maLichChieu = result
                })
            })
            let maLichChieuSelect = maLichChieu[0].maLichChieu
            setState({
                ...state,
                checkD: false,
                disabled:false,
                maLichChieu: maLichChieuSelect
            })
        }


    }
    
    return (

        <div className={`${styles['wrapper']}`}>

            <div className={`${styles['select-item']}`}>
                <div className="border-r-2 ">
                    <Select
                        dropdownMatchSelectWidth={false}
                        allowClear
                        showSearch
                        style={{ width: 220 }}
                        bordered={false}
                        optionFilterProp="children"
                        filterOption={(input, option) => option.children.includes(input)}
                        filterSort={(optionA, optionB) =>
                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        }
                        onChange={handleChangeFilm}
                        placeholder="Tìm phim...">
                        {state.phim?.filter((phim) => phim.dangChieu === true).map((phim, index) => {
                            return <Option key={index} value={phim.maPhim}>{phim.tenPhim}</Option>
                        })}
                    </Select>

                </div>
            </div>

            <div className={`${styles['select-item']}`}>
                <div className="border-r-2 ">
                    <Select notFoundContent={state.heThongRapChieu === undefined ? "vui lòng chọn phim" : (state.heThongRapChieu.length > 0 ? "" : "Hiện tại không có rạp vui lòng chọn phim khác")}
                        dropdownMatchSelectWidth={false}

                        style={{ width: 140 }}
                        bordered={false}
                        open={state.checkP ? true : undefined}

                        loading={state.heThongRapChieu !== undefined ? false : true}
                        onChange={handleChangeRap}
                        placeholder="Rạp">
                        {state.heThongRapChieu?.map((heThongRap) => {

                            return heThongRap.cumRapChieu?.map((cumRap) => {

                                return <Option key={cumRap.tenCumRap} value={cumRap.tenCumRap}>{cumRap.tenCumRap}</Option>
                            })
                        })}
                    </Select>

                </div>
            </div>

            <div className={`${styles['select-item']}`}>
                <div className="border-r-2 ">
                    <Select notFoundContent={'Vui lòng chọn rạp'}
                        dropdownMatchSelectWidth={false}

                        style={{ width: 140 }}
                        bordered={false}
                        onSelect={handleChangeNgayXem}
                        loading={state.ngayChieu !== undefined ? false : true}
                        open={state.checkR ? true : undefined}

                        placeholder="Ngày xem">
                        {state.ngayChieu?.map((ngayChieu, index) => {
                            // return <Option  key={`ngay-chieu-${index}`} title={ngayChieu} value={ngayChieu}> {moment(ngayChieu).format('DD/MM/YYYY')}</Option>
                            return <Option key={`ngay-chieu-${index}`} value={ngayChieu.toString()}>{ngayChieu.toString()}</Option>
                        })}
                    </Select>

                </div>
            </div>

            <div className={`${styles['select-item']}`}>
                <div className="border-r-2 ">
                    <Select notFoundContent={'Vui lòng chọn ngày xem'}
                        dropdownMatchSelectWidth={false}

                        style={{ width: 140 }}
                        bordered={false}
                        onSelect={handleChangeGioXem}
                        loading={state.gioChieu !== undefined ? false : true}
                        open={state.checkD ? true : undefined}

                        placeholder="Xuất chiếu">

                        {state.gioChieu?.map((gioChieu, index) => {

                            let gioChieuCovert = moment(gioChieu.ngayChieuGioChieu).format('h:mm A').toString();

                            return <Option optionLabelProp={gioChieuCovert} key={`gio-chieu-${index}`} value={gioChieuCovert} />
                            // return <Option  key={`ngay-chieu-${index}`} value={gioChieuCovert}>{gioChieuCovert}</Option>
                        })}
                    </Select>
                </div>
            </div>
            <div className={`${styles['select-item']}`}>

                <button onClick={() => {
                    history.push(`/checkout/${state.maLichChieu}`)
                }} disabled={state.maLichChieu == null} className={state.maLichChieu == null ? `${styles['deactive']}` : `${styles['active']}`} >Mua vé ngay</button>

            </div>
        </div>
    )
}

export default memo(TicketSearch)
