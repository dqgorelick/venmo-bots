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
    console.log('hello world');
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
              <div className='panel-content'>
                {this.state.panels.panel1.props.payment.message}
              </div>
            </div>
          </div>
          <div className='panel panel-2'>
            <div className='panel-container'>
              <div className='panel-content'>
                {this.state.panels.panel2.props.payment.message}
              </div>
            </div>
          </div>
          <div className='panel panel-3'>
            <div className='panel-container'>
              <div className='panel-content'>
                {this.state.panels.panel3.props.payment.message}
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
    console.log('this.state.comic',this.state.comic);
    if (this.state.comic !== null) {
      return (
        <div className='comic'>
          <div className='result'>
          </div>
          <div className='comic-controls'>
            <div className="re-roll re-roll-all" onClick={this.getPanelContent}><span>re-roll all</span></div>
            <div className="re-roll panel-1" onClick={()=>{this.rollPanel('panel1')}}><span>re-roll panel 1</span></div>
            <div className="re-roll panel-2" onClick={()=>{this.rollPanel('panel2')}}><span>re-roll panel 2</span></div>
            <div className="re-roll panel-3" onClick={()=>{this.rollPanel('panel3')}}><span>re-roll panel 3</span></div>
          </div>
          {this.renderPanels()}
          <img src={`../comics/comic${this.state.comic}.png`} alt='stolen comic strip'/>
        </div>
      )
    } else {
       return null;
    }
  }
}

export default ComicContainer;
