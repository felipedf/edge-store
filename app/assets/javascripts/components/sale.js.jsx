class Sale extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      editable: false
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleToggleEdit = this.handleToggleEdit.bind(this);
  }

  handleDelete() {
    this.props.handleDelete(this.props.sale.id);
  }

  handleToggleEdit() {
    if (this.state.editable) {
      let id = this.props.sale.id;
      let manufacturer = this.manufacturer.value;
      let description = this.description.value;
      let price = this.price.value;

      let updatedSale = {
        id: id,
        manufacturer: manufacturer,
        description: description,
        price: price
      };

      this.props.handleUpdate(updatedSale);
    }

    this.setState({ editable: !this.state.editable })
  }

  render() {
    var manufacturer = <h3>{this.props.sale.manufacturer}</h3>;
    var description = <p>{this.props.sale.description}</p>;
    var price = <p className="Currency">{this.props.sale.price}</p>;
    if (this.state.editable) {
      manufacturer =
        <div>
          <input
            className="Input"
            type='text'
            ref={input => this.manufacturer = input}
            placeholder="Título do negócio"
            defaultValue={this.props.sale.manufacturer}
          />;
        </div>;
      description = <input className="Input" type='text' ref={input => this.description = input} placeholder="Nome do cliente" defaultValue={this.props.sale.description}/>;
      price = <input className="CurrencyInput Currency" type='text' ref={input => this.price = input} placeholder="R$ 0.00" defaultValue={this.props.sale.price}/>;
    }

    return(
      <div className="SaleCard">
        { manufacturer }
        { description }
        { price }
        <button onClick={this.handleToggleEdit}>{this.state.editable? 'Submit' : 'Edit'}</button>
      </div>
    )
  }
}