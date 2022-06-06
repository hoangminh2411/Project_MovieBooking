import { history } from '../../../../App'
import React, { memo, useEffect, useState } from 'react'

import { NavLink } from 'react-router-dom'

//  HashLink giống Navlink nhưng bổ sung thêm giúp scroll đển 1 component khác tương tự như dùng thẻ a và truyền href là id
import { HashLink } from 'react-router-hash-link';




import './Header.css'
import { useDispatch, useSelector } from 'react-redux'

import { Menu, Dropdown, Space, Drawer, Button, Radio } from 'antd';

import { DownOutlined } from '@ant-design/icons';
import { THOAT_ACTION } from '../../../../redux/types/QuanLyNguoiDungType'





function Header(props) {
    const [scrollHeader, setScrollHeader] = useState(false)
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };
    console.log('userLogin',userLogin)
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
                    label:  (
                        <NavLink to="/admin/films">
                            Admin dashboard
                        </NavLink>
                    ),
                    key: '3',
                    disabled: userLogin.maLoaiNguoiDung ==="KhachHang",
                },
            ]}
        />
    );
    const renderLogin = () => {
        if (userLogin !== null) {
            return <div className="flex items-center">
                <img className="rounded-full w-10 h-10 mr-2" src={`https://i.pravatar.cc/150?u=${userLogin.hoTen}`} alt="123" />
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
                <NavLink exact to="/login" activeClassName="active" className="text-black text-base hover:text-red-500 hover:font-medium border-r-2 self-center py-1 px-2">Đăng nhập</NavLink>
                <NavLink exact to="/register" activeClassName="active" className="text-black text-base hover:text-red-500 hover:font-medium   self-center py-1 px-2">Đăng ký</NavLink>
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
        <header className={scrollHeader ? 'header opacity-95  ' : 'header'}>

            <div className="header-container">
                <NavLink rel="noopener noreferrer" to="/" aria-label="Back to homepage" className="header__logo">
                    <img className="header__logo-img" src="https://cdn-icons-png.flaticon.com/512/230/230994.png" />
                </NavLink>
                <ul className="header__navbar hidden lg:flex ">
                    <li className="header__navbar-item">
                        <HashLink to="/#lichChieu" className=" header__navbar-item-link hover:text-red-500 hover:font-medium" activeClassName="header__navbar-item-link--active">Lịch chiếu</HashLink>
                    </li>
                    <li className="header__navbar-item">
                        <HashLink to="/#cumRap" className="header__navbar-item-link hover:text-red-500 hover:font-medium " activeClassName="header__navbar-item-link--active">Cụm rạp</HashLink>
                    </li>
                    <li className="header__navbar-item">
                        <HashLink to="/#news" className="header__navbar-item-link hover:text-red-500 hover:font-medium" activeClassName="header__navbar-item-link--active">Tin tức</HashLink>
                    </li>
                    <li className="header__navbar-item">
                        <HashLink to="/#apps" className="header__navbar-item-link hover:text-red-500 hover:font-medium" activeClassName="header__navbar-item-link--active">Ứng dụng</HashLink>
                    </li>

                </ul>
                <div className="items-center flex-shrink-0 hidden lg:flex">
                    {renderLogin()}
                </div>
                <button onClick={showDrawer} className="p-4 lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-coolGray-100">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <Drawer width='241px' bodyStyle={{padding:'0'}}  closable={false} title={renderLogin()} placement="right" onClose={onClose} visible={visible}>
                    <ul className="w-full">
                        <li className="relative parentLine w-full py-5">
                            <HashLink to="/#lichChieu" className=" font-medium cursor-pointer pl-5 text-black text-lg hover:text-red-500 hover:font-medium" activeClassName=""> <img className="w-10 h-10 inline-flex -translate-y-2" src={require('../../../../assets/images/499-clipboard-film-clap-outline.gif')} alt="" />  Lịch chiếu</HashLink>
                            <div className="line"></div>
                        </li >
                        {/* <li className="w-full py-5  hover:bg-slate-200">
                            <HashLink to="/#cumRap" className=" cursor-pointer font-medium pl-5 text-black text-lg hover:text-red-500 hover:font-medium " activeClassName="">Cụm rạp</HashLink>
                        </li> */}
                        <li className="relative parentLine w-full py-5 ">
                            <HashLink to="/#news" className=" font-medium cursor-pointer pl-5 text-black text-lg  hover:text-red-500 hover:font-medium" activeClassName="">Tin tức</HashLink>
                            <div className="line"></div>
                        </li>
                        <li className="relative parentLine w-full  py-5 ">
                            <HashLink to="/#apps" className=" text-lg pl-5 cursor-pointer hover:text-red-500 hover:font-medium font-medium text-black" activeClassName="">Ứng dụng</HashLink>
                            <div className="line"></div>
                        </li>
                        {userLogin!==null?<li className="w-full  py-5   hover:bg-slate-200">
                            <div  onClick={(e) => {
                            dispatch({
                                type: THOAT_ACTION
                            })
                            history.push('/home')
                        }}  className="text-lg pl-5 cursor-pointer hover:text-red-500 hover:font-medium font-medium text-black" activeClassName="">Đăng xuất</div>
                        </li>:''}

                    </ul>
                </Drawer>
            </div>
        </header>

    )
}

export default memo(Header)