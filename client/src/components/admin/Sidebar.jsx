import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Sidebar = () => {

  const { setToken, navigate, axios } = useAppContext()

  const handleLogout = () => {
    setToken(null)
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
    toast.success('Logged out successfully')
    navigate('/')
  }

  return (
    <div >
        <NavLink end = {true} to='/admin/dashboard' className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer  ${isActive && "bg-primary/10 border-r-4 border-primary"}`}>
            <img src={assets.home_icon} alt="" className='min-w-[1rem] w-5'/>
            <p className='hidden md:inline-block'>Dashboard</p>
        </NavLink>

        <NavLink  to='/admin/addBlog' className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer  ${isActive && "bg-primary/10 border-r-4 border-primary"}`}>
            <img src={assets.add_icon} alt="" className='min-w-[1rem] w-5'/>
            <p className='hidden md:inline-block'>Add Blogs</p>
        </NavLink>

        <NavLink  to='/admin/listBlog' className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer  ${isActive && "bg-primary/10 border-r-4 border-primary"}`}>
            <img src={assets.list_icon} alt="" className='min-w-[1rem] w-5'/>
            <p className='hidden md:inline-block'>Blog Lists</p>
        </NavLink>

        <NavLink  to='/admin/comments' className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer  ${isActive && "bg-primary/10 border-r-4 border-primary"}`}>
            <img src={assets.comment_icon} alt="" className='min-w-[1rem] w-5'/>
            <p className='hidden md:inline-block'>Comments</p>
        </NavLink>

        <button onClick={handleLogout} className='flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer hover:bg-red-50 border-r-4 border-transparent hover:border-red-400 w-full text-left'>
            <img src={assets.user_icon} alt="" className='min-w-[1rem] w-5'/>
            <p className='hidden md:inline-block text-red-600'>Logout</p>
        </button>
    </div>
  )
}

export default Sidebar