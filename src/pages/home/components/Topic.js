import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

class Topic extends PureComponent {
	render() {
		const { list } = this.props
		return (
			<div className='topic-wrapper'>
				{
					list.map((item) => (
						<div className='topic-item' key={item.id}>
							<img
								className='topic-pic'
								src={item.imgUrl}
                                alt=''
							/>
							{item.title}
						</div>
					))
				}
			</div>
		)
	}
}

const mapState = (state) => ({
	list: state.getIn(['home', 'topicList']).toJS()
})

export default connect(mapState, null)(Topic)