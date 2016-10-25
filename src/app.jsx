import '../assets/styles/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';

const VENMO_API = './api/feed';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          feed: null
        };
    }

    componentDidMount() {
        this.fetchVenmoData();
    }

    fetchVenmoData() {
        return fetch(VENMO_API)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({feed: responseJson});
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
                return error;
            });
    }

    render() {
        if (this.state.feed) {
            const feed = this.state.feed.data.map((payment, index) => {
                return (
                    <div className='payment' key={index}>
                        <h3>Payment #{index+1}</h3>
                        <div className="profile">
                            <p>{payment.actor.firstname} -> </p>
                        </div>
                        <div className="message">
                            <p>{payment.message}</p>
                        </div>
                        <div className="profile">
                            <p>-> {payment.transactions[0].target.firstname} </p>
                        </div>
                    </div>
                )
            })
            return (
                <div className='wrapper'>
                    <div>{feed}</div>
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
