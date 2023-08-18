import React from 'react'
import Header from '../components/Includes/Header';
import Transaction_Confirmation from './components/TransactionConfirmation';

const TransactionConfirmation = () => {
    return (
        <>
            <div>
                <Header />
            </div>
            <div className='mt-5'>
                <Transaction_Confirmation />
            </div>
        </>
    )
}

export default TransactionConfirmation;