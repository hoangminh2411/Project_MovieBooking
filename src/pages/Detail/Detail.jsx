import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './Detail.css'
import '../../assets/styles/circle.scss'

import { Rate, Empty } from 'antd';
import { Tabs, Radio, Space } from 'antd'
import { HashLink } from 'react-router-hash-link';

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
      <div className="detailContent w-full container mx-auto mt-20 lg:px-5 xl:px-20 ">
        <div className=" flex justify-between items-center xl:px-40 lg:px-20   ">
          <div className="flex">
            <img style={{ height: '320px', width: '216px' }} src={filmDetail.hinhAnh} alt="" />
            <div className="text-white ml-3 w-2/3 flex flex-col justify-center">
              <p className=" text-2xl font-bold mb-2"><span className="inline-block px-2 mr-2 rounded bg-red-500 text-white  ">C18</span>{filmDetail.tenPhim}</p>
              <p className="text-white">120 phút - 10 Idb - 2D/digital</p>
              <p className="text-gray-200 italic text-sm font-light">Ngày chiếu: {moment(filmDetail.ngayKhoiChieu).format('DD.MM.YYYY')}</p>
              <a href="#thongTinPhim" className="rounded-lg bg-red-700 text-base opacity-90 hover:opacity-100 hover:text-white cursor-pointer text-white px-6 py-3 text-center   ">Thông tin phim</a>
              
            </div>

          </div>
          <div style={{left: '75.6%'}} className="absolute top-0">
            <p className="text-green-500 font-bold text-xl text-center mb-0">Đánh giá</p>
            <p className="text-center mt-1"><Rate allowHalf disabled value={filmDetail.danhGia / 2} /></p>
            <div className={`c100 p${Math.round(filmDetail.danhGia * 10)} normal center`}>
              <span>{filmDetail.danhGia * 10}%</span>
              <div class="slice">
                <div class="bar"></div>
                <div class="fill"></div>
              </div>
            </div>


          </div>
        </div>

      </div>
      <div className="py-5" style={{ backgroundColor: `rgb(10, 32, 41)`, minHeight:'500px' }}>

        <div className="container mx-auto w-full text-white" style={{ maxWidth: '1024px' }}>
          <Tabs defaultActiveKe="1" centered>
            <TabPane tab={<h1 id="thongTinPhim" style={{color:'#fb4226',fontSize:'18px'}}>THÔNG TIN</h1>} key="1">
              <div className="p-7 text-white">
                <div className="grid grid-cols-12">
                  <div className="col-span-6  px-4 ">
                    <div className="flex">
                      <p className="w-1/3 font-bold">Ngày công chiếu</p>
                      <p className="w-2/3">{moment(filmDetail.ngayKhoiChieu).format('DD.MM.YYYY')}</p>
                    </div>
                    <div className="flex">
                      <p className="w-1/3 font-bold">Đạo diễn</p>
                      <p className="w-2/3">Adam Wingard</p>
                    </div>
                    <div className="flex">
                      <p className="w-1/3 font-bold">Diễn viên</p>
                      <p className="w-2/3">Kyle Chandler, Rebecca Hall, Eiza González, Millie Bobby Brown</p>
                    </div>
                    <div className="flex">
                      <p className="w-1/3 font-bold">Thể Loại</p>
                      <p className="w-2/3">hành động, giả tưởng, ly kỳ, thần thoại</p>
                    </div>
                    <div className="flex">
                      <p className="w-1/3 font-bold">Định dạng</p>
                      <p className="w-2/3">2D/Digital</p>
                    </div>
                    <div className="flex">
                      <p className="w-1/3 font-bold">Quốc Gia SX</p>
                      <p className="w-2/3">Mỹ</p>
                    </div>
                  </div>
                  <div className="col-span-6  px-4">

                    <p className="font-bold">Nội dung</p>
                    <p>{filmDetail.moTa}</p>

                  </div>

                </div>
              </div>
            </TabPane>
            <TabPane tab={<h1 style={{color:'#fff',fontSize:'18px'}}>ĐÁNH GIÁ</h1>} key="2">
              
            </TabPane>
            <TabPane tab={<h1 style={{color:'#fff',fontSize:'18px'}}>LỊCH CHIẾU</h1>} key="3" style={{ minHeight: 300 }}>
              {filmDetail.heThongRapChieu?.length > 0 ? '' : <div key="3" className="flex justify-center items-center" style={{ minHeight: 300 }}>

                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />


              </div>}
              <Tabs  className="booketMovieTable " tabPosition="left">
                {filmDetail.heThongRapChieu?.map((heThongRap, index) => {
                  return <TabPane tab={<div className="flex flex-row items-center justify-center">
                    <img className="w-10 h-10 rounded-full" src={heThongRap.logo} alt="" />
                    <div className="text-center ml-2 text-white">
                      {heThongRap.tenHeThongRap}
                    </div>
                  </div>} key={index}>

                    {heThongRap.cumRapChieu?.map((cumRap, index) => {
                      return <div key={index}>
                        <div className="flex flex-col">
                          <div className="flex  py-2 ">
                            <img className="h-20 rounded-lg" src={cumRap.hinhAnh} alt="" />
                            <div className="ml-2">
                              <p className="font-bold text-xl mb-0 text-white">{cumRap.tenCumRap}</p>
                              <p className="text-red-200 my-0">{cumRap.diaChi}</p>
                            </div>
                          </div>

                          <div className="flex flex-wrap lichChieuList">
                            {cumRap.lichChieuPhim?.slice(0, 5).map((film, index) => {

                              return <NavLink className="group lichChieuCard  transform  hover:bg-white hover:opacity-100 hover:text-black  mr-2 my-2 text-center px-2 rounded-lg" to={`/checkout/${film.maLichChieu}`} key={index}>
                                <div className="group-hover:font-bold font-normal ">
                                  {film.tenRap}
                                </div>

                                <div className="py-2 px-2">
                                  {moment(film.ngayChieuGioChieu).format('h:mm A')}
                                </div>

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
          </Tabs>

        </div>
        

      </div>
    </div>
  )
}
