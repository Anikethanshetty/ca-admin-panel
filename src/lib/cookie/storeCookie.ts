import Cookies from 'js-cookie'

export const storeToken = (token: string) => {
  Cookies.set('token', token, {
    expires: 1,
    sameSite: 'Strict',
    path: '/',
  })
}
