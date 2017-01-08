import '../assets/styles/main.scss';

import moment from 'moment';

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import SettingsView from './components/SettingsView';
import ListContainer from './components/ListContainer';

const VENMO_API = './api/feed';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feed: null,
      minLength: 4,
      maxLength: 70,
    };
    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    this.fetchVenmoData();
  }

  fetchVenmoData() {
    $.ajax({
      cache: false,
      url: './feed.json',
      dataType: 'json',
      success: (feed) => {
        this.setState({ feed: feed.filtered });
        this.setState({ timestamp: feed.timestamp });
        $('.created_at').attr('data-attr', `${moment(feed.timestamp).format('D MMM YYYY, h:mm a')} | venmostrips.com`);
        return feed;
      }
    });
  }

  updateState(type, value) {
    this.setState({
      [type]: value
    });
    return this.state[type];
  }

  render() {
    if (this.state.feed) {
      return (
        <div>
          <SettingsView
            updateState={this.updateState}
            minLength={this.state.minLength}
            maxLength={this.state.maxLength}
          />
          <ListContainer
            timestamp={this.state.timestamp}
            feed={this.state.feed}
            updateState={this.updateState}
            minLength={this.state.minLength}
            maxLength={this.state.maxLength}
          />
        </div>
      )
    } else {
      return (
        <div>
          <div className='loading'>
            <img src='../images/zim.gif' alt='loading dancing gir'/>
          </div>
          <h1>Loading feed...</h1>
        </div>
      )
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
