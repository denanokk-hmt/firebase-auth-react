import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from "redux-form";
import { sendEmail, sendEmailReady } from '../actions/send_email';

import Title from "./Title";
import Text from "./Text";
import SendEmail from './SendEmail';
import { Link } from "react-router-dom"


class ForgotPw extends Component {

  constructor(props) {
    super(props)
    this.onSubmitSendEmail= this.onSubmitSendEmail.bind(this)
  }

  componentDidMount() {
    this.props.sendEmailReady()
  }

  async onSubmitSendEmail(props) {
    await this.props.sendEmail(props.email)
  }

  render() {
    const { handleSubmit, pristine } = this.props
    const props = this.props

    return (
      <React.Fragment>        
        <div className="center-align">
          {/* Title */}
          <Title title="Authentication" props={props} msg={props.send_msg}/>
          <hr className="line_hr_06" />
          <form onSubmit={handleSubmit(this.onSubmitSendEmail)} autoComplete="on" disabled={pristine}>
            <SendEmail props={props} errors={props.errors} />
          </form>
          {/* to root */}
          <Text text=" " styleClass="space" />
          <hr className="line_hr_06" />
          <Text text=" " styleClass="space" />
          <Link to="/">To login</Link>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => { 
  return {
    email: state.send_email.email,
    send_flg: state.send_email.send_flg,
    send_msg: state.send_email.send_msg,
  }
}

const validate = values => {
  const errors = {}
  if (!values.email) errors.email = 'Please enter, email.'
  return errors
}

const mapDispatchToProps = ({ sendEmail, sendEmailReady })

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ validate, form: 'ForgotPw',})(ForgotPw)
);