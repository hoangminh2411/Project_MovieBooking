import React, { useEffect, useState, useLayoutEffect} from 'react'
import { Calendar, Table } from 'antd';
import { CalendarOutlined, DeleteOutlined,SearchOutlined, EditOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachPhimAction, xoaPhimAction } from '../../../redux/actions/QuanLyPhimAction';
import moment from 'moment';
import './Films.css'
import  { PlusOutlined } from '@ant-design/icons';
import { motion, MotionConfig } from "framer-motion"
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
export default function Films() {
  const { arrFilmDefault } = useSelector(state => state.QuanLyPhimReducer);
  const [film,setFilm] = useState(arrFilmDefault)
  
  const dispatch = useDispatch()
  useEffect(() => {
    const action = layDanhSachPhimAction();
    dispatch(action);
    
  }, [])
  useEffect(() => {
    setFilm(arrFilmDefault);
    
  }, [arrFilmDefault])
  
  const [values, setValues] = useState('')
  const handleChangeInput = (event)=>{
    setValues(event.target.value);
  }
  const handleSearch = (searchText)=> {
    let filteredEvents = arrFilmDefault.filter(({tenPhim}) => {
      tenPhim = tenPhim.toLowerCase();
      return tenPhim.includes(searchText);
    });
   
    if(filteredEvents.length == 0){
     
      filteredEvents = arrFilmDefault.filter(({maPhim}) => {
        return maPhim.toString().includes(searchText.toString()) ;
      });
    }
   
    setFilm(filteredEvents)
    // console.log(searchText)
    // const action = layDanhSachPhimAction(searchText);
    // dispatch(action);
  }
 
  const columns = [

    {
      title: 'Mã phim',
      dataIndex: 'maPhim',
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ['descend'],
    },

    {
      title: 'Phim',
      dataIndex: 'tenPhim',
      render: (text, film) => {
        return <motion.div layout className="flex">
          <img className="w-14 h-16   rounded-lg" src={film.hinhAnh} alt="" />
          <div className="ml-2">
            <h3>{film.tenPhim}</h3>
            <p className="text-slate-500">120 phút - 10 Idb - 2D/digital</p>
          </div>
        </motion.div>
      },
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      sorter: (a, b) => a.tenPhim.length - b.tenPhim.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Đánh giá',
      dataIndex: 'danhGia',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.danhGia - b.danhGia,
    },
    {
      title: 'Ngày chiếu',
      dataIndex: 'ngayKhoiChieu',
      render: (text, film) => {
        return <>{moment(film.ngayKhoiChieu).format('DD/MM/YYYY')}</>
      }

    },
    {
      title: '',
      dataIndex: 'hanhDong',
      render: (text, film) => {
        return <div className="flex ">
        <div  className="flex justify-start items-center px-3 py-2 text-white bg-blue-500 rounded-xl shadow-blue-700 hover:bg-blue-700 cursor-pointer font-medium mr-2">
              <EditOutlined />
              <NavLink to={`/admin/films/edit/${film.maPhim}`} className="mb-0 ml-3 text-white hover:text-white">Edit item</NavLink>
              
        </div>
        <div onClick={()=>{
          // Gọi action xóa
          if(window.confirm('Bạn có chắc muốn xóa hay không' + film.tenPhim)){
            // Gọi action
            const action  = xoaPhimAction(film.maPhim);
            dispatch(action);
          }
        }}  className="flex justify-start items-center px-3 py-2 text-white bg-red-500 rounded-xl shadow-red-700 hover:bg-red-700 cursor-pointer font-medium mr-2">
        <DeleteOutlined />
              <p className="mb-0 ml-3">Delete item</p>
              
        </div>
        <NavLink to={`/admin/films/showtimes/${film.maPhim}`}   className="flex justify-start items-center px-3 py-2 text-white bg-blue-500 rounded-full shadow-blue-700 hover:bg-blue-700 cursor-pointer font-medium mr-2">
              <CalendarOutlined />
       </NavLink>
        </div>
      }
    }
  ];

  const data = film ||  arrFilmDefault
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };


  return (
    <div className="overflow-auto">
      <h1 className="font-bold text-3xl text-center lg:text-left ">Film management</h1>
      <div className="flex flex-col lg:flex-row justify-between items-center my-7">
        <ul>
          <li className="inline-block mr-2 font-bold">
            <a href="#" className="text-red-500 text-lg">All Film</a>
          </li>

        </ul>
        <div>
          <p className="font-semibold"><span className="inline-flex items-center mr-2 pl-3 pr-4 py-3 border border-gray-300 rounded-xl shadow text-gray-500 "><CalendarOutlined /> 11-01-2021</span> To  <span className="inline-flex items-center ml-2 pl-3 pr-4 py-3 border border-gray-300 rounded-xl shadow text-gray-500"><CalendarOutlined /> 11-01-2021</span></p>
        </div>
      </div>
        <div className="flex justify-between items-center">
        <div className="pl-5 lg:pl-0 w-1/2 lg:w-1/4 mb-5 flex items-center">

          <input onChange={handleChangeInput} placeholder='Tìm kiếm phim' name="search" className="pl-2 rounded-xl w-full text-lg py-1 border border-gray-300 focus:outline-none focus:shadow-outline focus:border-indigo-500" />
          <div onClick={()=>{
              handleSearch(values)
            }}>
            <SearchOutlined className="text-2xl opacity-40 cursor-pointer hover:opacity-100 -translate-x-10" />

          </div>
        </div>
        <div className="mb-5">
          
            <NavLink to="/admin/films/add"  className="flex justify-between items-center px-5 py-2 text-white bg-blue-500 rounded-xl shadow-blue-700 hover:bg-blue-700 cursor-pointer font-medium">
              <PlusOutlined />
              <p className="mb-0 ml-3">Add film</p>
              
            </NavLink>
        </div>

        </div>
      <Table scroll={{ x: 1200}} pagination={{ pageSize: 6 }} showSizeChanger={false} indentSize="7" columns={columns} dataSource={data} onChange={onChange} />
    </div>
  )
}