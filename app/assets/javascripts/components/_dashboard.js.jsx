class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sales: []
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
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

  handleFormSubmit(manufacturer, description, price) {
    let body = JSON.stringify({ sale: {manufacturer: manufacturer, description: description, price: price} });

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
    console.log('aaahaii', sale);
    let newSales = this.state.sales.filter((f) => f.id !== sale.id);
    newSales.push(sale);

    this.setState({
      sales: newSales
    })
  }

  addNewSale(sale) {
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
        <NewSale formSubmit={this.handleFormSubmit}/>
        <AllSales
          sales={this.state.sales}
          handleDelete={this.handleSaleDelete}
          handleUpdate={this.handleSaleUpdate}
        />
      </div>
    )
  }
}