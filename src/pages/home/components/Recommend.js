import React, { PureComponent } from 'react'
import { connect } from 'react-redux'


class Recommend extends PureComponent {
	render() {
	    const { list } = this.props
		return (
			<div className='recommend-wrapper'>
                {
                    list.map((item) => {
                        return <div className='recommend-item' key={item.id} style={{backgroundImage: `url(${item.imgUrl})`}}></div>
                    })
                }
            </div>
		)
	}
}

const mapState = (state) => ({
    list: state.getIn(['home', 'recommendList']).toJS()
})

export default connect(mapState, null)(Recommend)
