import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import './Detail.scss'
import '../../assets/styles/circle.scss'

import { Empty } from 'antd';
import { Tabs } from 'antd';
import { layThongTinChiTietPhim } from '../../redux/actions/QuanLyRapAction';
import _ from 'lodash';
import moment from 'moment'
import DanhGia from './DanhGia/DanhGia';
import FilmContent from './FilmContent/FilmContent';

const { TabPane } = Tabs;
const MAXIMUM_LICH_CHIEU = 1000

function Detail(props) {
  const [keyActiveTab, setKeyAcctiveTab] = useState(9)
  const [keyActiveDay, setKeyActiveDay] = useState(2)
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
  const handleAccessDaytab = (key) => {
    setKeyActiveDay(key)
  }
  const renderNgayChieuPhim = (heThongRap) => {
    let ngayChieu = [];
    heThongRap?.cumRapChieu.forEach((rap) => {
      rap.lichChieuPhim?.slice(0, MAXIMUM_LICH_CHIEU).forEach((lichChieu) => {
        ngayChieu.push(lichChieu.ngayChieuGioChieu.slice(0, 10))
      })
    })

    ngayChieu = _.uniq(ngayChieu);
    const renderGioChieu = (heThongRap, ngayChieu) => {
      let gioChieuList
      return heThongRap?.cumRapChieu.map((rap) => {
        gioChieuList = rap.lichChieuPhim?.slice(0, MAXIMUM_LICH_CHIEU).filter((lichChieu) => ngayChieu === lichChieu.ngayChieuGioChieu.slice(0, 10))
        if (gioChieuList?.length > 0) {
          return <div key={`${ngayChieu}${rap.tenCumRap}`}>
            <div className="flex py-2 mb-5 items-center">
              <img
                className="h-16 rounded-md"
                src={rap.hinhAnh}
                alt="hình ảnh cụm rạp"
              />
              <div className="ml-2">
                <p className="font-bold text-md mb-0 text-white">{rap.tenCumRap}</p>
                <p className="text-red-200 my-0">{rap.diaChi}</p>
              </div>
            </div>
            <div className="flex">
              {gioChieuList.map((lichChieu) => {
                return <NavLink key={`${lichChieu.maLichChieu}`} to={`/checkout/${lichChieu.maLichChieu}`} className="px-1 py-1 bg-slate-100 rounded-md mr-2 mb-2 cursor-pointer hover:bg-slate-200">
                  <span className="text-red-500 font-semibold">{moment(lichChieu.ngayChieuGioChieu).format('HH:mm ')} ~</span>

                  <span className="text-gray-500 font-semibold">{moment(lichChieu.ngayChieuGioChieu).add(2, 'hours').format('HH:mm ')}</span>
                </NavLink>
              })}
            </div>
          </div>
        } else return ""

      })
    }
    return ngayChieu.map((day, index) => {
      return <TabPane
        tabBarStyle={{ color: 'red' }}
        key={`${day}${index}`}
        tab={<div className={`ml-1 text-center tabNormal ${keyActiveDay === day + index ? 'tabActive' : ''}`}>
          <p className="capitalize text-xl mb-1">{moment(day).format('dddd')}</p>
          <p className="text-lg mb-0"> {moment(day).format('DD.MM.YYYY')}</p>
        </div>}
      >
        {renderGioChieu(heThongRap, day)}
      </TabPane>
    })
    // const renderGioChieu = (rap, ngayChieu) => {
    //   let day = rap.lichChieuPhim?.slice(0, MAXIMUM_LICH_CHIEU).filter((lichChieu) => ngayChieu === lichChieu.ngayChieuGioChieu.slice(0, 10))

    //   return <div className="border-t-2 border-solid border-gray-500">
    //     <div className="flex py-2 mb-5 items-center">
    //       <img
    //         className="h-16 rounded-md"
    //         src={rap.hinhAnh}
    //         alt="hình ảnh cụm rạp" />
    //       <div className="ml-2">
    //         <p className="font-bold text-md mb-0 text-white">{rap.tenCumRap}</p>
    //         <p className="text-red-200 my-0">{rap.diaChi}</p>
    //       </div>

    //     </div>
    //     <div className="flex">
    //       {day.map((lichChieu) => {
    //         return <NavLink key={`${lichChieu.maLichChieu}`} to={`/checkout/${lichChieu.maLichChieu}`} className="px-1 py-1 bg-slate-100 rounded-md mr-2 mb-2 cursor-pointer hover:bg-slate-200">
    //           <span className="text-red-500 font-semibold">{moment(lichChieu.ngayChieuGioChieu).format('HH:mm ')} ~</span>

    //           <span className="text-gray-500 font-semibold">{moment(lichChieu.ngayChieuGioChieu).add(2, 'hours').format('HH:mm ')}</span>
    //         </NavLink>
    //       })}
    //     </div>
    //   </div>
    // }

    // return ngayChieu.map((day, index) => {
    //   return <TabPane
    //     tabBarStyle={{ color: 'red' }}
    //     key={`${day}${rap.tenCumRap}`}
    //     tab={<div className={`ml-1 text-center tabNormal ${keyActiveDay===day+rap.tenCumRap? 'tabActive' : ''}`}>
    //       <p className="capitalize text-xl mb-1">{moment(day).format('dddd')}</p>
    //       <p className="text-lg mb-0"> {moment(day).format('DD.MM.YYYY')}</p>
    //     </div>}
    //   >
    //     {renderGioChieu(rap, day)}
    //   </TabPane>

    // })
  }
  return (
    <>

      <FilmContent filmDetail={filmDetail} />


      <section id="TapMovieDetail" className="py-5" style={{ backgroundColor: `rgb(10, 32, 41)`, minHeight: '500px' }}>
        <div className="container mx-auto w-full text-white" style={{ maxWidth: '1024px' }}>
          <Tabs
            onTabClick={handleAccessTab}
            defaultActiveKey="1"
            centered
          >
            <TabPane
              tab={<h1 className={`tabNormal ${keyActiveTab === '1' ? 'tabActive' : ''}`}>THÔNG TIN</h1>}
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
                      <Tabs
                        onTabClick={handleAccessDaytab}
                        tabPosition="top"
                        defaultActiveKey={1}

                      >

                        {renderNgayChieuPhim(heThongRap)}
                        {/* {heThongRap.cumRapChieu?.map((rap) => {
                          return renderNgayChieuPhim(rap)
                        })} */}
                      </Tabs>
                    </TabPane>
                  })}
                </Tabs>
              </TabPane> : <></>}

          </Tabs>

        </div>


      </section>
    </>
  )
}


Detail.propTypes = {
  props: PropTypes.number,
}

export default Detail
