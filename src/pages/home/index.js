import React, { PureComponent } from 'react'
import Topic from './components/Topic'
import List from './components/List'
import Recommend from './components/Recommend'
import Writer from './components/Writer'
import { connect } from 'react-redux'
import { actionCreators } from './store'
import '../../style/home.scss'

class Home extends PureComponent {
    
    componentDidMount() {
        this.props.changeHomeData()
        this.bindscrollEvent()
    }
    
    handlerbackTop() {
        window.scrollTo(0, 0)
    }
    
    bindscrollEvent() {
        window.addEventListener('scroll', (e) => {
            this.props.changeScrollTopshow(e)
        })
    }
    
    render() {
        const { showScroll } = this.props
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
                {
                    showScroll ? <div className='back-top' onClick={this.handlerbackTop}>顶部</div> : null
                }
            </div>
        )
    }
}

const mapStatetoProps = (state) => ({
    showScroll: state.getIn(['home', 'showScroll'])
})

const mapDispatch = (dispatch) => ({
    changeHomeData() {
        const action = actionCreators.getHomeInfo()
        dispatch(action)
    },
    changeScrollTopshow(e) {
        e.stopPropagation()
        if(document.documentElement.scrollTop >= 100) {
            let action = actionCreators.toggleTopShow(true)
            dispatch(action)
        } else {
            let action = actionCreators.toggleTopShow(false)
            dispatch(action)
        }
    }
})

export default connect(mapStatetoProps, mapDispatch)(Home)