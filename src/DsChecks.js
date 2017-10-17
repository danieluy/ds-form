export default {
  required: (message = `This field is required`) => {
    if (typeof message !== 'string')
      throw new Error(`Type mismatch, optional parameter message expected string but got ${typeof message}`)
    return value => !value ? { valid: false, error: message } : { valid: true, error: null }
  },
  text: {
    accepts: (message = 'This field accepts a limited array of values', regex = new RegExp('.*', 'g')) => {
      if (typeof message !== 'string')
        throw new Error(`Type mismatch, optional parameter message expected string but got ${typeof message}`)
      if (!RegExp.prototype.isPrototypeOf(regex))
        throw new Error(`Type mismatch, parameter regex expected RegExp but got ${typeof regex}`)
      return value => (!regex.test(value)) ? { valid: false, error: message } : { valid: true, error: null }
    }
  },
  number: {
    positive: (message = `This field accepts only positive numbers`) => {
      if (typeof message !== 'string')
        throw new Error(`Type mismatch, optional parameter message expected string but got ${typeof message}`)
      return value => (isNaN(value) || value < 0) ? { valid: false, error: message } : { valid: true, error: null }
    },
    negative: (message = `This field accepts only negative numbers`) => {
      if (typeof message !== 'string')
        throw new Error(`Type mismatch, optional parameter message expected string but got ${typeof message}`)
      return value => (isNaN(value) || value >= 0) ? { valid: false, error: message } : { valid: true, error: null }
    }
  }
}