import React, { useEffect, useState } from 'react'
import { Table, Modal } from 'antd';
import { DeleteOutlined, SearchOutlined, EditOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import { PlusOutlined, LeftOutlined } from '@ant-design/icons'
import { layDanhSachNguoiDung, xoaNguoiDungAction, capNhatThongTinNguoiDungAction, dangKyAction } from '../../../redux/actions/QuanLyNguoiDungAction';
import { motion } from "framer-motion"
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { GROUP_ID } from '../../../util/setting';
import _ from 'lodash';
import { NavLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useRef } from 'react';

export default function Users() {
  const { danhSachNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);
  const [users, setUsers] = useState(danhSachNguoiDung)
  const [user, setUser] = useState({})
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [values, setValues] = useState()
  const typingTimeoutRef = useRef(null)
  const dispatch = useDispatch()
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  useEffect(() => {
    const action = layDanhSachNguoiDung();
    dispatch(action);

  }, [])
  useEffect(() => {
    setUsers(danhSachNguoiDung);

  }, [danhSachNguoiDung])


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: user.taiKhoan,
      matKhau: user.matKhau,
      email: user.email,
      soDt: user.soDt,
      maNhom: GROUP_ID,
      maLoaiNguoiDung: user.maLoaiNguoiDung,
      hoTen: user.hoTen,
    },

    validationSchema: Yup.object({
      taiKhoan: Yup.string().required('Tài Khoản không được bỏ trống').min(3,'Tài khoản từ 6-32 ký tự').max(32,'Tài khoản từ 6-32 ký tự'),
      matKhau: Yup.string().required('Mật khẩu không được bỏ trống').min(6, 'Mật khẩu từ 6-32 ký tự').max(32, 'Mật khẩu từ 6-32 ký tự'),
      hoTen: Yup.string().required('Họ tên không được bỏ trống').matches(/^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$/gm, 'Họ tên không được chứa số'),
      email: Yup.string().required('email không được bỏ trống').email('Email không đúng định dạng!'),
      soDt: Yup.string().required('Số điện thoại không được bỏ trống').matches(phoneRegExp, 'Số điện thoại không hợp lệ')

    }),

    onSubmit: values => {
      console.log(values)
      if (_.isEmpty(user)) {
        const action = dangKyAction(values);
        dispatch(action);
        setIsModalVisible(false);
      }
      else {

        const action = capNhatThongTinNguoiDungAction(values);
        dispatch(action);
        setIsModalVisible(false);

      }


    },

  });


  const showModal = (user) => {
    setUser(user)
    setIsModalVisible(true);
  };

  const handleOk = () => {
    formik.handleSubmit()

  };

  const handleCancel = () => {
    setUser({})
    setIsModalVisible(false);
  };


  const handleChangeInput = (event) => {
    const value = event.target.value
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      handleSearch(value)
    }, 300)

    // setValues(event.target.value)

  }
  const handleSearch = (searchText) => {
    const newSearchText = searchText.toLowerCase()
    let filteredEvents = danhSachNguoiDung.filter(({ hoTen }) => {
      hoTen = hoTen.toLowerCase();
      return hoTen.includes(newSearchText);
    });


    setUsers(filteredEvents)
  }

  const columns = [

    {
      title: 'Name',
      dataIndex: 'hoTen',
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      render: (text, user, index) => {
        return <motion.div layout className="flex items-center">
          <img loading="lazy" className="w-10 h-10 shadow-lg  rounded-full" src={`https://i.pravatar.cc/150?u=${index}-${user.hoTen}`} alt="" />
          <div className="ml-6">
            <h3>{user.hoTen}</h3>
            <p className="text-slate-500 mb-0">{user.email}</p>
          </div>
        </motion.div>
      },
      sorter: (a, b) => a.hoTen - b.hoTen,
      sortDirections: ['descend'],
    },

    {
      title: 'Role',
      dataIndex: 'maLoaiNguoiDung',

      // specify the condition of filtering result
      // here is that finding the name started with `value`
      sorter: (a, b) => a.maLoaiNguoiDung.length - b.maLoaiNguoiDung.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Phone',
      dataIndex: 'soDt',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.soDt - b.soDt,
    },
    {
      title: '',
      dataIndex: 'hanhDong',
      render: (text, user, index) => {

        return <div className="flex ">
          <div onClick={() => {
            showModal(user)
          }} className="flex justify-start items-center px-3 py-2 text-white bg-blue-500 rounded-xl shadow-blue-700 hover:bg-blue-700 cursor-pointer font-medium mr-2">
            <EditOutlined />
            <p className="mb-0 ml-3">Edit user</p>

          </div>
          <div onClick={() => {
            console.log(user.taiKhoan)
            if (window.confirm('Bạn có chắc muốn xóa tài khoản ' + user.taiKhoan)) {
              // Gọi action
              const action = xoaNguoiDungAction(user.taiKhoan);
              dispatch(action);
            }
          }} className="flex justify-start items-center px-3 py-2 text-white bg-red-500 rounded-xl shadow-red-700 hover:bg-red-700 cursor-pointer font-medium">
            <DeleteOutlined />
            <p className="mb-0 ml-3">Delete user</p>

          </div>
        </div>
      }
    }
  ];

  const data = users;

  return (
    <>
      <Modal title={_.isEmpty(user) ? 'Register' : 'Edit user'} visible={isModalVisible} onCancel={handleCancel} footer={[
        <button key="submit" onClick={handleOk} type="submit" className="px-6 py-2 rounded-lg text-white font-medium hover:bg-cyan-900  bg-cyan-600">{_.isEmpty(user) ? 'Register' : 'Save all'}</button>,

      ]}>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <div className="text-sm font-bold  tracking-wide mb-1">Tài khoản</div>
            <input disabled={formik.values.taiKhoan === undefined ? '' : 'disabled'} value={formik.values.taiKhoan === undefined ? '' : formik.values.taiKhoan} placeholder={user.taiKhoan} name="taiKhoan" onChange={formik.handleChange} className="pl-2 rounded w-full text-lg py-2 border border-gray-300 focus:outline-none focus:shadow-outline focus:border-indigo-500" />
            {formik.touched.taiKhoan && formik.errors.taiKhoan ? (
              <div className="text-red-500 italic">{formik.errors.taiKhoan}!</div>
            ) : null}
          </div>
          <div className="mt-8">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold  tracking-wide mb-1" htmlFor="maLoaiNguoiDung">Phân quyền</label>

              <select onChange={formik.handleChange} value={formik.values.maLoaiNguoiDung === undefined ? '' : formik.values.maLoaiNguoiDung} name="maLoaiNguoiDung" id="maLoaiNguoiDung">
                <option value="QuanTri">Quản Trị</option>
                <option value="KhachHang">Khách Hàng</option>
              </select>
            </div>

          </div>
          <div className="mt-8">
            <div className="flex justify-between items-center">
              <div className="text-sm font-bold  tracking-wide mb-1">
                Họ tên
              </div>
            </div>
            <input value={formik.values.hoTen === undefined ? '' : formik.values.hoTen} placeholder={user.hoTen} name="hoTen" onChange={formik.handleChange} className="pl-2 rounded w-full text-lg py-2 border border-gray-300 focus:outline-none focus:border-indigo-500" />
            {formik.touched.hoTen && formik.errors.hoTen ? (
              <div className="text-red-500 italic">{formik.errors.hoTen}!</div>
            ) : null}
          </div>
          <div className="mt-8">
            <div className="flex justify-between items-center">
              <div className="text-sm font-bold  tracking-wide mb-1">
                Mật khẩu
              </div>
            </div>
            <input value={formik.values.matKhau === undefined ? '' : formik.values.matKhau} name="matKhau" onChange={formik.handleChange} className="pl-2 rounded w-full text-lg py-2 border border-gray-300 focus:outline-none focus:border-indigo-500" />
            {formik.touched.matKhau && formik.errors.matKhau ? (
              <div className="text-red-500 italic">{formik.errors.matKhau}</div>
            ) : null}
          </div>

          <div className="mt-8">
            <div className="flex justify-between items-center">
              <div className="text-sm font-bold  tracking-wide mb-1">
                Email
              </div>
            </div>
            <input value={formik.values.email === undefined ? '' : formik.values.email} placeholder={user.email} name="email" onChange={formik.handleChange} className="pl-2 rounded w-full text-lg py-2 border border-gray-300 focus:outline-none focus:border-indigo-500" />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 italic">{formik.errors.email}!</div>
            ) : null}

          </div>

          <div className="mt-8">
            <div className="flex justify-between items-center">
              <div className="text-sm font-bold  tracking-wide mb-1">
                Số điện thoại
              </div>
            </div>
            <input value={formik.values.soDt === undefined ? '' : formik.values.soDt} placeholder={user.soDt} name="soDt" onChange={formik.handleChange} className="pl-2 rounded w-full text-lg py-2 border border-gray-300 focus:outline-none focus:border-indigo-500" />
            {formik.touched.soDt && formik.errors.soDt ? (
              <div className="text-red-500 italic">{formik.errors.soDt}!</div>
            ) : null}
          </div>

          
        </form>
      </Modal>
      <h1 className="font-bold text-3xl lg:text-left text-center ">User management</h1>
      <div className="block lg:hidden absolute   left-0 text-2xl">
        <NavLink to="/admin/films"><LeftOutlined /></NavLink>
      </div>
      <div className="flex flex-col lg:flex-row justify-between items-center my-7">
        <ul>
          <li className="inline-block mr-2 font-bold">
            <a href="/#" className="text-red-500 text-lg">All Users</a>
          </li>

        </ul>

      </div>
      <div className="flex justify-between items-center">
        <div className="pl-5 lg:pl-0 w-2/3 lg:w-1/4 mb-5 flex items-center">

          <input onChange={handleChangeInput} placeholder='Tìm kiếm người dùng' name="search" className="pl-2 rounded-xl w-full text-lg py-1 border border-gray-300 focus:outline-none focus:shadow-outline focus:border-indigo-500" />
          <div onClick={() => {
            handleSearch(values)
          }}>
            <SearchOutlined className="text-2xl opacity-40 hover:opacity-100 cursor-pointer  -translate-x-10" />

          </div>
        </div>
        <div className="mb-5">

          <div onClick={() => {
            showModal({})
          }} className="flex justify-between items-center px-5 py-2 text-white bg-blue-500 rounded-xl shadow-blue-700 hover:bg-blue-700 cursor-pointer font-medium">
            <PlusOutlined />
            <p className="mb-0 ml-3">Add User</p>
          </div>
        </div>

      </div>

      <Table rowKey={record => `${record.hoTen}-${uuidv4()}`} pagination={{ pageSize: 6 }} showSizeChanger={false} indentSize="7" columns={columns} dataSource={data} scroll={{ x: 1200 }} />


    </>
  )
}

