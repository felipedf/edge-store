const NewSale = (props) => {

  let formFields = {
    manufacturer: '',
    description: '',
  };

  function formEventSubmit(e) {
    e.preventDefault();
    props.formSubmit(formFields.manufacturer.value, formFields.description.value);
    e.target.reset();
  }

  return(
    <form onSubmit={formEventSubmit}>
      <input ref={input => formFields.manufacturer = input} placeholder='Enter the manufacturer name'/>
      <input ref={input => formFields.description = input} placeholder='Enter a description' />
      <button>Submit</button>
    </form>
  )
};