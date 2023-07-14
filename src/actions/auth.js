
import firebase from '../firebase'
import { getParam } from '../utils/getParam'
import { deleteToken } from '../utils/cookie';
import { loginStaff } from '../utils/staffs'

export const LOGIN_NG= 'LOGIN_NG'
export const LOGIN_OK = 'LOGIN_OK'
export const LOGIN_READY = 'LOGIN_READY'
export const LOGIN_NOW = 'LOGIN_NOW'


/**
 * Get login firebase user
 * @returns 
 */
export const reflogin = (staff_token) => async dispatch => {
  //console.log("ACTION::Ref login:::staff_token", staff_token)
  let dispatcher
  let result

  try {
    //現在ログインしているユーザー情報の取得
    await firebase.auth().onAuthStateChanged(user => {
      const values = {
        displayName: user?.displayName,
        email: user?.email,
        uid: user?.uid,
        provider: user?.providerData[0]?.providerId,
      }
      result = values
      return result
    })

    if (!result) {
      //dispatch logout
      dispatcher = logout()
    } else {
      //認証済みの場合は、トークンを返す
      //exp. localstorageを消したが、GoogleAccountの認証が残っていた場合等
      const client = getParam('client')
      const currentUser = await firebase.auth().currentUser
      if (!staff_token && currentUser) staff_token = await loginStaff(client, currentUser)

      //clinet側にスタッフのtokenを送信
      //console.log("POST MESSAGE STAFF_TOKEN", staff_token)
      window.parent.postMessage(staff_token, '*');

      //dispatch login ok
      dispatcher = login(result)
    }

  } catch(err) {
    //console.log("REF LOGIN ERROR", err)
    dispatcher = ({ type: LOGIN_NG,})
  } finally {
    dispatch(dispatcher)
  }
}

/**
 * Login
 * @returns 
 */
 export const login = (user) => async dispatch => {
  //console.log("ACION::Do login", user)
  try {
    if (user.uid) {
      dispatch({
        type: LOGIN_OK,
        payload: {
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
          provider: user.provider,
        }
      })
    } else {
      dispatch({ 
        type: LOGIN_READY,
        payload: null,
      })
    }
  } catch(err) {
    throw Error(err)
  }  
}

/**
 * Logout
 * @returns 
 */
export const logout = () => async dispatch => {
  //console.log("ACTION::Do logout")
  try {
    //Firebase ログアウト
    await firebase.auth().signOut()

    //Delete token cookie
    deleteToken('staff_token')

    //Login ready dispatch
    dispatch({ 
      type: LOGIN_READY,
      payload: null,
    })
  } catch(err) {
    throw Error(err)
  }
}

/**
 * Google provider login
 * usecase
 * 1. GoogleAccountエラー::エラー(logoutをディスパッチ)
 * 2. GoogleAccountあり、FBにuserなし、Staffs登録なし::エラー(logoutをディスパッチ)
 * 3. GoogleAccountあり、FBにuserなし、Staffs登録あり→初回、成功、FBのuser自動作成(refloginをディスパッチ)
 * 4. GoogleAccountあり、FBにuserあり、Staffs登録あり→成功(refloginをディスパッチ)
 * @returns 
 */
export const googleLogin = () => async dispatch => {
  //console.log("ACTION::Do Google login")

  //クエリパラメーターからclientを取得
  const client = getParam('client')

  //ログアウトをデフォルトディスパッチャーとして準備
  let dispatcher = logout()

  try {
    //ログイン中。。。
    await dispatch({
      type: LOGIN_NOW,
      payload: null,
    })

    //Googleアカウントで認証するポップアップを出してログイン
    const provider = new firebase.auth.GoogleAuthProvider()
    const user = await firebase.auth().signInWithPopup(provider)
    .then(response => {
      return response.user
    })

    //Staffs login処理()
    //(注意:Staffに登録がなくてもFB認証でFBのAuthユーザーは自動作成される)
    if (user) {

      //Staffsにログイン
      await loginStaff(client, firebase.auth().currentUser, dispatcher)
      .then(staff_token => {
        if (staff_token) {
          dispatcher = reflogin(staff_token)
        } else {
          throw Error('staffs login ng.')
        }
      })
    }
  } catch(err) {
    //console.log("GOOGLE LOGIN ERROR", err)
    dispatcher = ({ type: LOGIN_NG,})
  } finally {
    dispatch(dispatcher)
  }
}

/**
 * Email & Pw login
 * @param {*} values 
 * @returns 
 */
export const emailLogin = values => async dispatch => {
  //console.log("ACTION::EMAIL-LOGIN::VALUES", values)

  //クエリパラメーターからclientを取得
  const client = getParam('client')

  //ログアウトをデフォルトディスパッチャーとして準備
  let dispatcher = logout()

  try {
    //ログイン中。。。
    await dispatch({
      type: LOGIN_NOW,
      payload: null,
    })

    //Email&PwでFirebase認証を行う
    //Staffsでスタッフを登録時に、Firebaseのユーザーは作成されるが前提
    const user = await firebase.auth().signInWithEmailAndPassword(values.email, values.password)
    .then(async response => {
      return response.user
    })
    .catch(err => {
      if (err.code === "auth/user-not-found") {
        throw Error(err.code)
      } else if (err.code === "auth/wrong-password") {
        throw Error(err.code)
      } else {
        //その他のエラー
        throw err
      }
    })
    if (!user) throw Error('firebase login ng.')

    //Staffs login
    await loginStaff(client, firebase.auth().currentUser, dispatcher)
    .then(staff_token => {
      dispatcher = reflogin(staff_token)
    })
    .catch(err => {
      throw err
    })

  } catch(err) {
    //console.log("EMAIL&PW LOGIN ERROR",err)
    dispatcher = ({ type: LOGIN_NG,})
  } finally {
    dispatch(dispatcher)
  }
}