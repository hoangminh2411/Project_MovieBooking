import React from 'react'
import { NavLink } from 'react-router-dom';

export default function PageNotFound() {
    return (
        <div className="flex justify-center items-center w-screen h-screen bg-gray-100 overflow-scroll">
            
            <div>
                <div className="flex xl:flex-row xl:text-left flex-col text-center">
                    <h1 className="text-blue-800 text-[100px] font-semibold  mr-2 mb-0">404</h1>
                    <div className="border-l-[1px] border-gray-300 flex flex-col justify-center pl-5 items-center xl:items-start">
                        <h2 className="text-[80px] mb-0 font-bold">Page not found</h2>
                        <p className="text-gray-500 text-md">Please check URL in the address bar and try again</p>
                        <NavLink to="/home" className="px-5 text-center py-2 rounded-lg bg-blue-800 text-white xl:w-1/4 w-full cursor-pointer hover:bg-blue-600 transition-all">Go back home</NavLink>
                    </div>
                </div>
            </div>


        </div>
    )
}
