// Comment.js
import React from 'react';
import PropTypes from 'prop-types';

class Card extends React.Component {

  render() {
    
    return (
      <div value={this.props.value} 
        onDragStart={this.props.onDragStart} 
        onMouseDown={(e)=> this.props.onMouseDown(e)}
        onMouseUp={(e)=> this.props.onMouseUp(e)}
        onDragEnd={(e)=> this.props.onDragEnd(e)}
        draggable className={`single-card ${this.props.suite}`}>
        <div value={this.props.value} className="value-text"></div>
        <h1 suite={this.props.suites} className="suite-image"></h1>
      </div>
    );

  Card.propTypes = {
    suite: PropTypes.string,
    };
  }
}

export default Card;