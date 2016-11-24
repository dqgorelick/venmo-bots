import React from 'react';

export default function TransactionView ( props ) {
    const payment = props.payment;
    const index = props.index;
    return (
        <div className='payment'>
            <h3>Payment #{index+1}</h3>
            <div className="profile">
                <p>{payment.actor.firstname} -> </p>
            </div>
            <div className="message">
                <p>{payment.message}</p>
            </div>
            <div className="profile">
                <p>-> {payment.transactions[0].target.firstname} </p>
            </div>
        </div>
    );
}
