import { history } from '../../../../App'
import React, { memo, useEffect, useState } from 'react'

import { NavLink } from 'react-router-dom'

//  HashLink giống Navlink nhưng bổ sung thêm giúp scroll đển 1 component khác tương tự như dùng thẻ a và truyền href là id
import { HashLink } from 'react-router-hash-link';




import './Header.scss'
import styles from './Header.module.scss';


import { useDispatch, useSelector } from 'react-redux'

import { Menu, Dropdown, Space, Drawer} from 'antd';

import { DownOutlined } from '@ant-design/icons';
import { THOAT_ACTION } from '../../../../redux/types/QuanLyNguoiDungType'





function Header(props) {
    const [scrollHeader, setScrollHeader] = useState(false)
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(false);
    console.log(props);
    // function đóng mở drawer
    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };



    const menu = (
        <Menu
            items={[
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
                        <div onClick={(e) => {
                            dispatch({
                                type: THOAT_ACTION
                            })
                            history.push('/login')
                        }} target="_blank" rel="noopener noreferrer">
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
            ]}
        />
    );
    const renderLogin = () => {
        if (userLogin !== null) {
            return <div className="flex items-center">
                <NavLink to="/profile">
                <img className="rounded-full w-10 h-10 mr-2" src={`https://i.pravatar.cc/150?u=${userLogin.hoTen}`} alt="123" />

                </NavLink>
                <div className="block lg:hidden"> {userLogin.hoTen}</div>
                <div className="hidden lg:block">
                    <Dropdown overlay={menu}>
                        <NavLink className="text-black" to="/profile" onClick={e => e.preventDefault()}>
                            <Space>
                                {userLogin.hoTen}
                                <DownOutlined />
                            </Space>
                        </NavLink>
                    </Dropdown>

                </div>
            </div>
        }
        else {
            return <>
                <NavLink exact to="/login"  className="text-black text-base hover:text-red-500 hover:font-medium border-r-2 self-center py-1 px-2">Đăng nhập</NavLink>
                <NavLink exact to="/register"  className="text-black text-base hover:text-red-500 hover:font-medium   self-center py-1 px-2">Đăng ký</NavLink>
            </>
        }
    }
    
    useEffect(() => {
        const handleScroll = () => {
            setScrollHeader(window.scrollY > 0)
        }
        window.addEventListener('scroll', handleScroll)

        // clean up function
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }

    }, [])


    return (
        <header className={scrollHeader ? `${styles['wrapper']} opacity-90` : `${styles['wrapper']}`}>
            <div className={`${styles['inner']}`}>

                {/* Header logo */}
                <NavLink rel="noopener noreferrer" to="/" aria-label="Back to homepage" className={`${styles['logo']}`}>
                    <img src="https://cdn-icons-png.flaticon.com/512/230/230994.png" alt="logo header" />
                </NavLink>

                {/* Header menu */}
                <ul className={`${styles['navbar']}`}>
                    <li>
                        <HashLink to="/#lichChieu" className={`${styles['navbar-item']} text-black hover:text-red-500 hover:scale-105 transition-all`}>Lịch chiếu</HashLink>
                    </li>
                    <li>
                        <HashLink to="/#cumRap" className={`${styles['navbar-item']} text-black hover:text-red-500 hover:scale-105 transition-all`}>Cụm rạp</HashLink>
                    </li>
                    <li>
                        <HashLink to="/#news" className={`${styles['navbar-item']} text-black hover:text-red-500 hover:scale-105 transition-all`}>Tin tức</HashLink>
                    </li>
                    <li>
                        <HashLink to="/#apps" className={`${styles['navbar-item']} text-black hover:text-red-500 hover:scale-105 transition-all`}>Ứng dụng</HashLink>
                    </li>
                </ul>

                {/* Header register/login */}
                <div className={`${styles['action']}`}>
                    {renderLogin()}
                </div>

                {/*---------------------------- Moblie--------------------------------- */}
                <button onClick={showDrawer} className="p-4 lg:hidden rounded-full hover:bg-zinc-300 hover:opacity-50 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-coolGray-100">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <Drawer width='241px' bodyStyle={{ padding: '0' }} closable={false} title={renderLogin()} placement="right" onClose={onClose} visible={visible}>
                    <ul className="w-full">
                        <li className="relative parentLine w-full py-5">
                            <HashLink to="/#lichChieu" className=" font-medium cursor-pointer pl-5 text-black text-lg hover:text-red-500 hover:font-medium" > <img className="w-10 h-10 inline-flex -translate-y-2" src={require('../../../../assets/images/499-clipboard-film-clap-outline.gif')} alt="" />  Lịch chiếu</HashLink>
                            <div className="line"></div>
                        </li >
                        {/* <li className="w-full py-5  hover:bg-slate-200">
                            
                        </li> */}
                        <li className="relative parentLine w-full py-5 ">
                            <HashLink to="/#news" className=" font-medium cursor-pointer pl-5 text-black text-lg  hover:text-red-500 hover:font-medium" >Tin tức</HashLink>
                            <div className="line"></div>
                        </li>
                        <li className="relative parentLine w-full  py-5 ">
                            <HashLink to="/#apps" className=" text-lg pl-5 cursor-pointer hover:text-red-500 hover:font-medium font-medium text-black" >Ứng dụng</HashLink>
                            <div className="line"></div>
                        </li>
                        {userLogin !== null ? <li className="w-full py-5 hover:bg-slate-200">
                            <div onClick={(e) => {
                                dispatch({
                                    type: THOAT_ACTION
                                })
                                history.push('/home')
                            }} className="text-lg pl-5 cursor-pointer hover:text-red-500 hover:font-medium font-medium text-black" >Đăng xuất</div>
                        </li> : ''}

                    </ul>
                </Drawer>
            </div>
        </header>

    )
}

export default memo(Header)