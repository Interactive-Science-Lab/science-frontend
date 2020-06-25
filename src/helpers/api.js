import {apiPathLink} from '../site/siteSettings'

export const apiPath = (path) => { return `${apiPathLink}${path}` }

//Component paths
export const userPath = (path = "") => { return apiPath(`/users${path}`) }
export const authPath = (path = "") => { return userPath(`/auth${path}`) }
export const adminPath = (path = "") => { return userPath(`/admin${path}`) }

//Auth Paths
export const checkUserPath = () => { return authPath(`/check`) }
export const registerPath = () => { return authPath(`/register`) }
export const verifyUserPath = (username, hash) => { return authPath(`/verify/${username}/${hash}`) }
export const loginPath = () => { return authPath(`/login`) }
export const forgotPasswordPath = (username) => { return authPath(`/forgottenPassword/${username}`) }
export const resetPasswordPath = (username, hash) => { return authPath(`/resetPassword/${username}/${hash}`) }

export const curr_user = localStorage.user ? JSON.parse(localStorage.user) : false
export const headers = { headers: { 'authorization': localStorage.token } }
export const token = localStorage.token

export default {
    apiPath,
    userPath,
    authPath,
    adminPath,
    checkUserPath,
    registerPath,
    verifyUserPath,
    loginPath,
    forgotPasswordPath,
    resetPasswordPath,
}