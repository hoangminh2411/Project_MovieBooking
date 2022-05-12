import { history } from '../../../../App'
import React, { memo, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'
import { useDispatch, useSelector } from 'react-redux'

import { Menu, Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { THOAT_ACTION } from '../../../../redux/types/QuanLyNguoiDungType'





function Header(props) {
    const [scrollHeader, setScrollHeader] = useState(false)
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
    const dispatch = useDispatch()
    console.log('reRenderHeader')
    const menu = (
        <Menu
            items={[
                {
                    label: (
                        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                            Cài đặt
                        </a>
                    ),
                    key: '0',
                },
                {
                    label: (
                        <div onClick={(e)=>{
                            dispatch({
                                type: THOAT_ACTION
                            })
                            // history.push('/login')
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
                    label: 'Admin Dashboard（disabled）',
                    key: '3',
                    disabled: true,
                },
            ]}
        />
    );
    const renderLogin = () => {
        if (userLogin !== null) {
            return <div className="flex items-center">
                <img className="rounded-full w-10 h-10 mr-2" src="https://i.pravatar.cc/100" alt="123" />
                <Dropdown overlay={menu}>
                    <NavLink className="text-black" to="/profile" onClick={e => e.preventDefault()}>
                        <Space>
                            {userLogin.hoTen}
                            <DownOutlined />
                        </Space>
                    </NavLink>
                </Dropdown>
            </div>
        }
        else {
            return <>
                <NavLink exact to="/login" activeClassName="active" className="text-black text-base hover:text-red-500 hover:font-medium self-center py-1 px-2">Đăng nhập</NavLink>
                <NavLink exact to="/register" activeClassName="active" className="text-black text-base hover:text-red-500 hover:font-medium self-center py-1 px-2">Đăng ký</NavLink>
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
                <NavLink rel="noopener noreferrer" to="/home" aria-label="Back to homepage" className="header__logo">
                    <img className="header__logo-img" src="https://cdn-icons-png.flaticon.com/512/230/230994.png" />
                </NavLink>
                <ul className="header__navbar ">
                    <li className="header__navbar-item">
                        <a href="#lichChieu" className=" header__navbar-item-link hover:text-red-500 hover:font-medium" activeClassName="header__navbar-item-link--active">Lịch chiếu</a>
                    </li>
                    <li className="header__navbar-item">
                        <a href="#cumRap" className="header__navbar-item-link hover:text-red-500 hover:font-medium " activeClassName="header__navbar-item-link--active">Cụm rạp</a>
                    </li>
                    <li className="header__navbar-item">
                        <a to="/news" className="header__navbar-item-link hover:text-red-500 hover:font-medium" activeClassName="header__navbar-item-link--active">Tin tức</a>
                    </li>

                </ul>
                <div className="items-center flex-shrink-0 hidden lg:flex">
                    {renderLogin()}
                </div>
                <button className="p-4 lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-coolGray-100">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </header>

    )
}

export default memo(Header)