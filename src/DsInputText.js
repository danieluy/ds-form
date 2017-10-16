import React from 'react'
import PropTypes from 'prop-types'

import TextField from 'material-ui/TextField'

class DsInputText extends React.PureComponent {
  constructor(props) {
    super(props)
    // if (!props.input)
    //   throw new Error('It seems that you are using DsInputText without DsForm. This component is intended for use as DsForm children')
    this.state = {
      value: null,
      error: null,
      valid: false
    }
  }
  handleInput(e) {
    const value = e.target.value === '' ? null : e.target.value
    this.runChecks.call(this, value)
  }
  runChecks(value) {
    let check = { valid: true, error: null }
    if (this.props.checks) {
      this.props.checks.forEach(checkFunction => {
        const checkResult = checkFunction(value)
        if (!checkResult.hasOwnProperty('valid') || !checkResult.hasOwnProperty('error'))
          throw new Error('Check function must return: { valid: boolean, error: string }')
        if (!checkResult.valid) {
          check = checkResult
          return
        }
      })
    }
    this.setState({
      value,
      error: this.props.checkOnInput ? check.error : null,
      valid: check.valid
    }, this.returnInput)
  }
  returnInput() {
    this.props.onInput({
      name: this.props.name,
      value: this.state.value,
      valid: this.state.valid
    })
  }
  render() {
    return (
      <div style={{ display: `${this.props.inline ? 'inline-block' : 'block'}` }}>
        <TextField
          floatingLabelText={this.props.floatingLabelText}
          hintText={this.props.hintText || null}
          fullWidth={this.props.fullWidth || false}
          errorText={this.state.error}
          value={this.state.value || ''}
          onChange={this.handleInput.bind(this)}
        />
      </div>
    )
  }
}

DsInputText.propTypes = {
  floatingLabelText: PropTypes.string.isRequired,
  hintText: PropTypes.string,
  fullWidth: PropTypes.bool,
  checkOnInput: PropTypes.bool,
  checks: PropTypes.arrayOf(PropTypes.func)
}

export default DsInputText
