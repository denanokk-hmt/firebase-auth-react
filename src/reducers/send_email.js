
import { SEND_EMAIL_READY, SEND_EMAIL_SENDING, SEND_EMAIL_SENT, SEND_EMAIL_ERR } from "../actions/send_email";

const initialState = {
  email: '',
  send_flg: false,
  send_msg: 'パスワード登録メールを送信してください。',
  circulerOpen: false
}

const switchEvents = (state=initialState, action) => {

  //console.log("Reducers/sendemail::state", state)
  //console.log("Reducers/sendemail::action", action)

  switch (action.type) {

    case SEND_EMAIL_READY: {
      return initialState
    }
    case SEND_EMAIL_SENDING: {
      return Object.assign({}, state, {
        email: '',
        send_flg: false,
        send_msg: 'パスワード登録メールを送信中。。。',
        circulerOpen: true
      })
    }
    case SEND_EMAIL_SENT: {
      return Object.assign({}, state, {
        email: action.payload.email,
        send_flg: action.payload.send_flg,
        send_msg: action.payload.send_msg,
        circulerOpen: false
      })
    }
    case SEND_EMAIL_ERR: {
      return Object.assign({}, state, {
        email: action.payload.email,
        send_flg: action.payload.send_flg,
        send_msg: action.payload.send_msg,
        circulerOpen: false
      })
    }
    default: {
      return state
    }
  }
}

export default switchEvents