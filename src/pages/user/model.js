import { message } from 'antd'
import * as service from './service'
import _ from 'lodash'

const initState = {
    usersList: [],
    loading: false,
    updatePasswordModalIsOpen: false,
    modalIsOpen: false,
    currentUser: {},
}

export default {
    namespace: 'users',
    state: initState,

    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({ pathname }) => {
                if (pathname === '/user') {
                    dispatch({ type: 'getAll' })
                }
            })
        }
    },

    effects: {
        *getAll({ url }, { call, put, select }) {
            yield put({ type: 'showLoading' });
            const { data } = yield call(service.getAll)
            yield put({ type: 'setState', payload: { usersList: data } })
            yield put({ type: 'hideLoading' })
        },
        // 删除 单独规格
        *delete({ tagId }, { call, put, select }) {
            yield put({ type: 'showLoading' })
            try {
                const reqUrl = yield select(({ tags }) => tags.url)
                yield call(tagService.deleteTag, `${reqUrl}/${tagId}`)
                message.success('删除成功!')
                yield put({
                    type: 'removeTag',
                    tagId,
                })
            } finally {
                yield put({ type: 'hideLoading' })
            }
        },
        *save({ tagId }, { put, call, select }) {
            yield put({ type: 'showLoading' });
            const reqUrl = yield select(({ tags }) => tags.url);
            const tags = yield select(({ tags }) => tags.tags);
            const tag = tags.find(s => s.id === tagId) // 拿出模态列表
            tagId = tag.id || 0 // eslint-disable-line
            try {
                const commitValue = {
                    name: tag.name,
                }
                const errMsg = []
                if (!_.isString(commitValue.name) || commitValue.name.length <= 0) {
                    errMsg.push('名称必须填写')
                }
                yield put({ type: 'validationError', errMsg })
                if (errMsg.length > 0) {
                    return
                }

                if (tagId > 0) {
                    yield call(tagService.update, `${reqUrl}/${tagId}`, commitValue)
                    message.success('更新成功!')
                } else {
                    yield call(tagService.create, reqUrl, commitValue)
                    message.success('更新成功!')
                }
                yield put({ type: 'loadAllTags' })
            } finally {
                yield put({ type: 'hideLoading' })
            }
        },
    },
    reducers: {
        initSetUrl(state, action) {
            state.url = action.url
        },
        setSearchParams(state, action) {
            state.searchParams = action.searchParams
        },
        validationError(state, { errMsg }) {
            state.errMsg = errMsg
        },
        removeTag(state, { tagId }) {
            _.remove(state.tags, v => v.id === tagId)
        },
        startCreate(state) {
            const idx = state.tags.findIndex(v => v.id === 0)
            if (idx >= 0) {
                return state
            }
            state.tags.unshift({
                id: 0,
                name: '',
                editable: true,
            })
        },
        editFieldChange(state, { tagId, value }) {
            const idx = state.tags.findIndex(v => v.id === tagId)
            if (!state.tags[idx].staleData) {
                state.tags[idx].staleData = state.tags[idx]
            }
            state.tags[idx] = { ...state.tags[idx], ...value}
        },
        startEdit(state, { tagId }) {
            const idx = state.tags.findIndex(v => v.id === tagId)
            _.set(state, `tags[${idx}].editable`, true)
        },
        cancelEdit(state, { tagId }) {
            const idx = state.tags.findIndex(v => v.id === tagId)
            if (tagId === 0) {
                state.tags.shift()
            } else if (state.tags[idx].editable) {
                state.tags[idx] = state.tags[idx].staleData ? state.tags[idx].staleData : state.tags[idx]
                state.tags[idx].editable = false
            }
        },
        setState(state, { payload }) {
            return {...state, ...payload}
        },
        showLoading(state) {
            state.loading = true
        },
        hideLoading(state) {
            state.loading = false
        },
    },
}
