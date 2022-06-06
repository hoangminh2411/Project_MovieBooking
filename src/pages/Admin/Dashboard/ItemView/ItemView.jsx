import React from 'react'

export default function ItemView() {
    return (
        <div className="flex justify-around">

            <div className="relative w-1/4 mx-3 p-5 flex flex-col justify-center shadow-lg rounded-lg">
                <h1 className="text-lg" style={{ color: 'rgb(105,109,145)' }}>Top Order</h1>
                <p className="mb-0" style={{ color: 'rgb(105,109,145)' }}><span className="text-xl font-bold text-black">1075</span>/day</p>
                <div className="w-10 h-10 rounded-full absolute right-0 top-0 translate-x-1/4 " style={{ backgroundColor: 'rgb(192,229,228)' }}>

                </div>
            </div>

            <div className="relative w-1/4 mx-3 p-5 flex flex-col justify-center shadow-lg rounded-lg">
                <h1 className="text-lg" style={{ color: 'rgb(105,109,145)' }}>Top Order</h1>
                <p className="mb-0" style={{ color: 'rgb(105,109,145)' }}><span className="text-xl font-bold text-black">1075</span>/day</p>
                <div className="w-10 h-10 rounded-full absolute right-0 top-0 translate-x-1/4 " style={{ backgroundColor: 'rgb(230,237,183)' }}>

                </div>
            </div>

            <div className="relative w-1/4 mx-3 p-5 flex flex-col justify-center shadow-lg rounded-lg">
                <h1 className="text-lg" style={{ color: 'rgb(105,109,145)' }}>Top Order</h1>
                <p className="mb-0" style={{ color: 'rgb(105,109,145)' }}><span className="text-xl font-bold text-black">1075</span>/day</p>
                <div className="w-10 h-10 rounded-full absolute right-0 top-0 translate-x-1/4 " style={{ backgroundColor: 'rgb(252,224,162)' }}>

                </div>
            </div>

            <div className="relative w-1/4 mx-3 p-5 flex flex-col justify-center shadow-lg rounded-lg">
                <h1 className="text-lg" style={{ color: 'rgb(105,109,145)' }}>Top Order</h1>
                <p className="mb-0" style={{ color: 'rgb(105,109,145)' }}><span className="text-xl font-bold text-black">1075</span>/day</p>
                <div className="w-10 h-10 rounded-full absolute right-0 top-0 translate-x-1/4 " style={{ backgroundColor: 'rgb(206,225,244)' }}>

                </div>
            </div>





        </div>
    )
}
