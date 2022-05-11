import { SET_DANH_SACH_FILM, SET_PHIM_DANG_CHIEU, SET_PHIM_SAP_CHIEU } from "../types/QuanLyPhimType"
import { SET_CHI_TIET_PHIM } from "../types/QuanLyRapType";

const stateDefault = {
    arrFilm: [
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
    arrFilmDefault:[],

    filmDetail:{}
}

export const QuanLyPhimReducer = (state=stateDefault,action) =>{
    switch(action.type) {
        case SET_DANH_SACH_FILM : {
            state.arrFilm = action.arrFilm;
            state.arrFilmDefault = state.arrFilm;
            return {...state}

        }
        case SET_PHIM_DANG_CHIEU : {
            
            state.arrFilm = state.arrFilmDefault.filter(film=>film.dangChieu === true)
            return {...state}
            
        }

        case SET_PHIM_SAP_CHIEU : {
           
            state.arrFilm = state.arrFilmDefault.filter(film=>film.sapChieu === true)
            return {...state}
        }

        case SET_CHI_TIET_PHIM : {
            state.filmDetail = action.filmDetail
            return {...state}
        }
        default: return{...state}
    }
} 