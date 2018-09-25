import React, { Component } from 'react';

import GroupSales from './GroupSales/group_sales';
import Sale from './Sale/sale';

class AllSales extends Component {
  state = {
    contato: {
      sales: []
    },
    proposta: {
      sales: []
    },
    followUp: {
      sales: []
    },
    fechamento: {
      sales: []
    },
    ganhos: {
      sales: []
    },
    perdidos: {
      sales: []
    }
  };

  removeSale = id => {
    console.log("DELETE SALE " + id);
  };

  render() {
    console.log(this.props.sales);
    let sales = [];
    for (let sale in this.props.sales) {
      sales = this.props.sales[sale].map((sale) => (
        <GroupSales key={sale} sales={this.props.sales[sale]}/>
      ));
    }
    const sales = this.props.sales.map((sale) => {
      return (
        <Sale key={sale.id}
              sale={sale}
              handleDelete={this.props.handleDelete}
              handleUpdate={this.props.handleUpdate}
              handleDrop={id => this.removeSale(id)}
        />
      )
    });

    return (
      <div className="RowDiv">
        <div className="ColumnDiv">{sales}</div>
        {/*<GroupSales sales={sales}/>*/}

        <GroupSales/>
      </div>
    )
  }
}

export default AllSales;