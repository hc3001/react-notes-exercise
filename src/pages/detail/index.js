import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { actionCreators } from './store'
import { withRouter } from 'react-router-dom'
import '../../style/detail.scss'

class Detail extends PureComponent {
    
    componentDidMount() {
        console.log('this.props', this.props)
        let id = this.props.match.params.id
        this.props.getDetailList(id)
    }
    
    render() {
        return (
            <div className='detail-wrapper'>
                <div className='header'>{this.props.title}</div>
                <div className='content' dangerouslySetInnerHTML={{__html: this.props.content}}></div>
            </div>
        )
    }
}

const mapState = (state) => ({
    content: state.getIn(['detail', 'content']),
    title: state.getIn(['detail', 'title'])
})

const mapToDispatch = (dispatch) => ({
    getDetailList(id) {
        const action = actionCreators.getDetail(id)
        dispatch(action)
    }
})

export default connect(mapState, mapToDispatch)(withRouter(Detail))