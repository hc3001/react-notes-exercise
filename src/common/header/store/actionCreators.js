import * as constants from './constants'
import { fromJS } from 'immutable'
import axios from 'axios'

const headerList = (data) => ({
    type: constants.HEADER_LIST,
    data: fromJS(data),
    nowPage: 1,
    totalPage: Math.ceil(data.length / 10)
})

export const searchFocus = () => ({
    type: constants.SEARCH_FOCUS
})

export const searchBlur = () => ({
    type: constants.SEARCH_BLUR
})

export const moveEnter = () => ({
    type: constants.MOVE_ENTER,
    moveIn: true
})

export const moveLeave = () => ({
    type: constants.MOVE_LEAVE,
    moveIn: false
})

export const changeTitle = (page) => ({
    type: constants.CHANGE_TITLE,
    nowPage: page
})

export const getList = () => {
    const t = (dispatch) => {
        axios.get('/api/headerList.json').then((res)=> {
            console.log('res', res)
            let list = headerList(res.data.data)
            dispatch(list)
        }).catch(() => {
            console.log('error')
        })
    }
    return t
}