import React from 'react'
import { DsForm, DsChecks, DsInputText } from '../src/DsForm'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <div style={{ boxShadow: '0 2px 4px 0 rgba(0,0,0,0.25)', padding: '1rem' }}>
          <DsForm>
            <DsInputText
              floatingLabelText="Floating label text"
              onChange={(data) => { console.log(data) }}
              hintText="Hint Text"
              name="field1"
              checkOnInput={true}
              checks={[
                DsChecks.required(),
                DsChecks.text.accepts()
              ]}
            />
            <DsInputText
              floatingLabelText="Floating label text"
              onChange={(data) => { console.log(data) }}
              name="field2"
              fullWidth={true}
            />
          </DsForm>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App