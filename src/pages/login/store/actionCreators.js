import axios from 'axios'
import * as constants from './constants'

const changeLogin = () => ({
    type: constants.CHANGE_LOGIN,
    value: true
})

export const logout = () => ({
    type: constants.LOGOUT,
    value: false
})

export const getAccount = (account) => ({
    type: constants.GET_ACCOUNT,
    account
})

export const getPassword = (password) => ({
    type: constants.GET_PASSWORD,
    password
})

export const login = (accout, password) => {
	return (dispatch) => {
        axios.get('/api/login.json?account=' + accout + '&password=' + password).then((res) => {
            const result = res.data.data;
            if (result) {
                dispatch(changeLogin())
            }else {
                alert('登陆失败')
            }
        })
	}
}