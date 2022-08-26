import React, { useState, Fragment } from 'react'

import { Tabs } from 'antd';

import { NavLink } from 'react-router-dom';

import styles from './Theaters.module.scss'

// Thư viện moment dùng để format ngày giờ
import moment from 'moment';

import { memo } from 'react';

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

    const renderCumRap = () => {
        return heThongRapChieu?.map((heThongRap, index) => {
            return <TabPane
                style={{
                    maxHeight: 600,
                    minHeight: 600,
                    overflow: 'auto'
                }}
                key={index}
                tab={
                    <div className="border-b-2 pb-1">
                        <img src={heThongRap.logo} className={keyActiveBrand === index.toString() ? 'rounded-full w-10 h-10 opacity-100' : 'rounded-full w-10 h-10 opacity-20'} alt="" />
                    </div>
                }>
                <Tabs
                    defaultActiveKey={0}
                    onTabClick={handleAccessRap}
                    tabPosition="left" >
                    {heThongRap.lstCumRap?.map((cumRap, index) => {
                        return <TabPane
                            style={{ maxHeight: 600, minHeight: 600 }}
                            key={index}
                            tab={
                                <div className={keyActiverap === index.toString() ? 'opacity-100' : 'opacity-20'} style={{ display: 'flex' }}>

                                    {/* Hình ảnh rạp */}
                                    <img src={cumRap.hinhAnh} style={{ width: 60, height: 60 }} alt="" />
                                    <br />
                                    {/* Thông tin rạp */}
                                    <div className="ml-2 text-left">
                                        <h1 className="my-0">{cumRap.tenCumRap}</h1>
                                        <p className="text-red-200 my-0 ">{cumRap.diaChi.length > 50 ? cumRap.diaChi.substr(0, 50) + '...' : cumRap.diaChi}</p>
                                        <p className="text-yellow-600 my-0 ">[Chi tiết]</p>
                                    </div>
                                </div>
                            }>
                            {/* Load Phim tương ứng */}
                            {cumRap.danhSachPhim.map((phim, index) => {
                                return <Fragment key={index}>
                                    {/* Hình ảnh và thông tin phim */}
                                    <div className="my-5 flex">
                                        <img style={{ width: 70, height: 70 }} src={phim.hinhAnh} alt={phim.tenPhim} onError={(e) => { e.target.onerror = null; e.target.src = "https://picsum.photos/75/75" }} />
                                        <div className='ml-2'>
                                            <h1 className="my-0 text-2xl text-green-800 ">{phim.tenPhim}</h1>
                                            <p className="my-0 text-red-200">100-phút-IMDB-0</p>
                                        </div>
                                    </div>
                                    {/* Ngày chiếu của phim */}
                                    <div className="flex flex-wrap ">
                                        {phim.lstLichChieuTheoPhim?.slice(0, 5).map((lichChieu, index) => {
                                            return <NavLink className="group hover:bg-black hover:text-white text-black text-center border px-2  mr-2 my-2" to={`/checkout/${lichChieu.maLichChieu}`} key={index}>
                                                <div className="group-hover:font-bold">
                                                    {lichChieu.tenRap}
                                                </div>
                                                <hr />
                                                <div className="py-2 px-2">
                                                    {moment(lichChieu.ngayChieuGioChieu).format('h:mm A')}
                                                </div>
                                                <hr />
                                                <div>
                                                    {moment(lichChieu.ngayChieuGioChieu).format('DD/MM/YYYY')}
                                                </div>
                                            </NavLink>
                                        })}
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

// use memo là 1 hook giúp function có chức năng như Pure component bên class component
export default memo(Theaters)
