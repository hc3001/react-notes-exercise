import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actionCreators } from '../store'

class List extends Component {
	
	render() {
	    const { list, page, getMoreList } = this.props
		return (
			<div>
                {
                    list.map((item) => {
                        return (
                            <div key={item.id} className='list-item'>
                                <img alt='' className='pic' src={item.imgUrl} />
                                <div className='list-info'>
                                    <h3 className='title'>{item.title}</h3>
                                    <p className='desc'>{item.desc}</p>
                                </div>
                            </div>
                        )
                    })
                }
                <div className='load-more' onClick={()=> getMoreList(page)}>加载更多</div>
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