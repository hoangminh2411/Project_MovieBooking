import React, { Fragment, useState } from 'react'
import moment from 'moment';
import { useSelector} from 'react-redux'
import './Film.css'

export default function Film(props) {
    
    const { film } = props

    return (
        <Fragment>
            <div className="w-full overlay absolute top-0 left-0  group-hover:bg-black group-hover:opacity-50">
            </div>
            <div className="play__trailer">
                <a href={film.trailer}> <img className="hidden group-hover:inline hover:opacity-50" src="https://movie-booking-project.vercel.app/img/carousel/play-video.png" alt="123" /></a>
            </div>
            <div style={{ backgroundImage: `url(${film.hinhAnh})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} className="film rounded-t  overflow-hidden shadow-lg ">

                <img src={film.hinhAnh} alt="" className="opacity-0" />
            </div>
            <div className="mt-4 relative">
                <a className={film.dangChieu === true ? "w-full rounded font-bold text-center py-2  inline-block invisible opacity-0 group-hover:visible  group-hover:opacity-100 bg-red-500 text-white transition-all" : "w-full rounded font-bold text-center inline-block py-2 opacity-0 invisible group-hover:visible  group-hover:opacity-100 bg-blue-500 text-white transition-all"}>{film.dangChieu === true? 'Đặt vé':'Thông tin phim'}</a>
                <p className="absolute top-0 left-3 font-bold opacity-100 transition-all group-hover:opacity-0 "><span className="inline-block px-2 mr-2 rounded bg-red-500 text-white  ">C18</span>{film.tenPhim}</p>
            </div>


        </Fragment >

    )
}
