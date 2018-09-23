const NewSale = (props) => {

  let formFields = {
    manufacturer: '',
    description: '',
    price: 0
  };

  function formEventSubmit(e) {
    e.preventDefault();
    props.formSubmit(
      formFields.manufacturer.value,
      formFields.description.value,
      formFields.price.value
    );
    e.target.reset();
  }

  return(
    <form onSubmit={formEventSubmit}>
      <input ref={input => formFields.manufacturer = input} placeholder='Enter the manufacturer name'/>
      <input ref={input => formFields.description = input} placeholder='Enter a description' />
      <input ref={input => formFields.price = input} placeholder='Enter an amount' />
      <button>Submit</button>
    </form>
  )
};