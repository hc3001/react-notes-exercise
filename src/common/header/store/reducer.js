import * as constants from './constants'
import { fromJS } from 'immutable'
const defaultState = fromJS({
    focused: false,
    list: [],
    moveIn: false,
    nowPage: 1,
    totalPage: 1
})

const reducer = (state = defaultState, action)=> {
    if(action.type === constants.SEARCH_FOCUS) {
        return state.set('focused', true)
    }
    if(action.type === constants.SEARCH_BLUR) {
        return state.set('focused', false)
    }
    if(action.type === constants.HEADER_LIST) {
        return state.merge({
            list: action.data,
            totalPage: action.totalPage
        })
    }
    if(action.type === constants.MOVE_ENTER) {
        return state.set('moveIn', action.moveIn)
    }
    if(action.type === constants.MOVE_LEAVE) {
        return state.set('moveIn', action.moveIn)
    }
    if(action.type === constants.CHANGE_TITLE) {
        return state.set('nowPage', action.nowPage)
    }
    return state
}

export default reducer