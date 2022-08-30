import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './Detail.scss'
import '../../assets/styles/circle.scss'

import { Rate, Empty } from 'antd';
import { Tabs } from 'antd';
import { layThongTinChiTietPhim } from '../../redux/actions/QuanLyRapAction';

import moment from 'moment'
import DanhGia from './DanhGia/DanhGia';

const { TabPane } = Tabs;
const MAXIMUM_LICH_CHIEU = 5

export default function Detail(props) {
  const [keyActiveTab, setKeyAcctiveTab] = useState(1)
  const filmDetail = useSelector(state => state.QuanLyPhimReducer.filmDetail)
  const dispatch = useDispatch()
  const RAP_CO_PHIM = filmDetail.heThongRapChieu?.length > 0
  useEffect(() => {
    // Lấy thông tin param từ url
    let { id } = props.match.params;
    dispatch(layThongTinChiTietPhim(id))
    window.scrollTo({ top: 0 });
  }, [props.match.params, dispatch]);
  const handleAccessTab = (key) => {
    setKeyAcctiveTab(key);
  }
  return (
    <div >
      <div
        style={{ backgroundImage: `url(${filmDetail.hinhAnh})` }}
        className="detailBackground relative">
      </div>
      <div
        style={{ background: 'linear-gradient(to top, rgb(10, 32, 41) 10%, transparent 70%)' }} className="absolute bottom-0 left-0 h-screen w-full -z-0"
      ></div>
      <div className="detailContent w-full container mx-auto mt-20 lg:px-5 xl:px-20 ">
        <div className=" flex justify-between items-center xl:px-40 lg:px-20   ">
          <div className="flex">
            <img
              style={{ height: '320px', width: '216px' }}
              src={filmDetail.hinhAnh}
              alt="Hình ảnh chi tiết phim" />
            <div className="text-white ml-3 w-2/3 flex flex-col justify-center">
              <p className=" text-2xl font-bold mb-2">
                <span className="inline-block px-2 mr-2 rounded bg-red-500 text-white ">C18</span>{filmDetail.tenPhim}
              </p>
              <p className="text-white">
                120 phút - 10 Idb - 2D/digital
              </p>
              <p className="text-gray-200 italic text-sm font-light">
                Ngày chiếu: {moment(filmDetail.ngayKhoiChieu).format('DD.MM.YYYY')}
              </p>
              <a
                href="#thongTinPhim"
                className="rounded-lg w-56 bg-red-700 text-base opacity-90 hover:opacity-100 hover:text-white cursor-pointer text-white px-6 py-3 text-center"
              >
                Thông tin phim
              </a>
            </div>
          </div>
          <div
            style={{ left: '75.6%' }}
            className="absolute top-0">
            <div className="mb-5">
              <p className="text-green-500 font-bold text-xl text-center mb-0">Đánh giá</p>
              <span className="text-center"><Rate allowHalf disabled value={filmDetail.danhGia / 2} /></span>
            </div>
            <div className={`c100 p${Math.round(filmDetail.danhGia * 10)} normal center`}>
              <span>{filmDetail.danhGia * 10}%</span>
              <div className="slice">
                <div className="bar"></div>
                <div className="fill"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-5" style={{ backgroundColor: `rgb(10, 32, 41)`, minHeight: '500px' }}>
        <div className="container mx-auto w-full text-white" style={{ maxWidth: '1024px' }}>
          <Tabs
            onTabClick={handleAccessTab}
            defaultActiveKey="1"
            centered
          >
            <TabPane
              tab={<h1 id="thongTinPhim" className={`tabNormal ${keyActiveTab === '1' ? 'tabActive' : ''}`}>THÔNG TIN</h1>}
              key="1">
              <div className="p-7 text-white">
                <div className="grid grid-cols-12">
                  <div className="col-span-6  px-4 ">
                    <div className="flex">
                      <p className="w-1/3 font-bold">Ngày công chiếu</p>
                      <p className="w-2/3">
                        {moment(filmDetail.ngayKhoiChieu).format('DD.MM.YYYY')}
                      </p>
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
            <TabPane
              tab={<h1 className={`tabNormal ${keyActiveTab === '2' ? 'tabActive' : ''}`}>ĐÁNH GIÁ</h1>} key="2"
            >
              <DanhGia maPhim={props.match.params} />
            </TabPane>
            {filmDetail.dangChieu === true ?
              <TabPane
                tab={<h1 className={`tabNormal ${keyActiveTab === '3' ? 'tabActive' : ''}`}>LỊCH CHIẾU</h1>} key="3" style={{ minHeight: 300 }}
              >
                {RAP_CO_PHIM ? '' :
                  <div
                    key="3"
                    className="flex justify-center items-center"
                    style={{ minHeight: 300 }}>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  </div>}
                <Tabs
                  className="booketMovieTable "
                  tabPosition="left"
                >
                  {filmDetail.heThongRapChieu?.map((heThongRap, index) => {
                    return <TabPane tab={<div className="flex flex-row items-center justify-center">
                      <img
                        className="w-10 h-10 rounded-full"
                        src={heThongRap.logo}
                        alt="hình ảnh hệ thống rạp" />
                      <div className="text-center ml-2 text-white">
                        {heThongRap.tenHeThongRap}
                      </div>
                    </div>} key={index}>
                      {heThongRap.cumRapChieu?.map((cumRap, index) => {
                        return <div key={index}>
                          <div className="flex flex-col">
                            <div className="flex  py-2 ">
                              <img
                                className="h-20 rounded-lg"
                                src={cumRap.hinhAnh}
                                alt="hình ảnh cụm rạp" />
                              <div className="ml-2">
                                <p className="font-bold text-xl mb-0 text-white">{cumRap.tenCumRap}</p>
                                <p className="text-red-200 my-0">{cumRap.diaChi}</p>
                              </div>
                            </div>
                            <div className="flex flex-wrap lichChieuList">
                              {cumRap.lichChieuPhim?.slice(0, MAXIMUM_LICH_CHIEU).map((film, index) => {
                                return <NavLink
                                  className="group lichChieuCard transform hover:bg-white hover:opacity-100 hover:text-black  mr-2 my-2 text-center px-2 rounded-lg" to={`/checkout/${film.maLichChieu}`}
                                  key={index}>
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
              </TabPane> : <></>}

          </Tabs>

        </div>


      </div>
    </div>
  )
}
