import React from 'react'
import {connect} from 'cerebral/react'
import {css} from 'aphrodite'
import styles from './styles'
import Input from '../Fields/Input'
import {isValidForm} from 'cerebral-forms'

export default connect(
  {
    form: 'simple.form.**',
    settings: 'app.settings.**'
  },
  {
    validateEntireForm: 'simple.validateEntireForm'
  },
  function Simple ({form, settings, validateEntireForm}) {
    const {disableSubmitWhenFormIsInValid} = settings
    let enabled = true
    let buttonStyle = css(
      styles.button,
      styles.enabled
    )
    if (disableSubmitWhenFormIsInValid.value) {
      enabled = isValidForm(form)
      buttonStyle = css(
        styles.button,
        enabled ? null : styles.disabled
      )
    }
    return (
      <div>
        <span style={{fontSize: 24, fontWeight: 400}}>Simple Example</span>
        <div style={{marginTop: 5, paddingTop: 20, fontSize: 13}}>
          This is a simple example with three fields where firstname and lastname is required. Email is not required but if
          you fill in a value it must be validated as an email. The form result will be showed in the panel at the bottom.
        </div>
        <div style={{marginTop: 40}}>
          <Input name={'Firstname'} path={'simple.form.firstname'} />
          <Input name={'Lastname'} path={'simple.form.lastname'} />
          <Input name={'Email'} path={'simple.form.email'} />
        </div>
        <div style={{marginTop: 50}}>
          <button onClick={(e) => validateEntireForm({formPath: 'simple.form'})} disabled={!enabled} className={buttonStyle}>Submit</button>
        </div>
      </div>
    )
  }
)