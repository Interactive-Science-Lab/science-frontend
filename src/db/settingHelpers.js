
// //=====================
// // PERMISSIONS 
// //=====================
// //This function goes through the permission, comparing it to the current user.
// const checkPermission = (permission) => {
//     if(!permission || Object.entries(permission).length === 0) { throw "ASTEROID: Permission error with resource settings. Accepted format: {action: {name: %s}}" }
//     let ret = null
//     let roleCheck = null, kindCheck = null, selfCheck = null
//     if (permission.name === 'all') { ret = true }
//     if (permission.name === 'logged_in' || permission.name === 'user') { ret = curr_user ? true : false }
//     if (permission.name === 'no_user') { ret = curr_user ? false : true }
//     if (permission.name === 'none') { ret = false }
//     if (permission.name === 'webmaster') { permission = { role: 3, kind: 'admin_user', join: 'and' } }
//     if (permission.name === 'admin') { permission = { role: 3 } }
//     if (permission.name === 'mod') { permission = { role: 2 } }

//     //if (permission.name === 'self') { permission = {} }

//     if (permission.role) { roleCheck = curr_user && curr_user.user_role >= permission.role }
//     if (permission.kind) { kindCheck = curr_user && curr_user.user_kind === permission.kind }

//     if (permission.join === 'or') {
//         ret = ret || roleCheck || kindCheck || permission.custom
//     } else {
//         //Put them in an array and map. If they are exactly false, return false.
//         [ret, roleCheck, kindCheck, permission.custom].forEach((c) => c === false ? ret = false : null)
//     }
//     console.log(permission, ret, roleCheck, curr_user)
//     return ret === false ? false : true
// }
