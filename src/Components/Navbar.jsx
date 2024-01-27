import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from "axios"
const Navbar = () => {
  const [userData,setUserData]=useState({})
  // console.log(userData)
  const getUser=async()=>{
    try {
      const resp=await axios.get("https://bugtracker-j5bn.onrender.com/login/sucess",{withCredentials:true});
      setUserData(resp.data.user)
    } catch (error) {
      console.error(error)
    }
  }
  const logout = ()=>{
    window.open("https://bugtracker-j5bn.onrender.com/logout","_self")
}
  useEffect(()=>{
    getUser()
  },[])
  // console.log(userData)
  return (
    <header className='flex bg-pink-500 justify-between items-center'>
        <div className='flex p-2 items-center gap-3 bg-slate-500 text-white '>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-10 h-8">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0 1 12 12.75Zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 0 1-1.152 6.06M12 12.75c-2.883 0-5.647.508-8.208 1.44.125 2.104.52 4.136 1.153 6.06M12 12.75a2.25 2.25 0 0 0 2.248-2.354M12 12.75a2.25 2.25 0 0 1-2.248-2.354M12 8.25c.995 0 1.971-.08 2.922-.236.403-.066.74-.358.795-.762a3.778 3.778 0 0 0-.399-2.25M12 8.25c-.995 0-1.97-.08-2.922-.236-.402-.066-.74-.358-.795-.762a3.734 3.734 0 0 1 .4-2.253M12 8.25a2.25 2.25 0 0 0-2.248 2.146M12 8.25a2.25 2.25 0 0 1 2.248 2.146M8.683 5a6.032 6.032 0 0 1-1.155-1.002c.07-.63.27-1.222.574-1.747m.581 2.749A3.75 3.75 0 0 1 15.318 5m0 0c.427-.283.815-.62 1.155-.999a4.471 4.471 0 0 0-.575-1.752M4.921 6a24.048 24.048 0 0 0-.392 3.314c1.668.546 3.416.914 5.223 1.082M19.08 6c.205 1.08.337 2.187.392 3.314a23.882 23.882 0 0 1-5.223 1.082" />
</svg>
<h1 className='font-bold text-xl'>Bug Tracker</h1>
        </div>
        <div className=' w-1/3 flex items-center justify-around mr-5 text-xl font-medium text-slate-200'>
          {Object.keys(userData)?.length>0 ?(<div className='flex items-center justify-between gap-3'><p>Welcome {userData?.displayName}</p><img className='w-10 rounded-full' src={userData.image} alt={userData.displayName}/><p className='cursor-pointer' onClick={logout}>Logout</p></div>) :
          <Link className=' active:text-red-400' to="/auth">Auth</Link>}
          
          {/* <Link className=' active:text-red-400' to="/bug">Bug</Link> */}
        </div>
    </header>
  )
}

export default Navbar;