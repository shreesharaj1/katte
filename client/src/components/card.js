// Comment.js
import React from 'react';
import PropTypes from 'prop-types';

class Card extends React.Component {

  render() {
    
    return (
      <div value={this.props.value} onDragStart={this.props.onDragStart} draggable className={`single-card ${this.props.suite}`}>
        <div className="value-text">{this.props.value}</div>
        <div className="suite-text">{this.props.suite}</div>
      </div>
    );

  Card.propTypes = {
    suite: PropTypes.string,
    };
  }
}

export default Card;