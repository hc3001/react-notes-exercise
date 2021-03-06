import React, { Component, Fragment } from 'react'
import { CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'
import { actionCreators } from "./store"
import { actionCreators as loginActionCreators } from '../../pages/login/store'
import { Link } from 'react-router-dom'
import '../../style/header.scss'

const getListArea = (props)=> {
    const { focused, moveIn, nowPage, totalPage, list, handlerMouseEnter, handlerMouseLeave, handlerChangeTitle } = props
    let newList = list.toJS()
    let searchInfoItem = []
    let spinIcon = null
    if(newList.length) {
        for (var i = (nowPage - 1) * 10; i < nowPage * 10; i++) {
            searchInfoItem.push(
                <div className='search-info-item' key={newList[i]}>{newList[i]}</div>
            )
        }
    }
    console.log('searchInfoItem', searchInfoItem, nowPage)
    if (focused || moveIn) {
        return (
            <div
                className='search-info'
                onMouseEnter={handlerMouseEnter}
                onMouseLeave={handlerMouseLeave}
            >
                <div  className='search-info-title'>
                    热门搜索
                    <span className='change-title' onClick={() => {handlerChangeTitle(nowPage, totalPage, spinIcon)}}>
                        <i ref={(icon) => {spinIcon = icon}} className="iconfont spin">&#xe851;</i>
                        换一批
                    </span>
                </div>
                <div className='search-info-list'>
                    {searchInfoItem}
                </div>
            </div>
        )
    }else {
        return null
    }
}

class Header extends Component {
    
    render() {
        const { focused, handlerInputFocus, handlerInputBlur, login, handlerLogout } = this.props
        return (
            <Fragment>
                <div className={'header-wrapper'}>
                    <a href="./"> </a>
                    <div className='header-nav'>
                        <div className='left active'>首页</div>
                        <div className='left'>下载App</div>
                        {
                            login ?
                                <div className='right' onClick={handlerLogout}>退出</div> :
                                <Link to='/login'>
                                    <div className='right'>登陆</div>
                                </Link>
                        }
                        <div className='right'>
                            <i className="iconfont">&#xe636;</i>
                        </div>
                        <div className='search-wrapper'>
                            <CSSTransition
                                in={focused}
                                timeout={200}
                                classNames="slide"
                            >
                                <input
                                    type="text"
                                    placeholder={'搜索'}
                                    className={focused ? 'focused' : ''}
                                    onFocus={handlerInputFocus}
                                    onBlur={handlerInputBlur}
                                />
                            </CSSTransition>
                            <i className={focused ? 'focused iconfont zoom' : 'iconfont zoom'}>
                                &#xe614;
                            </i>
                            {getListArea(this.props)}
                        </div>
                    </div>
                </div>
                <div className='addition'>
                    <div className='writting'>
                        <i className="iconfont">&#xe615;</i>
                        写文章
                    </div>
                    <div className='reg'>注册</div>
                </div>
            </Fragment>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        focused: state.getIn(['header', 'focused']),
        list: state.getIn(['header', 'list']),
        moveIn: state.getIn(['header', 'moveIn']),
        nowPage: state.getIn(['header', 'nowPage']),
        totalPage: state.getIn(['header', 'totalPage']),
        login: state.getIn(['login', 'login'])
    }
}
const mapDispathToProps = (dispatch) => {
    return {
        handlerInputFocus(e) {
            const getList = actionCreators.getList()
            const searchFocus = actionCreators.searchFocus()
            dispatch(getList)
            dispatch(searchFocus)
        },
        handlerInputBlur(e) {
            const searchBlur = actionCreators.searchBlur()
            dispatch(searchBlur)
        },
        handlerMouseEnter(e) {
            const moveEnter = actionCreators.moveEnter()
            dispatch(moveEnter)
        },
        handlerMouseLeave(e) {
            const moveLeave = actionCreators.moveLeave()
            dispatch(moveLeave)
        },
        handlerChangeTitle(nowPage, totalPage, spin) {
            let originAngle = spin.style.transform.replace(/[^0-9]/g, '')
            if (originAngle) {
                originAngle = parseInt(originAngle, 10)
            } else {
                originAngle = 0
            }
            spin.style.transform = 'rotate(' + (originAngle + 360) + 'deg)'
            let changeTitle
            if(nowPage < totalPage) {
                nowPage += 1
                changeTitle = actionCreators.changeTitle(nowPage)
            } else {
                changeTitle = actionCreators.changeTitle(1)
            }
            dispatch(changeTitle)
        },
        handlerLogout() {
            const moveLeave = loginActionCreators.logout()
            dispatch(moveLeave)
        }
    }
}
export default connect(mapStateToProps, mapDispathToProps)(Header)