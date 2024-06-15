import React from 'react'
import { SlSettings } from "react-icons/sl";
import { PiUserCircleDuotone } from "react-icons/pi";
import './header.css'
const HeaderPage = () => {
  return (
    <div className=''>
      <header className="absolute top-0 left-0 z-50  w-[100vw] bg-white">
        <div className="hidden md:flex px-4 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 justify-between items-center  text-sm py-3" style={{ borderColor: 'rgba(255,255,255,.25)' }}>
          <div className>
            <ul className="flex text-white">
              <li>
              <div className="w-1/2 md:w-auto">
            <a href="index.html" className="md:text-black font-bold text-2xl">
              Student
            </a>
          </div>
              </li>
              <li className="ml-6">
              <nav className="w-full bg-white  md:bg-transparent rounded shadow-lg px-6 py-4 mt-4 text-center md:p-0 md:mt-0 md:shadow-none" id='menu'>
              <ul className="md:flex items-center">
                <li className="md:ml-4"><a className="py-2 inline-block md:text-black md:px-2 font-semibold" href="/">DashBoard</a></li>
              </ul>
            </nav>
              </li>
            </ul>
          </div>
          <div className>
            <ul className="flex justify-end text-black">
              <li className="ml-6">
                <label htmlFor="setting">
                <title>menu</title>
                <SlSettings className='text-2xl'/>
                </label>
                <input class="hidden" type="checkbox" id="setting"></input>
              </li>
              <li className="ml-6">
              <label htmlFor="setting">
                <title>menu</title>
                <PiUserCircleDuotone className='text-2xl'/>
                </label>
                <input class="hidden" type="checkbox" id="setting"></input>
              </li>
            </ul>
          </div>
        </div>
        <hr className='w-full text-slate-200  border'/>
        <div className="flex flex-wrap items-center  px-4 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 justify-between py-6 md:py-0">
          <label htmlFor="menu-toggle" className="pointer-cursor md:hidden block"><svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20">
            <title>menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg></label>
          <input class="hidden" type="checkbox" id="menu-toggle"></input>
          <div className="hidden md:block  w-full md:w-auto" id="menu">
            <nav className="w-full border md:border-none  rounded md:bg-transparent shadow-sm py-3 mt-4 text-center md:p-0 md:mt-0 md:shadow-none">
              <ul className="md:flex items-center md:divide-none divide-y divide-solid">
                <li><a className="py-2 inline-block md:text-black md:hidden lg:block font-semibold" href="/">Profile</a></li>
                <li className="md:ml-4"><a className="py-2 inline-block md:text-black md:px-2 font-semibold" href="/">Password</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

    </div>
  )
}

export default HeaderPage
