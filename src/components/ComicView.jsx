import React from 'react';

export default function ComicView(props) {
  const panels = (() => {
    const panel1 = props.feed[Math.floor(Math.random()*props.feed.length)];
    const panel2 = props.feed[Math.floor(Math.random()*props.feed.length)];
    const panel3 = props.feed[Math.floor(Math.random()*props.feed.length)];
    return ({
      panel1,
      panel2,
      panel3
    })
  })();

  return (
    <div className='comic'>
      <div className="panels">
        <div className="panel panel-1">
          <div className="panel-container">
            <div className="panel-content">
              {panels['panel1'].props.payment.message}
            </div>
          </div>
        </div>
        <div className="panel panel-2">
          <div className="panel-container">
            <div className="panel-content">
              {panels['panel2'].props.payment.message}
            </div>
          </div>
        </div>
        <div className="panel panel-3">
          <div className="panel-container">
            <div className="panel-content">
              {panels['panel3'].props.payment.message}
            </div>
          </div>
        </div>
      </div>
      <img src='../comics/comic1.png' alt='stolen comic strip'/>
    </div>
  );

}
