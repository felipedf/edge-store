const AllCards = (props) => {
  var cards = props.cards.map((card) => {
    return(
      <Card key={card.id}
            cardName={card.cardName}
            totalPrice={card.totalPrice}
            totalSales={card.totalSales}
      />
    )
  });

  return(
    <div className="AllCards">
      {cards}
    </div>
  )
};