import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { actionCreators } from './store'
import store from '../../store'
import '../../style/login.scss'

class Login extends PureComponent {
    
    render() {
        const { handlerAccountInput, handlerPasswordInput, loginStatus, login } = this.props
        if (!loginStatus) {
            return (
                <div className='login-wrapper'>
                    <div className='login-box'>
                        <input placeholder='账号' type='text' onInput={(e) => handlerAccountInput(e)}/>
                        <input placeholder='密码' type='password' onInput={(e) => handlerPasswordInput(e)}/>
                        <div className='button' onClick={login}>登录</div>
                    </div>
                </div>
            )
        } else {
            return <Redirect to='/' />
        }
    }
}

const mapStatetoProps = (state) => ({
    loginStatus: state.getIn(['login', 'login'])
})

const mapDispatch = (dispatch) => ({
    handlerAccountInput(e) {
        const account = e.target.value
        const action = actionCreators.getAccount(account)
        dispatch(action)
    },
    handlerPasswordInput(e) {
        const password = e.target.value
        const action = actionCreators.getPassword(password)
        dispatch(action)
    },
    login() {
        const account = store.getState('account')
        const password = store.getState('password')
        const action = actionCreators.login(account, password)
        dispatch(action)
    }
})

export default connect(mapStatetoProps, mapDispatch)(Login)