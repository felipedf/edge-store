const AllSales = (props) => {
  var sales = props.sales.map((sale) => {
    return(
      <Sale key={sale.id}
            sale={sale}
            handleDelete={props.handleDelete}
            handleUpdate={props.handleUpdate}
      />
    )
  });

  return(
    <div className="RowDiv">
      <div className="ColumnDiv">
        {sales}
        {sales}
      </div>
      <div className="ColumnDiv">
        {sales}
      </div>
      <div className="ColumnDiv">
        {sales}
      </div>
      <div className="ColumnDiv">
        {sales}
      </div>
      <div className="ColumnDiv">
        {sales}
      </div>
      <div className="ColumnDiv">
        {sales}
      </div>
    </div>
  )
};