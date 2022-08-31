import React, { useState, Fragment, memo } from 'react'

import { NavLink } from 'react-router-dom';

import PropTypes from 'prop-types';

import { Tabs } from 'antd';

import styles from './Theaters.module.scss'
import _ from 'lodash';
import moment from 'moment';
import localization from 'moment/locale/vi'
moment.updateLocale('vi',localization)
const MAXIMUM_LICH_CHIEU = 5
const { TabPane } = Tabs;
function Theaters({ heThongRapChieu }) {
    const [keyActiveBrand, setKeyAcctiveBrand] = useState(0)
    const [keyActiverap, setKeyAcctiverap] = useState(0)

    const handleAccessBrand = (key) => {
        setKeyAcctiveBrand(key);
        setKeyAcctiverap(0);
    }
    const handleAccessRap = (key) => {
        setKeyAcctiverap(key)
    }
    const renderNgayChieuPhim = (phim) =>{
        let ngayChieu = []
        phim.lstLichChieuTheoPhim?.slice(0, MAXIMUM_LICH_CHIEU).forEach((lichChieu) => {
            ngayChieu.push(lichChieu.ngayChieuGioChieu.slice(0, 10))      
        })
        ngayChieu = _.uniq(ngayChieu)
        const renderGioChieu =  (ngayChieu, phim)=>{
            let day = phim.lstLichChieuTheoPhim?.slice(0, MAXIMUM_LICH_CHIEU).filter((lichChieu) => ngayChieu===lichChieu.ngayChieuGioChieu.slice(0, 10))
            return day.map((lichChieu)=>{
                return <NavLink key={`${lichChieu.maLichChieu}`} to={`/checkout/${lichChieu.maLichChieu}`} className="px-1 py-1 bg-slate-100 rounded-lg mr-2 mb-2 cursor-pointer hover:bg-slate-200">
                        <span className="text-red-500 font-semibold">{moment(lichChieu.ngayChieuGioChieu).format('HH:mm ')}</span>
                        ~
                        <span className="text-gray-500 font-semibold">{moment(lichChieu.ngayChieuGioChieu).add(2,'hours').format('HH:mm ')}</span>
                </NavLink>
            })
                
            
        }
        return ngayChieu.map((ngayChieu,index)=>{
            return <div key={`${index} ${ngayChieu}`}>
                <h1  className="capitalize">{moment(ngayChieu).format('dddd')}, ngày {moment(ngayChieu).format('Do MMMM YYYY')}</h1>
                <div className="flex flex-wrap">
                     {renderGioChieu(ngayChieu,phim)}
                </div>
            </div>
    })
}
    const renderCumRap = () => {
        return heThongRapChieu?.map((heThongRap, index) => {
            return <TabPane
                style={{
                    maxHeight: 600,
                    minHeight: 600,
                    overflow: 'auto'
                }}
                key={heThongRap.maHeThongRap}
                tab={
                    <div className="border-b-2 pb-1">
                        <img
                            src={heThongRap.logo}
                            className={keyActiveBrand === index.toString() ?
                                'rounded-full w-10 h-10 opacity-100' :
                                'rounded-full w-10 h-10 opacity-20'}
                            alt="Hệ Thống Rạp Logo" />
                    </div>
                }>
                <Tabs
                    defaultActiveKey={0}
                    onTabClick={handleAccessRap}
                    tabPosition="left" 
                >
                    {heThongRap.lstCumRap?.map((cumRap, index) => {

                        return <TabPane
                            style={{ maxHeight: 600, minHeight: 600}}
                            key={cumRap.tenCumRap}
                            tab={
                                <div
                                    className={keyActiverap === index.toString() ?
                                        'opacity-100' : 'opacity-20'}
                                    style={{ display: 'flex' }}>

                                    {/* Hình ảnh rạp */}
                                    <img
                                        src={cumRap.hinhAnh}
                                        style={{ width: 60, height: 60 }}
                                        alt="Hình Ảnh Cụm Rạp" />
                                    <br />
                                    {/* Thông tin rạp */}
                                    <div className="ml-2 text-left">
                                        <h1 className="my-0">{cumRap.tenCumRap}</h1>
                                        <p
                                            className="text-red-200 my-0 "
                                        >
                                            {cumRap.diaChi.length > 50 ? cumRap.diaChi.substr(0, 50) + '...' : cumRap.diaChi}
                                        </p>
                                        <p className="text-yellow-600 my-0 ">[Chi tiết]</p>
                                    </div>
                                </div>
                            }>
                            {/* Load Phim tương ứng */}
                            {cumRap.danhSachPhim.map((phim) => {
                                return <Fragment key={`${phim.tenPhim}-${cumRap.tenCumRap}`}>
                                    {/* Hình ảnh và thông tin phim */}
                                    <div className="my-5 flex">
                                        <img
                                            style={{ width: 70, height: 70 }}
                                            src={phim.hinhAnh} alt={phim.tenPhim}
                                            onError={(e) => { e.target.onerror = null; e.target.src = "https://picsum.photos/75/75" }} />
                                        <div className='ml-2'>
                                            <h1 className="my-0 text-2xl text-green-800 ">{phim.tenPhim}</h1>
                                            <p className="my-0 text-red-200">100-phút-IMDB-0</p>
                                        </div>
                                    </div>
                                    {/* Ngày chiếu của phim */}
                                    <div>
                                        {renderNgayChieuPhim(phim)}
                                               
                                    </div>
                                    <hr />
                                </Fragment>
                            })}
                        </TabPane>
                    })}
                </Tabs>
            </TabPane>
        })
    }
   

    return (
        <div className={`${styles['wrapper']}`}>
            <div id="cumRap" className={`${styles['inner']}`}>
                <Tabs
                    className="shadow-xl"
                    defaultActiveKey={0}
                    onTabClick={handleAccessBrand}
                    tabPosition='left'
                >
                    {renderCumRap()}
                </Tabs>
            </div>
        </div>
    )
}

Theaters.propTypes = {
    heThongRapChieu: PropTypes.array,
}


// use memo là 1 hook giúp function có chức năng như Pure component bên class component
export default memo(Theaters)
// return <NavLink
                                            //     className="group hover:bg-black hover:text-white text-black text-center border px-2  mr-2 my-2"
                                            //     to={`/checkout/${lichChieu.maLichChieu}`}
                                            //     key={index}
                                            // >
                                            //     <div className="group-hover:font-bold">
                                            //         {lichChieu.tenRap}
                                            //     </div>
                                            //     <hr />
                                            //     <div className="py-2 px-2">
                                            //         {moment(lichChieu.ngayChieuGioChieu).format('h:mm A')}
                                            //     </div>
                                            //     <hr />
                                            //     <div>
                                            //         {moment(lichChieu.ngayChieuGioChieu).format('DD/MM/YYYY')}
                                            //     </div>
                                            // </NavLink>