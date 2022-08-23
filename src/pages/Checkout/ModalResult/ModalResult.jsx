import React from 'react'
import {history} from '../../../App'
import { CloseCircleOutlined } from '@ant-design/icons'
import './ModalResult.css'
import  toLetters from '../../../util/NumbertoString'
import moment from 'moment'
import { useSelector } from 'react-redux'
export default function ModalResult(props) {
    const {backUpDanhSachGheDangDat} = useSelector(state=>state.QuanLyDatVeReducer)
    const { thongTinPhim, userLogin , setIsSuccess } = props
    const renderDanhSachGheDangDat = () => {
        return backUpDanhSachGheDangDat.map((gheDD, index) => {
            return <span key={index}>{`${toLetters(Math.floor((gheDD.stt-1)/16)+1)}${(gheDD.stt) -16*Math.floor((gheDD.stt-1)/16)} `}
                {backUpDanhSachGheDangDat.length <= 1 || index === backUpDanhSachGheDangDat.length - 1 ? '' : ','}
            </span>
        })
    }
    return (

        <div className="fixed w-full top-0 left-0 z-10  min-h-screen ">
            <div className="bg-gray-500 opacity-40 w-full h-full absolute top-0 left-0">
            </div>
            <div className="ticketResult  rounded-2xl  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 " style={{ width: '303px', height: '546px' }}>
                <div className="cursor-pointer " onClick={(e) => {
                    setIsSuccess(false);
                    history.push('/profile');
                }}>
                    <CloseCircleOutlined className="text-3xl absolute hover:opacity-30" style={{ top: '-2%', right: '-4%', color: 'white' }} />

                </div>
                <div className="flex justify-center mt-5 ">
                    <img style={{ width: '266px', height: '142px', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} src={thongTinPhim.hinhAnh} alt="" className=" border rounded-xl shadow-xl" />

                </div>
                <div className="mt-3 border-b  border-dashed border-gray-400" style={{ marginLeft: '31px', marginRight: '31px' }}   >
                    <h1>{thongTinPhim.tenPhim}</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, aliquid.</p>
                </div>
                <div className="mt-3 flex flex-row justify-around">
                    <div className="flex flex-col">
                        <div>
                            <h1>{userLogin?.hoTen}</h1>
                            <p>Tên người đặt</p>
                        </div>
                        <div>
                            <h1>{renderDanhSachGheDangDat()}</h1>
                            <p>Ghế</p>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div>
                            <h1>{`${moment(thongTinPhim.ngayChieu).format(`DD/MM`)} - ${thongTinPhim.gioChieu} `}</h1>
                            <p>Ngày - Giờ</p>
                        </div>
                        <div>
                            <h1>{thongTinPhim.tenRap}</h1>
                            <p>Rạp</p>
                        </div>
                    </div>

                </div>
                <div style={{ height: '81px', width: '266px', marginLeft: '20px', marginRight: '31px' }} className="opacity-80 mt-3 mb-5 bg-white rounded-xl">
                    <img className="rounded-xl w-full h-full " src="https://cdn.shopify.com/s/files/1/2652/5526/files/12.png?v=1565659979" alt="" />
                </div>


            </div>
        </div>

    )
}

