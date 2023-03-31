import * as ACTIONS from './Constants'

export const updateTabBarVisibility = state => {
    return {
        type: ACTIONS.UPDATE_TAB_BAR_VISIBILITY,
        payload: state
    }
}

export const updateBottomSheetModalVisibility = state => {
    return {
        type: ACTIONS.UPDATE_BOTTOM_SHEET_MODAL_VISIBILITY,
        payload: state
    }
}
