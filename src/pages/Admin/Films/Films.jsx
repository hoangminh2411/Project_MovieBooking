import React, { useEffect, useState} from 'react'
import {Table } from 'antd';
import { CalendarOutlined, DeleteOutlined,SearchOutlined, EditOutlined,RightOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachPhimAction, xoaPhimAction } from '../../../redux/actions/QuanLyPhimAction';
import moment from 'moment';
import './Films.css'
import  { PlusOutlined } from '@ant-design/icons';
import { motion } from "framer-motion"
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';



export default function Films() {
  const { movieListDefault } = useSelector(state => state.QuanLyPhimReducer);
  const [film,setFilm] = useState(movieListDefault)
  
  const dispatch = useDispatch()
  useEffect(() => {
    const action = layDanhSachPhimAction();
    dispatch(action);
    
  }, [dispatch])
  useEffect(() => {
    setFilm(movieListDefault);
    
  }, [movieListDefault])
  
  const [values, setValues] = useState('')
  const handleChangeInput = (event)=>{
    setValues(event.target.value);
  }
  const handleSearch = (searchText)=> {
    const newSearchText = searchText.toLowerCase();
    let filteredEvents = movieListDefault.filter(({tenPhim}) => {
      tenPhim = tenPhim.toLowerCase();
      return tenPhim.includes(newSearchText);
    });
   
    if(filteredEvents.length === 0){
     
      filteredEvents = movieListDefault.filter(({maPhim}) => {
        return maPhim.toString().includes(searchText.toString()) ;
      });
    }
   
    setFilm(filteredEvents);
  }

  const handleEnterKey = (e) =>{
    if(e.code ==="Enter"){
      handleSearch(values)
    }
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
        return <motion.div  layout className="flex">
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
        return <p>{moment(film.ngayKhoiChieu).format('DD/MM/YYYY')}</p>
      }

    },
    {
      title: '',
      dataIndex: 'hanhDong',
      render: (text, film, index) => {
        return <div key={index} className="flex ">
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

  const data = film ||  movieListDefault
 


  return (
    <div className="overflow-auto">
      
        <h1 className="font-bold text-3xl text-center lg:text-left relative">Film management</h1>
        <div className="block lg:hidden absolute   right-0 text-2xl">
          <NavLink to="/admin/users"><RightOutlined /></NavLink>
        </div>
      
      <div className="flex flex-col lg:flex-row justify-between items-center my-7">
        <ul>
          <li className="inline-block mr-2 font-bold">
            <p className="text-red-500 text-lg">All Film</p>
          </li>

        </ul>
      </div>
        <div className="flex justify-between items-center">
        <div className="pl-5 lg:pl-0 w-1/2 lg:w-1/4 mb-5 flex items-center">

          <input onKeyDown={handleEnterKey} onChange={handleChangeInput} placeholder='Tìm kiếm phim' name="search" className="pl-2 rounded-xl w-full text-lg py-1 border border-gray-300 focus:outline-none focus:shadow-outline focus:border-indigo-500" />
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
      <Table rowKey={record => record.maPhim}  scroll={{ x: 1200}} pagination={{ pageSize: 6 }} showSizeChanger={false} indentSize="7" columns={columns} dataSource={data}/>
    </div>
  )
}
