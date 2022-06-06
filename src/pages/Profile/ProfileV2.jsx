import React, { useEffect, useState } from 'react'
import './Profile.css'
import { CalendarOutlined, UserOutlined } from '@ant-design/icons';
import { Drawer, Button, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { layThongTinNguoiDung, suaThongTinNguoiDung } from '../../redux/actions/QuanLyNguoiDungAction';
import moment from 'moment'
import { GROUP_ID, USER_LOGIN } from '../../util/setting';
import { Redirect } from 'react-router-dom';
import { motion, MotionConfig } from "framer-motion"
import { useFormik } from 'formik';
import {history} from '../../App'
import * as Yup from 'yup';


export default function ProfileV2() {
    
    const dispatch = useDispatch()
    if (!localStorage.getItem(USER_LOGIN)) {
        history.push('/login')
    }
    const { thongTinNguoiDung, userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
    const [checked, setChecked] = useState([]);
    const [visible, setVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    useEffect(() => {
        const action = layThongTinNguoiDung()
        dispatch(action);
    }, [])
   
    
    
    
    const formik = useFormik({
        initialValues: {
            taiKhoan: '',
            matKhau: '',
            email: '',
            soDt: '',
            maLoaiNguoiDung:'QuanTri',
            maNhom: GROUP_ID,
            hoTen: '',
        },

        validationSchema: Yup.object({
            
            matKhau: Yup.string().required('Mật khẩu không được bỏ trống').min(6, 'Mật khẩu từ 6-32 ký tự').max(32, 'Mật khẩu từ 6-32 ký tự'),
            hoTen: Yup.string().required('Họ tên không được bỏ trống').matches(/^[A-Z a-z]+$/, 'Họ tên không được chứa số'),
            
            // soDT: Yup.string().required('số điện thoại Khoản không được bỏ trống')
        }),

        onSubmit: values => {
            console.log(values)
            const action = suaThongTinNguoiDung(values);
            dispatch(action);

        },

        
    });
    
    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);

    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        formik.handleSubmit()
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    
    const handleCheck = (id) => {
        setChecked(prev => {
            const isChecked = checked.includes(id);
            if (isChecked) {
                console.log('check', id)
                return checked.filter(item => item !== id)
            }
            else {
                return [...prev, id]
            }
        })
    }

    const renderTicketItem = () => {

        return thongTinNguoiDung?.thongTinDatVe?.map((item, index) => {
            const renderDanhSachghe = (data) => {
                return item.danhSachGhe.map((ghe, index) => {
                    return <span className="text-gray-500" key={index}>{ghe[data]},</span>
                })
            }
            return <MotionConfig transition={{ duration: .5 }}>
                <motion.tr  className="bg-white relative hover:bg-slate-200 hover:cursor-pointer pb-20 overflow "
                    // initial={{ y: '0', opacity: '0' }}
                    // animate={{ y: '-10px', opacity: '1' }}
                    // exit={{ y: '0', opacity: '0' }}
                >
                    <td className="px-6 py-4 rounded-l-xl">
                        {item.maVe}
                    </td>
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900  whitespace-nowrap">
                        {item.tenPhim}
                    </td>
                    <td className="px-6 py-4">
                        {item.danhSachGhe[0].tenHeThongRap} - {item.danhSachGhe[0].tenCumRap}
                    </td>
                    <td className="px-6 py-4">
                        {moment(item.ngayDat).format(`DD/MM/YYYY`)}
                    </td>
                    <td className="px-6 py-4 font-bold text-red-500">
                        {(item.giaVe * item.danhSachGhe.length).toLocaleString()} đ
                    </td>
                    <td className="px-6 py-4 text-right  rounded-r-xl">
                        <a onClick={() => {
                            showDrawer()
                            handleCheck(index)
                        }} href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Thêm</a>
                    </td>
                </motion.tr>
                {checked.includes(index) && <Drawer mask={true} maskStyle={{ opacity: '50%' }} placement="right" onClose={() => {
                    onClose();
                    handleCheck(index);
                }} visible={visible}>
                    <h1 className="px-2 py-2 border-b border-gray-500 text-2xl">Chi tiết</h1>
                    <p className="px-2 py-2 border-b border-gray-500 text-right ">Gửi thông báo qua email {moment(item.ngayDat).format(`DD/MM/YYYY HH:MM`)}</p>
                    <h4 className="text-xl px-2">{item.tenPhim}</h4>
                    <img src={item.hinhAnh} alt="" />
                    <ul>
                        <li>
                            <ul>
                                <li className="py-2"><span className="text-gray-500 font-bold">Ngày chiếu </span>{moment(item.ngayDat).format(`DD/MM/YYYY`)}</li>
                                <li className="py-2"><span className="text-gray-500 font-bold">Lịch chiếu phim </span>{moment(item.ngayDat).format(`HH:MM`)}</li>
                                <li className="py-2"><span className="text-gray-500 font-bold">Rạp chiếu </span>{item.danhSachGhe[0].tenHeThongRap}, {item.danhSachGhe[0].tenCumRap}</li>
                            </ul>
                        </li>
                        <li className="py-2"><span className="text-gray-500 font-bold">Ghế ngồi:</span> {renderDanhSachghe('tenGhe')}</li>

                    </ul>
                </Drawer>}
            </MotionConfig>
        })
    }

    return (
        <>
            <Modal title="Edit User" visible={isModalVisible} onCancel={handleCancel} footer={[
                <button onClick={handleOk} type="submit" className="px-6 py-2 rounded-lg text-white font-medium hover:bg-cyan-900  bg-cyan-600">Save all</button>
            ]}>
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <div className="text-sm font-bold  tracking-wide mb-1">Tài khoản</div>
                        <input disabled placeholder={userLogin.taiKhoan} name="taiKhoan" onChange={formik.handleChange} className="pl-2 rounded w-full text-lg py-2 border border-gray-300 focus:outline-none focus:shadow-outline focus:border-indigo-500" />
                       
                    </div>
                    <div className="mt-8">
                        <div className="flex justify-between items-center">
                            <div className="text-sm font-bold  tracking-wide mb-1">
                                Họ tên
                            </div>
                        </div>
                        <input placeholder={userLogin.hoTen} name="hoTen" onChange={formik.handleChange} className="pl-2 rounded w-full text-lg py-2 border border-gray-300 focus:outline-none focus:border-indigo-500" type />
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
                        <input name="matKhau" onChange={formik.handleChange} className="pl-2 rounded w-full text-lg py-2 border border-gray-300 focus:outline-none focus:border-indigo-500" type />
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
                        <input disabled placeholder={userLogin.email} name="email" onChange={formik.handleChange} className="pl-2 rounded w-full text-lg py-2 border border-gray-300 focus:outline-none focus:border-indigo-500" type />
                       
                    </div>

                    <div className="mt-8">
                        <div className="flex justify-between items-center">
                            <div className="text-sm font-bold  tracking-wide mb-1">
                                Số điện thoại
                            </div>
                        </div>
                        <input placeholder={userLogin.soDt} name="soDt" onChange={formik.handleChange} className="pl-2 rounded w-full text-lg py-2 border border-gray-300 focus:outline-none focus:border-indigo-500" type />
                    </div>
                </form>
            </Modal>
            <div className="grid grid-cols-12 w-full h-full pt-16 pr-5" style={{ backgroundColor: 'rgb(255,249,249)' }}>
                <div className="hidden lg:block col-span-2 bg-green-500 rounded-3xl mr-5 ">
                    <div className="flex flex-col h-full rounded-3xl" style={{ backgroundColor: 'rgb(15,21,45)' }}>
                        <div className="flex flex-col items-center justify-center" style={{ height: '30%' }}>
                            <img className="rounded-full w-20 h-20" src={`https://i.pravatar.cc/150?u=${userLogin.hoTen}`} alt="123" />
                            <h2 className="text-white my-4 text-2xl">{userLogin.hoTen}</h2>
                            <div style={{ color: 'rgb(243,241,255)' }} className="px-4 py-1 bg-blue-500 rounded-2xl shadow-blue-700 shadow-sm font-medium">{userLogin.maLoaiNguoiDung}</div>
                        </div>
                        <div style={{ height: '70%', backgroundColor: 'rgb(22,36,71)', borderTopRightRadius: '100px' }} className="shadow-3xl py-14 px-8">
                            <div className="flex flex-col h-full justify-between text-white">
                                <ul>
                                    <li className="mb-5 text-slate-400 font-medium ">History</li>
                                    <li onClick={showModal} className="text-slate-400 font-medium hover:text-slate-700 cursor-pointer">Edit Profile</li>
                                </ul>
                                <div className="rounded-xl shadow-xl w-full pl-4 py-4" style={{ background: 'rgba(0,0,0,0.4)' }}>
                                    <p className="mb-0 text-slate-300 font-medium ">Having Trouble?</p>
                                    <p className="mb-0 font-medium text-slate-100">Contact us</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-10 h-screen">
                    <h1 className="font-bold text-3xl lg:text-left text-center">Booking History</h1>
                    <div className="flex lg:flex-row flex-col justify-between items-center my-14">
                        <ul>
                            <li className="inline-block mr-2 font-bold">
                                <a href="#" className="text-red-500 text-lg">History</a>
                            </li>
                            <li className="inline-block font-bold">
                                <a href="#" style={{ color: 'rgb(225,220,223)' }} className="text-lg">Sumary</a>
                            </li>
                        </ul>
                        <div>
                            <p className="font-semibold"><span className="inline-flex items-center mr-2 pl-3 pr-4 py-3 border border-gray-300 rounded-xl shadow text-gray-500 "><CalendarOutlined /> 11-01-2021</span> To  <span className="inline-flex items-center ml-2 pl-3 pr-4 py-3 border border-gray-300 rounded-xl shadow text-gray-500"><CalendarOutlined /> 11-01-2021</span></p>
                        </div>
                    </div>
                    <div className="relative  overflow-auto " style={{ height: '650px' }}>
                        <table className="w-full text-sm text-left " style={{ borderCollapse: 'separate', borderSpacing: '0 10px' }}>
                            <thead className="text-xs  uppercase" style={{ backgroundColor: 'rgba(231,227,233,0.4)' }}>
                                <tr className="">
                                    <th scope="col" className="px-6 py-3 rounded-l-xl">
                                        ID
                                    </th>
                                    <th scope="col" className="px-6 py-3 ">
                                        Tên phim
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Hệ thống rạp - tên rạp
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Ngày đặt
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Thanh toán
                                    </th>
                                    <th scope="col" className="px-6 py-3 rounded-r-xl">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <motion.tbody layout >
                                {renderTicketItem()}
                                {/* <tr className="bg-white  hover:bg-slate-200 hover:cursor-pointer">
                                    <td className="px-6 py-4 rounded-l-xl">
                                        #123123123
                                    </td>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900  whitespace-nowrap">
                                        Apple MacBook Pro 17"
                                    </th>
                                    <td className="px-6 py-4">
                                        Sliver
                                    </td>
                                    <td className="px-6 py-4">
                                        Laptop
                                    </td>
                                    <td className="px-6 py-4">
                                        $2999
                                    </td>
                                    <td className="px-6 py-4 text-right  rounded-r-xl">
                                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                    </td>
                                </tr> */}

                            </motion.tbody>
                        </table>
                    </div>

                </div>

            </div>
        </>
    )
}
