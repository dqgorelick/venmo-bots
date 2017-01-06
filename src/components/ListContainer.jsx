import React from 'react';

import moment from 'moment';

import TransactionView from './TransactionView';
import ComicContainer from './ComicContainer';

export default function ListView(props) {

  var filterPhrase = (phrase) => {
    return (phrase.message.length > props.minLength && phrase.message.length < props.maxLength);
  }

  const feed = props.feed.filter(filterPhrase).map((payment, index) => (
    <TransactionView key={index} payment={payment} index={index} />
  ));

  return (
    <div>
      <div className='timestamp'>
        <p>Transactions from: {moment(props.timestamp).startOf('minute').fromNow()}</p>
      </div>
      <div className='comic-container'>
        <ComicContainer
          feed={feed}
        />
      </div>
    </div>
  );
}
