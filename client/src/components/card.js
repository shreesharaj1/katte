// Comment.js
import React from 'react';
import PropTypes from 'prop-types';

class Card extends React.Component {
  
  state = {
    tasks: [
        {name:"Learn Angular",category:"complete", bgcolor: "yellow"},
        {name:"React", category:"wip", bgcolor:"pink"},
        {name:"Vue", category:"wip", bgcolor:"skyblue"}
      ]
  }

onDragStart = (ev, id) => {
    console.log('dragstart:',id);
    ev.dataTransfer.setData("id", id);
}

onDragOver = (ev) => {
    ev.preventDefault();
}

onDrop = (ev, cat) => {
   let id = ev.dataTransfer.getData("id");
   
   let tasks = this.state.tasks.filter((task) => {
       if (task.name == id) {
           task.category = cat;
       }
       return task;
   });

   this.setState({
       ...this.state,
       tasks
   });
}

  render() {
    
    var tasks = {
      wip: [],
      complete: []
    }

  this.state.tasks.forEach ((t) => {
      tasks[t.category].push(
          <div key={t.name} 
              onDragStart = {(e) => this.onDragStart(e, t.name)}
              draggable
              className="draggable"
              style = {{backgroundColor: t.bgcolor}}
          >
              {t.name}
          </div>
      );
  });

    return (
      <div>
      <div draggable className={`single-card ${this.props.suite}`}>
        <div className="textContent">
          <h3>{this.props.suite}</h3>
          <h3 className="text">{this.props.value}</h3>
        </div>
      </div>
        
        <div className="carpet" 
            onDragOver={(e)=>this.onDragOver(e)}
            onDrop={(e)=>this.onDrop(e, "complete")}>
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