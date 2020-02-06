import cookie from 'react-cookie';
import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';

let userTimeout;

let encryptKey = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_ENCRYPTION_KEY : window._env_.REACT_APP_ENCRYPTION_KEY
let secureCookies =  process.env.NODE_ENV === 'development' ? process.env.SECURE_COOKIES : window._env_.SECURE_COOKIES
export const getSession = (key) => {
  let sessionData = cookie.load('qt_d');

  if (sessionData) {
      let data = decryptObject(sessionData)
      return key ? data[key] : data;
  } else {
      return {};
  }

}

export const decrypt = (ciphertext) => {
  let bytes = AES.decrypt(ciphertext.toString(), encryptKey);
  let plaintext = bytes.toString(Utf8);
  return plaintext
}

export const decryptObject = (ciphertext) => {
  let bytes = AES.decrypt(ciphertext.toString(), encryptKey);
  let decryptedData = JSON.parse(bytes.toString(Utf8));
  return decryptedData;
}

export const removeSession = () => {
  userTimeout && clearTimeout(userTimeout);
  cookie.remove('qt_d');
}

export const timeRemaining = () => {
  let isActive = cookie.load('qt_d') ? 1 : 0;
  return isActive;
}

export const timeOutUser = (expiry, dispatch, callback) => {
  userTimeout && clearTimeout(userTimeout);
  userTimeout = setTimeout(() => {
      removeSession();
      window.location.href = '/'
      // dispatch(callback());
  }, expiry);
};

export const saveSession = (userData, token) => {
  // var tokenExpiry = new Date();
  var tokenExpiry = new Date((userData.exp - 10) * 1000);
  // tokenExpiry.setSeconds(tokenExpiry.getSeconds() + (userData.exp - 10));
  let cookieOptions = {
      expires: tokenExpiry,
      secure: secureCookies ? true : false,
      path: '/'
  };

  userData.expiryDate = tokenExpiry;
  userData.access_token = token


  let ciphertext = AES.encrypt(JSON.stringify(userData), encryptKey);
  ciphertext = ciphertext + "";

  cookie.save('qt_d', ciphertext, cookieOptions);
}

export const hasToken = () => {
  let sessionData = cookie.load('qt_d');

  if (sessionData) {
      let data = decryptObject(sessionData)
      return data.exp * 1000 > Date.now()
  }
  return false
}