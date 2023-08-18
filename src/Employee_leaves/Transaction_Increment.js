import React from 'react'
import Header from '../components/Includes/Header';
import Transaction_Increment from './components/TransactionIncrement'


const TransactionIncrement = () => {
    return (
        <>
            <div>
                <Header />
            </div>
            <div className='mt-5'>
                <Transaction_Increment />
            </div>
        </>
    )
}

export default TransactionIncrement;