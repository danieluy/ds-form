import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import DsInputText from './DsInputText'

class DsForm extends React.PureComponent {








  /////////////////////////////////////////////////////////////////
  // WRONG, inputs must be on state, try using lifecycle methods //
  /////////////////////////////////////////////////////////////////












  
  constructor() {
    super()
    this.inputs = []
  }
  registerInput(input) {
    this.inputs.push(input)
  }
  addProps(children, index) {
    const input = {
      value: null,
      valid: false
    }
    this.registerInput(input)
    return React.cloneElement(children, {
      key: `ds-input-${index}`,
      input
    })
  }
  render() {
    let children = null
    if (Array.prototype.isPrototypeOf(this.props.children))
      children = this.props.children.map((children, i) => this.addProps(children, i))
    else
      children = this.addProps(this.props.children)
    return (
      <div>
        {children}
      </div>
    )
  }
}

export default DsForm

DsForm.defaultProps = {}

export {
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