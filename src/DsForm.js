import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import DsInputText from './DsInputText'

class DsForm extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      inputFields: null,
      inputs: null
    }
  }
  componentDidMount() {
    let inputFields = null
    let inputs = null
    if (Array.prototype.isPrototypeOf(this.props.children)) {
      const childrenWithProps = this.props.children.map((children, i) => this.addProps(children, i))
      inputFields = childrenWithProps
      inputs = childrenWithProps.map(input => input.props.input)
    }
    else {
      inputFields = this.addProps(this.props.children)
      inputs = [childrenWithProps.props.input]
    }
    this.setState({ inputFields, inputs })
    ////////////////////////////////////////////////////////////////////////////////////////
    // review this way of handling Array vs single child, variables type shouldn't change //
    ////////////////////////////////////////////////////////////////////////////////////////
  }
  addProps(children, index) {
    const input = {
      value: null,
      valid: false
    }
    return React.cloneElement(children, {
      key: `ds-input-${index || 0}`,
      input
    })
  }
  render() {
    console.log(this.state)
    return (
      <div>
        {this.state.inputFields}
        <pre>
          {JSON.stringify(this.state.inputs, null, 2)}
        </pre>
      </div>
    )
  }
}

DsForm.defaultProps = {}

export {
  DsForm,
  DsInputText
}

// export class DsInput extends Component {
//   constructor() {
//     super()
//     this.state = {
//       value: null,
//       valueMessage: null,
//       isValid: false
//     }
//   }
//   handleInput(evt) {
//     const value = evt.target.value
//     if (this.props.required) {
//       if (!value || value === '') {
//         this.setState({
//           value: null,
//           valueMessage: this.props.errorText
//         })
//       }
//       else {
//         this.setState({
//           value,
//           valueMessage: undefined
//         })
//         this.props.onChange(this.state.value)
//       }
//     }
//     else {
//       this.props.onChange(this.state.value)
//     }
//   }
//   render() {
//     return (
//       <TextField
//         floatingLabelText={this.props.floatingLabelText}
//         hintText={this.props.hintText || this.props.floatingLabelText}
//         errorText={this.state.valueMessage}
//         value={this.state.value}
//         onChange={this.handleInput.bind(this)}
//         fullWidth={this.props.fullWidth}
//       />
//     )
//   }
// }
// DsInput.defaultProps = {
//   floatingLabelText: PropTypes.string.isRequired,
//   hintText: PropTypes.string,
//   errorText: PropTypes.string,
//   fullWidth: PropTypes.bool,
//   onChange: PropTypes.func.isRequired,
//   isValid: PropTypes.func
// }