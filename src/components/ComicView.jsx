import React from 'react';
import ReactDOM from 'react-dom';

var ComicView = React.createClass({
  getInitialState() {
    return {
      loaded: false,
      src: null
    };
  },

  onImageLoad() {
    if (this.isMounted()) {
      this.setState({ loaded: true });
    }
  },

  loadImage() {
    var imgTag = ReactDOM.findDOMNode(this.refs.img);
    var img = new window.Image();
    img.onload = this.onImageLoad;
    img.src = this.props.src;
  },

  componentDidMount() {
    setTimeout(this.loadImage, 90);
  },

  componentWillReceiveProps() {
    if (this.props.src !== this.state.src) {
      console.log('changed last: ', this.props.src, 'current: ', this.state.src);
      this.setState({loaded: false});
      setTimeout(this.loadImage, 90);
    }
    this.setState({ src: this.props.src});
  },

  render() {
    return (
      <img ref="img" {...this.props} className={`image ${(this.state.loaded ? 'image-loaded' : 'image-not-loaded') + ' ' + (this.props.className ? this.props.className : '')}`} />
    );
  }
});

export default ComicView;
