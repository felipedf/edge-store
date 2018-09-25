import React from 'react';

import CheckIcon from '../../../images/check_icon.png';
import XIcon from '../../../images/x_icon.png';
import EnterpriseIcon from '../../../images/enterprise_icon.png';

class Sale extends React.Component {
  state = {
    editable: this.props.sale.editable
  };

  handleDelete = () => {
    this.props.handleDelete(this.props.sale.id);
  };

  handleToggleEdit = () => {
    if (!this.state.editable) {
      this.setState({ editable: true })
    }
  };

  handleNewOrEditSale = () => {
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
      this.setState({ editable: false })
    }
  };

  render() {
    var manufacturer = <h3>{this.props.sale.manufacturer}</h3>;
    var description = <p>{this.props.sale.description}</p>;
    var price = <p className="Currency">{this.props.sale.price}</p>;
    if (this.state.editable) {
      manufacturer =
        <section className="InputList">
          <div style={{flex: 1}}>
            <input
              autoFocus
              className='Input'
              type='text'
              ref={input => this.description = input}
              placeholder='Título do negócio'
              defaultValue={this.props.sale.description}
            />
          </div>
          <img onClick={this.handleNewOrEditSale} className='ImageButton' src={CheckIcon} alt="Confirm"/>
          <img onClick={this.handleDelete} className='ImageButton' src={XIcon} alt="Lost"/>
        </section>;
      description =
        <section className='InputList'>
          <img src={EnterpriseIcon} alt="Manufacturer"/>
          <div style={{flex: 1}}>
            <input
              className='Input'
              type='text'
              ref={input => this.manufacturer = input}
              placeholder='Nome do cliente'
              defaultValue={this.props.sale.manufacturer}
            />
          </div>
        </section>;
      price = <input className="CurrencyInput Currency" type='text' ref={input => this.price = input} placeholder="R$ 0.00" defaultValue={this.props.sale.price}/>;
    }

    return(
      <div onClick={this.handleToggleEdit} className="SaleCard">
        { manufacturer }
        { description }
        { price }
      </div>
    )
  }
}

export default Sale;