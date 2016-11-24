import React from 'react';

export default function ComicView ( props ) {
    return (
        <div className='comic'>
            <div className="panels">
                <div className="panel-1">panel-1</div>
                <div className="panel-2">panel-2</div>
                <div className="panel-3">panel-3</div>
            </div>
            <img src='../comics/comic1.png' alt='stolen comic strip'/>
        </div>
    );

}
