/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState, memo } from 'react'

import { Select } from 'antd';

import moment from 'moment'

import styles from './TicketSearch.module.scss'

import { quanLyPhimService } from '../../services/QuanLyPhimService';
import { quanLyRapService } from '../../services/QuanLyRapService';

import _ from 'lodash';

import { history } from '../../App'
const RESET_SELECT_PHIM = {
    maPhim: undefined,

    heThongRapChieu: undefined,
    cumRapChieu: undefined,
    tenRapChieu: undefined,

    ngayChieuList: undefined,
    ngayChieu: undefined,
    gioChieuList: undefined,
    gioChieu: undefined,

    maLichChieu: null,

    checkP: false,
    checkR: false,
    checkD: false,
}
function TicketSearch() {
    const { Option } = Select;

    const [state, setState] = useState({
        phim: undefined,
        maPhim: undefined,

        heThongRapChieu: undefined,
        cumRapChieu: undefined,
        tenRapChieu: undefined,

        ngayChieuList: undefined,
        ngayChieu: undefined,
        gioChieuList: undefined,
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
            catch (errors) {
                console.log(errors.response.data.content)
            }
        }
        fechData()
    }, [])

    const handleChangeFilm = async (value) => {
        if (value !== undefined) {
            if (value !== state.maPhim) {
                setState({
                    ...state,
                    heThongRapChieu: undefined,
                    cumRapChieu: undefined,
                    tenRapChieu: undefined,

                    ngayChieuList: undefined,
                    ngayChieu: undefined,
                    gioChieuList: undefined,
                    gioChieu: undefined,

                    maLichChieu: null,
                })

            }
            try {
                let result = await quanLyRapService.layThongTinLichChieuPhim(value);
                setState({
                    ...state,
                    maPhim: value,
                    checkP: true,

                    heThongRapChieu: result.data.content.heThongRapChieu,
                    cumRapChieu: undefined,
                    tenRapChieu: undefined,

                    ngayChieuList: undefined,
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
            setState({
                ...state,
                ...RESET_SELECT_PHIM
            })
        }
    }
    const handleChangeRap = (value) => {
        if (value !== undefined) {
            if (value !== state.tenRapChieu) {
                setState({
                    ...state,
                    ngayChieuList: undefined,
                    ngayChieu: undefined,
                    gioChieuList: undefined,
                    gioChieu: undefined,

                    maLichChieu: null,
                })
            }

            let cumRap = state.heThongRapChieu?.map((heThongRap) => {
                return heThongRap.cumRapChieu?.filter((item) => {
                    return item.tenCumRap === value
                })
            })
            let cumRapSelect = cumRap.filter((item) => {
                return item.length > 0
            })

            let ngayChieu = cumRapSelect.map((cumRap) => {

                return cumRap.map((rap) => {
                    return rap.lichChieuPhim.map((film) => {

                        return film.ngayChieuGioChieu.slice(0, 10)
                    })
                })
            })
            let ngayChieuSelect = _.uniq(...ngayChieu[0])
            setState({
                ...state,
                checkP: false,

                cumRapChieu: cumRapSelect,
                tenRapChieu: value,
                checkR: true,


                ngayChieuList: ngayChieuSelect,
                ngayChieu: undefined,
                gioChieu: undefined,

                maLichChieu: null,

            })
        }


    }
    const handleChangeNgayXem = (value) => {

        if (value !== undefined) {
            if (value !== state.ngayChieu) {
                setState({
                    ...state,
                    gioChieuList: undefined,
                    gioChieu: undefined,

                    maLichChieu: null,
                })
            }
            else {
                document.querySelectorAll('.ant-select-selection-item').forEach((item, index) => {
                    if (index === 2) {
                        item.innerHTML = value
                    }
                })
            }
            let gioChieu
            state.cumRapChieu.forEach((cumRap) => {

                cumRap.forEach((rap) => {
                    let result = rap.lichChieuPhim.filter((film) => {

                        return film.ngayChieuGioChieu.slice(0, 10) === value
                    })
                    gioChieu = result
                })
            })
            let gioChieuSelect = gioChieu;
            setState({
                ...state,
                checkP: false,

                checkR: false,

                checkD: true,
                ngayChieu: value,

                gioChieuList: gioChieuSelect,
                gioChieu: undefined,

                maLichChieu: null,
            })
        }


    }
    const handleChangeGioXem = (value) => {

        if (value !== undefined) {
            let maLichChieu;
            state.cumRapChieu?.forEach((cumRap) => {
                cumRap.forEach((rap) => {
                    let result = rap.lichChieuPhim.filter((film) => {
                        let ngayGioConvert = moment(film.ngayChieuGioChieu).format('HH:mm');
                        return ngayGioConvert === value
                    })
                    maLichChieu = result
                })
            })
            let maLichChieuSelect = maLichChieu[0].maLichChieu
            setState({
                ...state,
                checkP: false,

                checkR: false,

                checkD: false,
                gioChieu: value,

                disabled: false,
                maLichChieu: maLichChieuSelect
            })
        }


    }
    const handleBuyTicket = () => {
        history.push(`/checkout/${state.maLichChieu}`)
    }
    return (
        <div className={`${styles['wrapper']}`}>
            <div className={`${styles['select-item']}`}>
                <div className="border-r-2 ">
                    <Select
                        value={state.maPhim}
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
                            return <Option
                                key={index}
                                value={phim.maPhim}
                            >
                                {phim.tenPhim}
                            </Option>
                        })}
                    </Select>
                </div>
            </div>
            <div className={`${styles['select-item']}`}>
                <div className="border-r-2 ">
                    <Select
                        value={state.tenRapChieu}
                        notFoundContent={state.heThongRapChieu === undefined ? "vui lòng chọn phim" : (state.heThongRapChieu.length > 0 ? "" : "Hiện tại không có rạp vui lòng chọn phim khác")}
                        dropdownMatchSelectWidth={false}
                        style={{ width: 140 }}
                        bordered={false}
                        open={state.checkP ? true : undefined}
                        loading={state.heThongRapChieu !== undefined ? false : true}
                        onChange={handleChangeRap}
                        placeholder="Rạp">
                        {state.heThongRapChieu?.map((heThongRap) => {
                            return heThongRap.cumRapChieu?.map((cumRap) => {
                                return <Option
                                    key={cumRap.tenCumRap}
                                    value={cumRap.tenCumRap}
                                >
                                    {cumRap.tenCumRap}
                                </Option>
                            })
                        })}
                    </Select>
                </div>
            </div>

            <div className={`${styles['select-item']}`}>
                <div className="border-r-2 ">
                    <Select
                        value={state.ngayChieu}
                        notFoundContent={'Vui lòng chọn rạp'}
                        dropdownMatchSelectWidth={false}
                        style={{ width: 140 }}
                        bordered={false}
                        onSelect={handleChangeNgayXem}
                        loading={state.ngayChieu !== undefined ? false : true}
                        open={state.checkR ? true : undefined}
                        placeholder="Ngày xem">
                        {state.ngayChieuList?.map((ngayChieu, index) => {
                            return <Option
                                key={`ngay-chieu-${index}`}
                                value={ngayChieu.toString()}
                            >
                                {moment(ngayChieu).format('DD/MM/YYYY').toString()}
                            </Option>
                        })}
                    </Select>
                </div>
            </div>

            <div className={`${styles['select-item']}`}>
                <div className="border-r-2 ">
                    <Select
                        value={state.gioChieu}
                        notFoundContent={'Vui lòng chọn ngày xem'}
                        dropdownMatchSelectWidth={false}
                        style={{ width: 140 }}
                        bordered={false}
                        onSelect={handleChangeGioXem}
                        loading={state.gioChieu !== undefined ? false : true}
                        open={state.checkD ? true : undefined}
                        placeholder="Xuất chiếu"
                    >
                        {state.gioChieuList?.map((gioChieu, index) => {
                            let gioChieuCovert = moment(gioChieu.ngayChieuGioChieu).format('HH:mm').toString();
                            return <Option
                                optionLabelProp={gioChieuCovert}
                                key={`gio-chieu-${index}`}
                                value={gioChieuCovert}
                            />
                        })}
                    </Select>
                </div>
            </div>
            <div className={`${styles['select-item']}`}>
                <button
                    onClick={handleBuyTicket}
                    disabled={state.maLichChieu == null}
                    className={state.maLichChieu == null ? `${styles['deactive']}` : `${styles['active']}`}
                >
                    Mua vé ngay
                </button>
            </div>
        </div>
    )
}
export default memo(TicketSearch)
