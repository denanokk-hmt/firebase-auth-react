
import Cookies from 'universal-cookie';


const cookies = new Cookies();

const setToken = token => {
  const options = {
    path: process.env.REACT_APP_WEP_AUTH_DOMAIN,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1week,
  };  
  cookies.set('staff_token', token, options); 
  return token
}

const getToken = name => {
  const token = cookies.get(name);
  return token
}

const deleteToken = name =>{
  const options = {
    maxAge: 0,
  }; 
  cookies.set(name, '', options); 
}

export {
  setToken,
  getToken,
  deleteToken,
}