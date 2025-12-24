import React from 'react'
import { GiMoebiusTriangle } from "react-icons/gi";
import { TiWeatherWindyCloudy } from "react-icons/ti";

const Nav = () => {
  return (
    <div className='w-screen flex justify-center items-center p-5 border-top bg-black'>
      <div className='flex justify-center items-center space-x-3 bg-gray-100 px-4 py-3 rounded-full shadow-lg fixed top-4'>
        <TiWeatherWindyCloudy size={35} className="text-[#363948]"/>  
        </div>  
    </div>
  )
}

export default Nav