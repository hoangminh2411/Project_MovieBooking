import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { layThongTinChiTietPhim } from '../../redux/actions/QuanLyRapAction';
import { ClockCircleOutlined, CreditCardOutlined } from '@ant-design/icons';
import moment from 'moment'
import Slider from "react-slick";
import { NavLink } from 'react-router-dom';
import { Tabs, Radio, Space, Select, Progress } from 'antd'
import { CaretRightOutlined  } from '@ant-design/icons';

import _ from 'lodash';
import { HashLink } from 'react-router-hash-link';
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

export default function Detail_mobile(props) {
  const filmDetail = useSelector(state => state.QuanLyPhimReducer.filmDetail)
  const [rap,setRap] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    // Lấy thông tin param từ url
    window.scrollTo({ top: 0 });
    let { id } = props.match.params;
    dispatch(layThongTinChiTietPhim(id))
  }, [])
  const onChange = (value) => {
    setRap(value)
   
  };
  console.log('rap123123',rap)
  // const ngayChieu = filmDetail.heThongRapChieu?.map((rap,index)=>{
  //   return rap.cumRapChieu?.map((cumRap,index)=>{
  //     return cumRap.lichChieuPhim?.map((film,index)=>{
  //       return film.ngayChieuGioChieu
  //     })
  //   })
  // })
  // const newNgayChieu = ngayChieu[0][0]?.map((ngayChieu,index)=>{

  //   return ngayChieu.slice(0,10)
  // })

  // console.log('newNgayChieu',newNgayChieu);
  return (
    <div className="w-screen h-screen " style={{ backgroundColor: 'rgb(10, 32, 41)'}}>
      
        <img className="rounded-3xl w-full h-full relative" src={filmDetail.hinhAnh} alt="" />
        {/* <div className="hover:opacity-50 cursor-pointer absolute  rounded-full    top-1/4 left-1/2" style={{ transform: 'translate(-50%,-50%)' }}><img src={require('../../assets/images/PlayVideo.png')} alt="" /></div> */}
      
        <div className="absolute" style={{ top: '13%', right: '5%' }}><div className="text-white shadow flex justify-center items-center rounded-3xl px-3 py-1 bg-gray-500" style={{ zIndex: '999' }}><ClockCircleOutlined /> <p className="ml-1 mb-0">{moment(filmDetail.ngayKhoiChieu).format('DD/MM/YYYY')}</p></div></div>
        {/* <div className="rounded-3xl w-full h-full absolute top-0 left-0 bg-black opacity-30"></div> */}
        <div className="text-white " style={{ backgroundColor: 'rgb(10, 32, 41)', paddingTop: '10%',height: '600px'}}>
          <div className="flex justify-center text-white">
            <h2 id="dateSelect" className="font-bold text-white text-2xl">Select Date and Times</h2>
          </div>
          <Tabs className="hidden" tabPosition="top" centered>
            {filmDetail.heThongRapChieu?.map((heThongRap, index) => {
              return <TabPane tab={<div className="flex flex-col items-center justify-center">
                <img className="w-7 h-7 rounded-full" src={heThongRap.logo} alt="" />
                <div className="text-center ml-2 text-white text-lg">
                  {heThongRap.tenHeThongRap}
                </div>
              </div>} key={index}>
                <div className="mb-5">
                  <Select
                    showSearch
                    placeholder="CHỌN RẠP CHIẾU"
                    optionFilterProp="children"
                    bordered={false}
                    style={{color: 'white',fontWeight: '700'}}
                    filterOption={(input, option) =>
                      option.children.toLowerCase().includes(input.toLowerCase())
                    }
                    onSelect={onChange}
                  >
                    {heThongRap.cumRapChieu?.map((cumRap, index) => {
                      return <Option  value={cumRap.tenCumRap}>{cumRap.tenCumRap}</Option>
                    })}
                  </Select>
                  {heThongRap.cumRapChieu?.map((cumRap, index)=>{
                    if(cumRap.tenCumRap === rap){
                      return <p style={{paddingLeft:'11px'}} className="text-sm text-gray-500">{cumRap.diaChi}</p>
                    }
                  })}
                </div>
                <Slider {...settings}>
                  {heThongRap.cumRapChieu?.map((cumRap, index) => {
                    if(cumRap.tenCumRap == rap){
                      console.log(cumRap.tenCumRap);
                      return cumRap.lichChieuPhim?.map((film, index) => {
                        return <div>
  
                          <div className="w-full h-full  flex justify-center items-center cursor-pointer">
                            <div className="group opacity-50 hover:opacity-100 transition-all hover:bg-orange-500 hover:shadow-orange-500 bg-slate-500 rounded-full flex flex-col justify-center items-center hover:shadow  shadow-gray-800" style={{ width: '60px', height: '100px' }}>
                              <p className="text-sm mb-0">{moment(film.ngayChieuGioChieu).format('MMMM')}</p>
                              <p className="mb-0 text-white">{moment(film.ngayChieuGioChieu).format('DD')}</p>
                              <div className="w-10 h-10 text-black font-bold flex justify-center items-center group-hover:bg-white rounded-full group-hover:shadow group-hover:shadow-orange-800">{moment(film.ngayChieuGioChieu).format('h:mm')} </div>
                            </div>
                          </div>
                        </div>
                      })
                    }
                    else return '';
                  })}
                </Slider>
              </TabPane>
            })}
          </Tabs>
          <div className="flex justify-center items-end">
          <img  className="w-full h-full" src={require('../../assets/images/Lovepik_com-401229893-at-home-watching-movies.png')} alt="" />
          </div>
          


          {/* <Slider {...settings}>


            <div>
              <div className="w-full h-full  flex justify-center items-center cursor-pointer">
                <div className="group opacity-50 hover:opacity-100 transition-all hover:bg-orange-500 bg-slate-500 rounded-full flex flex-col justify-center items-center shadow-xl shadow-gray-800" style={{ width: '55px', height: '81px' }}>
                  <p className="text-sm">MAR</p>
                  <div className="w-7 h-7 text-black font-bold flex justify-center items-center group-hover:bg-white rounded-full group-hover:shadow group-hover:shadow-orange-800">17</div>
                </div>
              </div>
            </div>


          </Slider> */}


        </div>
        <div className="detailContentMobile bg-white shadow-xl pb-5 pt-10 px-5   rounded-3xl  w-full h-auto absolute   " style={{ bottom: '0%', zIndex: '1', height: '50%' }}>
          <div className="" >
            <h1 className="font-black  text-2xl ">{filmDetail.tenPhim}</h1>
            <p className="text-gray-400 mb-0">😣 Crime, 😒 Drama, 😲 Thriller</p>
            <p className="text-gray-400 ">Runtime: 2h2min</p>
            <p style={{color:'#d3d3d3'}}>{filmDetail.moTa?.length>200 ? filmDetail.moTa.substr(0,200)+'...': filmDetail.moTa}</p>
          </div>
         <div className="flex justify-between mt-14">
          <HashLink to="#dateSelect">
            <div className="text-lg w-full  shadow rounded-3xl py-4 px-14 bg-black text-white hover:bg-orange-600 cursor-pointer text-center font-bold ">
              <p className="ml-2 mb-0">BUY TICKET</p>
            </div>
          </HashLink>
            <div className="-translate-y-4"> <Progress status='normal' width='75px' strokeColor='black' type="circle" percent={filmDetail.danhGia*10} /></div>

         </div>
         <div className="hover:opacity-50 cursor-pointer bg-white w-20 h-20 flex justify-center items-center absolute  rounded-full shadow-xl   top-0 left-1/2" style={{ transform: 'translate(-50%,-50%)' }}><CaretRightOutlined  style={{ fontSize: '40px',zIndex:'11000' }}/></div>

        </div>













          {/* ý tưởng detail mobile 1 */}
        {/* <div className="detailContentMobile bg-white shadow-xl py-5 px-16    rounded-3xl  w-full h-auto absolute   " style={{ bottom: '0%', zIndex: '1', height: 'auto' }}>
          <div className="flex justify-around ">
            <div className="text-center" style={{ width: '30%' }}>
              <p className="mb-0 text-lg text-gray-300"><span className="font-medium text-black">{filmDetail.danhGia}</span>/10</p>
              <p className="text-gray-300">IMDb</p>
            </div>
            <div className="text-center" style={{ width: '30%' }}>
              <p className="mb-0 text-lg font-medium ">{filmDetail.danhGia * 10}%</p>
              <p className="text-gray-300">Rotten Tomatoes</p>
            </div>
            <div className="text-center" style={{ width: '30%' }}>
              <p className="mb-0 text-lg text-gray-300"><span className="font-medium text-black">{filmDetail.danhGia}</span>/10</p>
              <p className="text-gray-300">IGN</p>

            </div>
          </div>
          <div className="text-center text-3xl">
            {filmDetail.tenPhim}
          </div>
          <div className="flex justify-center items-center mt-5">
            <button className="shadow border border-gray-200 rounded-2xl py-1 px-3 mr-2 hover:bg-orange-700 hover:text-white hover:border-0"> 🤩 Fantasy</button>
            <button className="shadow border border-gray-200 rounded-2xl py-1 px-3 hover:bg-orange-700 hover:text-white hover:border-0 ">😎 Adventure</button>
          </div>
          <div className="text-center mt-5">
            <p>{filmDetail.moTa?.length>200 ? filmDetail.moTa.substr(0,200)+'...': filmDetail.moTa}</p>
          </div>
          <HashLink to="#dateSelect" className="flex justify-center items-center">
            <div className="text-lg w-full flex justify-center items-center shadow rounded-3xl py-2 px-3 bg-orange-500 text-white hover:bg-orange-600 cursor-pointer ">
              <CreditCardOutlined />
              <p className="ml-2 mb-0">Booking ticket</p>
            </div>
          </HashLink>

        </div> */}
     

    </div>
  )
}
