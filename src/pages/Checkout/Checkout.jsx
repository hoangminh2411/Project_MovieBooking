// import thư viện lodash
import _, { round } from 'lodash'
import React, { useEffect, Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { datVe, layChiTietPhongVe } from '../../redux/actions/QuanLyDatVeAction'

import style from './Checkout.module.css'
import './Checkout.css'

// import thu vien antd
import { Steps, Modal, Button } from 'antd';
import { UserOutlined, SolutionOutlined, LoadingOutlined, SmileOutlined, CloseOutlined } from '@ant-design/icons';
import { DAT_GHE } from '../../redux/types/QuanLyDatVeType'
import { ThongTinDatVe } from '../../_core/models/ThongTinDatVe'
import { ACCESS_TOKEN } from '../../util/setting'
import { soGheKhongVuotQua } from '../../redux/reducers/QuanLyDatVeReducer'
import ModalResult from './ModalResult/ModalResult'

import  toLetters from '../../util/NumbertoString'
const { Step } = Steps









export default function Checkout(props) {
  const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)
  const { chiTietPhongVe, danhSachGheDangDat, soGheChoPhep, datVeThanhCong } = useSelector(state => state.QuanLyDatVeReducer)
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false)
  const dispatch = useDispatch();
  useEffect(() => {
    // Gọi hàm tạo ra 1 async function
    const action = layChiTietPhongVe(props.match.params.id);
     
    // disptach fucntion này đi
    dispatch(action);
  }, [])


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

      let classGheDaDuocDat = '';
      if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
        classGheDaDuocDat = 'gheDaDuocDat'
      }

      return <div className="relative inline-flex justify-center" style={{ width: 'calc(100%/16)' }} key={index}>
        <button onClick={() => {
          const gheAlpha = `${toLetters(Math.floor(index/16)+1)}${ghe.stt -16*Math.floor(index/16)} ` 
          console.log('gheAlpha',gheAlpha);
          dispatch({
            type: DAT_GHE,
            gheDuocChon: ghe

          })
        }} disabled={ghe.daDat} className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheDaDuocDat} text-center`}>
          {ghe.daDat ? classGheDaDuocDat !== '' ? <UserOutlined /> : <CloseOutlined className="font-bold" /> :ghe.stt -16*Math.floor((ghe.stt-1)/16)}
        </button>
        {(index % 16) === 0 ? <span className="alphaBooking font-bold text-xl" >{toLetters((index /16)+1)}</span> : ''}

      </div>
    })
  }

// Render theo alpha B
  const renderGheDangChon = () => {

    return danhSachGheDangDat.map((gheDD, index) => {
      return <span key={index} className="text-xl text-green-800 ml-1">{`${toLetters(Math.floor((gheDD.stt-1)/16)+1)}${(gheDD.stt) -16*Math.floor((gheDD.stt-1)/16)} `}{danhSachGheDangDat.length <= 1 || index === danhSachGheDangDat.length - 1 ? '' : ','}</span>
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
      <Modal visible={isModalVisible && soGheChoPhep} closable={false} centered={true} footer={<Button key="back" onClick={handleOk} style={{borderRadius:'20px'}}>
        OK
      </Button>}>
        <div className="flex flex-col items-center">
          <div className="flex">
            
          <img className="h-24 " src='https://img.freepik.com/free-vector/ticket-mascot-character-saying-i-know-cute-style-design-t-shirt-sticker-logo-element_152558-21574.jpg?size=338&ext=jpg&ga=GA1.2.1050152923.1653044197' alt="" />
          <img className="h-24 " src='https://img.freepik.com/free-vector/ticket-mascot-character-saying-i-know-cute-style-design-t-shirt-sticker-logo-element_152558-21574.jpg?size=338&ext=jpg&ga=GA1.2.1050152923.1653044197' alt="" />
          <img className="h-24 " src='https://img.freepik.com/free-vector/ticket-mascot-character-saying-i-know-cute-style-design-t-shirt-sticker-logo-element_152558-21574.jpg?size=338&ext=jpg&ga=GA1.2.1050152923.1653044197' alt="" />
          <img className="h-24 " src='https://img.freepik.com/free-vector/ticket-mascot-character-saying-i-know-cute-style-design-t-shirt-sticker-logo-element_152558-21574.jpg?size=338&ext=jpg&ga=GA1.2.1050152923.1653044197' alt="" />
          <img className="h-24 " src='https://img.freepik.com/free-vector/ticket-mascot-character-saying-i-know-cute-style-design-t-shirt-sticker-logo-element_152558-21574.jpg?size=338&ext=jpg&ga=GA1.2.1050152923.1653044197' alt="" />

          </div>
          <p className="text-center font-bold text-2xl  text-gray-500">{`Bạn không được mua quá ${soGheKhongVuotQua} vé!`}</p>

        </div>

      </Modal>
      <div className="grid grid-cols-12">
        <div className="col-span-12 xl:col-span-9  overflow-auto">
          {/* -----------Begin of sidebar Status dat ve---------------------- */}
          <div className="w-full h-28 border shadow-md   flex flex-row items-center pr-5 xl:pr-0 justify-around ">
            <div className="xl:hidden block text-gray-500 font-bold text-2xl pl-5">
              <CloseOutlined />
            </div>
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
            <div className="xl:h-full xl:flex xl:flex-col xl:justify-center xl:items-center xl:basis-1/5 ">
              <img className="inline-block rounded-full xl:w-14 xl:h-14 w-24" src={`https://i.pravatar.cc/150?u=${userLogin.taiKhoan}`} alt="" />
              <p className="hidden xl:block xl:mb-0 xl:text-center xl:font-medium xl:text-xl xl:text-gray-300">{userLogin.hoTen}</p>
            </div>


          </div>
          {/* -----------End of sidebar Status dat ve---------------------- */}


          {/* -----------Begin of Booking ticket place------------------------ */}
          <div className="relative flex flex-col justify-start items-center mt-5" style={{ backgroundColor: 'rgb(245,245,245)' }}>
            {/* <div className="bg-black w-full xl:w-4/5" style={{ height: '15px' }}>
            </div> */}
            <div className="relative screenMovie relavtive  mb-0 flex justify-center items-center xl:w-4/5 w-full">
              <p className="text-black text-xl font-bold">Screen</p>

            </div>
            {/* <div className={`${style['trapezoid']}`}>
            </div> */}


            <div className="py-5 w-4/5 xl:px-40 xl:w-full relative">
              {renderSeats()}
            </div>
          </div>
          <div className="mt-5 flex justify-center w-full">
            <table className="divide-y divide-gray-200 w-full xl:w-2/3   ">
              <thead className="bg-gray-50 p-5 mb-5">
                <tr>
                  <th>Ghế chưa đặt</th>
                  <th>Ghế đang đặt</th>
                  <th>Ghế đã được đặt</th>
                  <th>Ghế vip</th>
                  <th>Ghế mình đặt</th>
                </tr>
              </thead>
              <tbody align="center" className="bg-white divide-y divide-gray-200">
                <tr>
                  <td><button style={{ width: '35px', height: '35px' }} className="ghe text-center">00</button></td>
                  <td><button style={{ width: '35px', height: '35px' }} className="ghe gheDangDat text-center">00</button></td>
                  <td><button style={{ width: '35px', height: '35px' }} className="ghe gheDaDat text-center"><CloseOutlined className="mb-3 font-bold" /></button></td>
                  <td><button style={{ width: '35px', height: '35px' }} className="ghe gheVip text-center">00</button></td>
                  <td><button style={{ width: '35px', height: '35px' }} className="ghe gheDaDuocDat text-center"><UserOutlined className="mb-3" /></button></td>
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
              <i className="text-gray-500">Email</i><br />
              {userLogin.email}

            </div>
            <hr />
            <div className="my-5">
              <i className="text-gray-500">Phone</i><br />
              {'0909724980' || userLogin.soDT}
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
