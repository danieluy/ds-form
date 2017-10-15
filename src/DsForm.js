import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import DsInputText from './DsInputText'
import DsChecks from './DsChecks'

class DsForm extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      inputFields: null,
      values: {}
    }
  }
  componentDidMount() {
    let inputFields = null
    if (Array.prototype.isPrototypeOf(this.props.children)) {
      const childrenWithProps = this.props.children.map((children, i) => this.addProps(children, i))
      inputFields = childrenWithProps
    }
    else {
      inputFields = this.addProps(this.props.children)
    }
    this.setState({ inputFields })
    ////////////////////////////////////////////////////////////////////////////////////////
    // review this way of handling Array vs single child, variables type shouldn't change //
    ////////////////////////////////////////////////////////////////////////////////////////
  }
  addProps(children, index) {
    return React.cloneElement(children, {
      key: `ds-input-${index || 0}`,
      onInput: this.handleInput.bind(this)
    })
  }
  handleInput(input) {
    const values = Object.assign({}, this.state.values)
    values[input.name] = { value: input.value, valid: input.valid }
    this.setState({ values })
  }
  render() {
    return (
      <div>
        {this.state.inputFields}
        <pre>
          {JSON.stringify(this.state.values, null, 2)}
        </pre>
      </div>
    )
  }
}

DsForm.defaultProps = {}

export {
  DsForm,
  DsChecks,
  DsInputText
}