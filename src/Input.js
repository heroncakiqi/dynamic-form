import React from 'react'

const Input = props => {
  const min = parseInt(props.rules.find(item => item.includes('min'))[1]);
  const max = parseInt(props.rules.find(item => item.includes('max'))[1]);
  const required = props.rules.find(item => item.includes('required'))[0];
  const atbs = {
    name: props.name || '',
    label: props.label || '',
    type: props.type || '',
    placeholder: props.placeholder || '',
    multiple: props.multiple || false,
    readOnly: props.readOnly || false,
    value: props.value || '',
    disabled: props.disabled,
    required,
    min,
    max
  }
  let element = null;
  switch(props.type) {
    case 'text':
    case 'number':
      element = <input {...atbs} onChange={props.onChange}/>
      break;
    case 'textare':
      element = <textarea  {...atbs} onChange={props.onChange}/>
      break;
    case 'select':
      element = (
        <select {...atbs}  onChange={props.onChange}>
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
      <span>{props.info}</span>
    </fieldset>
  )
}
export default Input;

