import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { Select } from 'antd';
import { DatePicker, Space } from 'antd';
import { InputNumber } from 'antd';
import { useFormik } from 'formik'
import moment from 'moment'
import './TicketSearch.css'
import { useDispatch, useSelector } from 'react-redux';
import { layThongTinChiTietPhim } from '../../redux/actions/QuanLyRapAction';
import { quanLyPhimService } from '../../services/QuanLyPhimService';
import { quanLyRapService } from '../../services/QuanLyRapService';
import _ from 'lodash';
import { NavLink } from 'react-router-dom';
import {history} from '../../App'
export default function TicketSearch() {
    const { Option } = Select;
    const { arrFilm } = useSelector(state => state.QuanLyPhimReducer);
    const filmDetail = useSelector(state => state.QuanLyPhimReducer.filmDetail)
    const dispatch = useDispatch()
    const [state, setState] = useState({
        phim: [],
        heThongRapChieu: [],
        cumRapChieu: [],
        ngayChieu: [],
        gioChieu:[],
        maLichChieu:null,
    })
    useEffect(() => {
        async function fechData() {
            try {
                let result = await quanLyPhimService.layDanhSachPhim();
                setState({
                    ...state,
                    phim: result.data.content
                })

                console.log('phim search', state.phim)
            }
            catch (error) {
                console.log(error)
            }
        }
        fechData()
    }, [])
    const handleChangeFilm = async (value) => {

        try {
            let result = await quanLyRapService.layThongTinLichChieuPhim(value);

            setState({
                ...state,
                heThongRapChieu: result.data.content.heThongRapChieu

            })
        }
        catch (errors) {
            console.log('errors', errors)
        }
    }
    console.log('heThongRapChieu', state.heThongRapChieu);
    const handleChangeRap = (value) => {
        let cumRap = state.heThongRapChieu?.map((heThongRap, index) => {
            return heThongRap.cumRapChieu?.filter((item, index) => {
                return item.tenCumRap === value
            })
        })
        let cumRapSelect = cumRap.filter((item, index) => {
            return item.length > 0
        })

        let ngayChieu  = cumRapSelect.map((cumRap, index) => {
                            
            return cumRap.map((rap, index) => {
                return rap.lichChieuPhim.map((film,index)=>{

                    return film.ngayChieuGioChieu.slice(0,10)
            })
        })})
        let ngayChieuSelect = _.uniq(...ngayChieu[0])
        setState({
            ...state,
            cumRapChieu: cumRapSelect,
            ngayChieu: ngayChieuSelect
        })
    }
    console.log('cumRapChieu',state.cumRapChieu)
    const handleChangeNgayXem = (value) => {
        let gioChieu  = state.cumRapChieu.map((cumRap, index) => {
                            
            return cumRap.map((rap, index) => {
                return rap.lichChieuPhim.filter((film,index)=>{

                    return film.ngayChieuGioChieu.slice(0,10) == value
            })
        })})
        let gioChieuSelect = gioChieu[0][0];
        setState({
            ...state,
            gioChieu:gioChieuSelect
        })
    }

    const handleChangeGioXem = (value) => {
        let maLichChieu  = state.cumRapChieu.map((cumRap, index) => {
                            
            return cumRap.map((rap, index) => {
                return rap.lichChieuPhim.filter((film,index)=>{

                    return film.ngayChieuGioChieu == value
            })
        })})
        let maLichChieuSelect = maLichChieu[0][0][0].maLichChieu
        console.log('asd',maLichChieuSelect);
        setState({
            ...state,
            maLichChieu: maLichChieuSelect
        })
    }
    
    return (
        <div className="SearchTicket flex">
            <div className="p-2 pr-5">
                <div className="border-r-2 ">
                    <Select showSearch style={{ width: 220 }} bordered={false} optionFilterProp="children"
                        filterOption={(input, option) => option.children.includes(input)}
                        filterSort={(optionA, optionB) =>
                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        } onChange={handleChangeFilm} placeholder="Tìm phim...">
                        {state.phim?.map((phim, index) => {
                            return <Option value={phim.maPhim}>{phim.tenPhim}</Option>
                        })}
                    </Select>

                </div>
            </div>
            <div className="p-2 pr-5">
                <div className="border-r-2 ">
                    <Select style={{ width: 140 }} bordered={false}
                        onChange={handleChangeRap} placeholder="Rạp">
                        {state.heThongRapChieu?.map((heThongRap, index) => {
                           
                            return heThongRap.cumRapChieu?.map((cumRap, index) => {

                                return <Option value={cumRap.tenCumRap}>{cumRap.tenCumRap}</Option>
                            })
                        })}
                    </Select>

                </div>
            </div>
            <div className="p-2 pr-5">
                <div className="border-r-2 ">
                    <Select style={{ width: 140 }} bordered={false}   onChange={handleChangeNgayXem} placeholder="Ngày xem">
                    {state.ngayChieu?.map((ngayChieu, index) => {
                           
                           return <Option value={ngayChieu}> {moment(ngayChieu).format('DD/MM/YYYY')}</Option>
                    })}
                    </Select>

                </div>
            </div>
            <div className="p-2 pr-5">
                <div className="border-r-2 ">
                    <Select style={{ width: 140 }} bordered={false} onChange={handleChangeGioXem} placeholder="Xuất chiếu">
                        {state.gioChieu?.map((gioChieu,index)=> {
                            return <Option value={gioChieu.ngayChieuGioChieu}> {moment(gioChieu.ngayChieuGioChieu).format('h:mm A')}</Option>
                        })}
                    </Select>
                </div>
            </div>
            <div className="p-2">

                <button onClick={()=>{
                    history.push(`/checkout/${state.maLichChieu}`)
                }} disabled={state.maLichChieu == null} className={state.maLichChieu == null? 'datVeButton rounded px-6 py-2  text-white uppercase': 'bg-orange-400 rounded px-6 py-2  text-white uppercase hover:bg-orange-700 transition'} >Mua vé ngay</button>
                
            </div>
        </div>
    )
}
