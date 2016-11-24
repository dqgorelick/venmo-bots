import React from 'react';

import TransactionView from './TransactionView';
import ComicView from './ComicView';

export default function ListView ( props ) {
    // console.log('props',props);
    // const word = props.match || false;
    // var re = new RegExp(`^${props.match}\\s|\\s${props.match}\\s|\\s${props.match}$`,"g");
    // console.log('re',re);
    // let phrase = payment.message.replace(/ /g,'').toLowerCase();
    //


    var filterPhrase = (phrase) => {
        return ((phrase.length > props.minLength && phrase.length < props.maxLength) ? true : false);
    }
    const feed = props.feed.data.map((payment, index) => {
        if (filterPhrase(payment.message)) {
            return (
                <TransactionView key={index} payment={payment} index={index} />
            )
        } else {
            return null;
        }
    });


    return (
        <div>
            <div className='wrapper'>
                <div>{feed}</div>
            </div>
            <ComicView/>
        </div>
    );
}
