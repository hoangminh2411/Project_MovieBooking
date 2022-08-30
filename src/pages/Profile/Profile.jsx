import React, { useEffect, useState } from 'react'
import './Profile.css'
import { EditOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { layThongTinNguoiDung } from '../../redux/actions/QuanLyNguoiDungAction';
import moment from 'moment'
import { USER_LOGIN } from '../../util/setting';
import { Redirect } from 'react-router-dom';
import secondsToHms from '../../util/ConvertSecondToHour';
export default function Profile(props) {
  
  const dispatch = useDispatch()
  const { thongTinNguoiDung, userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
  const [checked, setChecked] = useState([])
  useEffect(() => {
   
    const action = layThongTinNguoiDung()
    dispatch(action);
  }, [])
  if (!localStorage.getItem(USER_LOGIN)) {
    return <Redirect to='/login' />
  }
  const handleCheck = (id) => {
    setChecked(prev=>{
      const isChecked = checked.includes(id);
      if(isChecked) {
        console.log('check',id)
        return checked.filter(item=>item !== id)
      }
      else{
        return [...prev,id]
      }
    })
  }
  

  const renderTicketItem = () => {
    return thongTinNguoiDung?.thongTinDatVe?.map((item, index) => {

      const  hm = moment(item.ngayDat).format(`HH:MM`)
      const a = hm.split(':');
      const seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60
      const TotalSecond = seconds + item.thoiLuongPhim*60;
      const lastSecond = secondsToHms(TotalSecond)

      console.log('lastSecond',lastSecond); 
      const renderDanhSachghe = (data) => {
        return item.danhSachGhe.map((ghe, index) => {
          return <span key={index}>{ghe[data]},</span>
        })
      }
      return <>
        <div key={index} className="flex justify-around border-t   border-solid border-gray-500" style={{ padding: '20px 30px' }}>
          <img className="h-full " style={{ width: '65px', height: '94px' }} src={item.hinhAnh} alt="123" />
          <div className="basis-2/4 flex-col" style={{ height: '94px' }}>
            <dl className="flex justify-start mb-0">
              <dt className="w-1/3" style={{ color: '#666' }}>Số vé (ngày đặt phòng)</dt>
              <dd className="font-bold mb-0">{item.maVe} ({moment(item.ngayDat).format(`DD/MM/YYYY HH:MM`)})</dd>
            </dl>
            <dl className="flex justify-start mb-0 flex-wrap">
              <dt className="w-1/3" style={{ color: '#666' }}>Trạng thái sử dụng</dt>
              <dd className="font-bold mb-0 text-red-700">Không thể hủy</dd>
            </dl>
            <dl className="flex justify-start mb-0">
              <dt className="w-1/3 " style={{ color: '#666' }}>Đặt vé</dt>
              <dd className="font-bold mb-0">{item.tenPhim} (2DLồng tiếng)</dd>
            </dl>
            <dl className="flex justify-start mb-0">
              <dt className="w-1/3" style={{ color: '#666' }}>Tổng số tiền Thanh toán</dt>
              <dd className="font-bold mb-0 text-green-700">{(item.giaVe * item.danhSachGhe.length).toLocaleString()} đ</dd>
            </dl>
          </div>
          <div className="group flex flex-col justify-center">
            <button onClick={()=>{
              handleCheck(index)
            }} className="block">
              <span className="mr-2 font-bold text-gray-500"> {checked.includes(index)? 'Đóng': 'Thêm'}</span>
              {checked.includes(index)?  <UpOutlined />: <DownOutlined />}
            </button>
          </div>
        </div>
        {/* Chi tiết vé xem phim */}
        
        {checked.includes(index) && <div className="shadow-lg   mb-5 mx-5" style={{ padding: '20px 30px',backgroundColor:'#f5f5f6' }}>
          <h1 className="px-2 py-2 border-b border-gray-500 text-2xl">Chi tiết</h1>
          <p className="px-2 py-2 border-b border-gray-500 text-right ">Gửi thông báo qua email {moment(item.ngayDat).format(`DD/MM/YYYY HH:MM`)}</p>
          <h4 className="text-xl px-2">{item.tenPhim}</h4>
          <ul>
            <li>
              <ul className="flex">
                <li className="px-2 border-r border-solid border-gray-500 "><span className="text-gray-500">Ngày chiếu </span>{moment(item.ngayDat).format(`DD/MM/YYYY`)}</li>
                <li className="px-2 border-r border-solid border-gray-500"><span className="text-gray-500">Lịch chiếu phim </span>{moment(item.ngayDat).format(`HH:MM`)}~{lastSecond}</li>
                <li className="px-2"><span className="text-gray-500">Rạp chiếu </span>{item.danhSachGhe[0].tenHeThongRap}, {item.danhSachGhe[0].tenCumRap}</li>
              </ul>
            </li>
            <li className="px-2"><span className="text-gray-500">Ghế ngồi</span> {renderDanhSachghe('tenGhe')}</li>
           
          </ul>
        </div>}

      </>
    })
  }


  return (
    <div className="container mx-auto mt-5 w-full overflow-auto ">

      <div className="headerProfile relative flex justify-center items-center rounded-t-2xl ">
        <div className="flex justify-centery items-center">
          <h1 className="text-white text-2xl mb-0 mr-5">RẠP CHIẾU PHIM CỦA TÔI </h1>
          <img src={require('../../assets/images/popcorn.png')} className="w-10 h-10" alt="" />
        </div>
        <img className="absolute border-solid border-4   border-white shadow-xl    rounded-full lg:w-40 lg:h-40 w-20 h-20 lg:-bottom-1/4 top-2/3 left-1/2 " src={`https://i.pravatar.cc/150?u=${thongTinNguoiDung?.hoTen}`} alt="" style={{transform: 'translateX(-50%)' }} />
        <span className="bg-yellow-500 hover:bg-yellow-600 hover:cursor-pointer text-white text-center absolute rounded-full text-xl lg:-bottom-1/4 w-10 h-10 bottom-5    " style={{ left: '52%' }}>
          <EditOutlined />
        </span>
      </div>
      <div className="mt-5 h-screen  overflow-auto  p-10 " style={{ backgroundColor: '#e1e2e1'}}>
        <div className="flex justify-between">
          <h1 className="font-bold text-base lg:text-2xl pr-20">Xin Chào <span className="text-green-700 ">{thongTinNguoiDung?.hoTen}</span></h1>
          <h1 className="font-bold text-base lg:text-2xl">Phân loại người dùng: <span className="text-green-700">{thongTinNguoiDung?.loaiNguoiDung?.tenLoai}</span></h1>
        </div>
        <h1 className="text-center pb-2 text-2xl font-bold ">Lịch sử đặt vé</h1>

        <div className="flex-cols" style={{ height: '800px',width: '1400px'}}>
          {renderTicketItem()}
        </div>
      </div>
    </div>
  )
}