import React from 'react'
import PropTypes from 'prop-types'

import TextField from 'material-ui/TextField'

class DsInputText extends React.PureComponent {
  constructor(props) {
    super(props)
    if (!props.input)
      throw new Error('It seems that you are using DsInputText without DsForm. This component is intended for use as DsForm children')
    this.state = {
      value: null,
      error: null,
      isValid: false
    }
  }
  handleInput(e) {
    const value = e.target.value
    if (this.props.required && (!value || value === '')) {
      this.setState({
        error: this.porps.required.error
      })
    }
    else {
      this.setState({
        value,
        error: null
      })
    }
    if (this.state.error) {
      this.props.input.valid = false
    }
    else {
      this.props.input.value = this.state.value
      this.props.input.valid = true
    }
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
  required: PropTypes.shape({
    error: PropTypes.string
  }),
  fullWidth: PropTypes.bool
}

export default DsInputText
