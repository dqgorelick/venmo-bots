import '../assets/styles/main.scss';

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
      minLength: 10,
      maxLength: 100,
    };
    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    this.fetchVenmoData();
  }

  fetchVenmoData() {
    $.get( VENMO_API, ( data ) => {
      var result = JSON.parse(data);
      console.log('result.data',result.data);
      this.setState({ feed: result });
      return result.data;
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
            feed={this.state.feed}
            updateState={this.updateState}
            minLength={this.state.minLength}
            maxLength={this.state.maxLength}
          />
        </div>
      )
    } else {
      return (
        <div className='wrapper'>
          <h1>Loading feed</h1>
        </div>
      )
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
