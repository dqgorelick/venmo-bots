import React from 'react';

import ComicView from './ComicView';

class ComicContainer extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <ComicView
        feed={this.props.feed}
      />
    )
  }
}

export default ComicContainer;
