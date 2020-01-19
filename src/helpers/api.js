import React from 'react'
export const apiPath = (path) => { return `http://localhost:4001/api${path}` }

//Component paths
export const userPath = (path = "") => { return apiPath(`/users${path}`) }
export const authPath = (path = "") => { return userPath(`/auth${path}`) }
export const adminPath = (path = "") => { return userPath(`/admin${path}`) }

//Auth Paths
export const registerPath = () => { return authPath(`/register`) }
export const verifyUserPath = (username, hash) => { return  authPath(`/verify/${username}/${hash}`) }
export const loginPath = () => { return authPath(`/login`) }
export const forgotPasswordPath = (username) => { return authPath(`/forgottenPassword/${username}`) }
export const resetPasswordPath = (username, hash) => { return authPath(`/resetPassword/${username}/${hash}`) }

export const curr_user = localStorage.user ? JSON.parse(localStorage.user) : false
export const headers = { headers: { 'authorization': localStorage.token } }

const check = (f, def, value) => {
    if(f === 'and') {
        return def && value
    } else {
        return def || value
    }
}

export const Protect = (props) => {
    //kind is end_user or admin_user
    //custom is a custom boolean value to pass in
    //role is 1-3
    //join is 'and' or 'or'- whether you want 3Admin-u-Admin Users OR ALL 3Admins + All Admin Users
    const {kind, custom, role} = props
    const join = props.join || 'and'
    
    //If the join type is "or"- the default value should be false, to prevent a false positive.
    //If the type is "and"- the default value should be true, to prevent a false negative.
    let checkResult = join === 'or' ? false : true

    const checks = curr_user && [[kind, curr_user.user_kind === kind], [role, curr_user.user_role >= role], [custom, custom]]
    if(checks){ checks.map(c => c[0] || c[0] === false ? checkResult = check(join, checkResult, c[1]) : "") }

    return <div>{checkResult ? props.children : ""}</div>
}

export default {
    apiPath, 
    userPath,
    authPath,
    adminPath, 
    registerPath,
    verifyUserPath,
    loginPath,
    forgotPasswordPath,
    resetPasswordPath,
}