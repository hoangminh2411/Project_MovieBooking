import React, { useEffect, useState, memo, Fragment } from 'react'

import { Tabs, Radio, Space } from 'antd';
import { layDanhSachRapAction } from '../../../redux/actions/QuanLyRapAction';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import _, { slice } from 'lodash'
import './HomeMenu.css'

// Thư viện moment dùng để format ngày giờ
import moment from 'moment';

const { TabPane } = Tabs;



function HomeMenu(props) {
    const [keyActiveBrand,setKeyAcctiveBrand] = useState(0)
    const [keyactiverap,setKeyacctiverap] = useState(0)
    const { heThongRapChieu } = props
    const dispatch = useDispatch();
    
    const handleAccessBrand = (key)=>{
        setKeyAcctiveBrand(key);
        setKeyacctiverap(0);
        console.log(key);
    }

    const handleAccessRap = (key) => {
        setKeyacctiverap(key)
        console.log(key);
    }

    const renderCumRap = () => {
        return heThongRapChieu?.map((heThongRap, index) => {
            return <TabPane style={{maxHeight:600,overflowY: 'auto',minHeight:600}} key={index} tab={<div className="border-b-2 pb-1"><img src={heThongRap.logo} className={keyActiveBrand ==index ? 'rounded-full w-10 h-10 opacity-100':'rounded-full w-10 h-10 opacity-20'} alt="" /> </div>}>
                
                <Tabs defaultActiveKey={0} onTabClick={handleAccessRap} tabPosition="left" >
                    {heThongRap.lstCumRap?.map((cumRap, index) => {
                        return <TabPane style={{maxHeight:600,minHeight:600}} key={index} tab={
                            <div className={keyactiverap==index? 'opacity-100':'opacity-20'} style={{display: 'flex' }}>
                                <img src={cumRap.hinhAnh}  style={{width:60, height:60}} alt="" />
                                <br />
                                <div className="ml-2 text-left">
                                    <h1 className="my-0">{cumRap.tenCumRap}</h1>  
                                    <p className="text-red-200 my-0 ">{cumRap.diaChi.length>50 ? cumRap.diaChi.substr(0,50)+'...' : cumRap.diaChi}</p>                               
                                    <p className="text-yellow-600 my-0 ">[Chi tiết]</p>
                                </div>
                            </div>
                        } >
                            
                            {/* Load Phim tương ứng */}
                            {cumRap.danhSachPhim.map((phim, index) => {
                                return <Fragment  key={index}>
                                    <div className="my-5" style={{display: 'flex' }}>

                                        <img style={{width:100, height:150}} src={phim.hinhAnh} alt={phim.tenPhim} onError={(e)=>{e.target.onerror = null; e.target.src ="https://picsum.photos/75/75"}} />

                                        <div className='ml-2'>
                                            <h1 className="my-0 text-2xl text-green-800 ">{phim.tenPhim}</h1>
                                            <p className="my-0 text-red-200">100-phút-IMDB-0</p>
                                            <div className="flex flex-wrap ">
                                                
                                                {phim.lstLichChieuTheoPhim?.slice(0,5).map((lichChieu, index) => {
                                                    return <NavLink className=" text-gray-500 opacity-50 hover:text-gray-500 cursor-not-allowed mr-2 my-2 text-center border px-2" to="/" key={index}>
                                                        <div>
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
                                        </div>
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
        <>

            <Tabs className="shadow"  defaultActiveKey={0} onTabClick={handleAccessBrand} tabPosition='left'>
                {renderCumRap()}
            </Tabs>
        </>
    )
}

// use memo là 1 hook giúp function có chức năng như Pure component bên class component
export default memo(HomeMenu)
