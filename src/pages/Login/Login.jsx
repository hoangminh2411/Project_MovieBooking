import React, { useState } from 'react'

import { CloseCircleOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import { history } from '../../App';
import { NavLink } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useDispatch } from 'react-redux';
import { dangNhapAction } from '../../redux/actions/QuanLyNguoiDungAction';

export default function Login() {

  const dispatch = useDispatch()



  const [inputType, setInputType] = useState('password')

  const formik = useFormik({
    initialValues: {
      taiKhoan: '',
      matKhau: '',
    },

    validationSchema: Yup.object({
      taiKhoan: Yup.string().required('Tài Khoản không được bỏ trống').min(6, 'Tài khoản từ 6-32 ký tự').max(32, 'Tài khoản từ 6-32 ký tự'),
      matKhau: Yup.string().required('Mật khẩu không được bỏ trống').min(6, 'Mật khẩu từ 6-32 ký tự').max(32, 'Mật khẩu từ 6-32 ký tự'),

    }),
    onSubmit: values => {
      const action = dangNhapAction(values);
      dispatch(action);
    },
  });


  const handleTypeInput = () => {
    if (inputType === 'text') {
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
              <input
                name="taiKhoan"
                onChange={formik.handleChange}
                className="pl-2 rounded w-full text-lg py-2 border-b border-gray-300 focus:shadow-outline focus:caret-pink-500 " />
              {formik.touched.taiKhoan && formik.errors.taiKhoan ? (
                <div className="text-red-500 italic ">{formik.errors.taiKhoan}</div>
              ) : null}
            </div>
            <div className="mt-8 relative">
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-white tracking-wide mb-1">
                  Mật khẩu
                </div>
                <div>
                  <a
                    href="/#"
                    className="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer">
                    Forgot Password?
                  </a>
                </div>
              </div>
              <input
                type={inputType}
                name="matKhau"
                onChange={formik.handleChange}
                className="pl-2 rounded w-full text-lg py-2 border-b border-gray-300 focus:caret-pink-500 "
              />
              <div
                onClick={handleTypeInput}
                className="absolute top-6 right-2 font-bold text-xl cursor-pointer">
                {inputType === 'text' ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              </div>
              {formik.touched.matKhau && formik.errors.matKhau ? (
                <div className="text-red-500 italic">{formik.errors.matKhau}</div>
              ) : null}
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg">
                Log In
              </button>
            </div>
          </div>
          <div className="mt-5 mb-5 text-sm font-display font-semibold text-gray-700 text-center">
            Don't have an account ?
            <NavLink
              to="/register"
              className="cursor-pointer text-indigo-600 hover:text-indigo-800"
            >
              Sign up
            </NavLink>
          </div>
        </div>
        <div
          className="cursor-pointer "
          onClick={() => {
            history.push('/home')
          }}>
          <CloseCircleOutlined
            className="text-5xl absolute hover:opacity-30"
            style={{ top: '-5%', right: '-4%', color: 'white' }}
          />

        </div>
      </div>
    </form>
  )
}
