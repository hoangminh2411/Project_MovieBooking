import React, { useEffect, useState, memo, Fragment } from 'react'

import { Tabs, Radio, Space } from 'antd';
import { layDanhSachRapAction } from '../../../redux/actions/QuanLyRapAction';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
// BC

import _, { slice } from 'lodash'


// Thư viện moment dùng để format ngày giờ
import moment from 'moment';

const { TabPane } = Tabs;



function HomeMenu(props) {

    const { heThongRapChieu } = props
    const dispatch = useDispatch();
    console.log('Hệ thống rạp chiếu 1234125521', heThongRapChieu)




    const renderCumRap = () => {
        return heThongRapChieu?.map((heThongRap, index) => {
            return <TabPane key={index} tab={<div className="border-b-2 pb-1"><img src={heThongRap.logo} className="rounded-full w-10 h-10" alt="" /> </div>}>
                
                <Tabs tabPosition="left" >
                    {heThongRap.lstCumRap?.map((cumRap, index) => {
                        return <TabPane key={index} tab={
                            <div style={{display: 'flex' }}>
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
                                    <div className="my-5" style={{ display: 'flex' }}>

                                        <img style={{width:100, height:150}} src={phim.hinhAnh} alt={phim.tenPhim} onError={(e)=>{e.target.onerror = null; e.target.src ="https://picsum.photos/75/75"}} />

                                        <div className='ml-2'>
                                            <h1 className="my-0 text-2xl text-green-800 ">{phim.tenPhim}</h1>
                                            <p className="my-0 text-red-200">100-phút-IMDB-0</p>
                                            <div className="flex flex-wrap ">
                                                
                                                {phim.lstLichChieuTheoPhim?.slice(0,5).map((lichChieu, index) => {
                                                    return <NavLink className=" text-black mr-2 my-2 text-center border px-2" to="/" key={index}>
                                                        <div>
                                                            {lichChieu.tenRap}
                                                        </div>
                                                        <hr />
                                                        <div className="py-2 px-2">
                                                            {moment(lichChieu.ngayChieuGioChieu).format('h:mm A')}
                                                        </div>
                                                        <hr />
                                                        <div className="text ">
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



    // UI Hệ thống rạp chiếu
    const [state, setState] = useState({ tabPosition: 'left' })

    const changeTabPosition = e => {
        setState({ tabPosition: e.target.value });
    };
    const { tabPosition } = state
    return (
        <>

            <Tabs tabPosition={tabPosition}>
                {renderCumRap()}
                {/* <TabPane tab={<img src="https://picsum.photos/200" className="rounded-full w-20 h-20" alt="" />} key="1">
                    Content tab 1
                </TabPane>
                <TabPane tab={<img src="https://picsum.photos/300" className="rounded-full w-20 h-20" alt="" />} key="2">
                    Content tab 2
                </TabPane>
                <TabPane tab={<img src="https://picsum.photos/300" className="rounded-full w-20 h-20" alt="" />} key="3">
                    Content tab 3
                </TabPane> */}
            </Tabs>
        </>
    )
}

// use memo là 1 hook giúp function có chức năng như Pure component bên class component
export default memo(HomeMenu)
