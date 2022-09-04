import { history } from '../../../../App'
import React, { memo, useEffect, useState } from 'react'

//  HashLink giống Navlink nhưng bổ sung thêm giúp scroll đển 1 component khác tương tự như dùng thẻ a và truyền href là id
import { HashLink } from 'react-router-hash-link';
import { NavLink } from 'react-router-dom'

import styles from './Header.module.scss';

import logo from '../../../../assets/images/logo.png'

import { useDispatch, useSelector } from 'react-redux'
import { THOAT_ACTION } from '../../../../redux/types/QuanLyNguoiDungType'

import { Menu, Dropdown, Space, Drawer } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import unknowUser from '../../../../assets/images/unknowUser.png'

function Header() {
    const [isSroll, setIsScroll] = useState(false)
    const [visible, setVisible] = useState(false);

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
    const dispatch = useDispatch()

    const isLoginSuccess = userLogin !== null

    useEffect(() => {
        const handleScroll = () => {
            setIsScroll(window.scrollY > 0)
        }
        window.addEventListener('scroll', handleScroll)

        // clean up function
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };
    const renderLogin = () => {
        if (isLoginSuccess) {
            return <div className="flex items-center">
                <NavLink to="/profile">
                    <img
                        className="rounded-full w-10 h-10 mr-2"
                        src={`https://i.pravatar.cc/150?u=${userLogin.hoTen}`}
                        alt="User Avatar"
                    />
                </NavLink>
                <div className="block lg:hidden"> {userLogin.hoTen}</div>
                <div className="hidden lg:block">
                    <Dropdown overlay={menu}>
                        <Space>
                            {userLogin.hoTen}
                            <DownOutlined />
                        </Space>
                    </Dropdown>
                </div>
            </div>
        }
        else {
            return <>
                <NavLink
                    exact to="/login"
                    className="text-black text-base py-1 px-2 self-center flex justify-center items-center hover:text-red-500 hover:scale-105  transition-all border-r-2 border-gray-200"
                >
                        <img
                            src={unknowUser}
                            alt="anoymouse avatar"
                            className="rounded-full w-7 h-7 mr-2"
                        />
                        Đăng nhập

                </NavLink>
                <NavLink
                    exact to="/register"
                    className="text-black text-base py-1 px-2 self-center hover:text-red-500 hover:scale-105 transition-all"
                >
                    Đăng ký
                </NavLink>
            </>
        }
    }

    const handleExitButton = () => {
        dispatch({
            type: THOAT_ACTION
        })
        history.push('/home')
    }
    const menuItems = userLogin?.maLoaiNguoiDung === "KhachHang" ?
        [
            {
                label: (
                    <NavLink to="/profile">
                        Tài khoản của bạn
                    </NavLink>
                ),
                key: '0',
            },
            {
                label: (
                    <div onClick={handleExitButton}>
                        Thoát
                    </div>
                ),
                key: '1',
            },
        ] :
        [
            {
                label: (
                    <NavLink to="/profile">
                        Tài khoản của bạn
                    </NavLink>
                ),
                key: '0',
            },
            {
                label: (
                    <div onClick={handleExitButton}>
                        Thoát
                    </div>
                ),
                key: '1',
            },
            {
                type: 'divider',
            },
            {
                label: (
                    <NavLink to="/admin/films">
                        Admin dashboard
                    </NavLink>
                ),
                key: '3',
                disabled: userLogin?.maLoaiNguoiDung === "KhachHang",
            },
        ]
    const menu = (
        <Menu
            items={menuItems}
        />
    );

    return (
        <header className={isSroll ? `${styles['wrapper']} opacity-90` : `${styles['wrapper']}`}>
            <div className={`${styles['inner']}`}>
                {/* Header logo */}
                <NavLink rel="noopener noreferrer" to="/" aria-label="Back to homepage" className={`${styles['logo']}`}>
                    <img src={logo} alt="logo header" />
                </NavLink>
                {/* Header menu */}
                <ul className={`${styles['navbar']}`}>
                    <li>
                        <HashLink to="/#lichChieu" className={`${styles['linkItem']} `}>Lịch chiếu</HashLink>
                    </li>
                    <li>
                        <HashLink to="/#cumRap" className={`${styles['linkItem']}`}>Cụm rạp</HashLink>
                    </li>
                    <li>
                        <HashLink to="/#news" className={`${styles['linkItem']}`}>Tin tức</HashLink>
                    </li>
                    <li>
                        <HashLink to="/#apps" className={`${styles['linkItem']}`}>Ứng dụng</HashLink>
                    </li>
                </ul>

                {/* Header register/login */}
                <div className={`${styles['action']}`}>
                    {renderLogin()}
                </div>

                {/*---------------------------- Moblie--------------------------------- */}
                <button
                    onClick={showDrawer}
                    className="p-4 rounded-full transition-all hover:bg-zinc-300 hover:opacity-50 lg:hidden "
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6 dark:text-coolGray-100"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
                <Drawer
                    width='241px'
                    bodyStyle={{ padding: '0' }}
                    closable={false}
                    title={renderLogin()}
                    placement="right"
                    onClose={onClose}
                    visible={visible}>
                    <ul className="w-full">
                        <li className="relative parentLine w-full py-5">
                            <HashLink
                                to="/#lichChieu"
                                className="pl-5 font-medium text-lg text-black cursor-pointer hover:text-red-500 hover:font-medium"
                            >
                                Lịch chiếu
                            </HashLink>
                            <div className="line"></div>
                        </li >
                        <li className="relative parentLine w-full py-5 ">
                            <HashLink
                                to="/#news"
                                className="pl-5 font-medium text-lg text-black cursor-pointer hover:text-red-500 hover:font-medium"
                            >
                                Tin tức
                            </HashLink>
                            <div className="line"></div>
                        </li>
                        <li className="relative parentLine w-full  py-5 ">
                            <HashLink
                                to="/#apps"
                                className="pl-5 font-medium text-lg text-black cursor-pointer hover:text-red-500 hover:font-medium"
                            >
                                Ứng dụng
                            </HashLink>
                            <div className="line"></div>
                        </li>
                        {isLoginSuccess ?
                            <li className="w-full py-5 hover:bg-slate-200">
                                <div
                                    onClick={handleExitButton}
                                    className="pl-5 font-medium text-lg text-black cursor-pointer hover:text-red-500 hover:font-medium"
                                >
                                    Đăng xuất
                                </div>
                            </li> : ''}

                    </ul>
                </Drawer>
            </div>
        </header>

    )
}

export default memo(Header)