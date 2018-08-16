// Comment.js
import React from 'react';
import PropTypes from 'prop-types';

class Card extends React.Component {

  render() {
    
    return (
      <div onDragStart={this.props.onDragStart} draggable className={`single-card ${this.props.suite}`}>
        <div className="textContent">
          <h3>{this.props.suite}</h3>
          <h3 className="text">{this.props.value}</h3>
        </div>
      </div>
    );

  Comment.propTypes = {
    author: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    };
  }
}

export default Card;