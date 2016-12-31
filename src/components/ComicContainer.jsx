import React from 'react';
import { assign } from 'lodash';

class ComicContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      panels: {},
      comic: null
    }
    this.getPanelContent = this.getPanelContent.bind(this);
  }

  componentDidMount() {
    this.getPanelContent();
  }

  getPanelContent() {
    this.setState({
      comic: (Math.floor(Math.random()*5) + 1)
    });
    const panel1 = this.props.feed[Math.floor(Math.random()*this.props.feed.length)];
    const panel2 = this.props.feed[Math.floor(Math.random()*this.props.feed.length)];
    const panel3 = this.props.feed[Math.floor(Math.random()*this.props.feed.length)];
    this.setState({
      panels: {
        panel1,
        panel2,
        panel3
      }
    })
  }

  rollPanel(panel) {
    const newPanel = this.props.feed[Math.floor(Math.random()*this.props.feed.length)];
    const newPanels = assign({}, this.state.panels, {[panel]: newPanel});
    this.setState({
      panels: newPanels
    })
  }

  renderPanels() {
    if (!!this.state.panels.panel1 && !!this.state.panels.panel2 && !!this.state.panels.panel3) {
      return (
        <div className='panels'>
          <div className='panel panel-1'>
            <div className='panel-container'>
              <div className='panel-content' data-attr={`${this.state.panels.panel1.props.payment.message}`}>
              </div>
            </div>
          </div>
          <div className='panel panel-2'>
            <div className='panel-container'>
              <div className='panel-content' data-attr={`${this.state.panels.panel2.props.payment.message}`}>
              </div>
            </div>
          </div>
          <div className='panel panel-3'>
            <div className='panel-container'>
              <div className='panel-content' data-attr={`${this.state.panels.panel3.props.payment.message}`}>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className='panels'/>
      )
    }
  }

  render() {
    var backgroundImage = {
      backgroundImage: `url(../comics/comic${this.state.comic}.png)`
    }
    if (this.state.comic !== null) {
      return (
        <div>
          <div className="comic-overflow">
            <div style={backgroundImage} className={`comic ${(window.innerWidth < 750 ? 'smaller': '')}`}>
              {this.renderPanels()}
            </div>
          </div>
          <div className='comic-controls'>
            <div className='button panel-1' onClick={()=>{this.rollPanel('panel1')}}><span></span></div>
            <div className='button panel-2' onClick={()=>{this.rollPanel('panel2')}}><span></span></div>
            <div className='button panel-3' onClick={()=>{this.rollPanel('panel3')}}><span></span></div>
            <div className='button re-roll-all' onClick={this.getPanelContent}><span></span></div>
            <div className='button save-comic'><span></span></div>
          </div>
        </div>
      )
    } else {
       return null;
    }
  }
}

export default ComicContainer;
