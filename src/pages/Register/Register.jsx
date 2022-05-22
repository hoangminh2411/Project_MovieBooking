import React from 'react'
import Icon from '@ant-design/icons';
import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons'
import { history } from '../../App';
import { NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { GROUP_ID } from '../../util/setting';
import * as Yup from 'yup';
import { dangKyAction } from '../../redux/actions/QuanLyNguoiDungAction';


export default function Register() {

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      taiKhoan: '',
      matKhau: '',
      email:'',
      soDt:'',
      maNhom:GROUP_ID,
      hoTen:'',
    },

    validationSchema: Yup.object({
      taiKhoan: Yup.string().required('Tài Khoản không được bỏ trống').min(6,'Tài khoản từ 6-32 ký tự').max(32,'Tài khoản từ 6-32 ký tự'),
      matKhau: Yup.string().required('Mật khẩu không được bỏ trống').min(6,'Mật khẩu từ 6-32 ký tự').max(32,'Mật khẩu từ 6-32 ký tự'),
      hoTen: Yup.string().required('Họ tên không được bỏ trống').matches(/^[A-Z a-z]+$/,'Họ tên không được chứa số'),
      email: Yup.string().required('email không được bỏ trống').email('Email không đúng định dạng!'),
      // soDT: Yup.string().required('số điện thoại Khoản không được bỏ trống')
  }),

    onSubmit: values => {
      const action = dangKyAction(values);
      dispatch(action);
      
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="relative w-full h-full lg:h-auto  lg:w-1/2 xl:max-w-screen-sm xl:h-auto rounded  " style={{ backgroundColor: 'rgba(15,39,76,0.9)' }}>

      <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
        <h2 className="text-center text-4xl text-white font-display font-semibold lg:text-left xl:text-5xl xl:text-bold">Đăng ký</h2>
        <div className="mt-12">
          <div>
            <div>
              <div className="text-sm font-bold text-white tracking-wide mb-1">Tài khoản</div>
              <input name="taiKhoan" onChange={formik.handleChange} className="pl-2 rounded w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:shadow-outline focus:border-indigo-500" />
              {formik.touched.taiKhoan && formik.errors.taiKhoan ? (
                        <div className="text-red-500 italic ">{formik.errors.taiKhoan}</div>
                    ) : null}
            </div>
            <div className="mt-8">
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-white tracking-wide mb-1">
                  Họ tên
                </div>
              </div>
              <input name="hoTen" onChange={formik.handleChange} className="pl-2 rounded w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type />
              {formik.touched.hoTen && formik.errors.hoTen ? (
                        <div className="text-red-500 italic">{formik.errors.hoTen}!</div>
                    ) : null}
            </div>
            <div className="mt-8">
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-white tracking-wide mb-1">
                  Mật khẩu
                </div>
              </div>
              <input name="matKhau" onChange={formik.handleChange} className="pl-2 rounded w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type />
              {formik.touched.matKhau && formik.errors.matKhau ? (
                        <div className="text-red-500 italic">{formik.errors.matKhau}</div>
                    ) : null}
            </div>

            <div className="mt-8">
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-white tracking-wide mb-1">
                  Email
                </div>
              </div>
              <input name="email" onChange={formik.handleChange} className="pl-2 rounded w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type />
              {formik.touched.email && formik.errors.email ? (
                        <div className="text-red-500 italic">{formik.errors.email}</div>
                    ) : null}
            </div>

            <div className="mt-8">
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-white tracking-wide mb-1">
                  Số điện thoại
                </div>
              </div>
              <input name="soDt" onChange={formik.handleChange} className="pl-2 rounded w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type />
            </div>

            
            <div className="mt-10">
              <button type="submit" className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                          font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                          shadow-lg">
                Đăng ký
              </button>
            </div>
          </div>
          <div className="mt-5 mb-5 text-sm font-display font-semibold text-gray-700 text-center">
            You have an account ? <NavLink to="/login" className="cursor-pointer text-indigo-600 hover:text-indigo-800">Log in</NavLink>
          </div>
        </div>
        <div className="cursor-pointer " onClick={(e) => {
          history.push('/login')
        }}>
          <div className="hidden xl:block lg:block">
          <CloseCircleOutlined className="text-5xl absolute hover:opacity-30" style={{ top: '-3%', right: '-4%', color: 'white' }} />
          </div>

          <div className="xl:hidden lg:hidden">
            <CloseOutlined className="text-2xl absolute opacity-30" style={{ top: '0%', right: '0%', color: 'white' }} />
          </div>

        </div>
      </div>
    </form>
  )
}
