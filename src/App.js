import React, {useState ,useEffect} from 'react';
import Input from './Input';
import './App.css';
import validate from './validate';

function App() {
  const [state, setState] = useState({
    formData: [],
    userInput: [],
    loading: false
  });
  useEffect(() => {
    async function getData(){
      const res = await fetch('./data.json');
      const formData = await res.json();
      const userInput = formData.map((item) => {
      const rules = item.rules.split('|').map(item => item.split(":"));
      const initError =  validate(item.default_value || '',rules);
        return {
          name: item.name,
          value: item.default_value || '',
          rules,
          error: initError
        }
      });
      setState({userInput, formData});
    }
    getData();
  },[])
  const handleChange = (e) => {
    const deepCopy = JSON.parse(JSON.stringify(state.userInput.find(item => item.name === e.target.name)))
    const futureState = {
      ...deepCopy,
      value: e.target.value
    }
    const error = validate(futureState.value,futureState.rules);
    setState({...state, userInput: state.userInput.map(item => {
      return item.name === e.target.name ? {
        ...item,
        error,
        value: e.target.value
      } : item;
    })});
  }

  const handleSubmit = e => {
    e.preventDefault();
    const errors = [];
    setState({...state, loading: true})
    state.userInput.forEach(item => {
      if(item.error.length > 0) {
        errors.push(item.error)
      }
    })
    if(errors.length === 0) {
      alert('thenk you for your input!')
      setTimeout(() => setState({...state, loading: false}),300)
    }
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
                const currentItem = state.userInput.findIndex(s => s.name === item.name);    
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
                    value={state.userInput[currentItem]['value']}
                    disabled={state.loading}
                    //config
                    error={state.userInput[currentItem]['error']}
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
