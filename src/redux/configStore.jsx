import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk';
import { CarouselReducer } from './reducers/CarouselReducer';
import { LoadingReducer } from './reducers/LoadingReducer';
import { QuanLyBinhLuanReducer } from './reducers/QuanLyBinhLuanReducer';
import { QuanLyDatVeReducer } from './reducers/QuanLyDatVeReducer';
import { QuanLyNguoiDungReducer } from './reducers/QuanLyNguoiDungReducer';
import { QuanLyPhimReducer } from './reducers/QuanLyPhimReducer';
import { QuanLyRapReducer } from './reducers/QuanLyRapReducer';

const rootReducer = combineReducers({
    // State ứng dụng
    CarouselReducer,
    QuanLyPhimReducer,
    QuanLyRapReducer,
    QuanLyNguoiDungReducer,  
    QuanLyDatVeReducer,  
    LoadingReducer,
    QuanLyBinhLuanReducer,
});

export const store = createStore(rootReducer,applyMiddleware(thunk))
