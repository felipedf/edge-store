const Sale = (props) => {
  function handleDelete() {
    props.handleDelete(props.sale.id);
  }

  return(
    <div>
      <h1>{props.sale.manufacturer}</h1>
      <p>{props.sale.description}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  )
};