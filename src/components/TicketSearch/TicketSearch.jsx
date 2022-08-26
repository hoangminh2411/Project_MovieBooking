import React, { useEffect, useState, memo } from 'react'

import { Select } from 'antd';

import moment from 'moment'

import styles from './TicketSearch.module.scss'

import { quanLyPhimService } from '../../services/QuanLyPhimService';
import { quanLyRapService } from '../../services/QuanLyRapService';

import _ from 'lodash';

import { history } from '../../App'

function TicketSearch() {
    const { Option } = Select;

    const [state, setState] = useState({
        phim: undefined,
        maPhim:undefined,
        heThongRapChieu: undefined,
        cumRapChieu: undefined,
        tenRapChieu:undefined,
        ngayChieu: undefined,
        day:undefined,
        gioChieu: undefined,
        maLichChieu: null,
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
            if(value!==state.maPhim){
                document.querySelectorAll('.ant-select-selection-item').forEach((item,index)=>{
                    if(index>0){
                        item.innerHTML="...."
                    }
               })
            }
            try {
                let result = await quanLyRapService.layThongTinLichChieuPhim(value);
                    setState({
                        ...state,
                        maPhim:value,
                        heThongRapChieu: result.data.content.heThongRapChieu
    
                    })  
            }
            catch (errors) {
                console.log('errors', errors)
            }
        }
        else{
            
           document.querySelectorAll('.ant-select-selection-item').forEach((item)=>{
                item.innerHTML="...."
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
            if(value!==state.tenRapChieu){
                document.querySelectorAll('.ant-select-selection-item').forEach((item,index)=>{
                    if(index>1){
                        item.innerHTML="...."
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
                cumRapChieu: cumRapSelect,
                tenRapChieu:value,
                ngayChieu: ngayChieuSelect
            })
        }
       

    }

    const handleChangeNgayXem = (value) => {
       
        if (value !== undefined) {
            if(value!==state.day){
                document.querySelectorAll('.ant-select-selection-item').forEach((item,index)=>{
                    if(index>2){
                        item.innerHTML="...."
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
                day:value,
                gioChieu: gioChieuSelect
            })
        }
       

    }

    const handleChangeGioXem = (value) => {
        if (value !== undefined) {
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
                    <Select notFoundContent={state.heThongRapChieu===undefined?"vui lòng chọn phim":(state.heThongRapChieu.length>0?"":"Hiện tại không có rạp vui lòng chọn phim khác")}
                        dropdownMatchSelectWidth={false}
                        
                        style={{ width: 140 }}
                        bordered={false}
                        
                        loading={state.heThongRapChieu!== undefined?false:true}
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
                        onChange={handleChangeNgayXem}
                        loading={state.ngayChieu!== undefined?false:true}
                        placeholder="Ngày xem">
                        {state.ngayChieu?.map((ngayChieu, index) => {
                            // return <Option  key={`ngay-chieu-${index}`} title={ngayChieu} value={ngayChieu}> {moment(ngayChieu).format('DD/MM/YYYY')}</Option>
                            return <Option  key={`ngay-chieu-${index}`} value={ngayChieu.toString()}>{ngayChieu.toString()}</Option>
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
                        onChange={handleChangeGioXem}
                        loading={state.gioChieu!== undefined?false:true}
                        placeholder="Xuất chiếu">

                        {state.gioChieu?.map((gioChieu, index) => {
                           
                            let gioChieuCovert = moment(gioChieu.ngayChieuGioChieu).format('h:mm A').toString();
                            
                            return <Option optionLabelProp={gioChieuCovert} key={`gio-chieu-${index}`}  value={gioChieuCovert}/>
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
