import React from 'react'
import {curr_user, token} from '../../../helpers/api'

//This is empty here, but it does get assigned other values before being passed into the provider.
export const userDefaults = {user: curr_user, token: token, login: () => {}, logout: () => {}}
export const UserContext = React.createContext(userDefaults);