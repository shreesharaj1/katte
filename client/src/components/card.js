// Comment.js
import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import Draggable from 'react-draggable';

class Card extends React.Component {
getInitialState() {
return {
activeDrags: 0,
deltaPosition: {
x: 0, y: 0
},
controlledPosition: {
x: -400, y: 200
}
};
}
handleDrag(e, ui) {
const {x, y} = this.state.deltaPosition;
this.setState({
deltaPosition: {
x: x + ui.deltaX,
y: y + ui.deltaY,
}
});
}
onStart() {
this.setState({activeDrags: ++this.state.activeDrags});
}
onStop() {
this.setState({activeDrags: --this.state.activeDrags});
}
// For controlled component
adjustXPos(e) {
e.preventDefault();
e.stopPropagation();
const {x, y} = this.state.controlledPosition;
this.setState({controlledPosition: {x: x - 10, y}});
}
adjustYPos(e) {
e.preventDefault();
e.stopPropagation();
const {controlledPosition} = this.state;
const {x, y} = controlledPosition;
this.setState({controlledPosition: {x, y: y - 10}});
}
onControlledDrag(e, position) {
const {x, y} = position;
this.setState({controlledPosition: {x, y}});
}
onControlledDragStop(e, position) {
this.onControlledDrag(e, position);
this.onStop();
}
render() {

return (
  <Draggable
      axis="x"
      handle=".handle"
      defaultPosition={{x: 0, y: 0}}
      position={null}
      grid={[25, 25]}
      onStart={this.handleStart}
      onDrag={this.handleDrag}
      onStop={this.handleStop}>
      <div className={`single-card ${this.props.suite}`}>
        <div className="textContent">
          <h3>{this.props.suite}</h3>
          <h3 className="text">{this.props.value}</h3>
        </div>
      </div>
  </Draggable>
);

Comment.propTypes = {
  author: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
};
}
}

export default Card;