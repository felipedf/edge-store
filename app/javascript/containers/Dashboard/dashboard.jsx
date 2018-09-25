import React, { Component } from 'react';

import AllCards from '../../components/Cards/all_cards';
import AllSales from '../../components/Sales/all_sales';
import CurrencyIcon from '../../images/currency_icon.png';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sales: [],
      cards: [
        {
          id: 1,
          cardName: 'Contato',
          totalPrice: 150000,
          totalSales: 2
        },
        {
          id: 2,
          cardName: 'Envio de proposta',
          totalPrice: 100000,
          totalSales: 0
        },
        {
          id: 3,
          cardName: 'Envio de proposta',
          totalPrice: 100000,
          totalSales: 0
        },
        {
          id: 4,
          cardName: 'Envio de proposta',
          totalPrice: 100000,
          totalSales: 0
        },
        {
          id: 5,
          cardName: 'Envio de proposta',
          totalPrice: 100000,
          totalSales: 0
        },
        {
          id: 6,
          cardName: 'Envio de proposta',
          totalPrice: 100000,
          totalSales: 0
        }
      ]
    };

    this.handleNewSale = this.handleNewSale.bind(this);
    this.handleSaleDelete = this.handleSaleDelete.bind(this);
    this.handleSaleDelete = this.handleSaleDelete.bind(this);
    this.handleSaleUpdate = this.handleSaleUpdate.bind(this);
  }

  componentDidMount() {
    fetch('/api/sales.json')
      .then((response) => {return response.json()})
      .then((data) => {this.setState({ sales: data }) });
  }

  handleSaleDelete(id) {
    fetch(`/api/sales/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then( res => this.deleteSale(id) )
  }

  handleNewSale() {
    let body = JSON.stringify({ sale: {manufacturer: '', description: '', price: 0} });

    fetch('/api/sales', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body,
    }).then( response => { return response.json() })
      .then( sale => {
        this.addNewSale(sale)
      })

  }

  handleSaleUpdate(sale) {
    fetch(`/api/sales/${sale.id}`,
      {
        method: 'PUT',
        body: JSON.stringify({ sale: sale }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then( res => { this.updateSale(sale) } )
  }

  updateSale(sale) {
    let newSales = this.state.sales.filter((f) => f.id !== sale.id);
    newSales.push(sale);

    this.setState({
      sales: newSales
    })
  }

  addNewSale(sale) {
    sale['editable'] = true;
    this.setState({
      sales: this.state.sales.concat(sale)
    })
  }

  deleteSale(id) {
    var newSales = this.state.sales.filter( sale => sale.id !== id );

    this.setState({
      sales: newSales
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
        />
      </div>
    )
  }
}

export default Dashboard;