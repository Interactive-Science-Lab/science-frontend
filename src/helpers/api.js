import React from 'react'
import {apiPathLink} from '../site/siteSettings'

export const apiPath = (path) => { return `${apiPathLink}${path}` }

//Component paths
export const userPath = (path = "") => { return apiPath(`/users${path}`) }
export const authPath = (path = "") => { return userPath(`/auth${path}`) }
export const adminPath = (path = "") => { return userPath(`/admin${path}`) }

//Auth Paths
export const registerPath = () => { return authPath(`/register`) }
export const verifyUserPath = (username, hash) => { return authPath(`/verify/${username}/${hash}`) }
export const loginPath = () => { return authPath(`/login`) }
export const forgotPasswordPath = (username) => { return authPath(`/forgottenPassword/${username}`) }
export const resetPasswordPath = (username, hash) => { return authPath(`/resetPassword/${username}/${hash}`) }

export const curr_user = localStorage.user ? JSON.parse(localStorage.user) : false
export const headers = { headers: { 'authorization': localStorage.token } }
export const token = localStorage.token

const check = (f, def, value) => {
    if (f === 'and') {
        return def && value
    } else {
        return def || value
    }
}


export const Protect = (props) => {
    let { kind, custom, role, join, rule } = props
    join = props.join || 'and'

    //If the join type is "or"- the default value should be false, to prevent a false positive.
    //If the type is "and"- the default value should be true, to prevent a false negative.
    let checkResult = join === 'or' ? false : true
    

    //Check the rule result. This allows us to easily check for common scenarios.
    let ruleResult = null
    if(rule) {
        switch(rule[0]) {
            case "this_user":
                ruleResult = rule[1] === curr_user.user_id
        }
    }

    //Setting a check array. The first value determines whether or not we are checking that area.
    //The second value IS the value to check.
    //Custom & ruleResult are simply duplicated over for the same effect.
    const checks = curr_user && [
        [kind, curr_user.user_kind === kind], 
        [role, curr_user.user_role >= role], 
        [custom, custom], 
        [ruleResult, ruleResult]
    ]
    if (checks) { 
        //If it's either existent or "false"- no undef or null
        checks.map(c => c[0] || c[0] === false ? 
            //accumulate on the check value
            checkResult = check(join, checkResult, c[1])
        : "") 
    }

    return <span>{checkResult ? props.children : ""}</span>

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