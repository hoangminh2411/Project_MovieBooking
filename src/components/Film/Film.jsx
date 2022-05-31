import React, { Fragment, useState, memo } from 'react'
import moment from 'moment';
import { useSelector} from 'react-redux'
import './Film.css'
import { NavLink } from 'react-router-dom';
import {history} from '../../App'
import '../../assets/images/PlayVideo.png'
function Film(props) {
    
    const { film } = props

    return (
        <Fragment>
            <div className="w-full overlay absolute top-0 left-0 rounded-lg  group-hover:bg-black group-hover:opacity-50">
            </div>
            <div className="play__trailer">
                <a href={film.trailer}> <img className="hidden group-hover:inline hover:opacity-50" src={require("../../assets/images/PlayVideo.png")} alt="123" /></a>
            </div>
            <div style={{ backgroundImage: `url(${film.hinhAnh})`}} className="film rounded-lg   overflow-hidden shadow-lg ">

                <img src={film.hinhAnh} alt="" className="opacity-0" />
            </div>
            <div className="mt-4 relative">
                <div onClick={()=>{
                    history.push(`/detail/${film.maPhim}`)
                }} className={film.dangChieu === true ? "w-full rounded font-bold text-center py-2  inline-block invisible opacity-0 group-hover:visible  group-hover:opacity-100 bg-red-500 hover:bg-red-400 text-white transition-all cursor-pointer" : "w-full rounded font-bold text-center inline-block py-2 opacity-0 invisible  group-hover:visible  group-hover:opacity-100 bg-blue-500 hover:bg-blue-400 text-white transition-all cursor-pointer"}>{film.dangChieu === true? 'Đặt vé':'Thông tin phim'}</div>
                <p className="absolute top-0 left-3 font-bold opacity-100 transition-all group-hover:opacity-0 group-hover:invisible "><span className="inline-block px-2 mr-2 rounded bg-red-500 text-white  ">C18</span>{film.tenPhim}</p>
            </div>


        </Fragment >

    )
}
export default (Film)