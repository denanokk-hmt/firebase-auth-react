
import firebase from '../firebase'
import { getParam } from '../utils/getParam'

export const SEND_EMAIL_READY = 'SEND_EMAIL_READY'
export const SEND_EMAIL_SENDING = 'SEND_EMAIL_SENDING'
export const SEND_EMAIL_SENT = 'SEND_EMAIL_SENT'
export const SEND_EMAIL_ERR = 'SEND_EMAIL_ERR'


/**
 * パスワード忘れ画面の初期表示
 * @param {text} email
 * @param {boolean} send
 * @returns 
 */
export const sendEmailReady = () => async dispatch => {
  let dispatcher
  try {
    dispatcher = { 
      type: SEND_EMAIL_READY,
      payload: {}
    }
  } catch(err) {
    console.log(err)
  } finally {
    dispatch(dispatcher)
  }
}

/**
 * パスワード忘れパスワード登録メール送信
 * @param {text} email
 * @param {boolean} send
 * @returns 
 */
export const sendEmail = email => async dispatch => {
  //console.log("ACTION::SEND EMAIL", email)

  //クエリパラメーターからclientを取得
  const client = getParam('client')

  let dispatcher

  try {
    //ログイン中。。。
    await dispatch({
      type: SEND_EMAIL_SENDING,
      payload: null,
    })

    //メールに貼られたリンクを踏むと、FBの再設定画面に飛ぶ
    //パスワードを再設定すると、actionCodeSettingsで指定したURLに画面遷移
    const return_url = `${process.env.REACT_APP_CWC_DOMAIN}${client}/index.html`
    const actionCodeSettings = {
      url: return_url
    };

    //パスワードリセットリンクメールを送信する
    await firebase.auth().sendPasswordResetEmail(email, actionCodeSettings)
    .then(() => {
      return {
        msg: "Password reset email sent!",
      }
    })
    .catch((error) => {
      throw error
    });

    dispatcher = { 
      type: SEND_EMAIL_SENT,
      payload: {
        email: email,
        send_flg: true,
        send_msg: 'パスワード登録メールを送信しました。',
      }
    }
  } catch(err) {
    //console.log("SEND EMAIL ERROR",err)
    dispatcher = { 
      type: SEND_EMAIL_ERR,
      payload: {
        email: email,
        send_flg: false,
        send_msg: 'パスワード登録メールを送信に失敗しました。',
      }
    }
  } finally {
    //console.log("ACTION::DISPATCH", dispatcher)
    dispatch(dispatcher)
  }
}