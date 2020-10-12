import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {actionCreators} from '../store'
import {Link} from 'react-router-dom'

class List extends PureComponent {
    
    render() {
        const {list, page, getMoreList} = this.props
        return (
            <div>
                {
                    list.map((item) => {
                        return (
                            <Link key={item.id} to={'/detail/' + item.id}>
                                <div className='list-item'>
                                    <img alt='' className='pic' src={item.imgUrl}/>
                                    <div className='list-info'>
                                        <h3 className='title'>{item.title}</h3>
                                        <p className='desc'>{item.desc}</p>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                }
                <div className='load-more' onClick={() => getMoreList(page)}>加载更多</div>
            </div>
        )
    }
}

const mapState = (state) => ({
    list: state.getIn(['home', 'articleList']).toJS(),
    page: state.getIn(['home', 'articlePage'])
})

const mapTodispatch = (dispatch) => ({
    getMoreList(page) {
        dispatch(actionCreators.getMoreList(page))
    }
})

export default connect(mapState, mapTodispatch)(List)