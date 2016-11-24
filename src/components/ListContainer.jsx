import React from 'react';

import TransactionView from './TransactionView';
import ComicContainer from './ComicContainer';

export default function ListView(props) {
  // console.log('props',props);
  // const word = props.match || false;
  // var re = new RegExp(`^${props.match}\\s|\\s${props.match}\\s|\\s${props.match}$`,"g");
  // console.log('re',re);
  // let phrase = payment.message.replace(/ /g,'').toLowerCase();
  //


  var filterPhrase = (phrase) => {
    return (phrase.message.length > props.minLength && phrase.message.length < props.maxLength);
  }

  const feed = props.feed.data.filter(filterPhrase).map((payment, index) => (
    <TransactionView key={index} payment={payment} index={index} />
  ));

  return (
    <div>
      <div className='wrapper'>
        <div>{feed}</div>
      </div>
      <ComicContainer
        feed={feed}
      />
    </div>
  );
}
