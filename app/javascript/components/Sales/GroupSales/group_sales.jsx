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
    return { columnType: props.id }
  },
  hover(props, monitor, component) {
    const oldColumn = monitor.getItem().column_type;
    if ( props.id !== 'perdidos' && oldColumn === 'ganhos') {
      component.setState({ valid: false });
    } else {
      component.setState({ valid: true });
    }
  }
};

class GroupSales extends Component {
  state = {
    valid: true,
  };

  chooseBackGround = (hovered, validDrop) => {
    let background = 'inherit';
    if (hovered && validDrop) {
      background = 'lightgreen';
    } else if (hovered) {
      background = 'salmon';
    }
    return background;
  };

  render() {
    const { connectDropTarget, hovered, sale } = this.props;
    const validHover = hovered && (sale.column_type !== this.props.id);
    const backGroundColor = this.chooseBackGround(validHover, this.state.valid);
    return (
      connectDropTarget(
        <div className="ColumnDiv" style={{ background: backGroundColor }}>
          {this.props.sales}
        </div>
      )
    )
  }
}

export default DropTarget('sale', groupTarget, collect)(GroupSales);