const Card = (props) => (
  <div className="Card">
    <h4>{props.cardName}</h4>
    <p>R${props.totalPrice} {props.totalSales} negócios</p>
  </div>
);