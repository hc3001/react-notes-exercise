import React, { Component } from 'react'
import { connect } from 'react-redux'

class List extends Component {
	render() {
	    const { list } = this.props
        console.log('list', list)
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
            </div>
		)
	}
}

const mapState = (state) => ({
    list: state.getIn(['home', 'articleList']).toJS()
})

export default connect(mapState, null)(List)