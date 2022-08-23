import React, { Fragment, memo } from 'react'


import './Film.css'
import styles from './Film.module.scss'
import {history} from '../../App'
import '../../assets/images/PlayVideo.png'

function Film(props) {
    
    const {onShowTrailer,renderTrailer, film } = props
   
    return (
        <div  className={`${styles['wrapper']} group`}>
            <div className={`${styles['overlay']}`}>
            </div>
            <div className={`${styles['trailer-icon']}`} onClick={()=>{
                renderTrailer(film.trailer)
                onShowTrailer()
            }}>
                 <img className="hidden group-hover:inline hover:opacity-50" src={require("../../assets/images/PlayVideo.png")} alt="123" />
            </div>
            <div  style={{ backgroundImage: `url(${film.hinhAnh})`}} className={`${styles['movie-img']}`}></div>
            <div className={`${styles['action']}`}>
                <div onClick={()=>{
                    history.push(`/detail/${film.maPhim}`)
                }} className={film.dangChieu === true ? `${styles['film-dangChieu']}` : `${styles['film-sapChieu']}`}>{film.dangChieu === true? 'Đặt vé':'Thông tin phim'}</div>
                <p className={`${styles['movie-name']}`}><span className={`${styles['movie-rating']}`}>C18</span>{film.tenPhim}</p>
            </div>


        </div >

    )
}
export default memo(Film)