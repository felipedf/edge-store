import React, { Component } from 'react';

import AllCards from '../../components/Cards/all_cards';
import AllSales from '../../components/Sales/all_sales';
import CurrencyIcon from '../../images/currency_icon.png';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sales: {
        contato: [],
        proposta: [],
        followUp: [],
        fechamento: [],
        ganhos: [],
        perdidos: []
      },
      cards: {
        contato: {
          cardName: 'Contato',
          totalPrice: 0,
          totalSales: 0,
          cardClass: 'CardPrimary'
        },
        proposta: {
          cardName: 'Envio de proposta',
          totalPrice: 0,
          totalSales: 0,
          cardClass: 'CardPrimary'
        },
        followUp: {
          cardName: 'Follow-up',
          totalPrice: 0,
          totalSales: 0,
          cardClass: 'CardPrimary'
        },
        fechamento: {
          cardName: 'Fechamento',
          totalPrice: 0,
          totalSales: 0,
          cardClass: 'CardPrimary'
        },
        ganhos: {
          cardName: 'Ganhos',
          totalPrice: 0,
          totalSales: 0,
          cardClass: 'CardSuccess'
        },
        perdidos: {
          cardName: 'Perdidos',
          totalPrice: 0,
          totalSales: 0,
          cardClass: 'CardDanger'
        }
      }
    };

    this.handleNewSale = this.handleNewSale.bind(this);
    this.handleSaleDelete = this.handleSaleDelete.bind(this);
    this.handleSaleDelete = this.handleSaleDelete.bind(this);
    this.handleSaleUpdate = this.handleSaleUpdate.bind(this);
  }

  componentDidMount() {
    fetch('/api/sales.json')
      .then( response => response.json() )
      .then( sales => {
        let stateCopy = {
          sales: { ...this.state.sales, ...sales },
          cards: { ...this.state.cards }
        };

        Object.keys(sales).map( saleType => {
          const totalPrice = sales[saleType].reduce( (price, sale) => (sale.price || 0), 0);
          const totalSales = sales[saleType].length;

          stateCopy.cards[saleType] = {
              ...this.state.cards[saleType],
              totalPrice: totalPrice,
              totalSales: totalSales
          }
        });

        this.setState(stateCopy)
      })
  }

  handleSaleDelete(id, columnType) {
    fetch(`/api/sales/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then( res => this.deleteSale(id, columnType) )
  }

  handleNewSale() {
    const body = JSON.stringify({ sale: {manufacturer: '', description: '', price: 0, column_type: 'contato'} });

    fetch('/api/sales', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body,
    }).then( response => response.json() )
      .then( sale => this.addNewSale(sale) )
  }

  handleSaleUpdate(sale) {
    fetch(`/api/sales/${sale.id}`,
      {
        method: 'PUT',
        body: JSON.stringify({ sale: sale }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then( res => { this.updateSale(sale) })
  }

  handleSaleDrop = (sale, newColumn) => {
    let {id, column_type} = sale;
    if (column_type === newColumn) return;
    const newColumns = {};

    newColumns[column_type] = this.state.sales[column_type].filter( sale => sale.id !== id );
    sale.column_type = newColumn;
    newColumns[newColumn] = [
      ...this.state.sales[newColumn],
      sale
    ];
    this.setState({
      sales: {
        ...this.state.sales,
        ...newColumns
      }
    })
  };

  updateSale(sale) {
    let newSales = {};
    newSales[sale.column_type] = this.state.sales[sale.column_type].filter( s => s.id !== sale.id);
    newSales[sale.column_type].push(sale);

    this.setState({
      sales: {
        ...this.state.sales,
        ...newSales
      }
    })
  }

  addNewSale(sale) {
    sale['editable'] = true;
    let sales = {};
    sales[sale.column_type] = this.state.sales[sale.column_type].concat(sale);
    this.setState({
      sales: {
        ...this.state.sales,
        ...sales
      }
    })
  }

  deleteSale(id, columnType) {
    const newSales = {};
    newSales[columnType] = this.state.sales[columnType].filter( sale => sale.id !== id );

    this.setState({
      sales: {
        ...this.state.sales,
        ...newSales
      }
    })
  }

  render() {
    return(
      <div>
        <button onClick={this.handleNewSale} className="Button Primary">
          <div>
            <img src={CurrencyIcon} alt="Add a sale"/>
            Adicionar negócio
          </div>
        </button>
        <AllCards cards={this.state.cards} />
        <AllSales
          sales={this.state.sales}
          handleDelete={this.handleSaleDelete}
          handleUpdate={this.handleSaleUpdate}
          handleDrop={this.handleSaleDrop}
        />
      </div>
    )
  }
}

export default Dashboard;