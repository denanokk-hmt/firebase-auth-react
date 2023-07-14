
import { postRequest } from './axios'
import { setToken } from './cookie';

/**
 * Call Staffs login API
 * @param {*} client 
 * @param {*} currentUser 
 * @returns 
 */
 async function loginStaff(client, currentUser) {
  try {
    //FBから認証用のidTokenを取得
    const idToken = await currentUser.getIdToken(/* forceRefresh */ true)
    .then(idToken => {
      // Send token to your backend via HTTPS
      return idToken
    })
    
    //console.log("ACTION:GOOGLE AUTH::USER",user)

    //Staffs login
    const staff = await putLogin({client, idToken})
    
    //Staff登録を判定
    if (staff?.status_code === 0) {

      //Staffに登録済は、staff_tokenをCookieに登録
      setToken(staff.props.token)

      //refloginにstaff tokenを渡す
      return staff.props.token

    } else if (staff?.status_code === 212) {
      //Staffに未登録(212)は、FBのAuthユーザーを削除
      await currentUser.delete()
    }
  } catch(err) {
    throw err
  }
}

/**
 * Staffsにログイン、自分のstaff情報を取得、更新tokenを取得
 * @param {string} client
 * @param {string} idToken
 * @returns 
 */
const putLogin = async ({client, idToken}) => {
  //Request settings
  const staffsDomain = process.env.REACT_APP_STAFFS_DOAMIN
  const staffsUrl = `${staffsDomain}hmt/put/login`
  const params = {
    version: process.env.REACT_APP_VERSION,
    client: client,
    idToken: idToken,
  }

  //Put login, getting own staff data.
  return await postRequest("PUT", staffsUrl, params, response => {
  //return await postRequestWithHeaders("PUT", staffsUrl, params, headers, response => {

    //レスポンスデータがなければ即座にエラー
    //レスポンスデータがある場合、ステータスが0-->戻り値を戻す
    //レスポンスデータがある場合、ステータスが0以外、エラー判定結果を戻す
    if (response.data) {
      switch(response.data?.status_code) {
        case 0:
          return response.data
        default:
          return {
            status_code: response.data.status_code,
            status_msg: response.data.status_msg
          }
      }
    } else {
      throw Error(`put log error. ${response}`)
    }
  })
  .catch(err => {
    throw err
  })
}

export {
  loginStaff,
  putLogin,
}