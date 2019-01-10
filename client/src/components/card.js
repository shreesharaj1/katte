// Comment.js
import React from 'react';
import PropTypes from 'prop-types';

class Card extends React.Component {

  render() {
    
    return (
      <div onDragStart={this.props.onDragStart} draggable className={`single-card ${this.props.suite}`}>
        <div className="suite-text">{this.props.suite}</div>
        <div className="value-text">{this.props.value}</div>
      </div>
    );

  Card.propTypes = {
    suite: PropTypes.string,
    };
  }
}

export default Card;