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
      },
      columnUpdate: {
        saleName: '',
        actualColumn: '',
        lastColumn: '',
        timeToUpdate: '',
        winDate: '',
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
        this.updateColumnCards(sales)
      })
  }

  updateColumnCards(sales) {
    let stateCopy = {
      sales: { ...this.state.sales, ...sales },
      cards: {}
    };

    Object.keys(sales).map( saleType => {
      const totalPrice = sales[saleType].reduce( (price, sale) => (price + (+sale.price || 0)), 0);
      const totalSales = sales[saleType].length;

      stateCopy.cards[saleType] = {
        ...this.state.cards[saleType],
        totalPrice: totalPrice,
        totalSales: totalSales
      }
    });

    this.setState({
      sales: stateCopy.sales,
      cards: {...this.state.cards, ...stateCopy.cards},
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
    const body = JSON.stringify({
      sale: {
        manufacturer: '',
        description: '',
        price: 0,
        column_type: 'contato',
        column_update: new Date()
      } });

    fetch('/api/sales', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body,
    }).then( response => response.json() )
      .then( sale => this.addNewSale(sale) )
  }

  handleSaleUpdate(sale, oldColumn = null) {
    fetch(`/api/sales/${sale.id}`,
      {
        method: 'PUT',
        body: JSON.stringify({ sale: sale }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then( res => {
        oldColumn
          ? this.handleSaleDrop(sale, oldColumn)
          : this.updateSale(sale)
      })
  }

  handleSaleDrop = (sale, oldColumn) => {
    let {id, column_type} = sale;
    if (column_type === oldColumn) return;
    const newColumns = {};

    newColumns[oldColumn] = this.state.sales[oldColumn].filter( sale => sale.id !== id );

    const now = new Date();
    const updateTime = (now - new Date(sale.column_update))/1000; // Time in seconds
    sale.column_update = now;

    newColumns[column_type] = [
      ...this.state.sales[column_type],
      sale
    ];

    const newSales = {
      ...this.state.sales,
      ...newColumns
    };

    const day = now.getDate();
    const month = now.getMonth()+1;
    const year = now.getFullYear();
    const winDate = sale.column_type === 'ganhos' ? `${day}/${month}/${year}` : '';

    this.setState({
      columnUpdate: {
        saleName: sale.description,
        lastColumn: oldColumn,
        actualColumn: sale.column_type,
        timeToUpdate: updateTime,
        winDate: winDate
      }
    });

    this.updateColumnCards(newSales);
  };

  updateSale(sale) {
    let newSales = {};
    newSales[sale.column_type] = this.state.sales[sale.column_type].filter( s => s.id !== sale.id);
    newSales[sale.column_type].push(sale);

    const allSales = {
        ...this.state.sales,
        ...newSales
    };

    this.updateColumnCards(allSales);
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

    const allSales = {
      ...this.state.sales,
      ...newSales
    };

    this.updateColumnCards(allSales);
  }

  render() {
    const {saleName, actualColumn, lastColumn, timeToUpdate, winDate} = this.state.columnUpdate;

    let footer = null;
    if (saleName) {
      footer = actualColumn === 'ganhos'
        ? <p> O item <span>{saleName}</span> foi GANHO em {winDate}</p>
        : <p> O item <span>{saleName}</span> durou como {lastColumn} por {timeToUpdate}segundos</p>
    }

    return(
      <React.Fragment>
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
            handleDrop={this.handleSaleUpdate}
          />
        </div>
        <div>
          {footer}
        </div>
      </React.Fragment>
    )
  }
}

export default Dashboard;