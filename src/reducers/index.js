
import { combineReducers } from "redux";
import { reducer as form } from "redux-form"
import auth from './auth'
import send_email from './send_email'

export default combineReducers({ auth, send_email, form })