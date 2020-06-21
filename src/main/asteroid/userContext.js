import React from 'react'
import {curr_user, token} from '../../helpers/api'

export const userDefaults = {user: curr_user, token: token, login: () => {}, logout: () => {}}
export const UserContext = React.createContext(userDefaults);