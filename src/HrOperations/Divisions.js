import React from 'react'
import Header from '../components/Includes/Header';
import DivisionList from './components/DivisionList';
const Divisions = () => {
  return (
     <>
    <div>
    <Header />
    </div>
    <div className='mt-5'>
    <DivisionList />
    </div>
    </>
  )
}

export default Divisions