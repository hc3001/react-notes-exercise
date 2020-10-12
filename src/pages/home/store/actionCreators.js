import axios from 'axios'
import * as constants from './constants'
import {fromJS} from 'immutable'

const changHomeData = (result) => ({
    type: constants.CHANGE_HOME_DATA,
    topicList: result.topicList,
    articleList: result.articleList,
    recommendList: result.recommendList
})

const addHomeData = (result, nextPage) => ({
    type: constants.ADD_ARTICLE_LIST,
    list: fromJS(result),
    nextPage
})

export const toggleTopShow = (showScroll) => ({
    type: constants.TOGGLE_TOP_SHOW,
    showScroll
})

export const getHomeInfo = () => {
     let t = (dispatch) => {
        axios.get('/api/home.json').then((res) => {
            const result = res.data.data
            const r = changHomeData(result)
            dispatch(r)
        })
    }
    return t
}

export const getMoreList = (page) => {
    let t = (dispatch) => {
        axios.get('/api/homeList.json?page=' +　page).then((res) => {
            const result = res.data.data
            const r = addHomeData(result, page + 1)
            dispatch(r)
        })
    }
    return t
}
