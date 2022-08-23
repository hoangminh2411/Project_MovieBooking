import React, { useState } from 'react'
import Icon from '@ant-design/icons';
import { CloseCircleOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import { history } from '../../App';
import { NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { dangNhapAction } from '../../redux/actions/QuanLyNguoiDungAction';

export default function Login(props) {

  const dispatch = useDispatch()
  
  const {userLogin} = useSelector(state => state.QuanLyNguoiDungReducer);

  const [inputType, setInputType] =  useState('text')

  const formik = useFormik({
    initialValues: {
      taiKhoan: '',
      matKhau: '',
    },
    onSubmit: values => {
      
      const action = dangNhapAction(values);
      dispatch(action);
    },
  });


  const handleTypeInput = ()=> {
    if(inputType=='text') {
      setInputType('password');
    }
    else {
      setInputType('text');
    }
  }

  return (
    <form onSubmit={formik.handleSubmit} className="relative lg:w-1/2 xl:max-w-screen-sm rounded  " style={{ backgroundColor: 'rgba(15,39,76,0.9)' }}>

      <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
        <h2 className="text-center text-4xl text-white font-display font-semibold lg:text-left xl:text-5xl xl:text-bold">Đăng nhập</h2>
        <div className="mt-12">
          <div>
            <div>
              <div className="text-sm font-bold text-white tracking-wide mb-1">Tài khoản</div>
              <input name="taiKhoan" onChange={formik.handleChange} className="pl-2 rounded w-full text-lg py-2 border-b border-gray-300 focus:shadow-outline focus:caret-pink-500 " />
            </div>
            <div className="mt-8 relative">
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-white tracking-wide mb-1">
                  Mật khẩu
                </div>
                <div>
                  <a className="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800
                                  cursor-pointer">
                    Forgot Password?
                  </a>
                </div>
              </div>
              <input type={inputType} name="matKhau" onChange={formik.handleChange} className="pl-2 rounded w-full text-lg py-2 border-b border-gray-300 focus:caret-pink-500 "/>
              <div onClick={handleTypeInput} className="absolute top-6 right-2 font-bold text-xl cursor-pointer">
                {inputType=='text'?<EyeOutlined />:<EyeInvisibleOutlined />}
              </div>
            </div>
            <div className="mt-10">
              <button type="submit" className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                          font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                          shadow-lg">
                Log In
              </button>
            </div>
          </div>
          <div className="mt-5 mb-5 text-sm font-display font-semibold text-gray-700 text-center">
            Don't have an account ? <NavLink to="/register" className="cursor-pointer text-indigo-600 hover:text-indigo-800">Sign up</NavLink>
          </div>
        </div>
        <div className="cursor-pointer " onClick={(e) => {
          history.push('/home')
        }}>
          <CloseCircleOutlined className="text-5xl absolute hover:opacity-30" style={{ top: '-5%', right: '-4%', color: 'white' }} />

        </div>
      </div>
    </form>
  )
}
