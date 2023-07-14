
import { getParam } from '../utils/getParam'
import { LOGIN_NG, LOGIN_OK, LOGIN_READY, LOGIN_NOW } from "../actions/auth";

const initialState = {
  location: window.location.href,
  client: getParam('client', window.location.href),
  uid: '',
  displayName: '',
  email: '',
  provider: '',
  message: 'こんにちは。',
  circulerOpen: false,
  alert_snackbar: {
    enabled: false,
    duration: 6000,
    type : 'info',
    message : ''
  }
}

const switchEvents = (state=initialState, action) => {

  switch (action.type) {

    case LOGIN_NOW: {
      return Object.assign({}, state, {
        uid: '',
        displayName: '',
        email: '',
        provider: '',
        message: 'ログイン中。。。',
        circulerOpen: true
      })
    }

    case LOGIN_READY: {
      return Object.assign({}, state, {
        uid: '',
        displayName: '',
        email: '',
        provider: '',
        message: 'ログインしてください。',
        circulerOpen: false
      })
    }

    case LOGIN_OK: {
      return Object.assign({}, state, {
        uid: action.payload.uid,
        displayName: action.payload.displayName,
        email: action.payload.email,
        provider: action.payload.provider,
        message: `ようこそ : ${action.payload.email}`,
        circulerOpen: false
      })
    }

    case LOGIN_NG: {
      return Object.assign({}, state, {
        uid: '',
        displayName: '',
        email: '',
        provider: '',
        message: 'ログインに失敗しました。',
        circulerOpen: false
      })
    }

    default: {
      return state
    }
  }
}

export default switchEvents