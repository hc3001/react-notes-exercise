import { fromJS } from 'immutable'
import * as constants from './constants'

const defaultState = fromJS({
	login: false,
    account: '',
    password: ''
})

export default (state = defaultState, action) => {
    console.log('action', action)
    if(action.type === constants.GET_ACCOUNT) {
        return state.set('account', action.account)
    }
    if(action.type === constants.GET_PASSWORD) {
        return state.set('password', action.password)
    }
    if(action.type === constants.CHANGE_LOGIN) {
        return state.set('login', action.value)
    }
    if(action.type === constants.LOGOUT) {
        return state.merge({
            login: action.value,
            account: '',
            password: '',
        })
    }
    return state
}