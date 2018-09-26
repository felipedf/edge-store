import React from 'react';

import CheckIcon from '../../../images/check_icon.png';
import XIcon from '../../../images/x_icon.png';
import EnterpriseIcon from '../../../images/enterprise_icon.png';

import { DragSource } from 'react-dnd';

const saleSource = {
  beginDrag(props) {
    return props.sale;
  },
  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }

    const newColumn = monitor.getDropResult().columnType;
    const oldColumn = props.sale.column_type;
    const newSale = {...props.sale, column_type: newColumn};
    return props.handleDrop(
      newSale,
      oldColumn
    );
  }
};

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
};

class Sale extends React.Component {
  state = {
    editable: this.props.sale.editable
  };

  handleDelete = () => {
    this.props.handleDelete(this.props.sale.id, this.props.sale.column_type);
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
      let column = this.props.sale.column_type;

      let updatedSale = {
        id: id,
        manufacturer: manufacturer,
        description: description,
        price: price,
        column_type: column
      };

      this.props.handleUpdate(updatedSale);
      this.setState({ editable: false })
    }
  };

  render() {
    const { isDragging, connectDragSource, sale } = this.props;
    const opacity = isDragging ? 0 : 1;

    let description = <p className="Description">{this.props.sale.description}</p>;
    let manufacturer = (
      <section className='InputList'>
        <img className="EnterpriseIcon" src={EnterpriseIcon} alt="Manufacturer"/>
        <p>{this.props.sale.manufacturer}</p>
      </section>
    );
    let price = <p className="Currency">{this.props.sale.price}</p>;
    if (this.state.editable) {
      description =
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
      manufacturer =
        <section className='InputList'>
          <img className="EnterpriseIcon" src={EnterpriseIcon} alt="Manufacturer"/>
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
      price = (
        <div className="CurrencyDiv">
          <input className="CurrencyInput Currency" type='text' ref={input => this.price = input} placeholder="R$ 0.00" defaultValue={this.props.sale.price}/>
        </div>
      )
    }

    return(
      connectDragSource(
        <div onClick={this.handleToggleEdit} className="SaleCard" style={{opacity}}>
          { description }
          { manufacturer }
          { price }
        </div>
      )
    )
  }
}

export default DragSource('sale', saleSource, collect)(Sale);