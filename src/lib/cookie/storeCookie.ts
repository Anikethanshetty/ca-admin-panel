import Cookies from 'js-cookie'

export const storeToken = (token: string) => {
  Cookies.set('token', token, {
    expires: 1,
    sameSite: 'Strict',
    path: '/',
  })
}

export const storeFbId = (fbId: string) => {
  Cookies.set('adminFbId', fbId, {
    expires: 1,
    sameSite: 'Strict',
    path: '/',
  })
}

export const storeUserId = (userId: string) => {
  Cookies.set('userFbId', userId, {
    expires: 1,
    sameSite: 'Strict',
    path: '/',
  })
}
