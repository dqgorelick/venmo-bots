import React from 'react';

export default function ComicView(props) {

  function getPanelContent() {
    const panel1 = props.feed[Math.floor(Math.random()*props.feed.length)];
    const panel2 = props.feed[Math.floor(Math.random()*props.feed.length)];
    const panel3 = props.feed[Math.floor(Math.random()*props.feed.length)];
    panel1,
    panel2,
    panel3
  }

  function rollPanels() {
    console.log('hello world');
    return getPanelContent();
  }

  return (
    <div className='comic'>
      <div className='comic-controls'>
        <div className="re-roll re-roll-all" onClick={() => {panels = rollPanels()}}>re-roll all</div>
        <div className="re-roll panel-1">re-roll panel 1</div>
        <div className="re-roll panel-2">re-roll panel 2</div>
        <div className="re-roll panel-3">re-roll panel 3</div>
      </div>
      <div className='panels'>
        <div className='panel panel-1'>
          <div className='panel-container'>
            <div className='panel-content'>
              {panels['panel1'].props.payment.message}
            </div>
          </div>
        </div>
        <div className='panel panel-2'>
          <div className='panel-container'>
            <div className='panel-content'>
              {panels['panel2'].props.payment.message}
            </div>
          </div>
        </div>
        <div className='panel panel-3'>
          <div className='panel-container'>
            <div className='panel-content'>
              {panels['panel3'].props.payment.message}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
      // <img src='../comics/comic1.png' alt='stolen comic strip'/>

}
