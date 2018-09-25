import React from 'react';

import Card from './Card/card';

const AllCards = (props) => {
  var cards = Object.keys(props.cards).map( cardType => {
    const card = props.cards[cardType];
    return (
      <Card key={card.cardName}
            cardName={card.cardName}
            totalPrice={card.totalPrice}
            totalSales={card.totalSales}
            cardClass={card.cardClass}
      />
    )
  });

  return(
    <div className="AllCards">
      {cards}
    </div>
  )
};

export default AllCards;