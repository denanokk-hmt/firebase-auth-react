
import firebase from '../firebase'

/**
 * Firebase ユーザーカスタムトークン認証
 * @param {*} token 
 */
const customTokenAuth = async token => {
  try {
    //現在ログインしているユーザー情報の取得
    return await firebase.auth().signInWithCustomToken(token)
    .then((userCredential) => {
      // Signed in
      //console.log(JSON.stringify(userCredential))
      return userCredential.user
    })
    .catch((error) => {
      //var errorCode = error.code;
      //var errorMessage = error.message;
      // ...
      throw error
    });
  } catch(err) {
    throw Error(err)
  }
}

export {
  customTokenAuth,
}