const validate = (input, rules) => {
  const min = parseInt(rules.find(item => item.includes('min'))[1]);
  const max = parseInt(rules.find(item => item.includes('max'))[1]);
  const required = rules.filter(item => item.includes('required'));
  if(typeof input === 'string'){
    if(required.length > 0 && input.length < 1) {
      return 'you must fill this!'
    }
    if(input.length < min) {
      return `your input must be longer than ${min} letters!`
    }
    if(input.length > max) {
      return `your input must be longer than ${max} letters!`
    }
  }
  if(typeof input === 'number') {
    if(required.length > 0 && input.length < 1) {
      return 'you must fill this!'
    }
    if(input < min) {
      return `your input must greater than ${min}!`
    }
    if(input > max) {
      return `your input must smaller ${max}!`
    }
  }
  return ''
}

export default validate