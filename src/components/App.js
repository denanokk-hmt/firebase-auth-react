import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from "redux-form";

import '../css/App.css';

import Title from "./Title";
//import Image from "./Image";
import Text from "./Text";
import Logout from "./Logout";
import GoogleAuth from "./GoogleAuth";
import EmailAuth from "./EmailAuth";
import { Link } from "react-router-dom"
import Circular from './Circular'

import { reflogin, logout, googleLogin, emailLogin } from '../actions/auth';


class App extends Component {

  constructor(props) {
    super(props)
    this.onSubmitLogin= this.onSubmitLogin.bind(this)
  }

  componentDidMount() {
    this.props.reflogin()
  }

  async onSubmitLogin(values) {
    await this.props.emailLogin(values)
  }

  render() {
    const { handleSubmit, pristine } = this.props
    const props = this.props

    return (
      <React.Fragment>
        {/* Circular */}
        <div><Circular props={props} /></div>

        <div className="center-align">
          {/* Title */}
          <Title title="Authentication" props={props} msg={props.message}/>
          <hr className="line_hr_06" />
        </div>

        {(!props.uid)? (
          <div className="center-align">
          {/* Google */}
          <GoogleAuth props={props} />
          <hr className="line_hr_06" />

          {/* OR */}
          <div className="center-align"><Text text="OR" /></div>

          {/* Email */}
          <form onSubmit={handleSubmit(this.onSubmitLogin)} autoComplete="on" disabled={pristine}>
            <EmailAuth props={props} />
          </form>

          {/* PW forget */}
          <Text text=" " styleClass="space" />
          <Text text=" " styleClass="space" />
          <Link to={"/forgot_pw"} >
            パスワード忘れ、登録
          </Link>
        </div>
        ) : (
          <div className="center-align">
            {/* Logout */}
            <Logout props={props} />
          </div>
        )}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  //console.log("App::state", state)
  return {
    client: state.auth.client,
    uid: state.auth.uid,
    displayName: state.auth.displayName,
    email: state.auth.email,
    provider: state.auth.provider,
    message : state.auth.message,
    circulerOpen : state.auth.circulerOpen
  }
}

const validate = values => {
  //console.log("APP::VALUES", values)
  const errors = {}
  if (!values.email) errors.email = 'Please enter, email.'
  if (!values.password) errors.password = 'Please enter, password.'
  return errors
}

const mapDispatchToProps = ({ logout, reflogin, googleLogin, emailLogin })

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ validate, form: 'App',})(App)
);