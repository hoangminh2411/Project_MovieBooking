import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './Detail.css'
import '../../assets/styles/circle.scss'

import { Rate, Empty } from 'antd';
import { Tabs, Radio, Space } from 'antd'


import { SET_CHI_TIET_PHIM } from '../../redux/types/QuanLyRapType';
import { layThongTinChiTietPhim } from '../../redux/actions/QuanLyRapAction';

import moment from 'moment'

import _ from 'lodash'



const { TabPane } = Tabs;

export default function Detail(props) {

  const filmDetail = useSelector(state => state.QuanLyPhimReducer.filmDetail)

  const dispatch = useDispatch()

  useEffect(() => {
    // Lấy thông tin param từ url
    window.scrollTo({ top: 0 });
    let { id } = props.match.params;
    dispatch(layThongTinChiTietPhim(id))
  }, [])

  console.log('film detail', filmDetail);
  
  
  

  // console.log('newArrayDay',newArrayDay);
  
  return (
    <div>
      <div style={{ backgroundImage: `url(${filmDetail.hinhAnh})` }} className="detailBackground relative">
      </div>
      <div className="detailContent w-full container mx-auto mt-20">
        <div className=" flex justify-between items-center px-36 ">
          <div className="flex">
            <img style={{ height: '411px', width: '280px' }} src={filmDetail.hinhAnh} alt="" />
            <div className="text-white ml-3 w-1/3">
              <p className=" text-2xl font-bold mb-2"><span className="inline-block px-2 mr-2 rounded bg-red-500 text-white  ">C18</span>{filmDetail.tenPhim}</p>
              <p className="text-gray-200 italic text-sm font-light">Ngày chiếu: {moment(filmDetail.ngayKhoiChieu).format('DD.MM.YYYY')}</p>
              <p className="">{filmDetail.moTa}</p>
            </div>

          </div>
          <div className="absolute top-0 left-2/3">
            <p className="text-green-500 font-bold text-xl text-center mb-0">Đánh giá</p>
            <p className="text-center mt-1"><Rate allowHalf disabled value={filmDetail.danhGia / 2} /></p>
            <div className={`c100 p${Math.round(filmDetail.danhGia * 10)} big center`}>
              <span>{filmDetail.danhGia * 10}%</span>
              <div class="slice">
                <div class="bar"></div>
                <div class="fill"></div>
              </div>
            </div>


          </div>
        </div>
        <div className="booketMovieTable ">
          <Tabs defaultActiveKe="1" centered>
            <TabPane tab="Lịch chiếu" key="1" style={{ minHeight: 300 }}>
              {filmDetail.heThongRapChieu?.length > 0? '' : <div key="3" className="flex justify-center items-center" style={{ minHeight: 300 }}>

                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />


              </div>}
              <Tabs tabPosition="left">
                {filmDetail.heThongRapChieu?.map((heThongRap, index) => {
                  return <TabPane tab={<div className="flex flex-row items-center justify-center">
                    <img className="w-10 h-10 rounded-full" src={heThongRap.logo} alt="" />
                    <div className="text-center ml-2">
                      {heThongRap.tenHeThongRap}
                    </div>
                  </div>} key={index}>

                    {heThongRap.cumRapChieu?.map((cumRap, index) => {
                      return <div key={index}>
                        <div className="flex flex-col">
                          <div className="flex border-b py-2 ">
                            <img className="h-20" src={cumRap.hinhAnh} alt="" />
                            <div className="ml-2">
                              <p className="font-bold text-xl mb-0">{cumRap.tenCumRap}</p>
                              <p className="text-red-200 my-0">{cumRap.diaChi}</p>
                            </div>
                          </div>

                          <div className="flex flex-wrap">
                            {cumRap.lichChieuPhim?.slice(0, 5).map((film, index) => {

                              return <NavLink className="group hover:bg-gray-800 hover:text-white text-black mr-2 my-2 text-center border px-2" to={`/checkout/${film.maLichChieu}` } key={index}>
                                <div className="group-hover:font-bold font-normal ">
                                  {film.tenRap}
                                </div>
                                <hr />
                                <div className="py-2 px-2">
                                  {moment(film.ngayChieuGioChieu).format('h:mm A')}
                                </div>
                                <hr />
                                <div className="text ">
                                  {moment(film.ngayChieuGioChieu).format('DD/MM/YYYY')}
                                </div>


                              </NavLink>
                            })}
                          </div>
                        </div>

                      </div>
                    })}
                  </TabPane>
                })}
              </Tabs>
            </TabPane>
            {/* <TabPane tab="Thông tin" key="2" className="flex justify-center items-center" style={{ minHeight: 300 }}>
              <div>
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              </div>
            </TabPane> */}
            <TabPane tab="Đánh giá" key="3" className="flex justify-center items-center" style={{ minHeight: 300 }}>

              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />


            </TabPane>
          </Tabs>

        </div>
      </div>

    </div>
  )
}
