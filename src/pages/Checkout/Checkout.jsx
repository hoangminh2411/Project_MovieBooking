// import thư viện lodash
import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { datGheAction, datVe, layChiTietPhongVe } from '../../redux/actions/QuanLyDatVeAction'


import './Checkout.css'

// import thu vien antd
import { Steps, Modal, Button } from 'antd';
import { UserOutlined, SolutionOutlined, LoadingOutlined, SmileOutlined, CloseOutlined } from '@ant-design/icons';

import { ThongTinDatVe } from '../../_core/models/ThongTinDatVe'

import { soGheKhongVuotQua } from '../../redux/reducers/QuanLyDatVeReducer'
import ModalResult from './ModalResult/ModalResult'

import toLetters from '../../util/NumbertoString'
import { connection } from '../../index'
import { NavLink } from 'react-router-dom'
const { Step } = Steps

export default function Checkout(props) {
  const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)
  const { chiTietPhongVe, danhSachGheDangDat, soGheChoPhep, datVeThanhCong, danhSachgheKhachDat } = useSelector(state => state.QuanLyDatVeReducer)
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false)
  const dispatch = useDispatch();
  useEffect(() => {
    // Gọi hàm tạo ra 1 async function
    const action = layChiTietPhongVe(props.match.params.id);

    // disptach fucntion này đi
    dispatch(action);


    // Có 1 client thực hiện đặt vé thành công thì mình sẽ load lại danh sách phòng  vé của lịch chiếu đó 
    connection.on("datVeThanhCong", () => {
      connection.invoke("loadDanhSachGhe", props.match.params.id)
    })

    // Vừa vào trang load tất cả ghế của các người khác đang đặt
    connection.invoke("loadDanhSachGhe", props.match.params.id)


    // Load danh sách ghế đang đặt từ sever về
    connection.on("loadDanhSachGheDaDat", (dsGheKhachDat) => {
      // Bước 1: loại mình ra khỏi danh sách
      dsGheKhachDat = dsGheKhachDat.filter(item => item.taiKhoan !== userLogin.taiKhoan)

      // Bước 2: gộp danh sách ghế khách đặt ở tất cả user thành 1 mảng chung
      let arrGheKhachDat = dsGheKhachDat.reduce((result, item, index) => {
        let arrGhe = JSON.parse(item.danhSachGhe);
        return [...result, ...arrGhe]
      }, []);
      arrGheKhachDat = _.uniqBy(arrGheKhachDat, 'maGhe')
      // Đưa dữ liệu về redux
      dispatch({
        type: 'DAT_GHE_SOCKET',
        arrGheKhachDat

      })
    })

    // Cài đặt sự kiện khi reload trang
    window.addEventListener("beforeunload", clearGhe);

    return () => {
      clearGhe();
      window.removeEventListener('beforeunload', clearGhe)
    }

  }, [])

  const clearGhe = function (event) {

    connection.invoke('huyDat', userLogin.taiKhoan, props.match.params.id);
  }

  const handleOk = () => {
    setIsModalVisible(true);
    dispatch({
      type: 'VUOT_QUA_SO_GHE_CHO_PHEP'
    })
  };


  const { thongTinPhim, danhSachGhe } = chiTietPhongVe;

  

  const handleDatVe = () => {
    const thongTinDatVe = new ThongTinDatVe()
    thongTinDatVe.maLichChieu = props.match.params.id;
    thongTinDatVe.danhSachVe = danhSachGheDangDat;
    
    const action = datVe(thongTinDatVe)
    setIsSuccess(true)
    dispatch(action);
  }

  const renderSeats = () => {
    return danhSachGhe.map((ghe, index) => {

      let classGheVip = ghe.loaiGhe === 'Vip' ? 'gheVip' : '';
      let classGheDaDat = ghe.daDat === true ? 'gheDaDat' : '';
      let classGheDangDat = '';
      // Kiểm tra từng ghế xem có k ghế đang đặt
      let indexGheDD = danhSachGheDangDat.findIndex(gheDD => gheDD.maGhe === ghe.maGhe);
      if (indexGheDD !== -1) {
        classGheDangDat = 'gheDangDat'
      }

      // Kiểm tra từng ghế xem có phải khách đặt hay k
      let classGheKhachDat = '';
      let indexGheKD = danhSachgheKhachDat.findIndex(gheKD => gheKD.maGhe === ghe.maGhe);
      if (indexGheKD !== -1) {
        classGheKhachDat = 'gheKhachDat';
      }

      let classGheDaDuocDat = '';
      if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
        classGheDaDuocDat = 'gheDaDuocDat'
      }

      return <div className="relative inline-flex justify-center" style={{ width: 'calc(100%/16)' }} key={index}>
        <button onClick={() => {
          // const gheAlpha = `${toLetters(Math.floor(index / 16) + 1)}${ghe.stt - 16 * Math.floor(index / 16)} `
          dispatch(datGheAction(ghe, props.match.params.id))
        }} disabled={ghe.daDat || classGheKhachDat !== ''} className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheDaDuocDat} ${classGheKhachDat} text-center`}>
          {ghe.daDat ? classGheDaDuocDat !== '' ? <UserOutlined /> : <CloseOutlined className="font-bold" /> : ghe.stt - 16 * Math.floor((ghe.stt - 1) / 16)}
        </button>
        {(index % 16) === 0 ? <span className="alphaBooking font-bold text-xl" >{toLetters((index / 16) + 1)}</span> : ''}

      </div>
    })
  }

  // Render theo alpha B
  const renderGheDangChon = () => {

    return danhSachGheDangDat.map((gheDD, index) => {
      return <span key={index} className="text-xl text-green-800 ml-1">{`${toLetters(Math.floor((gheDD.stt - 1) / 16) + 1)}${(gheDD.stt) - 16 * Math.floor((gheDD.stt - 1) / 16)} `}{danhSachGheDangDat.length <= 1 || index === danhSachGheDangDat.length - 1 ? '' : ','}</span>
    })
  }

  // const renderGheDangChon = () => {

  //   return _.sortBy(danhSachGheDangDat, ['stt']).map((gheDD, index) => {
  //     return <span key={index} className="text-xl text-green-800 ml-1">{gheDD.tenGhe}{danhSachGheDangDat.length <= 1 || index === danhSachGheDangDat.length - 1 ? '' : ','}</span>
  //   })
  // }

  const renderTienGhe = () => {
    let tongTien = danhSachGheDangDat?.reduce((TongTien, Ghe) => TongTien + Ghe.giaVe, 0);
    return tongTien.toLocaleString()
  }
  return (
    <>
      {isSuccess && datVeThanhCong && <ModalResult setIsSuccess={setIsSuccess} danhSachGheDangDat={danhSachGheDangDat} userLogin={userLogin} thongTinPhim={thongTinPhim} />}
      <Modal visible={isModalVisible && soGheChoPhep} closable={false} centered={true} footer={<Button key="back" onClick={handleOk} style={{ borderRadius: '20px' }}>
        OK
      </Button>}>
        <div className="flex flex-col items-center">
          <div className="flex justify-center">

            <img className="h-24 " src={require('../../assets/images/Ticket.png')} alt="ticket" />
            <img className="h-24 " src={require('../../assets/images/Ticket.png')} alt="ticket" />
            <img className="h-24 " src={require('../../assets/images/Ticket.png')} alt="ticket" />



          </div>
          <p className="text-center font-bold text-2xl  text-gray-500">{`Bạn không được mua quá ${soGheKhongVuotQua} vé!`}</p>

        </div>

      </Modal>
      <div className="grid grid-cols-12">
        <div className="col-span-12 xl:col-span-9">
          {/* -----------Begin of sidebar Status dat ve---------------------- */}
          <div className="w-full h-28 border shadow-md   flex flex-row items-center pr-5 xl:pr-0 justify-around ">
            <NavLink to="/" className="xl:hidden block text-gray-500 font-bold text-2xl pl-5">
              <CloseOutlined />
            </NavLink>
            <div className="xl:hidden h-full flex flex-row basis-full items-center justify-center">
              <p className={`${danhSachGheDangDat.length > 0 ? 'hidden' : 'block'} text-gray-500 font-bold text-2xl mb-0`}>1.CHỌN GHẾ</p>
              <p className={`${danhSachGheDangDat.length > 0 ? 'block' : 'hidden'} text-gray-500 font-bold text-2xl mb-0`}>2.ĐẶT VÉ</p>
            </div>
            <div className="hidden xl:h-full xl:flex xl:flex-row xl:items-center xl:pl-20  xl:basis-4/5">
              <Steps>
                <Step className={`transition-all duration-300 ${danhSachGheDangDat.length > 0 ? 'opacity-100' : 'opacity-20'}`} status={danhSachGheDangDat.length > 0 ? 'finish' : 'process'} title="Chọn ghế" icon={<UserOutlined />} />
                <Step status="wait" title="Đặt vé" icon={<SolutionOutlined />} />
                <Step status="wait" title="Thanh Toán" icon={<LoadingOutlined />} />
                <Step status="wait" title="Done" icon={<SmileOutlined />} />
              </Steps>
            </div>
            <NavLink to="/profile" className="xl:h-full xl:flex xl:flex-col xl:justify-center xl:items-center xl:basis-1/5 ">
              <img className="inline-block rounded-full xl:w-14 xl:h-14 w-24" src={`https://i.pravatar.cc/150?u=${userLogin.hoTen}`} alt="" />
              <p className="hidden xl:block xl:mb-0 xl:text-center xl:font-medium xl:text-xl xl:text-gray-300">{userLogin.hoTen}</p>
            </NavLink>


          </div>
          {/* -----------End of sidebar Status dat ve---------------------- */}


          {/* -----------Begin of Booking ticket place------------------------ */}
          <div className="relative flex flex-col justify-start items-center mt-5" style={{ backgroundColor: 'rgb(245,245,245)' }}>

            <div className="relative screenMovie relavtive  mb-0 flex justify-center items-center xl:w-4/5 w-full">
              <p className="text-black text-xl font-bold">Screen</p>

            </div>



            <div className="py-5  xl:px-40 xl:w-full relative w-4/5">
              {renderSeats()}
            </div>
          </div>
          <div className="mb-14 lg:mt-5 flex justify-center w-full">
            <table className="divide-y divide-gray-200 w-full xl:w-2/3   ">
              <thead className="bg-gray-50 p-5 mb-5">
                <tr>
                  <th>Ghế chưa đặt</th>
                  <th>Ghế đang đặt</th>
                  <th>Ghế đã được đặt</th>
                  <th>Ghế vip</th>
                  <th>Ghế mình đặt</th>
                  <th>Ghế khách đang đặt</th>
                </tr>
              </thead>
              <tbody align="center" className="bg-white divide-y divide-gray-200">
                <tr>
                  <td><button style={{ width: '35px', height: '35px' }} className="ghe text-center">00</button></td>
                  <td><button style={{ width: '35px', height: '35px' }} className="ghe gheDangDat text-center">00</button></td>
                  <td><button style={{ width: '35px', height: '35px' }} className="ghe gheDaDat text-center"><CloseOutlined className="mb-3 font-bold" /></button></td>
                  <td><button style={{ width: '35px', height: '35px' }} className="ghe gheVip text-center">00</button></td>
                  <td><button style={{ width: '35px', height: '35px' }} className="ghe gheDaDuocDat text-center"><UserOutlined className="mb-3" /></button></td>
                  <td><button style={{ width: '35px', height: '35px' }} className="ghe gheKhachDat text-center">00</button></td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* -----------End of Booking ticket place------------------------ */}




        </div>
        <div className="xl:col-span-3">
          <div className="hidden xl:block h-screen w-full border shadow-xl  py-0 relative overflow-auto" style={{ padding: '0 8%' }}>
            <h3 className="text-center text-4xl text-green-500 mt-2">0đ</h3>
            <hr />
            <h3 className="text-2xl font-medium mt-5 mb-0">{thongTinPhim.tenPhim}</h3>
            <p className="mb-0"> <span className="text-gray-500 ">Địa điểm:</span>  {thongTinPhim.tenCumRap} - {thongTinPhim.tenRap} </p>
            <p className="mb-5"> <span className="text-gray-500">Ngày chiếu:</span>  {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu} </p>
            <hr />
            <div className="flex flex-row my-5">
              <div className="w-4/5">
                <span className="text-2xl text-green-400">Ghế </span>
                {renderGheDangChon()}
              </div>
              <div className="text-right col-span 1">
                <span className="text-green-800 text-lg font-bold">{`${renderTienGhe()}đ`} </span>
              </div>
            </div>
            <hr />
            <div className="my-5">
              <span className="text-gray-500 font-semibold text-sm">Email</span><br />
              {userLogin.email}

            </div>
            <hr />
            <div className="my-5">
              <span className="text-gray-500 font-semibold text-sm">Số điện thoại</span><br />
              {userLogin.soDT || '1111233213'}
            </div>
            <hr />



          </div>
        </div>
        <div className="absolute cursor-pointer  w-full left-0 bottom-0" >
          <div className="xl:hidden w-1/2 left-0 -bottom-1 fixed py-3 border-t bg-white text-2xl border-gray-300 font-bold" style={{ height: '56px' }}>
            {renderGheDangChon()}
          </div>
          <button onClick={handleDatVe} disabled={danhSachGheDangDat.length <= 0} className={`transition-all duration-300 fixed border-gray-300 border-t  right-0 -bottom-1 w-1/2 xl:w-1/4 ${danhSachGheDangDat.length > 0 ? 'hover:bg-orange-500 bg-orange-400' : 'bg-gray-500'}  text-white text-center py-3 font-bold text-2xl`}>
            Đặt vé
          </button>
        </div>


      </div>

    </>
  )
}
