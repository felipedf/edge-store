import React, { Component } from 'react';

import { DropTarget } from 'react-dnd';

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    hovered: (monitor.isOver() && monitor.canDrop()),
    sale: monitor.getItem()
  }
};

const groupTarget = {
  canDrop(props, monitor) {
    if (monitor.getItem().column_type === 'ganhos') {
      return props.id === 'perdidos';
    }

    return true;
  },
  drop(props, monitor, component) {
    return { columnType: props.id }
  }
};

class GroupSales extends Component {

  render() {
    const { connectDropTarget, hovered, sale} = this.props;
    const backgroundColor = hovered ? 'lightgreen' : 'inherit';

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