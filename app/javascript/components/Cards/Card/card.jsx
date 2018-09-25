import React from 'react';

const Card = (props) => {
  const classes = `Card ${props.cardClass}`;
  return (
    <div className={classes}>
      <div className="CardTitle">
        <h3>{props.cardName}</h3>
      </div>
      <div className="CardBody">
        <p>R${props.totalPrice}</p>
        <p>{props.totalSales} negócios</p>
      </div>
    </div>
  )
};

export default Card;
