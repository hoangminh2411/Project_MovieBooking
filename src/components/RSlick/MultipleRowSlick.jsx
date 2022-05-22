import React, { Component, useState, memo } from "react";
import { useDispatch } from "react-redux";
import Slider from "react-slick";
import { SET_PHIM_DANG_CHIEU, SET_PHIM_SAP_CHIEU } from "../../redux/types/QuanLyPhimType";
import Film from "../Film/Film";
import styleSlick from './MultipleRowSlick.module.css'


// function SampleNextArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={`${className} ${styleSlick['slick-next']}`}
//       style={{ ...style, display: "block", color: 'black' }}
//       onClick={onClick}
//     />
//   );
// }

// function SamplePrevArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={`${className} ${styleSlick['slick-prev']}`}
//       style={{ ...style, display: "block", color: 'black' }}
//       onClick={onClick}
//     />
//   );
// }
const MultipleRows = (props) => {
  
  const [filmStatus,setFilmStatus] = useState({
    dangChieu:false,
    sapChieu:false
  })
  const dispatch = useDispatch();
  console.log('phim',props.arrFilm);
  const renderFilms = () => {
    return props.arrFilm.slice(0,18).map((item, index) => {
      //className={`${styleSlick['width-item']}`}
      return <div key={index} className="group relative mb-10 mx-5">
        <Film film={item} />
        
      </div>
    })


  }
  // const settings = {
  //   className: "slider variable-width",
  //   centerMode: true,
  //   infinite: true,
  //   centerPadding: "60px",
  //   slidesToShow: 2,
  //   speed: 500,
  //   rows: 2,
  //   slidesPerRow: 1,
  //   variableWidth: true,
  //   nextArrow: <SampleNextArrow />,
  //   prevArrow: <SamplePrevArrow />
  // };
  
  let activeClassDC = filmStatus.dangChieu === true? 'active_Film': 'none_active_film'
  let activeClassSC = filmStatus.sapChieu === true? 'active_Film': 'none_active_film'
  return (
    <div className="container mx-auto pt-12">
      <div className="flex justify-center items-center">
        <button activeClassName="text-white bg-gray-800" onClick={() => {
          setFilmStatus({
            dangChieu: true,  
            sapChieu: false,
          })
          const action = { type: SET_PHIM_DANG_CHIEU }
          dispatch(action);
        }} className={`${styleSlick[activeClassDC]} px-8 py-3 font-semibold rounded mr-2`}>PHIM ĐANG CHIẾU</button>

        <button  utton activeClassName="text-white bg-gray-800" onClick={() => {
          setFilmStatus({
            sapChieu: true,  
            dangChieu: false,
          })
          const action = { type: SET_PHIM_SAP_CHIEU }
          dispatch(action);
        }} className={`${styleSlick[activeClassSC]} px-8 py-3 font-semibold rounded mr-2`}>PHIM SẮP CHIẾU</button>

      </div>
      {/* <Slider {...settings}> */}
      
        <div className="py-5 lg:mx-56 xl:mx-56 grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 shadow-lg">
          {renderFilms()}

        </div>

      
        

      {/* </Slider> */}
    </div>
  );
}

export default memo(MultipleRows);