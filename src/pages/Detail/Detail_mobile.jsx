import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { layThongTinChiTietPhim } from '../../redux/actions/QuanLyRapAction';

import PropTypes from 'prop-types';

import moment from 'moment'
import Slider from "react-slick";
import { NavLink } from 'react-router-dom';
import { Tabs, Select } from 'antd'
import { CaretRightOutlined } from '@ant-design/icons';

import './Detail.scss'

import ModalTrailer from '../../components/ModalTrailer/ModalTrailer';
import theaterImage from '../../assets/images/13067-removebg-preview (1).png'
import Toast from '../../components/Toast/Toast';
import { history } from '../../App';
const { TabPane } = Tabs;
const { Option } = Select;

const settings = {

  height: '250px',
  width: '50px',
  dots: true,
  infinite: false,
  speed: 400,
  slidesToShow: 5,
  slidesToScroll: 5
};

const MAXIMUM_LENGTH_CONTENT = 200;

function Detail_mobile(props) {
  const filmDetail = useSelector(state => state.QuanLyPhimReducer.filmDetail)
  const [rap, setRap] = useState('')
  const dispatch = useDispatch()
  const [showTrailer, setShowTrailer] = useState(false)
  const [trailer, setTrailer] = useState('')
  useEffect(() => {
    // Lấy thông tin param từ url
    window.scrollTo({ top: 0 });
    let { id } = props.match.params;
    dispatch(layThongTinChiTietPhim(id))
  }, [props.match.params, dispatch])
  let RAP_DANG_CHIEU = filmDetail?.heThongRapChieu?.length>0
  const onChange = (value) => {
    setRap(value)
  };
  const handleShowTrailer = () => {
    setShowTrailer(true);
  }

  const handleCloseTrailer = () => {
    setShowTrailer(false)
  }
  const handlePlayTrailer = () => {
    setTrailer(filmDetail.trailer)
    handleShowTrailer()
  }
  return (
    <>
      <ModalTrailer
        trailer={trailer}
        onCloseTrailer={handleCloseTrailer}
        onTrailer={showTrailer}
      />
      <div
        className="w-screen h-screen overflow-auto"
        style={{ backgroundColor: 'rgb(10, 32, 41)' }}>
        <div className="relative">
          <img
            className="rounded-3xl w-screen h-screen"
            src={filmDetail.hinhAnh}
            alt="backgroudn film detail"
          />
          <div
            className="detailContentMobile bg-white shadow-xl pb-5 pt-10 px-5 absolute bottom-0  rounded-3xl h-auto"
            style={{ bottom: '0%', zIndex: '1' }}
          >
            <div>
              <h1 className="font-black  text-2xl ">{filmDetail.tenPhim}</h1>
              <p className="text-gray-400 mb-0">😣 Crime, 😒 Drama, 😲 Thriller</p>
              <p className="text-gray-400 ">Runtime: 2h2min</p>
              <p style={{ color: '#d3d3d3' }}>
                {filmDetail.moTa?.length > MAXIMUM_LENGTH_CONTENT ? filmDetail.moTa.substr(0, MAXIMUM_LENGTH_CONTENT) + '...' : filmDetail.moTa}
              </p>
            </div>
            {/* Chọn lịch chiếu*/}
            <div className="flex justify-center items-center mt-14">
              {filmDetail?.dangChieu ?
                <a onClick={()=>{
                  if(!RAP_DANG_CHIEU){
                    Toast('info','SORRY','XIN LỖI VÌ SỰ BẤT TIỆN NÀY XIN QUÝ KHÁCH CHỌN PHIM KHÁC');
                    history.push("/home")
                  }
                }} href="#dateSelect">
                  <div className="text-lg w-full  shadow rounded-3xl py-4 px-14 bg-black text-white hover:bg-orange-600 cursor-pointer text-center font-bold ">
                    <p className="ml-2 mb-0">BUY TICKET</p>
                  </div>
                </a> :
                <h3 className="text-red-500 text-xl font-bold">COMING SOON.....</h3>}
            </div>
            {/* Play trailer button */}
            <div onClick={handlePlayTrailer}
              className="hover:opacity-50 cursor-pointer bg-white w-20 h-20 flex justify-center items-center absolute  rounded-full shadow-xl   top-0 left-1/2"
              style={{
                transform: 'translate(-50%,-50%)'
              }}>
              <CaretRightOutlined style={{ fontSize: '40px', zIndex: '11000' }} />
            </div>
          </div>
        </div>
        {/* movie booking */}
        {filmDetail?.dangChieu ?
          (RAP_DANG_CHIEU?
          <div
            className="text-white "
            style={{ backgroundColor: 'rgb(10, 32, 41)', paddingTop: '10%', height: '700px' }}>
            <div className="flex justify-center text-white">
              <h2 id="dateSelect" className="font-bold text-white text-2xl">Select Date and Times</h2>
            </div>
            <Tabs className="" tabPosition="top" centered>
              {filmDetail.heThongRapChieu?.map((heThongRap, index) => {
                return <TabPane
                  key={index}
                  tab={<div className="flex flex-col items-center justify-center">
                    <img
                      className="w-7 h-7 rounded-full"
                      src={heThongRap.logo}
                      alt="Hệ thống rạp logo"
                    />
                    <div className="text-center ml-2 text-white text-lg">
                      {heThongRap.tenHeThongRap}
                    </div>
                  </div>}>
                  <div className="mb-5">
                    <Select
                      placeholder="CHỌN RẠP CHIẾU"
                      bordered={false}
                      style={{ color: 'white', fontWeight: '700' }}
                      onSelect={onChange}
                    >
                      {heThongRap.cumRapChieu?.map((cumRap, index) => {
                        return <Option
                          key={index}
                          value={cumRap.tenCumRap}>
                          {cumRap.tenCumRap}
                        </Option>
                      })}
                    </Select>
                    {heThongRap.cumRapChieu?.map((cumRap, index) => {
                      if (cumRap.tenCumRap === rap) {
                        return <p
                          key={index}
                          style={{ paddingLeft: '11px' }}
                          className="text-sm text-gray-500"
                        >
                          {cumRap.diaChi}
                        </p>
                      }
                      return ''
                    })}
                  </div>
                  <Slider {...settings}>
                    {heThongRap.cumRapChieu?.map((cumRap, index) => {
                      if (cumRap.tenCumRap === rap) {
                        return cumRap.lichChieuPhim?.map((film, index) => {
                          return <NavLink
                            key={index} to={`/checkout/${film.maLichChieu}`}
                          >
                            <div className="w-full h-full  flex justify-center items-center cursor-pointer">
                              <div className="group opacity-50 hover:opacity-100 transition-all hover:bg-orange-500 hover:shadow-orange-500 bg-slate-500 rounded-full flex flex-col justify-center items-center hover:shadow  shadow-gray-800"
                                style={{ width: '60px', height: '100px' }}
                              >
                                <p className="text-black font-bold mb-0">{moment(film.ngayChieuGioChieu).format('MM')}</p>
                                <p className="mb-0 text-white">{moment(film.ngayChieuGioChieu).format('DD')}</p>
                                <div className="w-10 h-10 text-black font-bold flex justify-center items-center group-hover:bg-white rounded-full group-hover:shadow group-hover:shadow-orange-800">
                                  {moment(film.ngayChieuGioChieu).format('h:mm')}
                                </div>
                              </div>
                            </div>
                          </NavLink>
                        })
                      }
                      else return '';
                    })}
                  </Slider>
                </TabPane>
              })}
            </Tabs>
            <div className="flex justify-center items-end">
              <img className="w-full h-full" src={theaterImage} alt="theater imgage" />
            </div>
          </div>:"") : ''}
      </div>
    </>
  )

}

Detail_mobile.propTypes = {
  props: PropTypes.object,
}
export default Detail_mobile