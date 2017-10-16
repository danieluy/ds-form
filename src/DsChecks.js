export default {
  required: value => {
    if (!value)
      return { valid: false, error: 'This field is required' }
    return { valid: true, error: null }
  },
  number: {
    positive: value => {
      if (isNaNvalue || value < 0)
        return { valid: false, error: "This field accepts only positive numbers" }
      return { valid: true, error: null }
    },
    negative: value => {
      if (value !== '-' && (isNaN(value) || value >= 0))
        return { valid: false, error: "This field accepts only negative numbers" }
      return { valid: true, error: null }
    }
  }
}