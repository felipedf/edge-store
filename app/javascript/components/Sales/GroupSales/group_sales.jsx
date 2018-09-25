import React, { Component } from 'react';

import { DropTarget } from 'react-dnd';

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
    sale: monitor.getItem()
  }
};

const groupTarget = {
  drop(props, monitor, component) {
    return monitor.getItem();
  }
};

class GroupSales extends Component {

  render() {
    const { connectDropTarget, hovered, sale} = this.props;
    const backgroundColor = hovered ? 'lightgreen' : 'inherit';
    console.log(this.props.sales)
    return (
      connectDropTarget(
        <div className="ColumnDiv" style={{ background: backgroundColor }}>
          {this.props.sales}
        </div>
      )
    )
  }
}

export default DropTarget('sale', groupTarget, collect)(GroupSales);