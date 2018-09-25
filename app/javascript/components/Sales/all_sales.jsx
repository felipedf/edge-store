import React, { Component } from 'react';

import GroupSales from './GroupSales/group_sales';
import Sale from './Sale/sale';

class AllSales extends Component {
  render() {
    let columns = [];
    for (let sale in this.props.sales) {
      const sales = this.props.sales[sale].map( sale => (
        <Sale key={sale.id}
              sale={sale}
              handleDelete={this.props.handleDelete}
              handleUpdate={this.props.handleUpdate}
              handleDrop={this.props.handleDrop}
        />
      ));
      columns.push(
        <GroupSales key={sale} id={sale} sales={sales}/>
      )
    }

    return (
      <div className="RowDiv">
        {columns}
      </div>
    )
  }
}

export default AllSales;