import React from 'react';

export default function TransactionView ( props ) {
    const payment = props.payment;
    const index = props.index;
    return (
        <div className='payment'>
            <div className="message">
                <p>{payment.message}</p>
            </div>
            <div className="profile">
                <p>from: {payment.actor.firstname} to: {payment.transactions[0].target.firstname} </p>
            </div>
        </div>
    );
}
