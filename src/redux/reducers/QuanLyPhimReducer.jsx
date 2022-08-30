import { LAY_THONG_TIN_PHIM, SET_DANH_SACH_FILM, SET_PHIM_DANG_CHIEU, SET_PHIM_SAP_CHIEU } from "../types/QuanLyPhimType"
import { SET_CHI_TIET_PHIM } from "../types/QuanLyRapType";

const stateDefault = {
    movieList: [
        {
            "maPhim": 8572,
            "tenPhim": "Red Snake Dangerous",
            "biDanh": "red-snake-dangerous",
            "trailer": "https://youtu.be/Qm8iwrgXkqU",
            "hinhAnh": "https://movienew.cybersoft.edu.vn/hinhanh/red-snake-dangerous_gp01.jpg",
            "moTa": "While trying to secure sister from Fahai's clutches, Qing winds up in a city and meets a mysterious man who can't recall his past life.",
            "maNhom": "GP01",
            "ngayKhoiChieu": "2022-03-07T00:00:00",
            "danhGia": 8,
            "hot": true,
            "dangChieu": false,
            "sapChieu": true
          },
          
          
    ],
    dangChieu:true,
    sapChieu:true,
    movieListDefault:[],
    
    filmDetail:{},
    thongTinPhim: {}
}

export const QuanLyPhimReducer = (state=stateDefault,action) =>{
    switch(action.type) {

        case SET_DANH_SACH_FILM : {
            state.movieList = action.movieList;
            state.movieListDefault = state.movieList;
            return {...state}
        }
        case SET_PHIM_DANG_CHIEU : {
            state.movieList = state.movieListDefault.filter(movie=>movie.dangChieu === true)
            return {...state}  
        }
        case SET_PHIM_SAP_CHIEU : {
            state.movieList = state.movieListDefault.filter(movie=>movie.sapChieu === true)
            return {...state}
        }

        case SET_CHI_TIET_PHIM : {
            state.filmDetail = action.filmDetail
            return {...state}
        }

        case LAY_THONG_TIN_PHIM: {
            state.thongTinPhim = action.thongTinPhim;
            return {...state}
        }
        default: return{...state}
    }
} 