import React, { useState, memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Modal, Button } from 'antd';
import { SET_PHIM_DANG_CHIEU, SET_PHIM_SAP_CHIEU } from "../../redux/types/QuanLyPhimType";
import Film from "../Film/Film";
import styleSlick from './MultipleRowSlick.module.css'
import './MultipleRowSlick.css'
import ModalTrailer from "../ModalTrailer/ModalTrailer";




const MultipleRows = (props) => {

  const [filmStatus, setFilmStatus] = useState({
    dangChieu: false,
    sapChieu: false
  })

  const [showTrailer, setShowTrailer] = useState(false)
  const [trailer,setTrailer] = useState('')
  
  const dispatch = useDispatch();
  console.log('phim', props.arrFilm);
  const handleShowTrailer = ()=>{
    setShowTrailer(true);
  }

  const handleCloseTrailer = () => {
    setShowTrailer(false)
  }

  const renderTrailer=  (trailer) => {
    setTrailer(trailer)
  }
  const renderFilms = () => {
    return props.arrFilm.map((item, index) => {
      //className={`${styleSlick['width-item']}`}
      return <div key={index} className="ImageAnimate transition group relative mb-10 mx-5" >
        <Film renderTrailer={renderTrailer} handleShowTrailer={handleShowTrailer} film={item} />

      </div>
    })


  }

  let activeClassDC = filmStatus.dangChieu === true ? 'active_Film' : 'none_active_film'
  let activeClassSC = filmStatus.sapChieu === true ? 'active_Film' : 'none_active_film'
  return (
    <>
      <ModalTrailer trailer={trailer}  handleCloseTrailer={handleCloseTrailer} showTrailer={showTrailer} />
      <section id="lichChieu" className="text-gray-600 pt-10">
        <div className="container mx-auto pt-12">
          <div className="flex justify-center items-center">
            <button activeClassName="text-white bg-gray-800" onClick={() => {
              setFilmStatus({
                dangChieu: true,
                sapChieu: false,
              })
              const action = { type: SET_PHIM_DANG_CHIEU }
              dispatch(action);
            }} className={`${styleSlick[activeClassDC]} px-8 py-3 font-semibold rounded-lg mr-2`}>PHIM ĐANG CHIẾU</button>

            <button activeClassName="text-white bg-gray-800" onClick={() => {
              setFilmStatus({
                sapChieu: true,
                dangChieu: false,
              })
              const action = { type: SET_PHIM_SAP_CHIEU }
              dispatch(action);
            }} className={`${styleSlick[activeClassSC]} px-8 py-3 font-semibold rounded-lg mr-2`}>PHIM SẮP CHIẾU</button>

          </div>
          {/* <Slider {...settings}> */}

          <div className="py-5 lg:mx-56 xl:mx-56 grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 shadow-lg">


            {renderFilms()}


          </div>




          {/* </Slider> */}
        </div>
       
      </section>

    </>
  );
}

export default memo(MultipleRows);