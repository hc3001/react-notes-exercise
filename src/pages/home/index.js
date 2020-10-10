import React, { Component } from 'react'
import Topic from './components/Topic'
import List from './components/List'
import Recommend from './components/Recommend'
import Writer from './components/Writer'
import { connect } from 'react-redux'
import { actionCreators } from './store'
import '../../style/home.scss'

class Home extends Component {
    
    componentDidMount() {
        this.props.changeHomeData()
    }
    
    render() {
        return (
            <div className='home-wrapper'>
                <div className='home-left'>
                    <img className='banner-img' src="//upload.jianshu.io/admin_banners/web_images/4318/60781ff21df1d1b03f5f8459e4a1983c009175a5.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540" alt=''/>
                    <Topic />
                    <List />
                </div>
                <div className='home-right'>
                    <Recommend />
                    <Writer />
                </div>
            </div>
        )
    }
}

const mapDispatch = (dispatch) => ({
    changeHomeData() {
        const action = actionCreators.getHomeInfo()
        dispatch(action)
    }
})

export default connect(null, mapDispatch)(Home)