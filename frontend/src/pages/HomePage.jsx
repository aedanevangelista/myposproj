import React from 'react'
import {Link} from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'

const HomePage = () => {
  return (
    <MainLayout>
      <div className='mx-16 mt-8 p-8 pb-12 bg-slate-100'>
              <h1 className='text-4xl font-semibold my-2'>Welcome to my Simple POS for small businesses</h1>
              <p className='my-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, modi alias odio et eaque optio. Repellendus quaerat adipisci quasi tempora dolores reprehenderit voluptas, dolorum eligendi omnis officia dignissimos totam earum!</p>
              <p className='mt-2 mb-8'>If you have an issue, call 443-444-xxx anytime.</p>
              <Link to="/pos" className='mb-6 p-4 bg-sky-600 text-white rounded-lg font-semibold'>Click here to sell products</Link>
          </div>
    </MainLayout>
  )
}

export default HomePage