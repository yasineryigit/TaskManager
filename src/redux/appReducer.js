import * as ACTIONS from './Constants'

const defaultAppState = {
    isTabBarVisible: true,
    isBottomSheetModalVisible: false,
}

//app state reducer
const appReducer = (state = { ...defaultAppState }, action) => {
    if (action.type === ACTIONS.UPDATE_TAB_BAR_VISIBILITY) {
        return {
            ...state,
            ...action.payload
        }
    }
    else if (action.type === ACTIONS.UPDATE_BOTTOM_SHEET_MODAL_VISIBILITY) {
        return {
            ...state,
            ...action.payload
        }
    }
    return state
}

export default appReducer;