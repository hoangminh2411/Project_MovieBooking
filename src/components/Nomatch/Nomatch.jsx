import React from 'react'
import { MdPlayArrow} from "react-icons/md";

import { AiFillStar,AiOutlineClockCircle, AiOutlineLike, AiTwotoneCrown} from "react-icons/ai";

export default function Nomatch() {



    return (
        <div className="flex justify-center items-center w-screen h-screen bg-slate-200">
            <div style={{
                background: 'rgba( 255, 255, 255, 0.25 )',
                boxShadow:' 0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
                backdropFilter: 'blur( 4px )',
                borderRadius: '10px',
                border: '1px solid rgba( 255, 255, 255, 0.18 )'
            }} className="w-80  h-96 flex flex-col items-center">
                <div className="flex mt-9 justify-center">
                    <AiFillStar className="text-7xl text-red-500"/>
                    <AiFillStar className="text-7xl text-red-500 -translate-y-3 "/>
                    <AiFillStar className="text-7xl text-slate-200"/>
                </div>

                <div className="mt-4 py-2 px-5 border-2 bg-slate-100 border-slate-200 shadow-2xl rounded-2xl flex items-center">
                    <div className="w-9 h-9 flex justify-center items-center rounded-full background-white shadow-xl mr-4">
                        <AiOutlineClockCircle className="text-slate-500 text-2xl"/>

                    </div>
                    <h1 className="mb-0 text-2xl text-slate-500">59:20:999</h1>
                </div>

                <div className="mt-5 text-center relative">
                    <h1 className='text-slate-500 font-semibold'>YOUR BEST TIME</h1>
                    
                    <p className='text-4xl font-bold text-blue-500 opacity-50 '>0:1:980</p>
                    <AiTwotoneCrown style={{
                        top:'24px', 
                        left:'-10px',
                        transform:'rotate(-40deg)'
                    }} className="text-yellow-500 absolute  text-xl"/>
                    
                </div>
                <div className='flex'>
                    <span className='px-5 py-2 bg-blue-400 rounded-xl shadow-xl text-white  mr-3 flex items-center cursor-pointer hover:bg-blue-500'><AiOutlineLike className="text-xl" /></span>
                    <span className='px-5 py-2 bg-blue-400 rounded-xl shadow-xl text-white font-semibold text-2xl cursor-pointer hover:bg-blue-500'>BACK TO HOME</span>
                </div>
            </div>


        </div>
    )
}
