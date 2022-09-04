import React, { memo } from 'react'

import PropTypes from 'prop-types';

import './Movie.css'
import styles from './Movie.module.scss'
import { history } from '../../App'
import playIcon from '../../assets/images/PlayVideo.png'

function Movie({ onShowTrailer, renderTrailer, film, contentHidden }) {
    const handlePlayTrailer = () => {
        renderTrailer(film.trailer)
        onShowTrailer()
    }
    const handleGoToDetailPage = () => {
        history.push(`/detail/${film.maPhim}`)
    }
    return (
        <div className={`${styles['wrapper']} group`}>
            <div className={`${styles['overlay']}`}>
            </div>
            <div
                className={`${styles['trailer-icon']}`}
                onClick={handlePlayTrailer}
            >
                <img
                    className="hidden group-hover:inline hover:opacity-50"
                    src={playIcon}
                    alt="Play Video Icon"
                />
            </div>
            <img
                className={`${styles['movie-img']}`}
                src={film.hinhAnh}
                loading="lazy"
                alt={film.tenPhim}
            />
            <div className={`${contentHidden?'hidden':''} ${styles['action']}`}>
                <div
                    onClick={handleGoToDetailPage}
                    className={film.dangChieu === true ?
                        `${styles['film-dangChieu']}` :
                        `${styles['film-sapChieu']}`}
                >
                    {film.dangChieu === true ?'Đặt vé':'Thông tin phim'}
                </div>
                <p className={`${styles['movie-name']}`}>
                    <span className={`${styles['movie-rating']}`}>C18</span>{film.tenPhim}
                </p>
            </div>
        </div >
    )
}
Movie.propTypes = {
    film: PropTypes.object,
    onShowTrailer: PropTypes.func,
    renderTrailer: PropTypes.func,
    contentHidden: PropTypes.bool,
}
export default memo(Movie)