import React from 'react'
import Header from '../components/Includes/Header';
import DepartmentList from './components/DepartmentList'

const Departments = () => {
    return (
        <>
            <div>
                <Header />
            </div>
            <div className='mt-5'>
                <DepartmentList />
            </div>
        </>
    )
}

export default Departments