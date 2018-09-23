class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sales: []
    };

    this.handleFormSubmit.bind(this);
    this.handleSaleDelete.bind(this);
    this.addNewSale = this.addNewSale.bind(this)
  }

  componentDidMount(){
    fetch('/api/sales.json')
      .then((response) => {return response.json()})
      .then((data) => {this.setState({ sales: data }) });
  }

  handleSaleDelete(id){
    fetch(`/api/sales/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
      console.log('Item was deleted!')
    })
  }

  handleFormSubmit(manufacturer, description){
    let body = JSON.stringify({ sale: {manufacturer: manufacturer, description: description} });

    fetch('/api/sales', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body,
    }).then((response) => { return response.json() })
      .then((sale)=>{
        this.addNewFruit(sale)
      })

  }

  addNewSale(sale){
    this.setState({
      sales: this.state.sales.concat(sale)
    })
  }

  render() {
    return(
      <div>
        <NewSale formSubmit={this.handleFormSubmit}/>
        <AllSales sales={this.state.sales} handleDelete={this.handleSaleDelete} />
      </div>
    )
  }
}