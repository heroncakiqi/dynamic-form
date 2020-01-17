import React, {useState ,useEffect} from 'react';
import Input from './Input';
import './App.css';

function App() {
  const [state, setState] = useState({
    formData: [],
    userInput: {},
    loading: false
  });
  useEffect(() => {
    async function getData() {
      const res = await fetch('./data.json');
      const formData = await res.json();
      const userInput = formData.reduce((obj, item) => ({...obj, [item.name]: item.default_value || ''}),{});
      setState({userInput, formData});
    }
    getData();
  },[])
  const handleChange = (e, rules) => {
    setState({...state, userInput: {...state.userInput, [e.target.name]: e.target.value}})
  }

  const handleSubmit = e => {
    e.preventDefault();
    setState({...state, loading: true});
    setTimeout(() => {
      alert('thank you for your input!')
    },1000)
    setState({...state,loading: false});
  }
  const {formData} = state;
  return (
    <div className="App">
      {
        formData.length > 0 && 
          <form onSubmit={handleSubmit}>
            {
              formData.map(item => {
                const rules = item.rules.split('|').map(item => item.split(":"));
                return (
                  <React.Fragment  key={item.name}>
                  <Input 
                    //attributes
                    name={item.name}
                    label={item.label}
                    type={item.type}
                    placeholder={item.placeholder}
                    multiple={item.multiple}
                    readOnly={item.readonly}
                    value={state.userInput[item.name]}
                    disabled={state.loading}
                    //config
                    rules={rules}
                    validation={item.rules}
                    options={item.options}
                    onChange={handleChange}
                    info={item.info}
                  />
                </React.Fragment>
                )
              })
            }
            <button disabled={state.loading} type="submit">save</button>
          </form>
      }
    </div>
  );
}

export default App;
