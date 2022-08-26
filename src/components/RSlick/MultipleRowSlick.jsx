import React, { useState, memo, useCallback } from "react";
import { useDispatch } from 'react-redux'
import { SET_PHIM_DANG_CHIEU, SET_PHIM_SAP_CHIEU } from "../../redux/types/QuanLyPhimType";
import Film from "../Film/Film";
import styles from './MultipleRowSlick.module.scss'

import ModalTrailer from "../ModalTrailer/ModalTrailer";



const maximumFilm = 8;

const MultipleRows = ({ arrFilm }) => {
  const [filmStatus, setFilmStatus] = useState({
    dangChieu: false,
    sapChieu: false
  })
  const [showTrailer, setShowTrailer] = useState(false)
  const [trailer, setTrailer] = useState('')

  const [maxFilms, setMaxFilms] = useState(maximumFilm)

  const dispatch = useDispatch();



  const handleShowTrailer = useCallback(() => {
    setShowTrailer(true);
  }, [])
  
  const handleCloseTrailer = () => {
    setShowTrailer(false)
  }
  const renderTrailer = useCallback((trailer) => {
    setTrailer(trailer)
  }, [])

  const renderFilms = () => {
    return arrFilm.slice(0, maxFilms).map((item, index) => {
      //className={`${styleSlick['width-item']}`}
      return <Film key={index} renderTrailer={renderTrailer} onShowTrailer={handleShowTrailer} film={item} />
    })
  }

  let activeClassDC = filmStatus.dangChieu === true ? 'active_Film' : 'none_active_film'
  let activeClassSC = filmStatus.sapChieu === true ? 'active_Film' : 'none_active_film'
  return (
    <>
      <ModalTrailer trailer={trailer} onCloseTrailer={handleCloseTrailer} onTrailer={showTrailer} />
      <section id="lichChieu" className={`${styles['wrapper']}`}>

        <div className={`${styles['action']}`}>
          <button onClick={() => {
            setFilmStatus({
              dangChieu: true,
              sapChieu: false,
            })
            const action = { type: SET_PHIM_DANG_CHIEU }
            dispatch(action);
          }} className={`${styles[activeClassDC]}`}>PHIM ĐANG CHIẾU</button>

          <button onClick={() => {
            setFilmStatus({
              sapChieu: true,
              dangChieu: false,
            })
            const action = { type: SET_PHIM_SAP_CHIEU }
            dispatch(action);
          }} className={`${styles[activeClassSC]}`}>PHIM SẮP CHIẾU</button>

        </div>
        <div className={`${styles['movies']}`}>
          {renderFilms()}
        </div>
        {(maxFilms > arrFilm.length) ? '' : <div className='flex justify-center'>

          <button className='py-[7px] px-[25px]  uppercase text-gray-500 border border-gray-500 rounded-md hover:text-white hover:border-red-700 hover:bg-red-700 transition-colors' onClick={() => {
            setMaxFilms(maxFilms + 8)
          }}>
            Xem thêm
          </button>
        </div>}
      </section> 

    </>
  );
}

export default memo(MultipleRows);