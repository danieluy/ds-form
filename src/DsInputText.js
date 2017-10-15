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
    this.setState({
      value: e.target.value === '' ? null : e.target.value,
      error: null,
      valid: true
    }, () => {
      if (this.props.checkUpfront)
        this.runChecks()
      else
        this.returnInput()
    })
    // const value = e.target.value
    // const error = null
    // const valid = false
    // if (this.props.checkUpfront) {
    //   if (this.props.required && (!value || value === '')) {
    //     this.setState({
    //       error: this.porps.required.error,
    //       valid: false
    //     })
    //   }
    // }
    // this.setState(
    //   { value, error, valid },
    //   () => {
    //     this.props.onInput({
    //       name: this.props.name,
    //       value: this.state.value,
    //       valid: this.state.valid
    //     })
    //   }
    // )
  }
  runChecks() {
    if (this.props.checks) {
      // const check = this.props.checks.reduce((status, check) => {
      //   const checkResult = check(this.state.value)
      //   status.valid = checkResult.valid
      //   status.message = checkResult.message
      //   return status
      // }, { valid: true, message: null })
      const check = { valid: true, message: null }
      this.props.checks.forEach(check => {
        const checkResult = check(this.state.value)
        if (!checkResult.hasOwnProperty('valid') || !checkResult.hasOwnProperty('message'))
          throw new Error('Check function must return: { valid: boolean, message: string }')
        if (!checkResult.valid)
          check = checkResult
      });
      console.log('check', check)
      this.setState({
        error: check.message,
        valid: check.valid
      }, this.returnInput)
    }
    else
      this.returnInput()
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
          hintText={this.props.hintText || this.props.floatingLabelText}
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
  checkUpfront: PropTypes.bool,
  checks: PropTypes.arrayOf(PropTypes.func)
}

export default DsInputText
