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
    ]
}

export const QuanLyPhimReducer = (state=stateDefault,action) =>{
    switch(action.type) {
        
        default: return{...state}
    }
} 