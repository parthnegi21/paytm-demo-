const Input = ({onchange, label, id, placeholder, type = "text" ,autocomplete}) => {
    return (
      <>
        <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor={id}>
          {label}
        </label>
        <input onChange={onchange}
          className="shadow appearance-none border rounded w-full py-2 px-2  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id={id}
          type={type}
          placeholder={placeholder}
          autoComplete={autocomplete} 
        />
      </>
    );
  };
  
  export default Input;
  