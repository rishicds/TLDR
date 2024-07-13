import React from 'react'

const ChatNav = () => {
  return (
    <div className="navbar bg-gradient-to-r from-blue-600 to-red-600">
  <div className="flex-1">
    <a className="btn btn-ghost text-white text-2xl font-bold">TL;DR</a>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
      <li className='text-white font-semibold text-xl'><a href="/">Home</a></li>
      
    </ul>
  </div>
</div>
  )
}

export default ChatNav
