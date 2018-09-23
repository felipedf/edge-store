const AllSales = (props) => {
  var sales = props.sales.map((sale) => {
    return(
      <Sale key={sale.id}
            sale={sale}
            handleDelete={props.handleDelete}
      />
    )
  });

  return(
    <div>
      {sales}
    </div>
  )
};