import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Rate } from 'antd';
import { history } from '../../App'
import styleSlick from '../RSlick/MultipleRowSlick.module.css'
import { SET_PHIM_DANG_CHIEU, SET_PHIM_SAP_CHIEU } from "../../redux/types/QuanLyPhimType";
export default function Film_Moble() {
  const [filmStatus, setFilmStatus] = useState({
    dangChieu: false,
    sapChieu: false
  })
  const dispatch = useDispatch();
  const { arrFilm } = useSelector(state => state.QuanLyPhimReducer);
  const renderFilms = () => {
    return arrFilm.slice(0, 18).map((item, index) => {
      //className={`${styleSlick['width-item']}`}
      return <div onClick={() => {
        history.push(`/detail/${item.maPhim}`)
      }} key={index} className=' cardFilm_moble opacity-90 hover:cursor-pointer hover:opacity-100 mb-10 rounded-lg relative hover:-translate-x-1 hover:-translate-y-1 hover:-rotate-3 shadow-lg transition-all' style={{ height: '140px' }}>
        <div className='flex justify-start'>
          <div>
            <img className='-translate-y-4 -translate-x-4 rounded-xl  shadow-xl' style={{ height: '120px', width: '120px' }} src={item.hinhAnh} alt="" />
          </div>
          <div className='ml-5 mt-1'>
            <h1 className='mb-0 text-lg'>{item.tenPhim}</h1>
            <p className='text-xs mb-0'>Kyle Chandler...</p>
            <Rate style={{ color: 'rgb(51,187,251)', fontSize: '15px' }} disabled allowHalf value={item.danhGia / 2} />

            <p className="text-sm font-medium mt-2">Dramar | action</p>
          </div>
        </div>
        <div className="bg-blue-400 rounded-xl absolute right-0 bottom-0 -translate-y-3 translate-x-5 flex justify-center items-center " style={{ width: '52px', height: '42px' }}> <img className="w-10 h-10" src='https://img.icons8.com/office/344/train-ticket.png' alt="123" />  </div>
      </div>
    })
  }
  let activeClassDC = filmStatus.dangChieu === true ? 'active_Film' : 'none_active_film'
  let activeClassSC = filmStatus.sapChieu === true ? 'active_Film' : 'none_active_film'
  return (
    <>
      <div className="flex justify-center items-center mb-10">
        <button activeClassName="text-white bg-gray-800" onClick={() => {
          setFilmStatus({
            dangChieu: true,
            sapChieu: false,
          })
          const action = { type: SET_PHIM_DANG_CHIEU }
          dispatch(action);
        }} className={`${styleSlick[activeClassDC]} px-8 py-3 font-semibold rounded mr-2`}>PHIM ĐANG CHIẾU</button>

        <button utton activeClassName="text-white bg-gray-800" onClick={() => {
          setFilmStatus({
            sapChieu: true,
            dangChieu: false,
          })
          const action = { type: SET_PHIM_SAP_CHIEU }
          dispatch(action);
        }} className={`${styleSlick[activeClassSC]} px-8 py-3 font-semibold rounded mr-2`}>PHIM SẮP CHIẾU</button>

      </div>
      <div className='px-5'>
        {renderFilms()}
      </div>
    </>
  )
}
