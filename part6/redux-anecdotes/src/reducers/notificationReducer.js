let id = 0

const notificationReducer = (state = null, action) => {
    switch (action.type) {
      case 'Visible_Notify': {
        return action.data.notification
      }
      default:
        return state
    }
  }
  
  export const VisibleNotify = (notification, time) => {
    return async (dispatch) => {
      clearTimeout(id)
      id = setTimeout(() =>
      dispatch({
        type: 'Visible_Notify',
        data: {
          notification: null,
        },
    }), time * 1000
    )
    dispatch({
      type: 'Visible_Notify',
      data:{
        notification
      }
    })
  
}
  }
  
  export default notificationReducer