import React from 'react'
import {Link} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = ({children}) => {
  return (
    <div>
    <header>
      <nav className='bg-sky-600 p-6'>
        <div>
          <Link to="/" className="text-2xl text-white font-semibold ml-8">POS</Link>
        </div>
      </nav>
    </header>

    <main className=''>
      <div className=''>
        {children}
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </main>
  </div>
  )
}

export default MainLayout