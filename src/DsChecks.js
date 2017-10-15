export default {
  required: (value) => {
    if (!value)
      return { valid: false, message: 'This field is required' }
    return { valid: true, message: null }
  },
  notEmptyString: (value) => {
    if (value === '')
      return { valid: false, message: "This field can't be empty" }
    return { valid: true, message: null }
  },
  NaN: (value) => {
    if (isNaN(value))
      return { valid: false, message: "This field accepts only numbers" }
    return { valid: true, message: null }
  },
  positiveNumber: (value) => {
    if (isNaN(value) || value < 0)
      return { valid: false, message: "This field accepts only positive numbers" }
    return { valid: true, message: null }
  }
}