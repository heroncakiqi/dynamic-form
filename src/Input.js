import React from 'react';

const Input = props => {
  const atbs = {
    name: props.name || '',
    label: props.label || '',
    type: props.type || '',
    placeholder: props.placeholder || '',
    multiple: props.multiple || false,
    readOnly: props.readOnly || false,
    value: props.value || '',
    disabled: props.disabled || false,
  }

  const handleChange = (e) => {
    props.onChange(e, props.rules)
  }

  let element = null;
  switch(props.type) {
    case 'text':
    case 'number':
      element = <input {...atbs} onChange={handleChange}/>
      break;
    case 'textare':
      element = <textarea  {...atbs} onChange={handleChange}/>
      break;
    case 'select':
      element = (
        <select {...atbs}  onChange={handleChange}>
          {props.options.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
        </select>
      )
      break;
    default:
      element = <input {...props}  onChange={props.onChange}/>
  }
  return (
    <fieldset>
      <label htmlFor={props.name}>{props.label}</label>
      {element}
      <br/>
      <span style={{color: 'red'}}>{props.error}</span>
    </fieldset>
  )
}
export default Input;

