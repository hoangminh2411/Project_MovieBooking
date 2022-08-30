import React, { useState, memo, useCallback } from "react";

import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux'
import { SET_PHIM_DANG_CHIEU, SET_PHIM_SAP_CHIEU } from "../../../redux/types/QuanLyPhimType";

import ModalTrailer from "../../../components/ModalTrailer/ModalTrailer";
import Movie from "../../../components/Movie/Movie";

import styles from './MovieList.module.scss'

const MAXIMUM_MOVIES_PER_APPEAR = 8;

const MovieList = ({ movieList }) => {
  const [filmStatus, setFilmStatus] = useState({
    dangChieu: false,
    sapChieu: false
  })
  const [moviesAppear, setMoviesAppear] = useState(MAXIMUM_MOVIES_PER_APPEAR)
  const MAXIMUM_MOVIES_IN_LIST = movieList.length
  const [showTrailer, setShowTrailer] = useState(false)
  const [trailer, setTrailer] = useState('')

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

  const renderMovies = () => {
    return movieList.slice(0, moviesAppear).map((item, index) => {
      //className={`${styleSlick['width-item']}`}
      return <Movie key={index} renderTrailer={renderTrailer} onShowTrailer={handleShowTrailer} film={item} />
    })
  }



  let activeClassDC = filmStatus.dangChieu === true ? 'active_Film' : 'none_active_film'
  let activeClassSC = filmStatus.sapChieu === true ? 'active_Film' : 'none_active_film'
  return (
    <>
      <ModalTrailer trailer={trailer} onCloseTrailer={handleCloseTrailer} onTrailer={showTrailer} />
      <section id="lichChieu" className={`${styles['wrapper']}`}>
        <div className={`${styles['actionFilter']}`}>
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
          {renderMovies()}
        </div>
        {(moviesAppear > MAXIMUM_MOVIES_IN_LIST) ? '' : <div className={`${styles['moreButton']}`}>
          <button onClick={() => {
            setMoviesAppear(moviesAppear + MAXIMUM_MOVIES_PER_APPEAR)
          }}>
            Xem thêm
          </button>
        </div>}
      </section>

    </>
  );
}

MovieList.propTypes = {
  movieList: PropTypes.array
}

export default memo(MovieList);