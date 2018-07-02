// Comment.js
import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

const Card = props => (
  <div className={`single-card ${props.suite}`}>
    <div className="textContent">
      <h3>{props.suite}</h3>
      <h3 className="text">{props.value}</h3>
     </div>
  </div>
);

Comment.propTypes = {
  author: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
};

export default Card;